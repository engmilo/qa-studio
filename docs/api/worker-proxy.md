# API — Cloudflare Worker Proxy

> **Branch:** `refactor/foundation`
> **Scope:** Defines the contract between the QA Studio client and the
> Cloudflare Worker that proxies AI generation requests.
> **Rule:** This document describes the boundary. No code changes here.

---

## 1. Why a Proxy Exists

QA Studio is a static, client-side PWA hosted on GitHub Pages. The AI provider
requires an API key. Shipping that key in `app.js` would expose it to every
visitor.

A Cloudflare Worker sits between the client and the AI provider so that:

- The **API key never reaches the browser**.
- The Worker can enforce **rate limits**, **size caps**, and **abuse controls**.
- The client only knows one URL and one request shape.

```
┌────────────┐     POST /generate     ┌──────────────────┐    HTTPS    ┌──────────────┐
│  Browser   │ ─────────────────────► │ Cloudflare Worker│ ──────────► │ AI Provider  │
│  app.js    │ ◄───────────────────── │  (qa-proxy)      │ ◄────────── │ (OpenAI etc) │
└────────────┘   JSON: test cases     └──────────────────┘             └──────────────┘
```

---

## 2. Endpoint

Base URL: `https://qa-proxy.eng-milo.workers.dev`

Defined client-side as the single constant `WORKER_URL` at the top of `app.js`.
This is the only network endpoint QA Studio talks to.

> **Refactor note (Phase 1):** This constant moves to `src/config.js`. The
> Worker URL itself does **not** change.

---

## 3. Request Contract

> **Status:** Inferred from `app.js` call sites + visible generator UI.
> Exact field names must be confirmed against `app.js` and the Worker source
> before Phase 1 ships. Anything unconfirmed is marked **(TBC)**.

### 3.1 Method & Headers

- **Method:** `POST`
- **Path:** `/` (TBC — may be `/generate`)
- **Headers:**
  - `Content-Type: application/json`
  - No `Authorization` header from the client — the Worker holds the key.

### 3.2 Request Body

```ts
interface GenerateRequest {
  /** The feature description or pasted user stories. Required. */
  prompt: string;

  /** Selected UI language. (TBC) */
  lang?: "en" | "fr" | "fi" | string;

  /** Optional project context. (TBC) */
  projectName?: string;

  /** Optional caller-chosen model id. (TBC) */
  model?: string;

  /** Optional max number of test cases requested. (TBC) */
  maxCases?: number;
}
```

### 3.3 Size limits (client-side)

`src/config.js` defines `MAX_PROMPT_CHARS = 10_000`. The client rejects
prompts above this size before hitting the network.

### 3.4 Timeouts (client-side)

`src/config.js` defines `REQUEST_TIMEOUT_MS = 30_000`. The client uses an
`AbortController` to cancel hung requests.

---

## 4. Response Contract

### 4.1 Success — `200 OK`

```ts
interface GenerateResponse {
  testCases: TestCase[];
  meta?: {
    model?: string;
    durationMs?: number;
    truncated?: boolean;
  };
}
```

`TestCase` is defined in
[`../database/storage-model.md`](../database/storage-model.md#31-testcase).

### 4.2 Error Responses

All errors return JSON of the shape:

```ts
interface ErrorResponse {
  error: {
    code: string;
    message: string;
    requestId?: string;
  };
}
```

| HTTP | `error.code`         | Meaning                                | Client behavior                                              |
|------|----------------------|----------------------------------------|--------------------------------------------------------------|
| 400  | `bad_request`        | Malformed body or missing `prompt`.    | Toast the message. Do not retry.                             |
| 400  | `prompt_too_large`   | Prompt exceeds Worker size cap.        | Toast: "Your input is too long. Shorten it and try again."   |
| 401  | `unauthorized`       | Origin not on the allow-list.          | Should never happen in production.                           |
| 403  | `forbidden`          | Reserved for future per-feature gating.| Toast the message.                                           |
| 408  | `client_timeout`     | Client aborted via `AbortController`.  | Toast: "Request timed out."                                  |
| 413  | `payload_too_large`  | Request body exceeds Worker limits.    | Same as `prompt_too_large`.                                  |
| 429  | `rate_limited`       | Throttle tripped.                      | Toast + disable Generate briefly. Respect `Retry-After`.     |
| 500  | `provider_error`     | Upstream AI provider returned an error.| Toast: "Generation failed." Retry allowed.                   |
| 502  | `bad_gateway`        | Worker could not reach the provider.   | Same as `provider_error`.                                    |
| 503  | `service_unavailable`| Worker intentionally down.             | Toast the message. Do not auto-retry.                        |
| 504  | `provider_timeout`   | Upstream timed out.                    | Toast + offer manual retry.                                  |

**Rules the client follows:**

1. Never display raw provider error text — only `error.message` from the Worker.
2. Treat any non-JSON response body as an unknown error.
3. Treat HTTP 5xx as retryable; HTTP 4xx (except 408/429) as not retryable.

### 4.3 Retry Strategy

Implemented in `src/api/worker.js`. Single retry, no backoff loop:

- **Retry on:** `500`, `502`, `504`, network-level errors.
- **Do not retry on:** `400`, `401`, `403`, `413`, `503`.
- **`429` is special:** honor `Retry-After`. Otherwise surface the toast and
  let the user retry manually.

One retry maximum. The Generate button shows a busy state for the entire
retry window.

---

## 5. CORS

The Worker must respond to `OPTIONS` preflight with:

```
Access-Control-Allow-Origin: https://engmilo.github.io
Access-Control-Allow-Methods: POST, OPTIONS
Access-Control-Allow-Headers: Content-Type
Access-Control-Max-Age: 86400
```

For local development, the Worker also accepts `http://localhost:*`.

Wildcard origins (`*`) are **never** acceptable.

---

## 6. Origin Allow-List

The Worker rejects requests whose `Origin` header is not on the list:

- `https://engmilo.github.io`
- `http://localhost:<any>` (dev only)

Browsers send `Origin` automatically. A `curl` caller can forge it. This is
**defense in depth**, not the primary control.

Rejected requests return `401 unauthorized`.

---

## 7. Rate Limiting (Worker-Side Concerns)

The Worker enforces rate limits to protect the AI provider quota.

### 7.1 Limits (target — confirm in Phase 1)

- **Per-IP:** N requests / minute (exact number TBC).
- **Global:** M requests / minute across all callers.
- **Burst:** Short bursts of up to K requests are tolerated.

### 7.2 Headers the Worker returns

On every response:

```
X-RateLimit-Limit:     <per-window cap>
X-RateLimit-Remaining: <requests left in this window>
X-RateLimit-Reset:     <unix seconds when the window resets>
```

On a `429 rate_limited`:

```
Retry-After: <seconds until next allowed request>
```

### 7.3 Client behavior

`src/api/worker.js`:

1. Reads `X-RateLimit-Remaining` on every response.
2. When `Remaining <= 1`, the Generate button shows a "Slow down…" hint.
3. On `429`, the Generate button disables for `Retry-After` seconds.

The client does **not** maintain its own rate-limit state.

---

## 8. Idempotency

Defenses, in order:

1. **Client-side button lock** — Generate is disabled while a request is in flight.
2. **No automatic retries on 2xx.**
3. **No idempotency key today** — out of scope.

---

## 9. Observability

The Worker logs (at minimum): timestamp, request id, origin, status code,
duration, truncated prompt **hash** (never the prompt content).

The client logs nothing about user prompts to remote services.

---

## 10. Provider Independence

The client is unaware of which AI provider the Worker calls. Switching
providers is a Worker-side deploy with no client release required, as long
as the response shape matches §4.1.

---

## 11. Versioning

The contract above is **v1** — implicit, since there is only one version.

When a breaking change is required:

1. Bump to `/v2/generate` on the Worker.
2. Keep `/` serving v1 for at least one client release cycle.
3. Update `WORKER_URL` (or add a `WORKER_PATH`) in `src/config.js`.

No silent contract breaks.

---

## 12. What This Branch Does and Does Not Change

**Does:**
- Pins the request/response contract as the integration boundary.
- Specifies error codes and client retry behavior precisely.

**Does not:**
- Change the Worker itself.
- Change `WORKER_URL`.
- Add authentication headers.

---

## 13. Open Questions

- [ ] Is the request path `/` or `/generate`?
- [ ] Are `lang`, `projectName`, `model`, `maxCases` actually accepted?
- [ ] What is the Worker's prompt size cap, in characters?
- [ ] What are the actual per-IP and global rate limits?
- [ ] Does the Worker emit `X-RateLimit-*` headers today?
- [ ] Where is the Worker source repository?
- [ ] Is there a kill-switch to disable generation globally?

Resolve before Phase 1 ships.
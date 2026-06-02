\# Security — API Key Handling



> \*\*Branch:\*\* `refactor/foundation`

> \*\*Scope:\*\* How the AI provider's API key is protected, and what the threat

> model looks like for a static, client-side PWA.

> \*\*Rule:\*\* This document describes the security posture. No code changes here.



\---



\## 1. Threat Model — One Paragraph



QA Studio is a static site hosted on GitHub Pages. Anything bundled with the

client is \*\*public\*\* — JavaScript, HTML, config constants, and any string

embedded at build time. There is no server we control inside the app boundary.

Therefore, \*\*no secret can live in the client\*\*. The AI provider's API key is

the only real secret in this system, and it lives behind a Cloudflare Worker

that we operate.



\---



\## 2. What Is and Is Not a Secret



| Item | Sensitivity | Where it lives |

|---|---|---|

| AI provider API key | 🔴 Secret | Cloudflare Worker secret store (never in the repo, never in the browser) |

| `WORKER\_URL` | 🟢 Public | `app.js` today, `src/config.js` after Phase 1 |

| User prompts | 🟡 Private to that user | Sent over HTTPS to the Worker; not logged in plaintext |

| Generated test cases | 🟡 Private to that user | Browser `localStorage` only |

| User identity | — | Not collected. QA Studio has no accounts. |



> Anything stored in `localStorage` is private \*\*to that browser profile\*\*.

> It is not encrypted at rest by QA Studio.



\---



\## 3. Key Lifecycle

Key issued by AI provider │ ▼

Stored as a Cloudflare Worker secret (encrypted at rest by Cloudflare) │ ▼

Worker reads it from env on each request, attaches Authorization header │ ▼

Forwarded to AI provider over HTTPS │ ▼

Response stripped of any provider metadata that could leak the key │ ▼

JSON returned to the browser



\*\*Rules:\*\*

\- The key \*\*never\*\* appears in:

&#x20; - the repository (including `.env` files in git history),

&#x20; - client-side bundles,

&#x20; - error messages returned to the browser,

&#x20; - Worker logs.

\- Rotation is performed in Cloudflare's dashboard, not via code change.



\---



\## 4. Worker as a Trust Boundary



The Worker is the only piece of trusted infrastructure we operate. Its job is:



1\. \*\*Hold the secret.\*\*

2\. \*\*Reject anything that isn't a legitimate QA Studio request\*\* — origin

&#x20;  allow-list (`https://engmilo.github.io`, `http://localhost:\*` for dev).

3\. \*\*Throttle abusive callers\*\* — per-IP rate limits (see

&#x20;  \[`docs/api/worker-proxy.md`](../api/worker-proxy.md#7-rate-limiting-worker-side-concerns)).

4\. \*\*Cap payload sizes\*\* — prevent prompt-stuffing attacks that would burn

&#x20;  tokens / money.

5\. \*\*Sanitize errors\*\* — never reflect a provider error verbatim if it

&#x20;  contains the key, the model id of an internal preview, or stack data.



\---



\## 5. What the Origin Allow-List Does and Does Not Buy Us



\*\*Buys us:\*\*

\- Stops the casual case where someone embeds `WORKER\_URL` in their own site

&#x20; to ride your quota.



\*\*Does not buy us:\*\*

\- Origin headers are sent by browsers, not by attackers writing `curl`. A

&#x20; determined caller can forge `Origin: https://engmilo.github.io`.

\- Therefore, origin checks are \*\*defense in depth\*\*, not the primary control.

&#x20; The primary control is the \*\*rate limit\*\* + \*\*size cap\*\*.



\---



\## 6. Data Sent to the Provider



The Worker forwards the user's prompt to the AI provider. The provider's

privacy policy then applies to that prompt. QA Studio does not promise the

user that the provider will not retain it.



\*\*User-visible implication:\*\* the "Import / Export Data" feature explicitly

warns about overwriting local data. We should add an equivalent, plain-English

notice near the generator input: \*"Your input is sent to an AI provider to

generate test cases."\* This is a UX/copy task, not a security control —

tracked in `docs/ux/ui-inventory.md` (planned).



\---



\## 7. Local Storage Is Not Secure Storage



`localStorage` is:



\- Readable by \*\*any\*\* script running on the same origin.

\- Persisted in plaintext on disk.

\- Not isolated per user account on a shared OS profile.



QA Studio's data model assumes the user trusts their own browser. We do

\*\*not\*\* store anything that would be dangerous if disclosed (no keys, no

PII collected). If that assumption ever changes (e.g. team accounts, shared

workspaces), this doc must be revisited and an encrypted store evaluated.



\---



\## 8. Service Worker Considerations



`sw.js` caches static assets. It must \*\*never\*\* cache:



\- Responses from `WORKER\_URL` (generation responses contain user data).

\- Any URL that could contain query-string tokens or identifiers in the future.



Phase 0 / Phase 6 of the refactor includes a `sw.js` audit. The relevant rule

to enforce there: a cache allow-list (origin + path prefix), not a deny-list.



\---



\## 9. Supply-Chain Posture



QA Studio runs \*\*zero runtime npm dependencies\*\*. Vendored libraries live in

`/libs` and are committed to the repo:



\- `libs/xlsx.full.min.js`

\- `libs/lucide.min.js`

\- `libs/confetti.browser.min.js`

\- `libs/inter-font.css`



\*\*Implications:\*\*

\- No transitive dependency surface. No `npm audit` at runtime.

\- Library updates are deliberate: re-run `download-libs.sh`, commit the diff,

&#x20; inspect the size change.

\- Sub-resource integrity (SRI) is not applicable since the libs are

&#x20; same-origin, but the commit hash itself serves as the integrity record.



\*\*Risk:\*\* stale libraries. Mitigation: review `libs/` at each phase boundary

of the refactor.



\---



\## 10. Incident Response — What to Do If the Key Leaks



1\. \*\*Rotate immediately\*\* in the AI provider's dashboard.

2\. Update the Cloudflare Worker secret with the new key.

3\. Revoke the old key.

4\. Inspect Worker logs for the abuse window: spike in requests, unfamiliar

&#x20;  origins, unusual prompt sizes.

5\. Tighten the rate limit if needed.

6\. Add a `known-issues.md` entry summarizing the incident and the control

&#x20;  change made.



Estimated time to fully revoked: \*\*< 5 minutes\*\* if the runbook above is

followed.



\---



\## 11. What This Branch Does and Does Not Change



\*\*Does:\*\*

\- Documents the trust boundary so Phase 1 of the refactor preserves it.

\- Makes the Worker the single network egress point in code (`src/api/worker.js`),

&#x20; so no future view accidentally calls a third-party URL directly.



\*\*Does not:\*\*

\- Add authentication.

\- Add encryption at rest for `localStorage`.

\- Change the Worker, its key, or its policies.



\---



\## 12. Open Questions



\- \[ ] Is the Worker source in this repo or a separate one? Link it here once

&#x20;     confirmed.

\- \[ ] What is the current per-IP rate limit on the Worker? Document it so

&#x20;     client retry logic stays under it.

\- \[ ] Does the Worker log prompts in any form (even hashed)? If yes, surface

&#x20;     that in the user-facing copy mentioned in §6.

\- \[ ] Is there a kill-switch (feature flag) to disable generation globally if

&#x20;     abuse spikes? If not, consider one.



Resolve before Phase 1.



\---



\## 13. Non-Goals



\- ❌ User accounts, login, or per-user quotas tied to identity.

\- ❌ Encrypted client-side storage.

\- ❌ Multi-tenant isolation (QA Studio is single-tenant per browser).

\- ❌ Audit logging of user actions.



All valid future projects, all out of scope for the foundation refactor.


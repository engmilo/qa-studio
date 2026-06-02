\# API — Cloudflare Worker Proxy



> \*\*Branch:\*\* `refactor/foundation`

> \*\*Scope:\*\* Defines the contract between the QA Studio client and the

> Cloudflare Worker that proxies AI generation requests.

> \*\*Rule:\*\* This document describes the boundary. No code changes here.



\---



\## 1. Why a Proxy Exists



QA Studio is a static, client-side PWA hosted on GitHub Pages. The AI provider

(OpenAI / Anthropic / etc.) requires an API key. Shipping that key in

`app.js` would expose it to every visitor.



A Cloudflare Worker sits between the client and the AI provider so that:



\- The \*\*API key never reaches the browser\*\*.

\- The Worker can enforce \*\*rate limits\*\*, \*\*size caps\*\*, and \*\*abuse controls\*\*.

\- The client only knows one URL and one request shape — provider switches are

&#x20; invisible to it.



**──────────┐     POST /generate     ┌──────────────────┐    HTTPS    ┌──────────────┐**

**│  Browser   │ ─────────────────────► │ Cloudflare Worker│ ──────────► │ AI Provider  │**

**│  app.js    │ ◄───────────────────── │  (qa-proxy)      │ ◄────────── │ (OpenAI etc) │**

**└────────────┘   JSON: test cases     └──────────────────┘             └──────────────┘**



**---**



**## 2. Endpoint**

**Base URL: https://qa-proxy.eng-milo.workers.dev**



**Defined client-side as the single constant `WORKER\_URL` at the top of `app.js`.**

**This is the only network endpoint QA Studio talks to.**



**> \*\*Refactor note (Phase 1):\*\* This constant moves to `src/config.js`. The**

**> Worker URL itself does \*\*not\*\* change.**



**---**



**## 3. Request Contract**



**> \*\*Status of this section:\*\* Inferred from `app.js` call sites + visible**

**> generator UI. Exact field names must be confirmed against `app.js` and the**

**> Worker source before Phase 1 ships. Anything unconfirmed is marked \*\*(TBC)\*\*.**



**### 3.1 Method \& Headers**



**- \*\*Method:\*\* `POST`**

**- \*\*Path:\*\* `/` (TBC — may be `/generate`)**

**- \*\*Headers:\*\***

&#x20; **- `Content-Type: application/json`**

&#x20; **- No `Authorization` header from the client — the Worker holds the key.**



**### 3.2 Request Body**



**```ts**

**interface GenerateRequest {**

&#x20; **/\*\* The feature description or pasted user stories. \*/**

&#x20; **prompt: string;**



&#x20; **/\*\* Selected UI language; lets the Worker localize generated copy. (TBC) \*/**

&#x20; **lang?: "en" | "fr" | "fi" | string;**



&#x20; **/\*\* Optional project context, used to bias the generator. (TBC) \*/**

&#x20; **projectName?: string;**



&#x20; **/\*\* Optional caller-chosen model id, if the Worker allows it. (TBC) \*/**

&#x20; **model?: string;**



&#x20; **/\*\* Optional max number of test cases requested. (TBC) \*/**

&#x20; **maxCases?: number;**

**}**


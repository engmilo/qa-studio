# Architecture — Target State

> **Branch:** `refactor/foundation`
> **Scope:** Describes the architecture QA Studio will have *after* the
> foundation refactor is complete. Pairs with
> [`current-state.md`](current-state.md) and
> [`../roadmap/refactor-plan.md`](../roadmap/refactor-plan.md).
> **Rule:** This document describes the destination. No code changes here.

---

## 1. Headline Change

`app.js` (2,198 lines) is split into focused ES modules under `/src`. The
HTML, the storage keys, the Worker contract, and the user-visible behavior
are **unchanged**.

```
Before:                       After:
┌─────────────┐               ┌────────────────────────────┐
│   app.js    │               │   src/                     │
│ (everything)│        ───►   │   ├── app.js  (wiring)     │
│  2,198 LOC  │               │   ├── config.js            │
└─────────────┘               │   ├── i18n/                │
                              │   ├── state/               │
                              │   ├── api/                 │
                              │   ├── views/               │
                              │   ├── export/              │
                              │   └── ui/                  │
                              └────────────────────────────┘
```

---

## 2. Target Tree

```
/src
├── app.js                         # ~150 LOC. Wires modules to DOM.
├── config.js                      # WORKER_URL, feature flags, constants.
│
├── i18n/
│   ├── index.js                   # t(key, vars?), setLang(lang), getLang()
│   └── locales/
│       ├── en.js                  # JS, not JSON — supports function values
│       ├── fi.js
│       └── ...
│
├── state/
│   ├── store.js                   # In-memory state + subscribe()
│   └── storage.js                 # localStorage + schema versioning
│
├── api/
│   └── worker.js                  # The ONLY module that calls fetch().
│
├── views/
│   ├── generator.js
│   ├── dashboard.js
│   ├── projects.js
│   ├── suites.js
│   └── history.js
│
├── export/
│   ├── json.js
│   ├── csv.js
│   ├── excel.js                   # wraps libs/xlsx.full.min.js
│   └── word.js
│
└── ui/
    ├── dom.js                     # qs, qsa, el, on
    ├── icons.js                   # wraps libs/lucide
    ├── confetti.js                # wraps libs/confetti
    └── toast.js                   # user-facing notifications
```

**Size targets:**
- `src/app.js` ≤ 150 LOC
- Any single module ≤ 400 LOC
- Any locale file ≤ 500 LOC

---

## 3. Module Contracts

Every module exports a **narrow, named API**. No default exports. No
implicit globals.

### 3.1 `config.js`

```js
export const WORKER_URL = "https://qa-proxy.eng-milo.workers.dev";
export const SCHEMA_VERSION = 1;
export const MAX_PROMPT_CHARS = 10_000;
export const REQUEST_TIMEOUT_MS = 30_000;
export const SUPPORTED_LANGS = ["en", "fi", "ar"];
export const DEFAULT_LANG = "en";
```

No logic. No side effects.

### 3.2 `i18n/index.js`

```js
// Returns a string. Falls back to the key on miss.
export function t(key, vars);

// Same as t(), but may contain trusted, app-controlled HTML.
// Used only for keys explicitly allow-listed in each locale file.
export function tHtml(key, vars);

export function getLang();
export function setLang(lang);
export function onLangChange(fn);
```

Each locale exports a default object:

```js
// locales/en.js
export default {
  appName: "QA Studio",
  generating: "Generating…",
  testCasesLabel: (n) => (n === 1 ? "test case" : "test cases"),
  confirmBulkDelete: (n) =>
    `Delete <strong>${n}</strong> selected test cases? This cannot be undone.`,
};
// HTML keys: confirmBulkDelete
```

### 3.3 `state/storage.js`

Full contract: [`../database/storage-model.md`](../database/storage-model.md#5-read--write-contract-target--phase-3).

```js
export function getLang();
export function setLang(lang);
export function getUsageTotal();
export function setUsageTotal(n);
export function getProjects();
export function setProjects(projects);
export function getHistory();
export function setHistory(history);
export function exportAll();
export function importAll(bundle);
export function clearAll();
```

The **only** module that touches `localStorage`.

### 3.4 `state/store.js`

```js
export function getState();              // returns AppState
export function setState(partial);       // merges + notifies
export function subscribe(fn);           // returns unsubscribe()
```

### 3.5 `api/worker.js`

```js
// Throws WorkerError on non-2xx or network failures.
export async function generateTestCases(payload);
```

The **only** module that calls `fetch()`. Implements the retry policy
described in [`../api/worker-proxy.md`](../api/worker-proxy.md#43-retry-strategy).

### 3.6 Views — `views/*.js`

Every view exports the same shape:

```js
export function mount(container, ctx);   // returns { unmount }
```

`ctx` provides `store`, `i18n`, `api`, `navigate`, `toast`. Views never
import those directly.

### 3.7 Exports — `export/*.js`

```js
export function exportJson(testCases, options);  // returns Blob
export function exportCsv(testCases, options);
export function exportExcel(testCases, options);
export function exportWord(testCases, options);
```

Exports never touch the DOM. The view layer triggers the download.

### 3.8 UI helpers — `ui/*.js`

```js
// ui/dom.js
export const qs, qsa, el, on;

// ui/icons.js — wraps lucide
export function renderIcons(root);

// ui/confetti.js — wraps confetti
export function celebrate();

// ui/toast.js
export function toast(message, kind);  // kind: "info" | "warn" | "error"
```

The **only** modules that touch vendored libraries. No view imports `/libs`
directly.

### 3.9 Entry — `src/app.js`

Wiring only. ≤ 150 LOC.

`app.html` changes only this line:

```html
<script type="module" src="./src/app.js"></script>
```

---

## 4. Data Flow — A Single Generation, After Refactor

```
User clicks Generate (Generator view)
   │
   ▼
generator.js calls ctx.api.generateTestCases({ prompt, lang })
   │
   ▼
api/worker.js validates, POSTs, parses, retries on 5xx
   │
   ▼ (success)
generator.js:
   - store.setState({ currentBatch: testCases })
   - storage.setHistory([...history, newEntry])
   - storage.setUsageTotal(n + testCases.length)
   │
   ▼
store notifies → subscribed views re-render
   │
   ▼
ui/confetti.js → celebrate()
```

The Generator view is the only view that initiates a network call.

---

## 5. Routing

A hash-based router lives in `src/app.js`. No new dependency.

| Hash               | View       |
|--------------------|------------|
| `#/generator`      | Generator  |
| `#/dashboard`      | Dashboard  |
| `#/projects`       | Projects (list) |
| `#/projects/:id`   | Projects (detail) |
| `#/suites`         | Suites     |
| `#/history`        | History    |
| `#/history/:id`    | History detail |
| *(empty / unknown)*| Generator (default) |

Views never call `window.location.hash` directly. They call `ctx.navigate`.

---

## 6. State Management

A ~50-line observable. Contract:

- `store.getState()` returns a snapshot. **Treat it as immutable.**
- `store.setState(partial)` merges + notifies.
- Views subscribe on `mount`, unsubscribe on `unmount`.
- Persistence is separate — call sites that mutate persisted data call both
  `store.setState(...)` and `storage.setX(...)`. No hidden writes.

---

## 7. Error Handling

One rule: errors surface as toasts via `ui/toast.js`.

| Source                  | User sees                          |
|-------------------------|------------------------------------|
| `api/worker.js` throws  | toast with `WorkerError.message`   |
| `storage.js` quota fail | toast: "Local storage is full…"    |
| Unexpected exception    | toast: "Something went wrong"      |

No `alert()`. No silent failures.

---

## 8. Testing Strategy

**Playwright stays green at every phase boundary.**

### What stays
- `e2e/landing.spec.js`, `e2e/generator.spec.js`, `e2e/projects.spec.js` — unchanged.

### What's added
- **Phase 3:** Storage migration tests with fixtures under `e2e/fixtures/storage/`.
- **Phase 5:** A spec per export format.

### What's not added
- No new test framework. No coverage gates. No visual regression tooling.

---

## 9. Performance Posture

- Time-to-interactive must stay under 2s on a mid-range laptop.
- ES modules add a few extra HTTP requests. Acceptable. If Lighthouse
  regresses meaningfully (> 200ms), revisit then.

---

## 10. Browser Support

- Last two major versions of Chrome, Firefox, Safari, Edge.
- Native ES modules required (Phase 1 onward).
- No polyfills.

---

## 11. Build & Deploy

Unchanged. Static files. GitHub Actions publishes on `main`.

---

## 12. Non-Goals

- ❌ Any frontend framework.
- ❌ A bundler.
- ❌ A backend or database we operate.
- ❌ TypeScript as a *required* compile step (JSDoc `@ts-check` only).
- ❌ User accounts, auth, sync.
- ❌ A UI redesign.

---

## 13. Definition of Done

The target architecture is shipped when:

1. `app.js` no longer exists at the repo root.
2. Every module above exists at its specified path.
3. All Playwright specs pass unchanged.
4. `localStorage` reads/writes go through `src/state/storage.js` only.
5. `fetch()` calls happen in `src/api/worker.js` only.
6. The size targets in §2 are met.
7. `README.md` documents the new layout.

---

## 14. Open Questions

- [ ] How many locales actually ship today?
- [ ] Are there inline event handlers in `app.html`?
- [ ] How does `sw.js` invalidate its cache?
- [ ] Should we ship source maps once `src/` exists?
# Known Issues & Technical Debt

> **Status:** Living log. Captured on branch `refactor/foundation`.
> **Purpose:** Track real, observed issues in the current codebase so they are
> not forgotten during the foundation refactor.
> **Rule:** This document only *records* issues. It does not fix them.

Each entry has: **ID · Severity · Area · Description · Evidence · Suggested fix · Phase**

Severity scale:
- 🔴 **High** — user-visible or blocks refactor
- 🟡 **Medium** — quality / maintainability
- 🟢 **Low** — cosmetic or housekeeping

---

## ISSUE-001 · 🔴 High · Source encoding (mojibake)

**Area:** `app.js` (i18n dictionary)

**Description:**
Several UI strings contain mojibake — UTF-8 bytes interpreted as Windows-1252
and re-saved. Affected characters include the ellipsis (`…`) and em-dash (`—`).

**Evidence:**
```js
generating: "Generatingâ€¦",
footerText: "QA Studio by Milo Haireche â€" 20+ years of QA expertise",
projectNamePlaceholder: "Project nameâ€¦",
```

**Suggested fix:**
1. Re-save `app.js` as UTF-8 (no BOM).
2. Replace each mojibake sequence with the intended UTF-8 character.
3. Add an `.editorconfig` enforcing `charset = utf-8` and `end_of_line = lf`.
4. Add a CI grep step that fails the build if the byte sequences reappear.

**Phase:** Phase 0.

---

## ISSUE-002 · 🟡 Medium · Duplicate `deploy.yml` in repo root

**Area:** Repository housekeeping

**Description:**
A `deploy.yml` file exists at the repository root in addition to the canonical
one under `.github/workflows/deploy.yml`. The root file is not executed by
GitHub Actions.

**Suggested fix:**
Delete `/deploy.yml` at the repository root.

**Phase:** Phase 0.

---

## ISSUE-003 · 🔴 High · `app.js` monolith (2,198 lines)

**Area:** `app.js`

**Description:**
A single file holds configuration, i18n, state, persistence, view rendering,
network calls, and four export formats.

**Suggested fix:**
The entire reason `refactor/foundation` exists. See
[`refactor-plan.md`](refactor-plan.md) Phases 1–5.

**Phase:** Phases 1–5.

---

## ISSUE-004 · 🟡 Medium · Inline i18n dictionary

**Area:** `app.js` (translation strings)

**Description:**
All UI copy for every language lives in a single inline dictionary inside
`app.js`.

**Suggested fix:**
Move each language to `src/i18n/locales/<lang>.js` (JS, not JSON — must
support function values for pluralization).

**Phase:** Phase 2.

---

## ISSUE-005 · 🟡 Medium · No type safety

**Area:** Project-wide

**Description:**
The codebase is pure JavaScript with no JSDoc typedefs and no `@ts-check`
pragmas.

**Suggested fix:**
Opt-in, no-build TypeScript: add `// @ts-check` to each new module and
define JSDoc typedefs for persisted shapes. No compile step.

**Phase:** Phase 6.

---

## ISSUE-006 · 🔴 High · `localStorage` schema is not versioned

**Area:** Client-side persistence

**Description:**
`qa_history` and `qa_projects` are stored as raw JSON arrays. The first
production schema change will silently corrupt data on existing users'
machines.

**Suggested fix:**
Wrap each store in `{ schemaVersion: 1, data: [...] }`. On read, detect
legacy flat arrays and migrate them transparently. Centralize all reads/
writes in `src/state/storage.js`.

**Phase:** Phase 3.

---

## ISSUE-007 · 🟡 Medium · `localStorage` quota is not handled

**Area:** Client-side persistence

**Description:**
Per-origin `localStorage` quota is 5–10 MB. The app writes unconditionally;
`QuotaExceededError` is not caught.

**Suggested fix:**
In `src/state/storage.js`, wrap writes in a guarded helper that catches
`QuotaExceededError` and surfaces a user-visible toast.

**Phase:** Phase 3.

---

## ISSUE-008 · 🟡 Medium · Possible inline event handlers in `app.html`

**Area:** `app.html` + `app.js` boundary

**Description:**
After Phase 1 introduces `<script type="module">`, any inline `onclick="…"`
in `app.html` that references identifiers defined in `app.js` will break —
module-scoped identifiers are not on `window`.

**Suggested fix:**
1. Grep `app.html` for `on[a-z]+=` attribute handlers.
2. For each, replace with an `id` + `addEventListener` wired from `src/app.js`.

**Phase:** Phase 1 (audit in Phase 0).

---

## ISSUE-009 · 🟡 Medium · Service worker cache invalidation tied to filenames

**Area:** `sw.js`

**Description:**
If `sw.js` caches by exact filename, splitting `app.js` will leave returning
users on a stale cache until the SW updates.

**Suggested fix:**
1. Confirm `sw.js`'s cache key strategy.
2. Bump the cache version constant on every phase that changes the file tree.

**Phase:** Audit in Phase 0; act in Phase 4.

---

## ISSUE-010 · 🟡 Medium · Service worker must not cache Worker responses

**Area:** `sw.js` + `src/api/worker.js`

**Description:**
The service worker caches static assets. It must never cache responses from
`WORKER_URL`, since those responses contain user prompts and generated test
cases. Today's `sw.js` behavior is unverified.

**Suggested fix:**
1. Read `sw.js` and confirm its fetch handler.
2. Enforce a cache **allow-list** (origin + path prefix), not a deny-list.

**Phase:** Phase 0 (audit) and Phase 6 (lock down).

---

## ISSUE-011 · 🟢 Low · "Clear History" may lack a confirmation modal

**Area:** History view

**Description:**
The History view exposes a `clearHistory` action. It is not confirmed whether
this prompts the user before wiping `qa_history`.

**Suggested fix:**
1. Confirm current behavior.
2. If no modal exists today, add one in Phase 4 using the same pattern as
   `confirmClearAll`.

**Phase:** Confirm in Phase 0; act in Phase 4 if needed.

---

## ISSUE-012 · 🟢 Low · Tag persistence on `TestCase` is undocumented

**Area:** Data model

**Description:**
It is unclear whether tags shown on a test case row are persisted as part of
the `TestCase` object or computed at render time.

**Suggested fix:**
Read the rendering and storage paths in `app.js`. Document the truth in
`storage-model.md`.

**Phase:** Phase 0 (document) and Phase 3 (formalize).

---

## ISSUE-013 · 🟢 Low · Confetti trigger is undocumented

**Area:** UI / `libs/confetti.browser.min.js`

**Description:**
`libs/confetti.browser.min.js` is vendored, so it's loaded for a reason — but
the trigger condition is not captured anywhere.

**Suggested fix:**
Identify the call site in `app.js`, document it in `ui-inventory.md`, and
route it through `src/ui/confetti.js` during Phase 4.

**Phase:** Phase 0 (document) and Phase 4 (centralize).

---

## ISSUE-014 · 🟢 Low · Bulk-delete copy uses inline HTML

**Area:** i18n

**Description:**
`confirmBulkDelete(n)` returns a string containing `<strong>...</strong>`.
After Phase 2 isolates i18n, the rule must be explicit, or a future
maintainer will switch to `textContent` and silently regress.

**Suggested fix:**
1. In `src/i18n/index.js`, distinguish text-returning entries from
   HTML-returning entries (e.g. `tHtml(key, vars)`).
2. Document the allow-listed HTML-returning keys at the top of each locale.
3. Never accept user input into these strings.

**Phase:** Phase 2.

---

## ISSUE-015 · 🟢 Low · `preview-*.html` files are not part of the runtime

**Area:** Repository housekeeping

**Description:**
Several `preview-*.html` standalone mockups live in the repo root. They are
not part of the deployed app.

**Suggested fix:**
Move to `/previews/` or `/docs/previews/`. Confirm `deploy.yml` does not
publish them.

**Phase:** Phase 6.

---

## ISSUE-016 · 🟡 Medium · No client-side timeout on Worker requests

**Area:** `app.js` (fetch calls to `WORKER_URL`)

**Description:**
The browser's default `fetch()` has no timeout. A hung Worker request will
leave the Generate button in its "Generating…" state indefinitely.

**Suggested fix:**
In `src/api/worker.js`, wrap `fetch()` with an `AbortController` driven by
`REQUEST_TIMEOUT_MS` from `src/config.js`. On timeout, surface a toast and
re-enable the Generate button.

**Phase:** Phase 1.

---

## How This Log Is Used

- **Refactor plan:** Each issue lists the phase that resolves it. The phase
  PR must reference the issue ID it closes.
- **Reviewers:** Open PRs are expected to either resolve a listed issue, or
  not introduce a new one. New issues found in review get appended here.
- **Living log:** This file is updated *during* the refactor, not just before.
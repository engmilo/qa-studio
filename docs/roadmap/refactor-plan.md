# Refactor Plan — Foundation

> **Branch:** `refactor/foundation`
> **Goal:** Break `app.js` (2,198 lines) into focused modules **without changing
> user-visible behavior**.
> **Status:** Design proposal. No code changes in this branch.

---

## Guiding Principles

1. **Behavior-preserving.** Every phase must leave the app functionally
   identical. Playwright E2E tests are the contract.
2. **No new runtime dependencies.** QA Studio stays framework-free and
   zero-dependency at runtime.
3. **No build step (yet).** Use native ES modules (`<script type="module">`).
   A bundler is a *separate* future decision.
4. **One concern per module.** Modules expose narrow APIs; no shared globals.
5. **Tests gate each phase.** If `npm run test` (Playwright) goes red, the
   phase rolls back.
6. **Small, reversible PRs.** Each phase is a single PR, mergeable on its own.

---

## Target Module Layout

```
/src
├── config.js              # WORKER_URL and other constants
├── i18n/
│   ├── index.js           # loader, current-language resolver
│   └── locales/
│       ├── en.js
│       ├── fi.js
│       └── ...
├── state/
│   ├── store.js           # in-memory state + subscribe()
│   └── storage.js         # localStorage read/write + schema versioning
├── api/
│   └── worker.js          # fetch() calls to the Cloudflare Worker
├── views/
│   ├── generator.js
│   ├── dashboard.js
│   ├── projects.js
│   ├── suites.js
│   └── history.js
├── export/
│   ├── json.js
│   ├── csv.js
│   ├── excel.js           # wraps libs/xlsx.full.min.js
│   └── word.js
├── ui/
│   ├── icons.js           # wraps libs/lucide
│   └── confetti.js        # wraps libs/confetti.browser.min.js
└── app.js                 # thin entry point: wire modules to DOM
```

`app.html` keeps its current markup. Only the `<script>` tag changes to
`<script type="module" src="./src/app.js"></script>`.

> **Note on locales:** locales are `.js`, not `.json`, because the codebase
> uses function-valued entries (`testCasesLabel(n)`, `confirmBulkDelete(n)`)
> that JSON cannot represent.

---

## Phases

Each phase: one PR, one merge, green Playwright run required.

### Phase 0 — Safety Net (prep, no refactor yet)

**Outcome:** We can refactor with confidence.

- [ ] Pin and document local dev workflow (`npx playwright test`).
- [ ] Add a CI badge / confirm `.github/workflows/test.yml` runs on PRs.
- [ ] Snapshot the current app: record one Playwright trace per view as a
      regression reference.
- [ ] Fix **ISSUE-001** (mojibake) as a standalone commit so encoding noise
      doesn't contaminate diffs in later phases.
- [ ] Delete root-level `deploy.yml` (**ISSUE-002**).
- [ ] Audit `sw.js` cache strategy (**ISSUE-009**, **ISSUE-010**).
- [ ] Grep `app.html` for inline event handlers (**ISSUE-008**).

**Risk:** None — no logic changes.

---

### Phase 1 — Extract `config` and `api`

**Outcome:** Network boundary is isolated and mockable.

- [ ] Create `src/config.js` exporting `WORKER_URL` and related constants.
- [ ] Create `src/api/worker.js` exposing `generateTestCases(payload)`.
- [ ] Add `AbortController`-based timeout (**ISSUE-016**).
- [ ] Update `app.html` to load `src/app.js` as a module.
- [ ] `app.js` imports from the new modules; no behavior change.
- [ ] Resolve any inline event handlers found in Phase 0.
- [ ] Add JSDoc `@typedef` for the request/response shapes.

**Tests:** All Playwright specs must pass, especially `generator.spec.js`.

**Risk:** Low. Pure relocation.

---

### Phase 2 — Extract `i18n`

**Outcome:** Translation copy lives outside `app.js`.

- [ ] Move each language object to `src/i18n/locales/<lang>.js`.
- [ ] `src/i18n/index.js` exposes `t(key, vars?)`, `tHtml(key, vars?)`,
      `setLang(lang)`, and `getLang()`.
- [ ] Document HTML-returning keys in a comment block at the top of each
      locale file (**ISSUE-014**).
- [ ] Language is still persisted in `localStorage` under `qa_lang`.

**Tests:** `landing.spec.js` + any language-switch flow.

**Risk:** Medium. Function-valued i18n entries need a small JS-per-locale split.

---

### Phase 3 — Extract `state` + `storage`

**Outcome:** Persistence is centralized and versioned.

- [ ] `src/state/storage.js` reads/writes `qa_*` keys.
- [ ] Introduce schema wrapper: `{ schemaVersion: 1, data: ... }` for
      `qa_history` and `qa_projects` (addresses **ISSUE-006**).
- [ ] Add `migrate(stored)` for older flat arrays so existing users are
      transparently upgraded on first load.
- [ ] Add quota-error handling and user toast (**ISSUE-007**).
- [ ] `src/state/store.js` holds in-memory state + a tiny `subscribe()` for
      view re-renders.
- [ ] Define `Project`, `TestCase`, `HistoryEntry` as `@typedef`s.
- [ ] Add migration fixtures under `e2e/fixtures/storage/`.

**Tests:** `projects.spec.js`, plus a manual reload check that pre-existing
data still loads.

**Risk:** Medium-high — touches user data. Migration must be additive.

---

### Phase 4 — Extract `views/*`

**Outcome:** Each screen is its own module.

- [ ] One file per view: `generator.js`, `dashboard.js`, `projects.js`,
      `suites.js`, `history.js`.
- [ ] Each view exposes `mount(container, ctx)` and returns `{ unmount }`.
- [ ] Router stays in `app.js` — no new router dependency.
- [ ] Shared DOM helpers move to `src/ui/dom.js`.
- [ ] Centralize confetti through `src/ui/confetti.js` (**ISSUE-013**).
- [ ] Bump `sw.js` cache version (**ISSUE-009**).
- [ ] Add Clear History confirmation if missing (**ISSUE-011**).

**Tests:** All Playwright specs.

**Risk:** Medium. Largest mechanical move but compartmentalized.

---

### Phase 5 — Extract `export/*`

**Outcome:** Each export format is independently testable.

- [ ] `export/json.js`, `export/csv.js`, `export/excel.js`, `export/word.js`.
- [ ] Excel wrapper is the only module that touches `libs/xlsx.full.min.js`.
- [ ] Each export module exposes a function returning a `Blob`.

**Tests:** Add at least one spec per format (Playwright download assertion).

**Risk:** Low. Pure functions.

---

### Phase 6 — Polish

**Outcome:** The foundation is done.

- [ ] Add `// @ts-check` to each module; resolve any new findings.
- [ ] Add an `.editorconfig` enforcing UTF-8 + LF.
- [ ] Add a CI grep step that fails on the byte sequence used by mojibake
      (prevents regression of **ISSUE-001**).
- [ ] Move `preview-*.html` files out of repo root (**ISSUE-015**).
- [ ] Update `README.md` with the new module layout.
- [ ] Close out remaining low-severity items from `known-issues.md`.

**Risk:** Minimal.

---

## What This Plan Explicitly Does NOT Do

- ❌ Introduce React / Vue / Svelte / any framework.
- ❌ Add a bundler (Vite, esbuild, webpack).
- ❌ Add a backend or database.
- ❌ Add TypeScript as a *required* compile step (only opt-in via `@ts-check`).
- ❌ Redesign the UI.
- ❌ Change the Cloudflare Worker contract.

Any of those are valid future decisions — but **separate** from the
foundation refactor.

---

## Definition of Done (for the foundation)

The foundation refactor is complete when **all** of these are true:

1. `app.js` is under ~150 lines and only wires modules.
2. No single module exceeds ~400 lines.
3. All existing Playwright specs pass unchanged.
4. `localStorage` schema is versioned and migration-tested.
5. No new runtime dependencies have been added.
6. `README.md` documents the new layout.
7. `docs/architecture/target-architecture.md` matches the shipped code.

---

## Rollback Strategy

Every phase ships as its own PR from a child branch off `refactor/foundation`.
If a phase regresses behavior:

1. Revert the PR.
2. Update this document's phase checklist with the lesson learned.
3. Re-attempt with a smaller scope.

The Playwright suite is the contract. If it goes red and we can't go green
within the PR, we revert — we do not paper over.

---

## Open Questions (to resolve before Phase 1)

- [ ] How many locales are actually shipped today? (`libs/flags/` has `dz, fi,
      gb` — confirm whether each has full translation coverage.)
- [ ] Are there any inline event handlers in `app.html` that bind to globals
      from `app.js`? Module-scoping will break those.
- [ ] Does `sw.js` cache `app.js` by exact filename? If so, the cache version
      bump strategy must be confirmed before splitting.

These get answered during Phase 0.
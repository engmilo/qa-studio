# Architecture — Overview

> **Branch:** `refactor/foundation`
> **Purpose:** Single-page orientation for anyone landing in this repo for
> the first time. Links out to the detail docs.
> **Audience:** New contributors, reviewers, future maintainers, future-you.

---

## 1. One-Sentence Description

**QA Studio is a zero-dependency, framework-free Progressive Web App that
turns feature descriptions into structured test cases, with project tracking,
dashboards, and multi-format export — all running in the browser.**

---

## 2. At a Glance

| Aspect | Value |
|---|---|
| **Type** | Client-side PWA (installable, offline-capable) |
| **Frontend** | Vanilla JavaScript (no framework) |
| **Build step** | None |
| **Runtime dependencies** | Zero |
| **Backend** | None we own, except a thin Cloudflare Worker proxy |
| **Persistence** | Browser `localStorage` |
| **Hosting** | GitHub Pages, base path `/qa-studio/` |
| **Live URL** | https://engmilo.github.io/qa-studio/ |
| **Testing** | Playwright (E2E) |
| **CI/CD** | GitHub Actions |
| **Author** | Milo Haireche |

---

## 3. System Diagram

```
┌──────────────────────────────────────────────────────────────┐
│ User's Browser                                                │
│                                                               │
│   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐       │
│   │ index.html  │    │  app.html   │    │   sw.js     │       │
│   │  (landing)  │───►│  (app shell)│    │ (offline)   │       │
│   └─────────────┘    └──────┬──────┘    └─────────────┘       │
│                             │                                 │
│                             ▼                                 │
│                      ┌─────────────┐                          │
│                      │   app.js    │   ← refactor target      │
│                      │ (monolith)  │     (2,198 lines today)  │
│                      └──────┬──────┘                          │
│                             │                                 │
│              ┌──────────────┼──────────────┐                  │
│              ▼              ▼              ▼                  │
│        ┌──────────┐  ┌──────────────┐ ┌──────────┐            │
│        │  libs/   │  │ localStorage │ │  fetch() │            │
│        │ (xlsx,   │  │  qa_lang     │ │          │            │
│        │  lucide, │  │  qa_history  │ │          │            │
│        │  etc.)   │  │  qa_projects │ │          │            │
│        └──────────┘  └──────────────┘ └─────┬────┘            │
└──────────────────────────────────────────────┼────────────────┘
                                               │ HTTPS
                                               ▼
                              ┌─────────────────────────────┐
                              │   Cloudflare Worker         │
                              │   qa-proxy.eng-milo...      │
                              │   (holds API key)           │
                              └──────────────┬──────────────┘
                                             │ HTTPS
                                             ▼
                              ┌─────────────────────────────┐
                              │   AI Provider               │
                              └─────────────────────────────┘
```

---

## 4. The Five Things to Know

1. **It's static.** No server runs our code. GitHub Pages just serves files.
2. **It's framework-free.** No React/Vue/Svelte. Just HTML + JS + CSS.
3. **It's offline-first.** A service worker caches the shell so the app keeps
   working without network (generation excepted — that needs the Worker).
4. **The only secret is in the Cloudflare Worker.** The AI key never reaches
   the browser. See [`security/api-key-handling.md`](../security/api-key-handling.md).
5. **All user data lives in their browser.** No accounts, no sync, no
   server-side storage. See [`database/storage-model.md`](../database/storage-model.md).

---

## 5. Major Components

### 5.1 Landing (`index.html`)
Marketing/intro page. Routes the user into `app.html`.

### 5.2 Application Shell (`app.html` + `app.js`)
The actual app. Five views:

- **Generator** — describe a feature → get test cases
- **Dashboard** — stats, status distribution, 7-day trend
- **Projects** — saved projects with their test cases
- **Suites** — test suites grouped by project
- **History** — past generation runs

### 5.3 Service Worker (`sw.js`)
Caches the static shell. Must **not** cache Worker responses.

### 5.4 Vendored Libraries (`libs/`)
Pinned, in-repo copies of:
- `xlsx.full.min.js` — Excel export
- `lucide.min.js` — Icons
- `confetti.browser.min.js` — Success animation
- `inter-font.css` — Typography
- `flags/{dz,fi,gb}.png` — Language selectors

### 5.5 Cloudflare Worker Proxy
Out-of-repo. Holds the AI provider key; enforces rate limits and origin
allow-listing.

### 5.6 Tests (`e2e/`)
Playwright specs: `generator`, `landing`, `projects`. Mocks under
`e2e/mocks/api-response.json`. These are the **contract** for any refactor.

### 5.7 CI (`.github/workflows/`)
- `test.yml` — runs Playwright on PRs
- `deploy.yml` — deploys to GitHub Pages on `main`

---

## 6. Data Flow — A Single Generation

```
[user types prompt]
       │
       ▼
[click "Generate"]
       │
       ▼
[app.js builds GenerateRequest]
       │
       ▼
[POST to WORKER_URL via fetch()]
       │
       ▼
[Worker adds Authorization, calls AI provider]
       │
       ▼
[Worker returns { testCases: [...] }]
       │
       ▼
[app.js renders the list + (optionally) saves to a project]
       │
       ▼
[localStorage updated: qa_history, qa_projects, qa_usage_total]
```

Detailed contract: [`api/worker-proxy.md`](../api/worker-proxy.md).

---

## 7. Where Things Are Today vs Tomorrow

| Concern | Today | After Foundation Refactor |
|---|---|---|
| Configuration | top of `app.js` | `src/config.js` |
| i18n | inline dictionary in `app.js` | `src/i18n/locales/*.js` |
| State / storage | direct `localStorage` calls scattered in `app.js` | `src/state/store.js` + `src/state/storage.js` |
| Network | inline `fetch()` in `app.js` | `src/api/worker.js` |
| Views | all in `app.js` | one file per view under `src/views/` |
| Export formats | inline in `app.js` | one file per format under `src/export/` |
| Entry point | `app.js` (2,198 lines) | `src/app.js` (~150 lines, wiring only) |

Plan: [`roadmap/refactor-plan.md`](../roadmap/refactor-plan.md).

---

## 8. Documentation Map

This `/docs` tree is the source of truth for design decisions. Read in this
order for a full picture:

1. **`architecture/overview.md`** ← you are here
2. [`architecture/current-state.md`](current-state.md) — as-built audit
3. [`architecture/target-architecture.md`](target-architecture.md) — end-state design
4. [`database/storage-model.md`](../database/storage-model.md) — localStorage schema + migrations
5. [`api/worker-proxy.md`](../api/worker-proxy.md) — Worker contract
6. [`security/api-key-handling.md`](../security/api-key-handling.md) — threat model
7. [`ux/ui-inventory.md`](../ux/ui-inventory.md) — every screen + state
8. [`roadmap/refactor-plan.md`](../roadmap/refactor-plan.md) — phased plan
9. [`roadmap/known-issues.md`](../roadmap/known-issues.md) — debt log

---

## 9. Design Principles

1. **No framework.** If a problem feels like it needs React, it probably needs
   a smaller module instead.
2. **No build step we don't need.** Native ES modules first.
3. **Zero runtime dependencies.** Each new dependency is a decision, not a
   reflex.
4. **Tests are the contract.** If Playwright is green, the refactor is safe.
5. **Documents before code.** Big changes get a `/docs` entry first.
6. **Behavior-preserving by default.** The foundation refactor changes
   structure, not behavior.

---

## 10. Conventions

- **Branching:** `refactor/*`, `feat/*`, `fix/*`, `docs/*`.
- **Commits:** Conventional Commits (`docs:`, `feat:`, `fix:`, `chore:`).
- **PRs:** small, single-purpose, link the relevant doc(s).
- **File encoding:** UTF-8 (no BOM).
- **Line endings:** LF.

---

## 11. Project Status

**Phase:** Planning (`refactor/foundation`)
**State of code:** Untouched in this branch — design docs only.
**Next code work:** Phase 0 of `roadmap/refactor-plan.md`.

---

## 12. Contact

Author / maintainer: **Milo Haireche**. Issues and PRs welcome via the GitHub
repo.
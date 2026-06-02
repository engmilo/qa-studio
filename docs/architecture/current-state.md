\# Architecture — Current State



> \*\*Status:\*\* As-built audit, captured before any refactor.

> \*\*Branch:\*\* `refactor/foundation`

> \*\*Rule:\*\* This document describes reality, not aspirations. No code is changed by this doc.



\## 1. What QA Studio Is



QA Studio is an \*\*AI-powered test case generator\*\* delivered as a zero-dependency,

framework-free Progressive Web App (PWA). Users describe a feature or paste user

stories; the app generates structured test cases, then lets them save, track,

filter, and export those cases by project.



\- \*\*Hosting:\*\* GitHub Pages (static), base path `/qa-studio/`

\- \*\*Build step:\*\* None. No bundler, no transpiler.

\- \*\*Runtime dependencies:\*\* Zero. Third-party libs are vendored into `/libs`.

\- \*\*Dev dependencies:\*\* `@playwright/test` only.



\## 2. System Overview



Confirmed both. Storage = localStorage (qa\_lang, qa\_usage\_total, qa\_history, qa\_projects). And yes — the root deploy.yml is a duplicate of the workflow file (dead file in repo root).



Here's your first document. Create the file and paste the contents:



powershell



Copy code

\# Create the file

New-Item -ItemType File -Force -Path "docs/architecture/current-state.md" | Out-Null

notepad docs/architecture/current-state.md



Paste this in:



markdown



Copy code

\# Architecture — Current State



> \*\*Status:\*\* As-built audit, captured before any refactor.

> \*\*Branch:\*\* `refactor/foundation`

> \*\*Rule:\*\* This document describes reality, not aspirations. No code is changed by this doc.



\## 1. What QA Studio Is



QA Studio is an \*\*AI-powered test case generator\*\* delivered as a zero-dependency,

framework-free Progressive Web App (PWA). Users describe a feature or paste user

stories; the app generates structured test cases, then lets them save, track,

filter, and export those cases by project.



\- \*\*Hosting:\*\* GitHub Pages (static), base path `/qa-studio/`

\- \*\*Build step:\*\* None. No bundler, no transpiler.

\- \*\*Runtime dependencies:\*\* Zero. Third-party libs are vendored into `/libs`.

\- \*\*Dev dependencies:\*\* `@playwright/test` only.



\## 2. System Overview





┌─────────────────────────────────────────────┐

│ Browser (PWA)                                │

│                                              │

│  index.html ──► landing page                 │

│  app.html   ──► application shell            │

│  app.js     ──► all logic (2,198 lines)      │

│  sw.js      ──► service worker (offline)     │

│  libs/      ──► xlsx, lucide, confetti, etc. │

│                                              │

│  Storage: localStorage                       │

└───────────────┬─────────────────────────────┘

│ HTTPS

▼

┌─────────────────────────────────────────────┐

│ Cloudflare Worker proxy                      │

│ https://qa-proxy.eng-milo.workers.dev        │

│ - Hides AI provider API key                  │

│ - Forwards generation requests               │

└─────────────────────────────────────────────┘

\## 3. File Map

\## 3. File Map



| Path | Role |

|---|---|

| `index.html` | Landing page |

| `app.html` | Application shell / markup |

| `app.js` | \*\*Monolith\*\* — config, i18n, state, rendering, export, API |

| `sw.js` | Service worker (offline + caching) |

| `manifest.json` | PWA manifest (`start\_url: /qa-studio/app.html`) |

| `libs/xlsx.full.min.js` | Excel export |

| `libs/lucide.min.js` | Icons |

| `libs/confetti.browser.min.js` | Success animation |

| `libs/inter-font.css` | Typography |

| `libs/flags/{dz,fi,gb}.png` | Language/region flags |

| `e2e/\*.spec.js` | Playwright tests (generator, landing, projects) |

| `playwright.config.js` | Test config |

| `.github/workflows/deploy.yml` | GitHub Pages deploy |

| `.github/workflows/test.yml` | CI test run |

| `preview-\*.html` | Standalone UI mockups (not part of the app runtime) |

| `download-libs.sh` | Script to fetch vendored libs |



\## 4. Application Modules (all currently inside `app.js`)



`app.js` is a single 2,198-line file containing, in order:



1\. \*\*CONFIG\*\* — `WORKER\_URL` constant pointing at the Cloudflare proxy.

2\. \*\*I18N\*\* — large inline translation dictionary (multi-language).

3\. \*\*STATE\*\* — runtime state hydrated from `localStorage`.

4\. \*\*RENDERING\*\* — view logic for all screens.

5\. \*\*EXPORT\*\* — JSON / CSV / Excel / Word generation.

6\. \*\*API\*\* — calls to the Worker proxy.



\### Views

\- \*\*Generator\*\* — generate test cases from a feature description / pasted stories

\- \*\*Dashboard\*\* — stats, status distribution, priority breakdown, 7-day trend

\- \*\*Projects\*\* — browse/manage saved projects

\- \*\*Suites\*\* — test suites grouped by project

\- \*\*History\*\* — past generation runs



\## 5. Data Model (localStorage)



All persistence is client-side via `localStorage`. Known keys:



| Key | Type | Purpose |

|---|---|---|

| `qa\_lang` | string | Selected UI language (default `en`) |

| `qa\_usage\_total` | int (string) | All-time generated counter |

| `qa\_history` | JSON array | Past generation runs |

| `qa\_projects` | JSON array | Saved projects (incl. test cases) |



> No backend database exists. Data lives only in the user's browser.



\## 6. Test Case Attributes (from i18n keys)



\- \*\*ID, Title, Feature\*\*

\- \*\*Priority:\*\* Critical / High / Medium / Low / Trivial

\- \*\*Status:\*\* Pass / Fail / Blocked / Untested

\- \*\*Metadata:\*\* created date/time, tags, project association



\## 7. Strengths



\- Genuinely dependency-light — minimal supply-chain risk.

\- API key is \*\*not\*\* in the client; it sits behind a Cloudflare Worker proxy.

\- Existing Playwright E2E coverage + CI.

\- PWA: installable, offline-capable.



\## 8. Constraints / Risks (tracked in `roadmap/known-issues.md`)



\- `app.js` is a \*\*2,198-line monolith\*\* — primary refactor target.

\- i18n dictionary is inline (hundreds of lines inside `app.js`).

\- No type safety (pure JS).

\- Source-encoding mojibake present in some strings (e.g. `…`, `—`).

\- Duplicate `deploy.yml` in repo root (the active one is in `.github/workflows/`).



\## 9. Out of Scope for This Branch



Per "don't touch the code" mode, `refactor/foundation` adds \*\*planning docs only\*\*.

No application behavior, file structure, or runtime code is modified.


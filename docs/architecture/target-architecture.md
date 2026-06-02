\# Architecture — Target State



> \*\*Branch:\*\* `refactor/foundation`

> \*\*Scope:\*\* Describes the architecture QA Studio will have \*after\* the

> foundation refactor is complete. Pairs with

> \[`current-state.md`](current-state.md) (where we are) and

> \[`../roadmap/refactor-plan.md`](../roadmap/refactor-plan.md) (how we get there).

> \*\*Rule:\*\* This document describes the destination. No code changes here.



\---



\## 1. Headline Change



`app.js` (2,198 lines) is split into focused ES modules under `/src`. The

HTML, the storage keys, the Worker contract, and the user-visible behavior

are \*\*unchanged\*\*.



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



yaml



\---



\## 2. Target Tree



/src

├── app.js                         # \~150 LOC. Wires modules to DOM. No business logic.

├── config.js                      # WORKER\_URL, feature flags, constants.

│

├── i18n/

│   ├── index.js                   # t(key, vars?), setLang(lang), getLang()

│   └── locales/

│       ├── en.js                  # JS, not JSON — supports function values like testCasesLabel(n)

│       ├── fr.js                  # if present today

│       └── ...                    # one per shipped language

│

├── state/

│   ├── store.js                   # In-memory state + subscribe()/notify()

│   └── storage.js                 # localStorage read/write + schema versioning + migrations

│

├── api/

│   └── worker.js                  # generateTestCases(payload) → Promise<TestCase\[]>

│                                  # The ONLY module that calls fetch().

│

├── views/

│   ├── generator.js               # mount(container, ctx) / unmount()

│   ├── dashboard.js

│   ├── projects.js

│   ├── suites.js

│   └── history.js

│

├── export/

│   ├── json.js                    # exportJson(testCases) → Blob

│   ├── csv.js                     # exportCsv(testCases)  → Blob

│   ├── excel.js                   # wraps libs/xlsx.full.min.js

│   └── word.js                    # exportWord(testCases) → Blob

│

└── ui/

├── dom.js                     # tiny DOM helpers (qs, qsa, el, on)

├── icons.js                   # wraps libs/lucide

├── confetti.js                # wraps libs/confetti.browser.min.js

└── toast.js                   # user-facing notifications (errors, quota, etc.)



Sizes (targets, not hard limits):

\- `src/app.js` ≤ 150 LOC

\- Any single module ≤ 400 LOC

\- Any locale file ≤ 500 LOC (mostly strings)



\---



\## 3. Module Contracts



Every module exports a \*\*narrow, named API\*\*. No default exports. No

implicit globals.



\### 3.1 `config.js`



```js

export const WORKER\_URL = "https://qa-proxy.eng-milo.workers.dev";

export const SCHEMA\_VERSION = 1;

export const MAX\_PROMPT\_CHARS = 10\_000;

export const REQUEST\_TIMEOUT\_MS = 30\_000;


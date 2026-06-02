\# Storage Model — Client-Side Persistence



> \*\*Branch:\*\* `refactor/foundation`

> \*\*Scope:\*\* Defines the canonical shape of data persisted in the browser today,

> and the versioned schema we will migrate to in Phase 3 of the refactor.

> \*\*Rule:\*\* This document describes the contract. No code changes here.



\---



\## 1. Storage Mechanism



QA Studio has \*\*no backend database\*\*. All user data lives in the browser via

`window.localStorage`. There is no server-side persistence, no sync, and no

multi-device support.



\*\*Implications:\*\*

\- Clearing browser data = total data loss for that user.

\- Per-origin quota (\~5–10 MB depending on browser).

\- Synchronous API — large reads/writes can jank the UI.

\- Strings only — all values are JSON-stringified.



\---



\## 2. Current Keys (As-Built)



Confirmed by inspection of `app.js`:



| Key | Type (parsed) | Default | Purpose |

|---|---|---|---|

| `qa\_lang` | `string` | `"en"` | Selected UI language |

| `qa\_usage\_total` | `number` (stored as string) | `0` | All-time generated test-case counter |

| `qa\_history` | `HistoryEntry\[]` | `\[]` | Past generation runs |

| `qa\_projects` | `Project\[]` | `\[]` | Saved projects (with their test cases) |



\### Evidence



```js

let lang = localStorage.getItem("qa\_lang") || "en";

usageTotal: parseInt(localStorage.getItem("qa\_usage\_total") || "0"),

history:    JSON.parse(localStorage.getItem("qa\_history")   || "\[]"),

projects:   JSON.parse(localStorage.getItem("qa\_projects")  || "\[]"),

localStorage.setItem("qa\_usage\_total", String(state.usageTotal));


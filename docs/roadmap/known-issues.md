\# Known Issues \& Technical Debt



> \*\*Status:\*\* Living log. Captured on branch `refactor/foundation`.

> \*\*Purpose:\*\* Track real, observed issues in the current codebase so they are

> not forgotten during the foundation refactor.

> \*\*Rule:\*\* This document only \*records\* issues. It does not fix them.



Each entry has: \*\*ID · Severity · Area · Description · Evidence · Suggested fix\*\*



Severity scale:

\- 🔴 \*\*High\*\* — user-visible or blocks refactor

\- 🟡 \*\*Medium\*\* — quality / maintainability

\- 🟢 \*\*Low\*\* — cosmetic or housekeeping



\---



\## ISSUE-001 · 🔴 High · Source encoding (mojibake)



\*\*Area:\*\* `app.js` (i18n dictionary)



\*\*Description:\*\*

Several UI strings contain mojibake — UTF-8 bytes interpreted as Windows-1252

and re-saved. Affected characters include the ellipsis (`…`) and em-dash (`—`).



\*\*Evidence:\*\*

```js

generating: "Generatingâ€¦",

footerText: "QA Studio by Milo Haireche â€" 20+ years of QA expertise",

projectNamePlaceholder: "Project nameâ€¦",

importPrompt: "... copy them directly from Jira, Notion, spreadsheets, or any requirements document.",


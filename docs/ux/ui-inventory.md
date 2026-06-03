# UX — UI Inventory

> **Branch:** `refactor/foundation`
> **Scope:** Every screen, every state, every modal, every shared component
> in QA Studio today. This is the reference Phase 4 of the refactor uses to
> split `app.js` into one file per view without losing anything.
> **Rule:** Inventory only. No redesign, no copy changes, no code changes.

---

## 1. How to Read This Doc

Each view section follows the same shape:

- **Purpose** — one sentence on what the view is for.
- **Entry points** — how users get here.
- **States** — empty / loading / populated / error.
- **Components on screen** — top to bottom.
- **User actions** — what the user can do here.
- **Data sources** — which store slices and which APIs it reads/writes.
- **i18n keys used** — anchor strings drawn from `app.js`.
- **Notes / risks** — anything refactor-relevant.

Where details are inferred rather than confirmed, they're marked **(TBC)**.

---

## 2. Global Shell

Present on every view in `app.html`.

### Components
- **Top nav / sidebar** with links: Generator, Dashboard, Projects, Suites, History
- **Language switcher** (flags: `gb`, `fi`, `dz` confirmed in `libs/flags/`)
- **Theme toggle** — i18n key `theme`
- **API Configuration entry** — i18n key `apiConfig`, tooltip `tipApiConfig`
- **App name** — `QA Studio` (i18n key `appName`)
- **Footer** — `footerText` ("QA Studio by Milo Haireche — 20+ years of QA expertise")

### Tooltips
`tipGenerator`, `tipDashboard`, `tipProjects`, `tipSuites`, `tipHistory`, `tipApiConfig`

### Global modals available from the shell
- **Import / Export Data** (see §9.1)
- **Clear All Data** confirmation (see §9.2)

### Refactor mapping
- After Phase 4, the shell stays in `app.html` + `src/app.js` (wiring).
- View navigation goes through the hash router described in
  [`../architecture/target-architecture.md`](../architecture/target-architecture.md#5-routing).

---

## 3. Landing (`index.html`)

### Purpose
Marketing/intro page. Routes users into `app.html`.

### Entry points
- Direct URL: `https://engmilo.github.io/qa-studio/`

### States
- **Default** only. No data dependencies.

### Components
- Hero / pitch
- "Open app" CTA → navigates to `app.html`
- A **Demo** affordance (i18n key `demo`) — TBC where it lives

### Data sources
- None.

### Notes
- Covered by `e2e/landing.spec.js`.
- Not part of the SPA — stays as its own HTML file.

---

## 4. Generator View

### Purpose
Turn a feature description or pasted user stories into test cases.

### Entry points
- Default landing inside `app.html` (TBC).
- Nav link `generator`.

### States

#### 4.1 Empty (no results yet)
- Empty-results message: `noResults` — "Describe a feature above and hit Generate."

#### 4.2 Composing input
- Prompt textarea with placeholder `importPrompt`
- Generate button enabled when input is non-empty (TBC).

#### 4.3 Generating
- Button label flips to `generating` ("Generating…")
- Button disabled
- (TBC) Spinner / progress affordance

#### 4.4 Populated (has results)
- Toolbar above the table:
  - **Search** input — `generatorSearchPlaceholder`
  - **Result counter** — `showingResults` ("Showing {n} of {total}")
  - **Bulk-select controls** — `selectAll`, `deselectAll`, `selected`
  - **Export menu** — `exportJson`, `exportCsv`, `exportExcel`, `exportWord`
  - **Save to Project** — `saveProject` → opens Save modal (§9.3)
- **Results table** columns: `colId`, `colPriority`, `colStatus`, `colTitle`
- (TBC) tags column

#### 4.5 Error
- (TBC) Inline error banner if the Worker request fails.
- See [`../api/worker-proxy.md`](../api/worker-proxy.md#42-error-responses) for
  status → UX mapping.

### User actions
- Type / paste a prompt
- Click **Generate** → POST to Worker
- Filter results via search
- Toggle row selection; bulk delete (`confirmBulkDelete(n)`)
- Change a test case's **status** (Pass / Fail / Blocked / Untested)
- Change a test case's **priority** (Critical / High / Medium / Low / Trivial)
- Export results in any of four formats
- Save results to a (new or existing) project
- Delete a single test case (`delete`)

### Data sources
- **Reads:** in-memory generated batch
- **Writes:**
  - `qa_usage_total` (increment by result count)
  - `qa_history` (push new entry)
  - `qa_projects` (only on Save)

### i18n keys (anchors)
`generate`, `generating`, `noResults`, `colId`, `colPriority`, `colStatus`,
`colTitle`, `delete`, `testsLabel`, `pCritical`, `pHigh`, `pMedium`, `pLow`,
`pTrivial`, `pass`, `fail`, `blocked`, `untested`, `selectAll`, `deselectAll`,
`selected`, `confirmBulkDelete`, `deletedTests`, `exportJson`, `exportCsv`,
`exportExcel`, `exportWord`, `saveProject`, `showingResults`,
`generatorSearchPlaceholder`, `importPrompt`.

### Notes / risks
- Largest view, most state. Likely the heaviest file post-split.
- Covered by `e2e/generator.spec.js`. That test is the contract for Phase 4.
- Bulk-delete copy uses HTML in the i18n function (`<strong>...</strong>`),
  so renderer must allow trusted HTML for that specific key.

---

## 5. Dashboard View

### Purpose
At-a-glance stats across all generated and saved test cases.

### Entry points
- Nav link `dashboard`.

### States

#### 5.1 Empty
- Message: `dashEmpty` — "No test cases yet."

#### 5.2 Populated
- **KPI tiles**
  - `dashTotalAll` — all-time generated
  - `dashSession` — current session
  - `dashPass`, `dashFail`, `dashBlocked`, `dashUntested`, `dashTotal`
- **Charts** (built without a chart library — TBC)
  - `statusDistribution`
  - `priorityDistribution` (aka `priorityBreakdown`)
  - `projectBars` — project breakdown
  - `statusColChart` — test case status (column)
  - `dailyTrend` — last 7 days, with `thisWeek` / `lastWeek` labels
- **Side metrics**
  - `sideDefectDensity`
  - `sideAutoCoverage` (`sideOfTotal`)

### User actions
- Mostly read-only. Possible drill-down click-throughs to Projects (TBC).

### Data sources
- **Reads:** `qa_history`, `qa_projects`, `qa_usage_total`
- **Writes:** none.

### i18n keys (anchors)
`dashTotalAll`, `dashSession`, `dashPass`, `dashFail`, `dashBlocked`,
`dashUntested`, `dashTotal`, `priorityBreakdown`, `dashEmpty`,
`statusDistribution`, `priorityDistribution`, `projectBars`,
`statusColChart`, `dailyTrend`, `sideDefectDensity`, `sideAutoCoverage`,
`sideOfTotal`, `thisWeek`, `lastWeek`.

### Notes / risks
- Charts are the trickiest thing to keep behavior-identical across refactor.
- Consider snapshotting chart DOM via Playwright before Phase 4 begins.

---

## 6. Projects View

### Purpose
Browse and manage saved projects and the test cases inside them.

### Entry points
- Nav link `projects`.
- "Save to Project" flow lands the user here after a save (TBC).

### States

#### 6.1 Empty
- Message: `emptyProjects` — "No saved projects yet."

#### 6.2 Populated — list
- **Search** — `searchProjects`
- **Table** columns: `colName`, `colDesc`, `colCreated`, `colCount`
- Each row → opens project detail
- Per-row actions: `delete` → confirmation `confirmDelete`

#### 6.3 Project detail
- **Back** button — `back`
- Project header (name, description, counts)
- Test cases table identical to Generator's results table
- Same row interactions: status/priority change, delete, bulk select
- (TBC) Export of just this project's cases

### User actions
- Search projects
- Open a project
- Delete a project (with confirmation)
- Inside a project: edit status, edit priority, delete cases, bulk delete

### Data sources
- **Reads:** `qa_projects`
- **Writes:** `qa_projects`

### i18n keys (anchors)
`emptyProjects`, `searchProjects`, `colName`, `colDesc`, `colCreated`,
`colCount`, `confirmDelete`, `back`, `testCasesLabel`.

### Notes / risks
- Covered by `e2e/projects.spec.js`.
- Mutating a test case inside a project must update `updatedAt` per the
  schema in [`../database/storage-model.md`](../database/storage-model.md#32-project).

---

## 7. Suites View

### Purpose
View test cases grouped by project ("suites").

### Entry points
- Nav link `suites`.

### States

#### 7.1 Empty
- (TBC) Likely reuses `emptyProjects` or a dedicated key.

#### 7.2 Populated
- **One section per project** with:
  - Project name + count (`testsLabel` for pluralization)
  - Embedded mini-table of that project's cases
  - (TBC) Collapse/expand control

### User actions
- Navigate to a project's detail page (TBC).
- (Possibly) export an entire suite.

### Data sources
- **Reads:** `qa_projects`
- **Writes:** none (TBC).

### i18n keys (anchors)
`testsLabel`.

### Notes / risks
- Lowest-confidence view in this inventory. Confirm exact shape during
  Phase 4 by reading `app.js`.

---

## 8. History View

### Purpose
A log of every generation run the user has made.

### Entry points
- Nav link `history`.

### States

#### 8.1 Empty
- Message: `emptyHistory` — "No history yet."

#### 8.2 Populated
- **Search** — `searchHistory`
- **Table** columns: `colFeature`, `colGenerated`, `colTime`, `colCount`
- Per-row action: `viewDetails`
- Page-level action: `clearHistory`

#### 8.3 Detail (per entry)
- Shows the original feature/prompt and the resulting test cases (TBC: are
  full cases stored or just metadata? Open question in `storage-model.md`).

### User actions
- Search history
- View a past run's details
- Clear all history

### Data sources
- **Reads:** `qa_history`
- **Writes:** `qa_history` (clear)

### i18n keys (anchors)
`emptyHistory`, `searchHistory`, `colFeature`, `colGenerated`, `colTime`,
`colCount`, `viewDetails`, `clearHistory`.

### Notes / risks
- Confirm whether "Clear History" requires a confirmation modal.

---

## 9. Modals & Dialogs

### 9.1 Import / Export Data
- Triggered by `importExportBtn`
- Title: `importExportTitle`
- Two sections:
  - **Export** — `exportLabel`, button `downloadBackup`
  - **Import** — `importLabel`, button `selectJsonFile`
- Warning: `importWarning`
- Confirm title: `importConfirmTitle`
- Cancel: `cancel`

**Cross-ref:** Import must run the migration pipeline — see
[`../database/storage-model.md`](../database/storage-model.md#9-import--export-compatibility).

### 9.2 Clear All Data
- Trigger: `clearAllData`
- Confirmation: `confirmClearAll`

### 9.3 Save to Project
- Trigger: `saveProject` button on the Generator view
- Fields:
  - Project name — placeholder `projectNamePlaceholder`
  - Description — placeholder `projectDescPlaceholder`
- Buttons: `save`, `cancel`

### 9.4 Bulk Delete Confirmation
- Trigger: bulk action on Generator (or Projects detail)
- Message: `confirmBulkDelete(n)` — uses inline `<strong>` for the count
- Buttons: standard confirm/cancel
- On success toast: `deletedTests`

### 9.5 Project Delete Confirmation
- Trigger: delete on a Projects row
- Message: `confirmDelete`

### 9.6 API Configuration (TBC)
- Trigger: `apiConfig` in the shell
- Content (TBC) — likely a way to override `WORKER_URL` or model id.

---

## 10. Cross-Cutting UI Concerns

### 10.1 Search inputs
Three views ship a search box with different placeholders:
- Generator: `generatorSearchPlaceholder`
- Projects: `searchProjects`
- History: `searchHistory`

Phase 4 should keep them visually identical but locally scoped per view.

### 10.2 Status & Priority controls
Used in Generator and Projects detail. Identical mechanics. Strong candidate
for a shared component in `src/ui/`.

### 10.3 Pluralization
The codebase has function-valued i18n entries:
- `testCasesLabel(n)` → `test case` / `test cases`
- `confirmBulkDelete(n)` → embeds `<strong>` and pluralizes

This is **why locales are `.js`, not `.json`**.

### 10.4 Success affordance — confetti
`libs/confetti.browser.min.js` is loaded. Confirm exact trigger during Phase 4
and wire it through `src/ui/confetti.js`.

### 10.5 Icons
`libs/lucide.min.js` is used app-wide. After Phase 4 it's accessed only via
`src/ui/icons.js`.

### 10.6 Language switching
Changes `qa_lang`, re-renders every label. The refactor's `setLang(lang)`
must invoke a re-render via `store.subscribe`, not by poking the DOM.

---

## 11. Accessibility Inventory (Quick Pass)

Captured as a baseline so the refactor doesn't regress:

- [ ] Every nav link is reachable via keyboard
- [ ] Modals trap focus and restore it on close
- [ ] Tables have `<th>` headers and a logical reading order
- [ ] Status and priority controls are operable via keyboard
- [ ] Color is not the only signal for status
- [ ] Language switcher exposes language as text, not just a flag image
- [ ] All interactive elements have visible focus styles

> These are **questions to verify**, not assertions about current state.

---

## 12. Responsive / Layout

- App is desktop-first (data tables, charts).
- Mobile behavior of tables / dashboard charts is **TBC**.
- PWA installs run in `standalone` per `manifest.json`.

---

## 13. What's Not in the UI Today

Documenting absent features prevents accidental scope creep:

- No user accounts, login, or sign-up.
- No collaboration / multi-user features.
- No comments, attachments, or rich-text editing.
- No issue-tracker integrations — Jira is referenced only as a *source*.
- No analytics dashboard for the operator.
- No notifications.

---

## 14. Open Questions (Resolve Before Phase 4)

- [ ] Is the default view on `app.html` Generator or Dashboard?
- [ ] Does API Configuration actually let users override `WORKER_URL` / model?
- [ ] Where does the **Demo** entry (`demo`) live and what does it do?
- [ ] Does the Suites view have its own empty-state key?
- [ ] Are tags persisted per `TestCase` or computed at render time?
- [ ] Does Clear History prompt for confirmation today?
- [ ] What triggers the confetti animation?

Answer these by reading `app.js` during Phase 0; update this doc in place.

---

## 15. How This Doc Is Used

- **Phase 4** of the refactor splits each view in §4–§8 into its own module
  under `src/views/`. This inventory is the checklist that ensures nothing
  goes missing.
- **i18n extraction (Phase 2)** uses the "i18n keys" lines as the audit of
  what each locale must include.
- **QA review** of any future view PR should diff against the relevant
  section here and update it in the same PR.
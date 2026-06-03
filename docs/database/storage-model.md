# Storage Model — Client-Side Persistence

> **Branch:** `refactor/foundation`
> **Scope:** Defines the canonical shape of data persisted in the browser today,
> and the versioned schema we will migrate to in Phase 3 of the refactor.
> **Rule:** This document describes the contract. No code changes here.

---

## 1. Storage Mechanism

QA Studio has **no backend database**. All user data lives in the browser via
`window.localStorage`. There is no server-side persistence, no sync, and no
multi-device support.

**Implications:**
- Clearing browser data = total data loss for that user.
- Per-origin quota (~5–10 MB depending on browser).
- Synchronous API — large reads/writes can jank the UI.
- Strings only — all values are JSON-stringified.

---

## 2. Current Keys (As-Built)

Confirmed by inspection of `app.js`:

| Key | Type (parsed) | Default | Purpose |
|---|---|---|---|
| `qa_lang` | `string` | `"en"` | Selected UI language |
| `qa_usage_total` | `number` (stored as string) | `0` | All-time generated test-case counter |
| `qa_history` | `HistoryEntry[]` | `[]` | Past generation runs |
| `qa_projects` | `Project[]` | `[]` | Saved projects (with their test cases) |

### Evidence

```js
let lang = localStorage.getItem("qa_lang") || "en";
usageTotal: parseInt(localStorage.getItem("qa_usage_total") || "0"),
history:    JSON.parse(localStorage.getItem("qa_history")   || "[]"),
projects:   JSON.parse(localStorage.getItem("qa_projects")  || "[]"),
localStorage.setItem("qa_usage_total", String(state.usageTotal));
```

No other `qa_*` keys are read or written.

---

## 3. Canonical Data Shapes (Target — Phase 3)

### 3.1 TestCase

```js
/**
 * @typedef {Object} TestCase
 * @property {string}   id          Stable identifier, unique within its project.
 * @property {string}   title       Short, human-readable summary.
 * @property {string}   [feature]   Source feature name or user-story title.
 * @property {string}   [steps]     Reproduction steps.
 * @property {string}   [expected]  Expected result.
 * @property {Priority} priority
 * @property {Status}   status
 * @property {string[]} [tags]      Free-form labels.
 * @property {string}   createdAt   ISO 8601 timestamp (UTC).
 * @property {string}   updatedAt   ISO 8601 timestamp (UTC). (new — see §3.5)
 */
```

### 3.2 Project

```js
/**
 * @typedef {Object} Project
 * @property {string}     id            UUID v4.
 * @property {string}     name          Required.
 * @property {string}     [description] Optional.
 * @property {string}     createdAt     ISO 8601 timestamp (UTC).
 * @property {string}     updatedAt     ISO 8601 timestamp (UTC). (new)
 * @property {TestCase[]} testCases
 */
```

### 3.3 HistoryEntry

```js
/**
 * @typedef {Object} HistoryEntry
 * @property {string}     id            UUID v4.
 * @property {string}     feature       The prompt the user submitted.
 * @property {string}     generatedAt   ISO 8601 timestamp (UTC).
 * @property {number}     durationMs    Wall-clock time of the generation.
 * @property {number}     count         Number of test cases produced.
 * @property {TestCase[]} [testCases]   Full case payload. See §3.6.
 */
```

### 3.4 Enums

```js
/** @typedef {"Critical" | "High" | "Medium" | "Low" | "Trivial"} Priority */
/** @typedef {"Pass" | "Fail" | "Blocked" | "Untested"} Status */
```

### 3.5 New fields introduced by Phase 3

Two non-breaking additions, both populated by migration:

- `TestCase.updatedAt` — set to `createdAt` for legacy rows.
- `Project.updatedAt` — set to `createdAt` for legacy rows.

No existing field is removed, renamed, or retyped.

### 3.6 Open question: does `HistoryEntry` store full test cases?

Today's behavior is **to be confirmed** by reading `app.js`. The typedef in
§3.3 documents the target as "full payload, optional". If the as-built
implementation stores only metadata, the migration in §6 backfills
`testCases: []` for legacy rows.

---

## 4. Versioned Envelope (Target — Phase 3)

To prevent silent corruption (ISSUE-006), each collection-valued store is
wrapped in a versioned envelope.

### 4.1 Envelope shape

```js
/**
 * @template T
 * @typedef {Object} Envelope
 * @property {number} schemaVersion
 * @property {T}      data
 */
```

### 4.2 Keys after Phase 3

| Key | Stored value |
|---|---|
| `qa_lang` | `string` (unchanged — not enveloped) |
| `qa_usage_total` | `string` of an integer (unchanged — not enveloped) |
| `qa_history` | `Envelope<HistoryEntry[]>` |
| `qa_projects` | `Envelope<Project[]>` |

Primitives are intentionally left flat — they have no shape to migrate.

### 4.3 Initial version

`schemaVersion: 1` is the first envelope version. Legacy flat arrays are
treated as version 0 and migrated up.

---

## 5. Read / Write Contract (Target — Phase 3)

All access goes through `src/state/storage.js`. No other module may call
`localStorage` directly.

### 5.1 Public API

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

### 5.2 Error handling

Every write is wrapped in `try / catch (QuotaExceededError)`. On quota
exhaustion the helper:

1. Logs to `console.warn`.
2. Returns `false` so the UI can show a toast.
3. Does **not** silently truncate.

---

## 6. Migration Strategy (Target — Phase 3)

### 6.1 Detection

On first read of `qa_projects` or `qa_history`:

- `Array.isArray(parsed)` → legacy (v0). Run `v0 → v1` migration.
- `parsed.schemaVersion === 1` → current. Pass through.
- Anything else → corrupt. Return `[]`, surface a toast, do **not** overwrite.

### 6.2 The `v0 → v1` migration

For `qa_projects`:
1. Wrap the array in `{ schemaVersion: 1, data: <array> }`.
2. For each project, ensure `updatedAt = updatedAt ?? createdAt`.
3. For each test case, ensure `updatedAt = updatedAt ?? createdAt`.
4. Persist back.

For `qa_history`:
1. Wrap the array in `{ schemaVersion: 1, data: <array> }`.
2. For each entry, ensure `testCases = testCases ?? []`.
3. Persist back.

Migrations are **idempotent**.

### 6.3 Future migrations

When `schemaVersion` moves to 2, add `v1 → v2` and chain:

```js
function migrate(parsed) {
  let v = parsed;
  if (Array.isArray(v))      v = v0_to_v1(v);
  if (v.schemaVersion === 1) v = v1_to_v2(v);
  return v;
}
```

No migration is ever removed.

### 6.4 Migration testing

Phase 3's PR includes fixtures under `e2e/fixtures/storage/`:

- `legacy-v0-projects.json`
- `legacy-v0-history.json`
- `corrupt.json`

A Playwright spec seeds these into `localStorage` and asserts the app boots,
displays the data, and rewrites storage in the new envelope.

---

## 7. Quota Management

`localStorage` is bounded (~5–10 MB). The refactor adds three defenses:

1. **Write guard** — every `setItem` catches `QuotaExceededError`.
2. **User-visible toast** — "Local storage is full. Export and clear old
   history to continue."
3. **Optional truncation helper** — `truncateHistory(maxEntries)` exposed
   but never called automatically. The user is in charge of their data.

---

## 8. Privacy & Security Properties

- `localStorage` is **not encrypted** by QA Studio.
- Anything stored is readable by any script on the same origin.
- No PII is collected. No credentials are stored.
- See [`../security/api-key-handling.md`](../security/api-key-handling.md) §7
  for the threat model.

---

## 9. Import / Export Compatibility

The "Import / Export Data" modal must round-trip data correctly.

### 9.1 Backup bundle shape

```js
/**
 * @typedef {Object} BackupBundle
 * @property {1}        schemaVersion
 * @property {string}   exportedAt
 * @property {string}   appVersion
 * @property {Object}   data
 * @property {string}   data.lang
 * @property {number}   data.usageTotal
 * @property {Project[]}      data.projects
 * @property {HistoryEntry[]} data.history
 */
```

Bundles store **unwrapped** arrays for portability. Envelopes are an
internal storage detail.

### 9.2 Export

`exportAll()`:
1. Reads via the regular `getX()` helpers (so migration runs).
2. Returns a `BackupBundle` ready to download as
   `qa-studio-backup-YYYY-MM-DD.json`.

### 9.3 Import

`importAll(bundle)`:
1. Validates `bundle.schemaVersion === 1`. Reject unknown versions.
2. Validates each field's type.
3. **Replaces** all local data (the modal already warns the user).
4. Wraps arrays in current envelopes before writing.
5. Returns `{ ok: true, counts: {...} }` or `{ ok: false, reason }`.

### 9.4 Forward compatibility

A future `schemaVersion: 2` must still import `schemaVersion: 1` bundles by
running the same migration chain used for on-disk reads.

---

## 10. What This Branch Does and Does Not Change

**Does:**
- Documents the as-built keys and shapes.
- Specifies the target envelope, migration, and API.
- Adds two non-breaking fields (`updatedAt` on `Project` and `TestCase`).

**Does not:**
- Touch `app.js`.
- Migrate any user data.
- Change any localStorage key name.

---

## 11. Open Questions

- [ ] Does `HistoryEntry` store full `testCases` today, or only metadata?
- [ ] Are `tags` persisted on `TestCase` today, or derived at render?
- [ ] What is the largest realistic `qa_projects` payload we've seen?
- [ ] Should "Clear History" require confirmation?

Resolve before Phase 3 ships.
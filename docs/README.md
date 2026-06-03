# QA Studio — Documentation

> **Branch context:** This `/docs` tree was created on `refactor/foundation`
> as a planning-only branch. No application code is changed by these
> documents — they describe the system as-built and propose how to evolve it.

---

## Start Here

If this is your first time in this repo, read in this order:

1. **[architecture/overview.md](architecture/overview.md)** — what QA Studio is, in one page
2. **[architecture/current-state.md](architecture/current-state.md)** — honest audit of what exists today
3. **[roadmap/refactor-plan.md](roadmap/refactor-plan.md)** — the phased plan to modernize the foundation

Everything else is reference material you reach for when working on a
specific area.

---

## Document Map

### 📐 Architecture (`architecture/`)
- **[overview.md](architecture/overview.md)** — Project orientation, system diagram, design principles
- **[current-state.md](architecture/current-state.md)** — As-built audit of the codebase today
- **[target-architecture.md](architecture/target-architecture.md)** — Modular end-state after the refactor

### 🗄️ Database (`database/`)
- **[storage-model.md](database/storage-model.md)** — `localStorage` schema, canonical data shapes, migration strategy

### 🌐 API (`api/`)
- **[worker-proxy.md](api/worker-proxy.md)** — Cloudflare Worker contract: request/response shape, error handling, CORS, rate limits

### 🔒 Security (`security/`)
- **[api-key-handling.md](security/api-key-handling.md)** — Threat model, trust boundary, key lifecycle, incident response

### 🎨 UX (`ux/`)
- **[ui-inventory.md](ux/ui-inventory.md)** — Every screen, every state, every modal — the checklist for view-by-view refactoring

### 🛣️ Roadmap (`roadmap/`)
- **[refactor-plan.md](roadmap/refactor-plan.md)** — Phased plan to split `app.js` into modules without changing behavior
- **[known-issues.md](roadmap/known-issues.md)** — Technical debt log

---

## Reading by Goal

**"I want to understand the system."**
→ `architecture/overview.md` → `architecture/current-state.md`

**"I'm about to write code that touches storage."**
→ `database/storage-model.md`

**"I'm about to write code that calls the network."**
→ `api/worker-proxy.md` → `security/api-key-handling.md`

**"I'm about to add a new view or change an existing one."**
→ `ux/ui-inventory.md` → `architecture/target-architecture.md`

**"I want to know what's broken or owed."**
→ `roadmap/known-issues.md`

**"I want to start refactoring."**
→ `roadmap/refactor-plan.md` (start with Phase 0)

---

## Conventions

- **Behavior-preserving by default.** Design docs describe *what* and *why*,
  not *when we'll break users*.
- **No new runtime dependencies.** QA Studio stays framework-free and
  zero-dependency at runtime.
- **Reality before aspiration.** "Current state" docs describe what *is*.
  "Target" docs describe what *will be*. They are kept in separate files.
- **Open questions stay visible.** Each doc lists unresolved questions at the
  bottom rather than guessing.
- **Encoding:** UTF-8, no BOM. Line endings: LF.

---

## Status

| Document | Status |
|---|---|
| `architecture/overview.md` | ✅ Draft complete |
| `architecture/current-state.md` | ✅ Draft complete |
| `architecture/target-architecture.md` | ✅ Draft complete |
| `database/storage-model.md` | ✅ Draft complete |
| `api/worker-proxy.md` | ✅ Draft complete |
| `security/api-key-handling.md` | ✅ Draft complete |
| `ux/ui-inventory.md` | ✅ Draft complete |
| `roadmap/refactor-plan.md` | ✅ Draft complete |
| `roadmap/known-issues.md` | ✅ Draft complete · living log |

All documents are **drafts on a planning branch**. They become canonical when
this branch is reviewed and merged.

---

## Contributing to These Docs

- One concern per PR. Don't bundle a doc update with code changes unless the
  code change is the doc.
- Update `current-state.md` whenever shipped reality drifts from it.
- Update `known-issues.md` whenever you discover debt, even if you can't fix
  it now — the log is the value.
- Resolve "Open Questions" sections by editing the doc, not by leaving the
  answer in a chat or PR comment.

---

## Author

Milo Haireche — see the root [README.md](../README.md) for project-level info.
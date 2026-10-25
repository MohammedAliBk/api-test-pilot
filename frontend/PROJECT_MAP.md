# PROJECT_MAP.md — Frontend Architecture Map

**Project**: API Test Pilot — Frontend  
**Version**: `0.0.1-alpha`  
**Root**: `frontend/`  
**Repository**: `api-test-pilot` (Monorepo)

---

## 1. Directory Structure

```text
frontend/
├── AGENTS.md                                # Orchestration guide & pointers
├── PROJECT_MAP.md                           # This document (system map)
├── CHANGELOG.md                             # Changelog (Keep-a-Changelog)
├── frontend.md                              # Monorepo service marker
├── .agents/                                 # Antigravity agent configuration
│   ├── rules/                               # Scoped behavioral & quality rules (<12k chars)
│   ├── skills/                              # Modular procedure packages (SKILL.md)
│   ├── workflows/                           # Standard workflow playbooks (/slash commands)
│   └── agents/                              # Custom agent definitions (Orchestrator, Loop, Specialists)
├── docs/                                    # Technical & operational documentation
│   ├── orchestration/                       # Single source of truth for tasks & decisions
│   │   ├── OPERATING_MANUAL.md              # Distilled operating manual (loop, gates, lifecycle)
│   │   ├── TASKS.md                         # Task registry & status board
│   │   ├── DECISIONS.md                     # Architecture decision records (DEC-XXX)
│   │   ├── SESSION_LOG.md                   # Resumable session history
│   │   └── tasks/                           # Individual task tracking files
│   ├── conventions/                         # UI/UX interaction standards
│   │   └── UI_CONVENTIONS.md                # System-wide design rules & metrics
│   ├── page-specs/                          # Functional & UX page specifications
│   │   └── _TEMPLATE.md                     # Standard page specification template
│   ├── research/                            # Competitive & pattern research per page
│   ├── architecture/                        # Frontend system architecture documents
│   └── summaries/                           # Release and milestone summaries
├── design/                                  # Design system tokens & prototype sandbox
│   ├── reference/                           # Single source of truth for visual tokens
│   │   ├── tokens.css                       # Semantic CSS custom properties
│   │   ├── tailwind.preset.js               # Shared Tailwind theme preset
│   │   ├── reference.html                   # Visual token & component inspector
│   │   └── CHANGELOG.md                     # Design token change history
│   ├── tools/                               # Token validation scripts
│   │   └── check-tokens.mjs                 # Linter for token violations & raw values
│   └── prototypes/                          # Standalone HTML prototypes (v1-v4)
└── src/                                     # Application source code (initialized in build phase)
```

---

## 2. Technical Stack Baseline (Approved via DEC-001 - DEC-010)

- **Framework**: React 19 / 18 + TypeScript + Vite.
- **Styling**: Tailwind CSS + `design/reference/tokens.css` + `design/reference/tailwind.preset.js`.
- **Primitives**: Headless UI Primitives (Radix UI / `@radix-ui/*`) + Lucide React.
- **Routing**: Client-side SPA routing (TanStack Router / React Router).
- **State Management**: TanStack Query v5 (server cache & async states) + Zustand (client UI/run state).
- **Forms & Validation**: React Hook Form + Zod.
- **Testing**: Vitest + React Testing Library + Mock Service Worker (MSW).
- **Tooling & Package Manager**: `pnpm` (Node v24).

---

## 3. Core Domain Concepts & Visual Language

- **Test Execution States**:
  - `queued`: Enqueued in background worker queue.
  - `running`: Actively executing against target API.
  - `passed`: Deterministic assertion passed.
  - `failed`: Deterministic assertion failed (API behavior mismatch).
  - `error`: Infrastructure/runtime failure (network timeout, worker crash, DB disconnect).
  - `retrying`: Bounded retry in progress.
  - `recovered`: Interrupted run safely recovered and completed.
  - `uncertain`: Target may have received request but result was unconfirmed; requires explicit resolution.
- **Separation of Concerns**:
  - AI proposals (suggestions, failure explanations) are strictly segregated visually from deterministic test validation results. AI outputs are never represented as proof of correctness.
- **Security UX**:
  - Target URL validation is server-side enforced (private/loopback/cloud metadata restricted).
  - No plain-text secrets in client state, localStorage, or application bundles.

---

## 4. Entry Points & Key Files

- Primary Entry: `AGENTS.md`
- Operating Manual: `docs/orchestration/OPERATING_MANUAL.md`
- Tokens: `design/reference/tokens.css`
- Token Validator: `design/tools/check-tokens.mjs`

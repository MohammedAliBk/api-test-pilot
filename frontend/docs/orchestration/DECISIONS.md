# DECISIONS.md — Architecture Decision Records (ADR)

This document is the chronological log of all architectural, library, schema, and design decisions made for the API Test Pilot frontend. Decisions are immutable; superseded decisions are marked with a reference to the superseding decision.

---

### DEC-001: UI Language & Localization Strategy
- **Date**: 2026-10-24
- **Related Task**: TASK-001
- **Question**: What language strategy should the frontend UI adopt?
- **Options Considered**:
  1. English UI first with architectural readiness for Arabic/RTL (Recommended).
  2. Arabic-first UI with RTL layout.
  3. Full bilingual (English + Arabic) with language toggle from day one.
- **Decision**: Option 1. English-first for developer tool usability, with architecture structured for seamless Arabic/RTL localization (font tokens, bidi isolation `<bdi>`, logical CSS properties).
- **Rationale**: API Test Pilot is primarily a developer and QA engineering platform. Standardizing on English simplifies integration with OpenAPI specifications and code viewers while retaining full architectural support for RTL localization.
- **Consequences**: User copy in code defaults to English; numeric figures and status tags must use `<bdi>` and `tabular-nums`.

---

### DEC-002: Theme Support & Default Color Mode
- **Date**: 2026-10-24
- **Related Task**: TASK-001
- **Question**: What themes should be supported and what is the default mode?
- **Options Considered**:
  1. Dual theme (Dark & Light) via CSS variables, Dark mode as default (Recommended).
  2. Dark mode only.
  3. Light mode only.
- **Decision**: Option 1. Support both Dark and Light themes using semantic CSS variables in `tokens.css`, with Dark mode as the default.
- **Rationale**: Modern API testing tools (Postman, Bruno, Insomnia) default to dark surfaces for prolonged technical sessions, while supporting light mode for accessibility compliance.
- **Consequences**: All tokens in `tokens.css` must provide explicit, high-contrast values for both `:root` (dark default) and `[data-theme="light"]`.

---

### DEC-003: Design Token Baseline & Designer Collaboration
- **Date**: 2026-10-24
- **Related Task**: TASK-001
- **Question**: How should design tokens be established prior to receiving formal assets from Hamdi Mohamed (UI/UX)?
- **Options Considered**:
  1. Draft comprehensive engineering tokens based on modern developer tool best practices and refine upon designer delivery (Recommended).
  2. Block frontend design until Figma assets are finalized.
- **Decision**: Option 1. Establish an engineering baseline in `tokens.css`, `tailwind.preset.js`, and `reference.html`. Reconcile tokens with Hamdi's Figma designs once delivered.
- **Rationale**: Enables immediate frontend scaffolding and prototyping without creating blockers.
- **Consequences**: Any future token adjustments will be managed via the `/update-tokens` workflow and recorded as subsequent DECs.

---

### DEC-004: UI Component Architecture
- **Date**: 2026-10-24
- **Related Task**: TASK-001
- **Question**: Which component library architecture should the frontend adopt?
- **Options Considered**:
  1. Headless primitives (Radix UI / `@radix-ui/*`) styled via Tailwind CSS preset + Lucide React (Recommended).
  2. Tailwind CSS pure custom without headless primitives.
  3. Full-featured component library (MUI / Mantine).
- **Decision**: Option 1. Headless UI primitives (Radix UI) combined with Tailwind CSS preset and Lucide React icons.
- **Rationale**: Provides uncompromised accessibility (keyboard navigation, focus trapping, ARIA roles) without styling constraints or bundle bloat, ensuring 100% adherence to our tokens.
- **Consequences**: Primitives are wrapped inside `src/components/ui/` enforcing the 36px control metric.

---

### DEC-005: Target Devices & Breakpoint Strategy
- **Date**: 2026-10-24
- **Related Task**: TASK-001
- **Question**: What viewports and breakpoint conventions should be supported?
- **Options Considered**:
  1. Desktop-first (1280px+ / 1440px+) with a single responsive shell breakpoint at 900px (Recommended).
  2. Mobile-first with ad-hoc breakpoints.
- **Decision**: Option 1. Desktop-first optimization with a clean responsive transition at `900px` (`min-[901px]:...` for desktop shell, `<=900px` for mobile drawer/stacked layout).
- **Rationale**: Dense technical layouts (API specifications, parameter trees, execution logs, JSON diffs) require desktop canvas space. A single shell breakpoint eliminates layout jitter.
- **Consequences**: Ad-hoc `sm:` or `md:` container switches are disallowed; layouts strictly pivot at 900px.

---

### DEC-006: Core Technical Stack & State Management
- **Date**: 2026-10-24
- **Related Task**: TASK-001
- **Question**: Which core libraries should power routing, data fetching, forms, and testing?
- **Options Considered**:
  1. React 19/18 + Vite + TanStack Query v5 + Zustand + React Hook Form + Zod + Vitest + MSW (Recommended).
  2. Alternative stack.
- **Decision**: Option 1. Vite SPA architecture with TanStack Query v5 for server state, Zustand for client UI/execution state, React Hook Form + Zod for validation, Vitest + MSW for testing.
- **Rationale**: High performance, strict TypeScript support, excellent developer experience, and decoupling of server cache from client UI state.
- **Consequences**: API calls must run through TanStack Query hooks; tests run via Vitest.

---

### DEC-007: Project-Wide UI/UX Conventions Seed
- **Date**: 2026-10-24
- **Related Task**: TASK-001
- **Question**: What foundational metrics and interaction conventions should govern all UI pages?
- **Options Considered**:
  1. Approved baseline: 36px control metric, `--color-primary` border focus, 6px/10px/14px radii, tabular numbers, domain test-state tokens (Recommended).
  2. Page-local custom metrics.
- **Decision**: Option 1. Codify standard interaction rules in `docs/conventions/UI_CONVENTIONS.md`.
- **Rationale**: Guarantees consistency across every screen and eliminates arbitrary styling decisions.
- **Consequences**: Reviewer and Quality stages enforce the 36px metric and token rules as build blockers.

---

### DEC-008: Page Pipeline Roadmap
- **Date**: 2026-10-24
- **Related Task**: TASK-001
- **Question**: In what order should frontend views be designed and built?
- **Options Considered**:
  1. 1. Import Spec -> 2. Endpoint Explorer -> 3. Generated Tests Review/Edit -> 4. Run Configuration & Live View -> 5. Results & Failure Analysis (Recommended).
  2. Alternative sequence.
- **Decision**: Option 1. Follow the natural domain workflow: Import -> Explore -> Review -> Execute -> Analyze.
- **Rationale**: Matches the platform workflow outlined in `README.MD` and allows progressive integration with backend contracts.
- **Consequences**: First feature task following TASK-001/TASK-002 will be the Import Spec pipeline.

---

### DEC-009: Git Branch Strategy for TASK-001
- **Date**: 2026-10-24
- **Related Task**: TASK-001
- **Question**: On which branch should TASK-001 be executed?
- **Options Considered**:
  1. Continue on the active `chore/frontend-agent-setup` branch (Recommended).
  2. Create a new branch `chore/fe-setup`.
- **Decision**: Option 1. Continue on `chore/frontend-agent-setup` and merge via PR upon Gate G3 approval.
- **Rationale**: Avoids branch fragmentation and directly fulfills the purpose of the checked-out branch.
- **Consequences**: Commits are made directly on `chore/frontend-agent-setup`.

---

### DEC-010: Bootstrap Commit & Scaffolding Strategy
- **Date**: 2026-10-24
- **Related Task**: TASK-001
- **Question**: How should scaffolding files be committed?
- **Options Considered**:
  1. Structured Conventional Commits strictly scoped to `frontend/` (Recommended).
  2. Single bulk commit.
- **Decision**: Option 1. Structured Conventional Commits (`chore:`, `docs:`) with explicit `frontend/` staging paths.
- **Rationale**: Ensures transparent history and strict adherence to the scope lock rule.
- **Consequences**: Git staging is executed via `git add frontend/...`, never `git add -A`.

# TASK-008: Auth Page — Login & Registration Pipeline (Spec, Research, Prototypes, Gate GD & React Implementation)

- **Status**: REVIEW
- **Created**: 2026-11-17   **Started**: 2026-11-17   **Completed**: 2026-11-17
- **Branch**: `feat/fe-auth-page`   **Target version**: `0.0.1-alpha`
- **Requested by**: Memo   **Approved plan**: yes (Design Pipeline, Prototypes & shadcn/ui Implementation)
- **Type**: feature / auth

---

## Goal & Scope (and Out-of-Scope)

- **Goal**: Deliver a complete, production-ready authentication and registration experience for API Test Pilot adhering to the 5-Step Design Pipeline and integrating with the live .NET 10 Web API (`https://mohamed1551.runasp.net/scalar/#description/introduction`).
- **In-Scope**:
  1. **Page Specification**: `docs/page-specs/auth.md` detailing user goals, information architecture, OpenAPI contracts, and all 5 UI states.
  2. **Design Research**: `docs/research/auth.md` benchmarking Clerk, Supabase, Linear, Postman, and Vercel.
  3. **4 Standalone HTML Prototypes**: Built under `design/prototypes/auth/`:
     - `v1.html`: Split-screen brand showcase with live test runner telemetry.
     - `v2.html`: Obsidian centered glass card (minimalist & frictionless).
     - `v3.html`: Interactive dual-pane sliding deck with kinetic transitions.
     - `v4.html`: Terminal & bento developer workflow with live cURL previews.
     - `index.html`: Multi-device comparison launcher and responsive preview frame.
     - `NOTES.md`: Evaluation matrix, trade-offs, and Gate GD recommendation.
  4. **Design Gate GD**: Presented directions to Memo in Egyptian Arabic; Memo approved the dual-pane layout with full-viewport Laser Matrix WebGL and iridescent wave overlay (`chosen.html`).
  5. **shadcn/ui Setup & Standardization (DEC-016)**:
     - Configured `components.json` with TanStack React Vite guidelines.
     - Installed shadcn primitives in `src/components/ui/`: `Button`, `Card`, `Checkbox`, `Input`, `Label`, `Tabs`.
     - Standardized strict rule in `AGENTS.md`, `UI_CONVENTIONS.md`, and `.agents/rules/frontend-design.md`.
  6. **React Implementation (`src/features/auth/`)**:
     - `types.ts`: Domain models (`User`, `AuthResponse`, `LoginCredentials`, `RegisterCredentials`, `ProblemDetails`, `AuthMode`).
     - `api/authApi.ts`: Fetch client supporting `/api/Auth/login`, `/api/Auth/register`, `/api/Auth/firebase-login`, `/api/Auth/me` with RFC 7807 error parsing (`AuthApiError`).
     - `hooks/useAuth.ts`: TanStack Query mutation hook with local session persistence.
     - `components/MatrixJunctionCanvas.tsx`: Raw WebGL canvas with 100% viewport coverage.
     - `components/AuthAtmosphere.tsx`: Viewport background stack with canvas, masked iridescent ribbon wave texture, and right-side blend.
     - `components/AuthCard.tsx`: Form card using shadcn UI primitives, inline mode switch, RFC 7807 problem details alert, password strength indicator, and Google SSO button.
     - `components/AuthLayout.tsx`: Dual-pane layout with desktop left-side branding and top-right theme switcher (dark/light).
     - `pages/AuthPage.tsx`: Top-level page coordinating `useAuth`, `AuthLayout`, and `AuthCard`.
  7. **Testing & Quality**:
     - Unit tests for `authApi`, `AuthCard`, `AuthPage`, and `App`.
     - 19/19 tests passing green.
     - Zero token violations across 34 files (`node design/tools/check-tokens.mjs`).
     - Zero TypeScript errors (`pnpm type-check`).
     - Clean production build (`pnpm build`).
- **Out-of-Scope**:
  - Any writes outside `frontend/` (backend remains untouched on remote host).

---

## Acceptance Criteria

1. [x] Page specification (`docs/page-specs/auth.md`) and research document (`docs/research/auth.md`) complete.
2. [x] 4 standalone HTML prototypes (`v1.html` through `v4.html`) and comparison launcher (`index.html`) created in `design/prototypes/auth/`.
3. [x] Prototypes double-clickable without a server, linking `tokens.css` and using `tailwind.preset.js`.
4. [x] State switcher functional across all 5 states: Default, Loading, Validation, Error (401/409 ProblemDetails), and SSO Pending.
5. [x] Zero design token violations (`node design/tools/check-tokens.mjs` passes with 0 violations).
6. [x] Gate GD choice made by Memo and recorded in `chosen.html`.
7. [x] React implementation matching `chosen.html` 1:1 with 100% green tests, type-check, and build.

---

## Decisions Taken

- [DEC-015](file:///Volumes/disk1/Projects/api-test-pilot/frontend/docs/orchestration/DECISIONS.md#dec-015-authentication--account-management-architecture--prototype-matrix): Authentication & Account Management Architecture & Prototype Matrix.
- [DEC-016](file:///Volumes/disk1/Projects/api-test-pilot/frontend/docs/orchestration/DECISIONS.md#dec-016-shadcnui-tanstack-component-standardization): shadcn/ui TanStack React Vite Component Standardization.

---

## Implementation Log

- 2026-11-17: Inspected .NET 10 Scalar backend OpenAPI specification at `https://mohamed1551.runasp.net/openapi/v1.json`. Extracted schemas for `RegisterCommand`, `LoginCommand`, `FirebaseLoginCommand`, `AuthResponse`, and RFC 7807 `ProblemDetails`.
- 2026-11-17: Created branch `feat/fe-auth-page`.
- 2026-11-17: Authored `docs/page-specs/auth.md` following project standard template.
- 2026-11-17: Authored `docs/research/auth.md` surveying Clerk, Supabase, Linear, Postman, and Vercel.
- 2026-11-17: Implemented `design/prototypes/auth/v1.html` through `v4.html` and launcher `index.html`.
- 2026-11-17: Refined `v1.html` based on Memo's exact feedback: removed top segmented tab bar, replaced with clean inline link; replaced mark with official Vector Arrow SVG matching `favicon.svg` and `Logo.tsx`; eliminated hard divider line; extended WebGL Matrix Laser canvas across 100% of viewport with smooth iridescent wave texture and right-side continuous gradient blend; fixed light-mode washout bug.
- 2026-11-17: Passed Gate GD: copied `v1.html` -> `chosen.html`.
- 2026-11-17: Installed and configured shadcn/ui components (`Button`, `Card`, `Checkbox`, `Input`, `Label`, `Tabs`) according to TanStack guidelines. Recorded DEC-016.
- 2026-11-17: Implemented production React authentication modules under `src/features/auth/` using shadcn primitives, TanStack React Query mutation hooks, and RFC 7807 ProblemDetails handling.
- 2026-11-17: Wrote unit and integration tests (`AuthCard.test.tsx`, `authApi.test.ts`, `AuthPage.test.tsx`, `App.test.tsx`).
- 2026-11-17: Executed verification suite:
  - `node design/tools/check-tokens.mjs`: 34/34 files compliant (0 violations, 100% green).
  - `pnpm type-check`: 0 errors (100% green).
  - `pnpm test`: 4/4 test files passed, 19/19 tests passed (100% green).
  - `pnpm build`: built production bundle in 10.52s (100% green).
- 2026-11-17: Refined UI and Auth setup per Memo's instructions:
  - Removed textual bullet criteria (`• 8+ chars`, `• Uppercase`, `• Number/Symbol`); enhanced visual 3-stage color strength bars (Red = Weak, Yellow = Medium, Green = Strong).
  - Removed floating dev navigation tab from bottom of viewport; configured `App.tsx` so `AuthPage` is the direct initial landing experience if not authenticated, transitioning automatically to the application upon login, with header sign-out.
  - Implemented dynamic inversion effect on the word "faster" (`mix-blend-mode: difference; text-white`) so it inverts underlying laser beams and wave patterns in real-time.
  - Integrated Firebase & Google Single Sign-On setup (`src/lib/firebase.ts`, `.env.example`, `.env`) with backend handoff to `POST /api/Auth/firebase-login`.
  - Re-ran verification suite: 35/35 files compliant with tokens, 0 type errors, 18/18 tests passed, and built in 7.39s (100% green).

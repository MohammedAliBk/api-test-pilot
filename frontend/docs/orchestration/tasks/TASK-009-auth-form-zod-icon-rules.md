# TASK-009: Auth Form Pipeline — React Hook Form, Zod Validation & Responsive Icon Sizing Rules

- **Status**: DONE
- **Created**: 2026-11-19   **Started**: 2026-11-19   **Completed**: 2026-11-19
- **Branch**: `feat/fe-auth-form-zod`   **Target version**: `0.0.1-alpha`
- **Requested by**: Memo   **Approved plan**: yes (Gate G1 approved: show errors on submit, shrink-proof icon sizing rules)
- **Type**: feature / auth / conventions

---

## Goal & Scope

- **Goal**:
  1. Add and enforce responsive icon sizing and shrink-proofing rules across `AGENTS.md`, `.agents/rules/core-rules.md`, and `UI_CONVENTIONS.md`.
  2. Implement shadcn/ui `Form` component (`src/components/ui/form.tsx`) using `react-hook-form` + `@hookform/resolvers/zod`.
  3. Define Zod schemas for authentication (`src/features/auth/schemas/authSchemas.ts`).
  4. Refactor `AuthCard.tsx` to use `useForm` with Zod validation showing errors on submit (`mode: 'onSubmit'`).
  5. Ensure unit tests pass 100% and tokens are fully compliant.

- **In-Scope**:
  - `AGENTS.md`: Add icon sizing rule.
  - `.agents/rules/core-rules.md`: Add icon sizing rule.
  - `docs/conventions/UI_CONVENTIONS.md`: Add icon sizing rule and token metrics.
  - `src/components/ui/form.tsx`: shadcn/ui Form primitive.
  - `src/features/auth/schemas/authSchemas.ts`: Zod validation schemas for Sign In and Sign Up.
  - `src/features/auth/components/AuthCard.tsx`: Form refactoring to React Hook Form + Zod (`mode: 'onSubmit'`).
  - `src/features/auth/__tests__/AuthCard.test.tsx`: Test updates for React Hook Form + Zod.
  - `docs/orchestration/TASKS.md`: Task status tracking.

- **Out-of-Scope**:
  - Writing outside `frontend/`.
  - Backend modifications.

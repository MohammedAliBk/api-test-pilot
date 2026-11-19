# TASK-010: Home Page & App Shell Pipeline (Sidebar, Navigation & Routing)

- **Status**: DONE
- **Created**: 2026-11-19   **Started**: 2026-11-19   **Completed**: 2026-11-19
- **Branch**: `feat/fe-home-shell`   **Target version**: `0.0.1-alpha`
- **Requested by**: Memo   **Approved plan**: Yes (Memo explicit directive)
- **Type**: feature / shell / page / routing

---

## Goal & Scope

- **Goal**: Deliver a production-grade Application Shell (shadcn Collapsible Sidebar, Header, User Profile Navigation), Home Page (sleeping-head Lottie animation & waiting state), Legal Pages (Terms of Service, Privacy Policy), and TanStack Router client-side routing.
- **Completed Deliverables**:
  1. **Shell Infrastructure**:
     - Official shadcn collapsible sidebar (`collapsible="icon"`, `SidebarProvider`, `SidebarInset`, `SidebarRail`, `SidebarTrigger`).
     - Brand header with logo, workspace group `Platform Workspace` (Overview, OpenAPI Specs [Soon], Test Matrix, AI Recovery [AI], Secrets & Keys, Settings).
     - User footer card (`NavUser`) rendering authenticated user's display name, email, dynamic initials avatar, and log out affordance.
  2. **Home Page**:
     - Centered Lottie sleeping-head vector animation (`sleeping-head-L617p2W31T`).
     - Status headline: *"Waiting for Backend and AI to finish work"*.
  3. **Legal Pages**:
     - Standalone Terms of Service (`/terms`) and Privacy Policy (`/privacy`) pages.
     - Responsive 50/50 equal-width action buttons with `shrink-0` icons and zero horizontal scroll.
  4. **Client-Side Routing & Route Guards**:
     - Fully migrated to `@tanstack/react-router` with clean URLs (`/`, `/login`, `/terms`, `/privacy`) without hash `#`.
     - Route guards: `/` is protected and redirects unauthenticated users to `/login`. `/login` redirects authenticated users to `/`.
  5. **Verification**:
     - `check-tokens.mjs`: 0 violations across 50 scanned files.
     - `tsc --noEmit`: 0 TypeScript errors.
     - `vitest run`: 23/23 tests passed.
     - `vite build`: Production build succeeded in 9.21s.

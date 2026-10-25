---
name: frontend-architecture
description: >-
  Use this skill when designing, reviewing, or structuring frontend application modules,
  routing, state management, directory conventions, and component boundaries.
---

# Frontend Architecture Guide

This skill governs the high-level structural decisions of the API Test Pilot frontend.

## 1. Directory Conventions

All frontend source lives in `src/`:
- `src/components/ui/`: Base design system components (buttons, inputs, dialogs, badges).
- `src/components/domain/`: Domain-specific components (test status badges, endpoint list, execution log).
- `src/features/<feature-name>/`: Feature slices containing pages, feature components, hooks, and API queries.
- `src/hooks/`: Reusable application hooks.
- `src/lib/`: Core utilities, query client, formatting, and HTTP client.
- `src/store/`: Client-side Zustand stores (UI layout, run execution viewer).
- `src/types/`: TypeScript interfaces and OpenAPI generated contracts.

## 2. State Partitioning Strategy

- **Server State**: Managed via TanStack Query v5 (`useQuery`, `useMutation`). Do not mirror server state into Zustand.
- **Client UI State**: Managed via Zustand stores or React state for modals, active drawer tabs, filters, and local search inputs.
- **Execution Run State**: Streaming or polled execution updates stored in a dedicated run store to power the Live Run View.

## 3. Dependency & Contract Verification

Before adding or updating dependencies:
1. Verify with Memo (Gate G1 / G2).
2. Check license, maintenance status, and bundle footprint.
3. Record the choice in `docs/orchestration/DECISIONS.md`.

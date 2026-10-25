---
name: page-implementation
description: >-
  Use this skill when translating an approved prototype (chosen.html) into production
  React and TypeScript code under src/.
---

# Page Implementation Skill

This skill governs Step 4 of the Design Pipeline: translating the chosen prototype into production React.

## 1. Prerequisites (Strict)

- Page Spec exists in `docs/page-specs/<slug>.md`.
- Research note exists in `docs/research/<slug>.md`.
- Gate GD passed: Memo has reviewed `v1` to `v4` and chosen one as `chosen.html`.
- Task status is `IN_PROGRESS` on an approved branch.

## 2. Component Mapping Rules

1. Map HTML prototype containers 1:1 to React components under `src/features/<slug>/components/`.
2. Extract reusable primitives into `src/components/ui/` (buttons, badges, inputs) following the 36px control metric.
3. Replace inline mock data with TanStack Query hooks fetching through the API client.
4. Integrate the domain state machine ensuring loading, empty, error, and uncertain states are cleanly rendered.
5. Verify keyboard navigation and ARIA attributes in real rendered output.

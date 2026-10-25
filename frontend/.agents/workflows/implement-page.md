---
name: implement-page
description: Implement React components from an approved prototype (chosen.html) into src/.
---

# Workflow: /implement-page

Use this workflow once Gate GD is approved and `chosen.html` exists.

## Steps

1. Verify `design/prototypes/<slug>/chosen.html` exists and matches Memo's approved selection.
2. Verify task branch is active (`feat/fe-<slug>`).
3. Build page components under `src/features/<slug>/components/`.
4. Build page route / screen under `src/features/<slug>/pages/`.
5. Integrate hooks and state in `src/features/<slug>/hooks/` and TanStack Query client.
6. Verify 36px control metric and `--color-primary` border focus affordance.
7. Write unit and component tests under `src/features/<slug>/__tests__/`.
8. Proceed to Stage 3 (Review) of the loop.

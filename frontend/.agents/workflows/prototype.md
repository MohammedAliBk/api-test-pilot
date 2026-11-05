---
name: prototype
description: Build or iterate on the 4 standalone HTML prototypes for an existing page spec.
---

# Workflow: /prototype

Use this workflow to build or refine prototypes in `design/prototypes/<slug>/`.

## Steps

1. Read `docs/page-specs/<slug>.md` and `docs/research/<slug>.md`.
2. Ensure `design/reference/tokens.css` has all required tokens.
3. Create or update in `design/prototypes/<slug>/`:
   - `v1.html`: First distinct layout/information architecture.
   - `v2.html`: Second distinct layout/interaction model.
   - `v3.html`: Third distinct layout/workflow.
   - `v4.html`: Fourth distinct layout/density model.
   - `index.html`: Interactive launcher/comparison switcher.
   - `NOTES.md`: Strengths, trade-offs, and research inspiration.
4. Verify every prototype includes the state switcher (`Default`, `Loading`, `Empty`, `Error`, `Uncertain`).
5. Run `node design/tools/check-tokens.mjs`.
6. Present the prototypes to Memo for Gate GD review.

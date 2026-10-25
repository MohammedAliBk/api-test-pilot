---
name: design-prototype
description: >-
  Use this skill when building the 4 standalone HTML prototypes, state switchers,
  and comparison index pages under design/prototypes/<slug>/.
---

# Design Prototype Skill

This skill defines the requirements for building interactive HTML prototypes before implementing React components.

## 1. Prototype Structure

For every page `<slug>`, generate in `design/prototypes/<slug>/`:
- `v1.html`: Direction 1 (e.g. Master-detail split view).
- `v2.html`: Direction 2 (e.g. Table-first dense view).
- `v3.html`: Direction 3 (e.g. Step-based card workflow).
- `v4.html`: Direction 4 (e.g. Timeline / canvas view).
- `index.html`: Interactive comparison launcher allowing side-by-side evaluation.
- `NOTES.md`: Rationale, strengths, trade-offs, and research references for each direction.

## 2. Mandatory Prototype Capabilities

1. **Standalone Execution**: Double-clickable in any browser without a build step or server.
2. **Token Linkage**: Includes `../../reference/tokens.css` and imports Tailwind CDN configured with `../../reference/tailwind.preset.js`.
3. **State Switcher**: A fixed floating controller toggling:
   - `Default` (healthy populated view).
   - `Loading` (skeleton / pulse).
   - `Empty` (first-time experience).
   - `Error` (failure banner / retry).
   - `Uncertain / Domain state` (worker interruption / pending recovery).
4. **Realistic Domain Data**: Real HTTP methods, status codes (200, 404, 500), duration metrics, and realistic JSON payloads.
5. **No Token Violations**: Must pass `node design/tools/check-tokens.mjs`.

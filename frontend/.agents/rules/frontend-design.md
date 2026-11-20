# FRONTEND DESIGN PIPELINE & TOKEN RULES

Refer to [UI_CONVENTIONS.md](file:///Volumes/disk1/Projects/api-test-pilot/frontend/docs/conventions/UI_CONVENTIONS.md) and [tokens.css](file:///Volumes/disk1/Projects/api-test-pilot/frontend/design/reference/tokens.css).

## 1. Tokens-Only Policy

1. **Zero Raw Values**: No hardcoded hex (`#ff0000`), rgb/hsl, or arbitrary pixel values in components or CSS.
2. **Preset & Variables**: All colors, radii, spacing, and dimensions must resolve to CSS custom properties defined in `design/reference/tokens.css` or Tailwind classes mapped in `design/reference/tailwind.preset.js`.
3. **Automated Enforcement**: Run `node design/tools/check-tokens.mjs` before declaring any UI stage green. Any raw value violation is a build blocker.

## 2. The 5-Step Design Pipeline for UI Pages

For every page or major UI component:
- **Step 1 — Spec**: Write `docs/page-specs/<slug>.md` using `_TEMPLATE.md` (purpose, data, states, edge cases, a11y).
- **Step 2 — Research**: Write `docs/research/<slug>.md` summarizing 3–6 comparable tools (Postman, Insomnia, Bruno, Swagger UI, Allure Report, etc.).
- **Step 3 — 4 Prototypes**: Build `design/prototypes/<slug>/v1.html` through `v4.html`, `index.html`, and `NOTES.md`. Standalone, double-clickable, linked to `tokens.css`, with realistic data and state switchers.
- **Gate GD — Design Choice**: Present comparison table and recommendation to Memo. Wait for explicit choice. Copy chosen version to `chosen.html`.
- **Step 4 — Implementation**: Build in React + TypeScript under `src/` matching `chosen.html` 1:1.
- **Step 5 — Close**: Update page spec, docs, and changelog.

## 3. Component Library Standard (shadcn/ui via TanStack)

- **Official Source**: All production React UI components and primitives must be sourced directly from **shadcn/ui** following the TanStack / React / Vite guidelines: [https://ui.shadcn.com/docs/installation/tanstack](https://ui.shadcn.com/docs/installation/tanstack).
- **Configuration**: Root `components.json` is configured with path aliases (`@/components/ui`, `@/lib/utils`).
- **Adding Components**: Add components using `pnpm dlx shadcn@latest add <component>`.
- **Location**: Primitives reside under `src/components/ui/` (e.g., `button.tsx`, `card.tsx`, `input.tsx`, `label.tsx`, `checkbox.tsx`, `tabs.tsx`).
- **Token Adaptation**: All shadcn component classes must harmonize with the project's design tokens in `design/reference/tokens.css` and the 36px control metric in `docs/conventions/UI_CONVENTIONS.md`.

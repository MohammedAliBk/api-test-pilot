# UI/UX CONVENTIONS — PROJECT-WIDE INTERACTION STANDARDS

This document is the **single source of truth** for visual and interaction conventions across the API Test Pilot frontend (approved under DEC-007). Every prototype, page implementation, and code review reuses these standards instead of inventing page-local treatments.

---

## 1. Canonical Surfaces & Color Roles

All visual layers resolve to CSS custom properties in `design/reference/tokens.css` (aligned with the landing page visual identity):
- **App Background**: `--color-surface` (`#07080d` Dark / `#f7f9fd` Light).
- **Raised Surfaces (Cards, Modals, Popovers, Drawers)**: `--color-surface-raised` (`#0d1017` Dark / `#ffffff` Light).
- **Subtle / Interactive Accent / Active Table Stripe**: `--color-surface-subtle` (`#141722` Dark / `#edf2f9` Light).
- **Dividers & Structural Borders**: `--color-line` (rgba(255, 255, 255, 0.08) Dark / rgba(0, 0, 0, 0.08) Light).
- **Control Borders (Inputs, Selects, Buttons)**: `--color-line-strong` (rgba(255, 255, 255, 0.16) Dark / rgba(0, 0, 0, 0.18) Light).
- **Primary Brand / Action Accent**: `--color-primary` (`#518eff` Electric Azure / `#2563eb`), hover `--color-primary-hover`, active `--color-primary-active`.
- **Brand Glow Accent**: `--color-primary-glow` (`#8d5ef9` Electric Violet / `#7c3aed`).
- **Brand Gradients**: `.gradient-text` (`linear-gradient(100deg, var(--color-primary), var(--color-primary-glow))`).
- **Domain Test State Colors**:
  - `queued`: Slate (`--color-state-queued-bg`: `#141722`, `--color-state-queued-fg`: `#9ca5ba`, `--color-state-queued-border`: `#282e44`).
  - `running`: Electric Blue pulse (`--color-state-running-bg`: `#0d2042`, `--color-state-running-fg`: `#518eff`, `--color-state-running-border`: `#1c4794`).
  - `passed`: Neon Emerald (`--color-state-passed-bg`: `#052e1b`, `--color-state-passed-fg`: `#26e78d`, `--color-state-passed-border`: `#0f7644`).
  - `failed`: Electric Crimson (`--color-state-failed-bg`: `#380611`, `--color-state-failed-fg`: `#ff4f6b`, `--color-state-failed-border`: `#8f122c`).
  - `error`: Warm Orange (`--color-state-error-bg`: `#381604`, `--color-state-error-fg`: `#fb923c`, `--color-state-error-border`: `#8c3a07`).
  - `retrying`: Warm Amber (`--color-state-retrying-bg`: `#331f05`, `--color-state-retrying-fg`: `#ffba4f`, `--color-state-retrying-border`: `#8c520a`).
  - `recovered`: Electric Violet (`--color-state-recovered-bg`: `#231245`, `--color-state-recovered-fg`: `#8d5ef9`, `--color-state-recovered-border`: `#552bb8`).
  - `uncertain`: Fuchsia / Magenta stripe (`--color-state-uncertain-bg`: `#330c24`, `--color-state-uncertain-fg`: `#f472b6`, `--color-state-uncertain-border`: `#7a1753`).

---

## 2. The 36px Control Metric

All interactive form controls, action buttons, segmented filter tabs, and search inputs strictly adhere to:
- **Height**: Strictly 36px tall (`min-h-[36px]` / `h-9`).
- **Typography**: Strictly **13px bold** (`text-[13px] font-bold`).
- **Padding**: `px-3 py-1.5` (or `px-2.5 py-1.5` with leading icon).
- **Border Radius**: `--radius-control` (`6px` / `rounded-[6px]`).
- **Control Border**: 1px border using `--color-line-strong`.

---

## 3. Focus Affordance

- **Inputs, Selects & Textareas**: The border turns strictly to `--color-primary`. No glowing rings, drop shadows, or page-local halos.
- **Buttons & Focus-Visible**: Native 2px outline using `--color-primary` with 2px offset (`focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2`).

---

## 4. Tactile Feedback & Micro-Interactions

- **Active Press State**: `active:scale-[0.98]` on interactive buttons, segmented option tabs, and chips.
- **Transitions**: Specified interruptible properties with `transition-all duration-150 ease-out` (never un-scoped `transition: all 300ms`).
- **Cursor Rules**: All clickable items have `cursor: pointer`. Disabled controls have `cursor: not-allowed` and `opacity: 0.6`.
- **Reduced Motion**: Under `@media (prefers-reduced-motion: reduce)`, disable scale transforms and set durations to 0ms.

---

## 5. Radii Scale

- **Controls (Inputs, Buttons, Badges, Tabs)**: `--radius-control` (`6px`).
- **Cards, Menus, Popovers, Dropdowns**: `--radius-card` (`10px`).
- **Modals, Side Sheets, Shell Panels**: `--radius-panel` (`14px`).

---

## 6. Card & Container Spacing

- **Standard Card / Container Padding**: `p-4 min-[901px]:p-5` with `rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-surface-raised)]`.
- **Superseded Variants**: Irregular paddings (`p-3`, `p-6`, `p-8`) are superseded.

---

## 7. Responsive Breakpoint

- **Unified Shell Breakpoint**: Layout switches strictly occur at **`900px`** (`min-[901px]:...` for desktop shell, `<=900px` for mobile stacked layout).
- **Rule**: No ad-hoc `sm:` (640px) or `md:` (768px) container switches.

---

## 8. Typography, Numeric Formatting & Code

- **Display & Brand Headings**: Space Grotesk (`var(--font-display)`), sans-serif.
- **Primary UI Font**: Inter (`var(--font-sans)`), system-ui, -apple-system, sans-serif.
- **Code & Monospace Font**: JetBrains Mono (`var(--font-mono)`), ui-monospace, SFMono-Regular, monospace.
- **Financial / Metric Numbers**: Always use `tabular-nums` wrapped in `<bdi>` (e.g. `<bdi className="tabular-nums">245 ms</bdi>`).
- **Headings**: Roman style (`font-style: normal`), with subtle gradient accents (`.gradient-text`) for key hero highlights.

---

## 9. Data Tables & Execution Lists

- **Text Alignment**: Strictly `text-start` for endpoint paths, test names, categories, and descriptions.
- **Row Padding**: `px-3.5 py-2.5` to `py-3` with subtle 1px divider `border-b border-[var(--color-line)]`.
- **Row Density**:
  - Compact: `py-1.5 text-[12px]`.
  - Comfortable (default): `py-2.5 text-[13px]`.
- **State Indicators**: Every row displays a dedicated Status Badge using domain test state tokens.

---

## 10. Component Library Standard (shadcn/ui via TanStack)

- **Official Source**: All production React UI primitives must be sourced from **shadcn/ui** ([https://ui.shadcn.com/docs/installation/tanstack](https://ui.shadcn.com/docs/installation/tanstack)).
- **Component Directory**: Primitives reside under `src/components/ui/` (`button.tsx`, `card.tsx`, `input.tsx`, `label.tsx`, `checkbox.tsx`, `tabs.tsx`).
- **CLI Management**: Add components via `pnpm dlx shadcn@latest add <component>`.
- **Integration**: Primitives strictly adhere to the project's design tokens in `design/reference/tokens.css` and the 36px control metric (`min-h-[36px]` / `h-9`).

---

## 11. Icon Metrics & Responsive Shrink-Proof Standard

- **Canonical Icon Sizes**:
  - `icon-sm`: 14px (`w-3.5 h-3.5`) for secondary inline badges, small buttons, and table indicators.
  - `icon-md`: 16px (`w-4 h-4`) standard for 36px inputs, buttons, and status icons.
  - `icon-lg`: 20px (`w-5 h-5`) for card headers, banner alerts, and section titles.
- **Mandatory `shrink-0`**:
  - Every icon placed inside a flex row, button, or input adornment must declare `shrink-0` (`[&_svg]:shrink-0`) to prevent squishing or aspect-ratio distortion on compact viewports.
- **Mobile Viewport Auditing (320px - 375px)**:
  - Button text and adjacent icons must never induce horizontal scrolling (`overflow-x`).
  - When viewport space is constrained, prefer responsive truncation or label hiding (`hidden sm:inline` with `sr-only` screen-reader text) rather than allowing elements to expand beyond viewport width. Minimum interactive touch target remains 36px.

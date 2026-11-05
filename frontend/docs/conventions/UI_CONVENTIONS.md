# UI/UX CONVENTIONS — PROJECT-WIDE INTERACTION STANDARDS

This document is the **single source of truth** for visual and interaction conventions across the API Test Pilot frontend (approved under DEC-007). Every prototype, page implementation, and code review reuses these standards instead of inventing page-local treatments.

---

## 1. Canonical Surfaces & Color Roles

All visual layers resolve to CSS custom properties in `design/reference/tokens.css`:
- **App Background**: `--color-surface` (`#0f1117` Dark / `#f8fafc` Light).
- **Raised Surfaces (Cards, Modals, Popovers, Drawers)**: `--color-surface-raised` (`#181b23` Dark / `#ffffff` Light).
- **Subtle / Interactive Accent / Active Table Stripe**: `--color-surface-subtle` (`#222631` Dark / `#f1f5f9` Light).
- **Dividers & Structural Borders**: `--color-line` (1px, `#2d323f` Dark / `#e2e8f0` Light).
- **Control Borders (Inputs, Selects, Buttons)**: `--color-line-strong` (`#404756` Dark / `#cbd5e1` Light).
- **Primary Brand / Action Accent**: `--color-primary` (`#3b82f6` Blue / `#2563eb`), hover `--color-primary-hover`, active `--color-primary-active`.
- **Domain Test State Colors**:
  - `queued`: Slate (`--color-state-queued-bg`, `--color-state-queued-fg`, `--color-state-queued-border`).
  - `running`: Cyan / Blue pulse (`--color-state-running-bg`, `--color-state-running-fg`, `--color-state-running-border`).
  - `passed`: Emerald green (`--color-state-passed-bg`, `--color-state-passed-fg`, `--color-state-passed-border`).
  - `failed`: Rose / Red (`--color-state-failed-bg`, `--color-state-failed-fg`, `--color-state-failed-border`).
  - `error`: Amber / Orange (`--color-state-error-bg`, `--color-state-error-fg`, `--color-state-error-border`).
  - `retrying`: Yellow (`--color-state-retrying-bg`, `--color-state-retrying-fg`, `--color-state-retrying-border`).
  - `recovered`: Purple / Violet (`--color-state-recovered-bg`, `--color-state-recovered-fg`, `--color-state-recovered-border`).
  - `uncertain`: Fuchsia / Magenta stripe (`--color-state-uncertain-bg`, `--color-state-uncertain-fg`, `--color-state-uncertain-border`).

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

- **Primary UI Font**: Inter, system-ui, -apple-system, sans-serif.
- **Code & Monospace Font**: JetBrains Mono, ui-monospace, SFMono-Regular, monospace.
- **Financial / Metric Numbers**: Always use `tabular-nums` wrapped in `<bdi>` (e.g. `<bdi className="tabular-nums">245 ms</bdi>`).
- **Headings**: Roman style (`font-style: normal`), no italic display headings.

---

## 9. Data Tables & Execution Lists

- **Text Alignment**: Strictly `text-start` for endpoint paths, test names, categories, and descriptions.
- **Row Padding**: `px-3.5 py-2.5` to `py-3` with subtle 1px divider `border-b border-[var(--color-line)]`.
- **Row Density**:
  - Compact: `py-1.5 text-[12px]`.
  - Comfortable (default): `py-2.5 text-[13px]`.
- **State Indicators**: Every row displays a dedicated Status Badge using domain test state tokens.

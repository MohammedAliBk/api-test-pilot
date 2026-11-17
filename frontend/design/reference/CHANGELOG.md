# Design Tokens Changelog

All notable changes to the API Test Pilot design token system will be documented here.

---

## [1.1.0] - 2026-11-17

### Added
- Synchronized design tokens with the official landing page brand (`api-test-pilot-landing.lovable.app`).
- Extracted brand colors:
  - Electric Azure Primary (`--color-primary`: `#518eff` / `oklch(66.4% 0.182 261.7)`).
  - Electric Violet Glow (`--color-primary-glow`: `#8d5ef9` / `oklch(61.3% 0.219 292.7)`).
  - Deep Obsidian workspace palette (`--color-surface`: `#07080d`, `--color-surface-raised`: `#0d1017`, `--color-surface-subtle`: `#141722`).
  - Crisp text contrast (`--color-text-primary`: `#f7f9fe`, `--color-text-secondary`: `#9ca5ba`).
  - High-saturation status colors (`--color-success`: `#26e78d`, `--color-warning`: `#ffba4f`, `--color-danger`: `#ff4f6b`).
- Added typography tokens for `font-display` (`Space Grotesk`).
- Added glow and elevation shadows: `--shadow-hero`, `--shadow-glow`, `--shadow-glow-purple`, `--shadow-card`.
- Added ambient grid utility `.bg-grid` and brand gradient utility `.gradient-text`.

---

## [1.0.0] - 2026-10-24

### Added
- Initial baseline of CSS custom properties in `tokens.css`.
- Dual theme support: Dark default (`:root`) and Light theme (`[data-theme="light"]`).
- Full domain test execution state tokens: `queued`, `running`, `passed`, `failed`, `error`, `retrying`, `recovered`, and `uncertain`.
- Standard 36px control metric and 6px/10px/14px radii tokens.
- Shared Tailwind configuration preset in `tailwind.preset.js`.
- Interactive token and component inspector in `reference.html`.
- Token linting tool in `design/tools/check-tokens.mjs`.

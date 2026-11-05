# Design Tokens Changelog

All notable changes to the API Test Pilot design token system will be documented here.

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

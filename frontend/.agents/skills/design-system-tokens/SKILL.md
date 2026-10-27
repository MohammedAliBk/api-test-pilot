---
name: design-system-tokens
description: >-
  Use this skill when inspecting, creating, updating, or validating design tokens,
  CSS custom properties, Tailwind presets, and visual component references.
---

# Design System Tokens Guide

This skill governs the visual foundations of the application.

## 1. Source of Truth

- CSS Custom Properties: `design/reference/tokens.css`
- Shared Tailwind Preset: `design/reference/tailwind.preset.js`
- Visual Inspector: `design/reference/reference.html`
- Changelog: `design/reference/CHANGELOG.md`

## 2. Token Categories

1. **Surfaces & Layout**:
   - `--color-surface`: Default app background.
   - `--color-surface-raised`: Elevated cards, panels, modals.
   - `--color-surface-subtle`: Hover rows, subtle stripe accents.
   - `--color-line`: 1px structural dividers.
   - `--color-line-strong`: Input borders.
2. **Text & Content**:
   - `--color-text-primary`, `--color-text-secondary`, `--color-text-muted`.
3. **Brand & Semantic Actions**:
   - `--color-primary`, `--color-primary-hover`, `--color-primary-active`, `--color-primary-subtle`.
4. **Test States (Domain Invariants)**:
   - Queued, Running, Passed, Failed, Error, Retrying, Recovered, Uncertain.
   - Each state exposes: `--color-state-<name>-bg`, `--color-state-<name>-fg`, `--color-state-<name>-border`.

## 3. Workflow for Token Updates

Whenever a missing token is required:
1. Run workflow `/update-tokens` or propose the token to Memo.
2. Add the variable to `design/reference/tokens.css` for both Light and Dark themes.
3. Map to Tailwind in `design/reference/tailwind.preset.js`.
4. Add visual swatch in `design/reference/reference.html`.
5. Run `node design/tools/check-tokens.mjs` to ensure zero regressions.

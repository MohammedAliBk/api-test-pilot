---
name: update-tokens
description: Propose, approve, and record new design tokens into the design reference system.
---

# Workflow: /update-tokens

Use this workflow whenever a new visual property or token is required.

## Steps

1. **Stop & Propose**: Never invent inline styles or arbitrary values. Propose the token name, default value (Light/Dark), and role to Memo.
2. **Update tokens.css**: Add custom properties in `design/reference/tokens.css` for both themes.
3. **Update tailwind.preset.js**: Map the token to the Tailwind configuration.
4. **Update reference.html**: Add a visual sample/card demonstrating the token in action.
5. **Update CHANGELOG.md**: Record addition in `design/reference/CHANGELOG.md`.
6. **Log DEC**: Record architectural decision in `docs/orchestration/DECISIONS.md`.
7. **Run check-tokens.mjs**: Verify tool recognizes the new token.

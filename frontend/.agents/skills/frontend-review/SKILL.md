---
name: frontend-review
description: >-
  Use this skill during Loop Stage 3 (Review) to inspect diffs against the design system,
  token rules, accessibility, responsiveness, and monorepo boundaries.
---

# Frontend Review Skill

This skill provides the automated checklist for Loop Stage 3 (Review).

## 1. Scope Lock & Monorepo Boundaries

- Verify `git status` shows **zero changes outside `frontend/`**.
- Verify no secrets, `.env` files, or local keys are staged.

## 2. Design System & Token Compliance

- Run `node design/tools/check-tokens.mjs`. Must pass with 0 errors.
- Confirm all buttons, inputs, selects adhere to the **36px control metric** (`min-h-[36px]`, `text-[13px] font-bold`).
- Confirm focus affordance uses `--color-primary` border (no page-local halos or rings).
- Confirm layout switches strictly at the **900px breakpoint**.

## 3. Accessibility & State Integrity

- Ensure interactive elements are keyboard focusable with logical tab order.
- Verify color contrast against tokens in Light and Dark modes.
- Verify all 5 core UI states are handled: default, loading, empty, error, uncertain.

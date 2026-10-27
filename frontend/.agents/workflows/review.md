---
name: review
description: Run an automated code, token, and quality review against the active branch diff.
---

# Workflow: /review

Use this workflow to execute Loop Stage 3 (Review), Stage 5 (Quality), and Stage 6 (Security).

## Steps

1. **Verify Working Tree Scope**:
   - Run `git status`. Confirm all modified/added files start with `frontend/`.
   - Ensure no `.env` or credential files are staged.
2. **Token Compliance Check**:
   - Run `node design/tools/check-tokens.mjs`. Must output 0 errors.
3. **Accessibility & Design Standards**:
   - Verify keyboard navigability and focus styling.
   - Verify responsive layout at 900px breakpoint.
   - Verify test states use canonical state tokens.
4. **Security Audit**:
   - Check JSON viewer components for sanitized rendering (no raw `dangerouslySetInnerHTML`).
   - Check AI explanation cards for clear labeling and separation from deterministic test results.
5. Generate structured review report (BLOCKER / MAJOR / MINOR).

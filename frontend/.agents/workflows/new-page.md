---
name: new-page
description: Execute the full design and implementation pipeline for a new frontend page.
---

# Workflow: /new-page

This workflow runs the mandatory 5-step Design Pipeline for creating a new UI page.

## Phase 1: Planning & Specification (Step 1)
1. Initialize task with `/new-task` (ID `TASK-XXX`).
2. Author `docs/page-specs/<slug>.md` using `docs/page-specs/_TEMPLATE.md`.
3. Stop at Gate G1 for Memo's approval of the spec and plan.

## Phase 2: Design Research & Prototypes (Steps 2 & 3)
4. Survey 3–6 comparable tools and author `docs/research/<slug>.md`.
5. Build 4 interactive HTML prototypes in `design/prototypes/<slug>/`:
   - `v1.html`, `v2.html`, `v3.html`, `v4.html`, `index.html`, `NOTES.md`.
6. Run `node design/tools/check-tokens.mjs` to ensure 0 token violations.

## Phase 3: Design Selection (Gate GD)
7. Present comparison table and recommendation to Memo in chat (Egyptian Arabic).
8. Wait for Memo's choice. Iterate if needed, then copy the chosen version to `chosen.html`.

## Phase 4: Implementation (Step 4 & The Loop)
9. Implement React components under `src/features/<slug>/` matching `chosen.html` 1:1.
10. Integrate real API or mock layer via MSW.
11. Run all 7 stages of the loop (Plan, Build, Review, Test, Quality, Security, Integrity).

## Phase 5: Verification & Gate G3 (Step 5)
12. Ensure all 7 loop stages are GREEN in the same iteration.
13. Run Orchestration Integrity Check.
14. Present Gate G3 request to Memo. Upon approval, merge to target branch and set status `DONE`.

---

## Dry-Run Example: `/new-page import-spec`

Here is an exact walkthrough of how this workflow executes:

1. **Task Initialization**:
   - Assign `TASK-004: Page Pipeline — Import Spec View`.
   - Create `docs/orchestration/tasks/TASK-004-import-spec.md` with status `PLANNED`.
   - Create `docs/page-specs/import-spec.md` using `_TEMPLATE.md` defining upload zones, URL validation states, and private IP rejection UX.
   - Present plan to Memo in chat (Gate G1). Memo approves.
   - Switch branch: `git switch -c feat/fe-import-spec`. Update status to `IN_PROGRESS`.

2. **Research & Benchmarks**:
   - Survey Postman ("Import via Link"), Swagger UI ("Explore"), Bruno ("Open Collection"), and Redocly.
   - Author `docs/research/import-spec.md` detailing patterns (drag-and-drop zone, live spec preview, parser error diagnostics).

3. **4 Standalone Prototypes**:
   - Generate `design/prototypes/import-spec/`:
     - `v1.html`: Modal-first floating dialog with tabbed inputs (File / URL).
     - `v2.html`: Full canvas split view (Input form on left, real-time parsed summary on right).
     - `v3.html`: Stepper wizard (1. Source -> 2. Schema Parse -> 3. Target API Config).
     - `v4.html`: Minimal command-palette style with quick paste and recent specs list.
     - `index.html`: Interactive side-by-side comparison switcher with theme and state toggles.
     - `NOTES.md`: Evaluation of each direction against user speed and parsing clarity.
   - Execute token linter: `node design/tools/check-tokens.mjs design/prototypes/import-spec`.

4. **Gate GD Presentation**:
   - Present table of 4 options to Memo in Egyptian Arabic.
   - Memo chooses `v2.html` (Full canvas split view).
   - Copy `v2.html` to `design/prototypes/import-spec/chosen.html`.

5. **React Implementation & Loop**:
   - Build `src/features/import-spec/components/ImportForm.tsx`, `SpecPreview.tsx`, `UrlValidator.tsx`.
   - Adhere strictly to 36px control metric and `--color-primary` border focus.
   - Run tests, lint, type-check, and token linter.
   - Verify all 7 stages GREEN. Stop at Gate G3 for merge approval.

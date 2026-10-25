# Page Specification: [Page Title]

- **Slug**: `[page-slug]`
- **Related Task**: TASK-XXX
- **Status**: DRAFT | APPROVED | AS_BUILT
- **Owner**: Frontend Team (Memo / Orchestrator)
- **Approved by**: Memo (Date)

---

## 1. Purpose & User Goal
- **What problem does this screen solve?**:
- **Primary User Action**:
- **Secondary Actions**:

---

## 2. Information Architecture & Layout
- **Layout Model**: (e.g. Master-detail split / dense table / step flow)
- **Key Sections**:
  1. Header & Actions Toolbar
  2. Main Content Canvas
  3. Inspector / Drawer Panel

---

## 3. Data Requirements & API Contracts
- **Queries**:
  - `GET /api/...`:
- **Mutations**:
  - `POST /api/...`:
- **Mock Fallback (if backend contract is pending)**:

---

## 4. UI States
- **Default (Populated)**:
- **Loading (Skeleton)**:
- **Empty State**:
- **Error State**:
- **Uncertain / Recovery State (if applicable)**:

---

## 5. Edge Cases
- Huge specifications (100+ endpoints / 1000+ tests).
- Extremely long URLs or deeply nested JSON paths.
- Network disconnection during execution.
- Slow API response times.

---

## 6. Accessibility & Responsive Behavior
- **Keyboard Navigation**:
- **Focus Order**:
- **Screen Reader Announcements**:
- **Shell Breakpoint (900px)**: Desktop split view turns into stacked tabbed view.

---

## 7. Acceptance Criteria
- [ ] Conforms strictly to `docs/conventions/UI_CONVENTIONS.md`.
- [ ] Zero raw color/dimension values (`check-tokens.mjs` passes).
- [ ] All 5 UI states render cleanly.
- [ ] Tests written and passing.

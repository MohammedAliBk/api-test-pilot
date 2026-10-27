# OPERATING MANUAL — API TEST PILOT FRONTEND

This manual is the **single source of truth** for operating principles, governance, task lifecycles, and verification gates for the frontend of API Test Pilot.

---

## 1. Scope & Monorepo Boundaries

1. **FE_ROOT**: The frontend working directory (`frontend/`).
2. **Strict Boundary**: All writes are confined strictly to `frontend/`. No changes to `backend/`, `ai-service/`, `deploy/`, root `README.MD`, root `.github/`, etc.
3. **Cross-Service Communication**: Requests for backend endpoints or CI workflows must be written in `docs/orchestration/TASKS.md` under "Requests to other teams" and unblocked locally via MSW mocks.

---

## 2. Core Governance & Communication

1. **Chat Language**: Egyptian Arabic (عامية مصرية) for chat responses, status updates, gate requests, and questions to Memo. Technical terms remain in English.
2. **Disk Persistence**: All code, docs, task files, commit messages, comments, and logs written to disk must be **English only**.
3. **Exception (DEC-001)**: User-facing UI copy follows project UI language decisions.
4. **Authority**: Never decide on Memo's behalf. Every decision requires explicit approval and is recorded in `docs/orchestration/DECISIONS.md`.

---

## 3. The 4 Verification Gates

- **Gate G1 — Plan Approval**: Before implementation begins. Review task scope, files, components, tests, risks, and rollback. Approval authorises branching and coding.
- **Gate GD — Design Choice (UI tasks)**: After research note and the 4 interactive HTML prototypes are built. Memo selects the direction; chosen version is copied to `chosen.html`. React coding starts only after GD.
- **Gate G2 — Escalation**: Triggered after 3 failed attempts on the same finding, or if a fix requires a scope/architectural/token change, or when blocked on another team.
- **Gate G3 — Merge Approval**: Triggered only after all 7 loop stages are GREEN in the same iteration and the Orchestration Integrity Check passes. Memo chooses the merge strategy (squash, merge, rebase).

---

## 4. The 7-Stage Loop

1. **Plan**: Verify requirements and files against real disk. Produce task file and spec. Ends at Gate G1 (and GD for UI).
2. **Build**: Orchestrator implements on task branch with Conventional Commits (`feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `chore:`). Docs updated in same branch.
3. **Review**: Review diff vs code and docs for correctness, leftovers, test validity, and monorepo boundaries.
4. **Test**: Run full test suite, lint, type-check, production build, `check-tokens.mjs`, and API checks.
5. **Quality**: Assess complexity, accessibility (WCAG AA), responsive layout, and UI convention compliance.
6. **Security**: Audit XSS, JSON sanitizer, secret masking, target validation UX, and CSP.
7. **Integrity & G3**: Validate synchronization across all orchestration docs; present Gate G3 request.

---

## 5. The 5-Step Design Pipeline

1. **Spec**: Functional requirements in `docs/page-specs/<slug>.md`.
2. **Research**: Benchmark 3–6 developer tools in `docs/research/<slug>.md`.
3. **4 Prototypes**: Standalone HTML prototypes `v1.html` through `v4.html`, `index.html`, and `NOTES.md` in `design/prototypes/<slug>/`.
4. **Gate GD**: Present comparison and recommendation; wait for Memo's choice -> `chosen.html`.
5. **Implementation**: Build React components under `src/features/<slug>/` matching `chosen.html` 1:1.

---

## 6. Task State Machine

`PLANNED` -> `IN_PROGRESS` -> `READY_FOR_REVIEW` -> `DONE`  
Side states: `BLOCKED`, `CANCELLED`.
Updating status requires updating the task file header, the `TASKS.md` row, and `SESSION_LOG.md` in the same commit.

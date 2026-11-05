# THE 7-STAGE LOOP AND ORCHESTRATION

Single source of truth details are defined in [OPERATING_MANUAL.md](file:///Volumes/disk1/Projects/api-test-pilot/frontend/docs/orchestration/OPERATING_MANUAL.md).

## 1. The Loop Stages

Every task execution iteration follows these 7 stages strictly:

1. **Plan**: Planner confirms scope, acceptance criteria, affected files verified against real disk, risks, rollback, and test plan. For UI tasks: Page Spec -> Research -> 4 Prototypes -> Gate GD. First pass ends at Gate G1.
2. **Build**: Orchestrator implements approved plan on task branch with Conventional Commits (`feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `chore:`). Docs updated in same branch.
3. **Review**: Reviewer verifies diff and docs vs real code for correctness, leftovers, test validity, and confirms every path is under `frontend/`.
4. **Test**: Tester runs full test suite, lint, type-check, production build, `design/tools/check-tokens.mjs`, and API integration checks.
5. **Quality**: Quality reviewer verifies code complexity, component modularity, duplication, naming, a11y, render performance, and UI convention compliance.
6. **Security**: Security reviewer audits against XSS/injection in OpenAPI specs, raw JSON viewers, and AI explanations, token storage, CSP, and sensitive data leakage.
7. **Integrity & Gate G3**: Verify `TASKS.md`, `DECISIONS.md`, `SESSION_LOG.md`, `PROJECT_MAP.md`, `CHANGELOG.md`, and the task file match code and git state. Run Orchestration Integrity Check. Present in chat and stop at Gate G3.

## 2. Exit & Iteration Criteria

- All stages must finish **GREEN** in the same iteration with real command evidence.
- Any **RED** stage triggers root-cause analysis and restarting from the earliest affected stage.
- After 3 failed attempts on the same finding, escalate via Gate G2.
- The loop never merges, tags, or pushes without Gate G3 approval.

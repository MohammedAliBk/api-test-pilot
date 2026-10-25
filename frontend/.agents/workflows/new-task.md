---
name: new-task
description: Start a new tracked engineering task in the orchestration system.
---

# Workflow: /new-task

Use this workflow to initialize any new task (feature, fix, infra, refactor).

## Steps

1. **Assign Task ID**: Look at `docs/orchestration/TASKS.md` and select the next sequential ID (`TASK-XXX`).
2. **Draft Task File**: Create `docs/orchestration/tasks/TASK-XXX-<slug>.md` using the standard task template.
   - Status: `PLANNED`.
   - Fill Goal, Scope, Acceptance Criteria, Affected Modules, and Test Plan.
3. **Register in Index**: Add row to `docs/orchestration/TASKS.md` with status `PLANNED`.
4. **Present Plan (Gate G1)**:
   - Present the plan to Memo in chat (Egyptian Arabic).
   - Detail scope, files to be touched, risks, and rollback procedure.
   - **WAIT for Memo's explicit approval before creating the branch or writing any implementation code.**
5. **Create Branch (After Approval)**:
   - Run `git switch -c <type>/fe-<slug>`.
   - Update task file and `TASKS.md` status to `IN_PROGRESS`.
   - Log milestone in `docs/orchestration/SESSION_LOG.md`.

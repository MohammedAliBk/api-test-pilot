---
name: task-management
description: >-
  Use this skill to create, update, and manage task lifecycles, task files,
  TASKS.md entries, and gate checkpoints in the orchestration system.
---

# Task Management Skill

This skill governs the state machine and tracking files under `docs/orchestration/`.

## 1. Task Lifecycle States

```text
PLANNED ──(Gate G1)──> IN_PROGRESS ──(Gate GD if page)──> READY_FOR_REVIEW ──(Gate G3)──> DONE
  │                         │                                    │
  └─────────────────────────┴─────────> BLOCKED / CANCELLED ─────┘
```

- `PLANNED`: Task file created, waiting for Gate G1 approval.
- `IN_PROGRESS`: Plan approved, branch created, implementation underway.
- `READY_FOR_REVIEW`: All 7 loop stages are GREEN in the same iteration. Integrity check passed.
- `DONE`: Gate G3 approved by Memo, merged into target branch.
- `BLOCKED`: Blocked on Memo or external team (record exact reason).
- `CANCELLED`: Abandoned (record rationale).

## 2. Synchronization Rules

Whenever a task status changes:
1. Update `docs/orchestration/tasks/TASK-XXX-<slug>.md` header.
2. Update row in `docs/orchestration/TASKS.md`.
3. Record an entry in `docs/orchestration/SESSION_LOG.md`.
4. Commit all tracking updates in the same commit with the code.

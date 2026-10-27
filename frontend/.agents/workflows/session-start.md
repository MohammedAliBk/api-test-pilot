---
name: session-start
description: Execute the mandatory startup protocol at the beginning of each engineering session.
---

# Workflow: /session-start

Use this workflow immediately when starting a new session.

## Steps

1. Read `PROJECT_MAP.md`, `docs/orchestration/TASKS.md`, the latest `SESSION_LOG.md` entry, and the active task file.
2. Run `git status`, `git branch --show-current`, and `git log --oneline -15`.
3. Confirm that no changes exist outside `frontend/`.
4. Detect unfinished work: tasks `IN_PROGRESS`, `BLOCKED`, or `READY_FOR_REVIEW`, or previous "Resume here" lines.
5. Check for drift between code and docs for the modules touched by the upcoming work.
6. Append a session start entry to `docs/orchestration/SESSION_LOG.md`.
7. Present status summary to Memo in chat (Egyptian Arabic): current state, active branch, open tasks, proposed next action. Wait for go-ahead.

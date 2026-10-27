---
name: session-end
description: Execute the shutdown protocol and record exact resume instructions at the end of a session.
---

# Workflow: /session-end

Use this workflow when wrapping up a session or when context is reaching capacity.

## Steps

1. Verify git status and confirm all work in progress is committed cleanly on the task branch.
2. Confirm all paths modified are strictly within `frontend/`.
3. Update the active task file in `docs/orchestration/tasks/`.
4. Append an entry to `docs/orchestration/SESSION_LOG.md`:
   - Date and session summary.
   - Tasks worked on and status.
   - Evidence of checks executed.
   - Open questions waiting for Memo.
   - An exact **"Resume here:"** line specifying the next immediate command or action.
5. Provide a concise wrap-up to Memo in chat (Egyptian Arabic).

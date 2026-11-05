---
name: sync-docs
description: Synchronize orchestration files, changelog, project map, and task status.
---

# Workflow: /sync-docs

Use this workflow to ensure documentation integrity across the codebase.

## Steps

1. Inspect `git status` and recent commit logs.
2. Synchronize active task file in `docs/orchestration/tasks/`.
3. Update corresponding row in `docs/orchestration/TASKS.md`.
4. Ensure any architectural decisions made are documented in `docs/orchestration/DECISIONS.md`.
5. Update `CHANGELOG.md` with features, fixes, or infrastructure changes under `[Unreleased]`.
6. Update `PROJECT_MAP.md` if routes, stores, or modules were added or removed.
7. Run the Orchestration Integrity Check checklist before requesting review.

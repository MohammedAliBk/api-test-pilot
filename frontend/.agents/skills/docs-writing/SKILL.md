---
name: docs-writing
description: >-
  Use this skill when authoring, updating, or maintaining architectural documentation,
  ADR decisions, page specifications, and changelogs.
---

# Documentation Writing Skill

This skill enforces clarity, truthfulness, and structure across all project documentation.

## 1. Documentation Language & Style Rules

- **English Only**: Every document written to disk must be in English.
- **Truthful & Verified**: Never guess or invent architecture. Document only what is verified against real files and code.
- **Resumability**: Write documentation so that a fresh agent reading only `PROJECT_MAP.md` and `docs/orchestration/*` can immediately understand system state and resume work with zero external context.

## 2. Core Documentation Locations

- `docs/orchestration/OPERATING_MANUAL.md`: Canonical rules and procedures.
- `docs/orchestration/DECISIONS.md`: Architectural Decision Records (ADR).
- `docs/conventions/UI_CONVENTIONS.md`: Shared UI interaction patterns.
- `docs/page-specs/<slug>.md`: Functional requirements per page.
- `CHANGELOG.md`: User-facing and developer-facing version history.

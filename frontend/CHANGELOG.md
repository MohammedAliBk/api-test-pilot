# Changelog

All notable changes to the API Test Pilot frontend will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- TASK-001: Established frontend agent operating system, directory layout, and orchestration framework.
- Core rules under `.agents/rules/`: `scope-lock`, `core-rules`, `loop-and-orchestration`, `frontend-design`, `frontend-quality`, and `frontend-domain`.
- Modular specialized skills under `.agents/skills/`: `frontend-architecture`, `design-system-tokens`, `design-research`, `design-prototype`, `page-implementation`, `api-integration`, `frontend-review`, `frontend-testing`, `task-management`, and `docs-writing`.
- Operational workflows under `.agents/workflows/`: `/new-task`, `/new-page`, `/prototype`, `/implement-page`, `/review`, `/update-tokens`, `/sync-docs`, `/session-start`, and `/session-end`.
- Agent persona definitions under `.agents/agents/`: `orchestrator`, `loop`, `planner`, `researcher`, `tester`, `reviewer`, `quality`, and `security`.
- Orchestration tracking files: `OPERATING_MANUAL.md`, `TASKS.md`, `DECISIONS.md` (seeded with DEC-001 through DEC-010), `SESSION_LOG.md`, and `TASK-001-agent-os-setup.md`.
- Project UI/UX conventions in `docs/conventions/UI_CONVENTIONS.md`.
- Design token baseline in `design/reference/tokens.css`, `tailwind.preset.js`, and `reference.html`.
- Automated token validation tool in `design/tools/check-tokens.mjs`.

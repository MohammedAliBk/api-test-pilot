# Changelog

All notable changes to the API Test Pilot frontend will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- TASK-002: Initialized base tooling and production Vite application harness under `frontend/`.
- Configured Vite with React 18, TypeScript (strict mode, bundler resolution), and `@/*` path alias.
- Integrated Tailwind CSS consuming `design/reference/tailwind.preset.js` and `design/reference/tokens.css`.
- Installed and verified core stack: `@tanstack/react-query` v5, `zustand`, `react-hook-form`, `zod`, `@hookform/resolvers`, `recharts`, `lucide-react`, `openapi-fetch`, and `openapi-typescript`.
- Configured Vitest test runner with `@testing-library/react`, `@testing-library/jest-dom`, and JSDOM environment.
- Added standard application utility `src/lib/utils.ts` (`cn` helper using `clsx` and `tailwind-merge`).
- Added responsive domain state harness `src/App.tsx` and unit tests in `src/App.test.tsx`.
- TASK-001: Established frontend agent operating system, directory layout, and orchestration framework.
- Core rules under `.agents/rules/`: `scope-lock`, `core-rules`, `loop-and-orchestration`, `frontend-design`, `frontend-quality`, and `frontend-domain`.
- Modular specialized skills under `.agents/skills/`: `frontend-architecture`, `design-system-tokens`, `design-research`, `design-prototype`, `page-implementation`, `api-integration`, `frontend-review`, `frontend-testing`, `task-management`, and `docs-writing`.
- Operational workflows under `.agents/workflows/`: `/new-task`, `/new-page`, `/prototype`, `/implement-page`, `/review`, `/update-tokens`, `/sync-docs`, `/session-start`, and `/session-end`.
- Agent persona definitions under `.agents/agents/`: `orchestrator`, `loop`, `planner`, `researcher`, `tester`, `reviewer`, `quality`, and `security`.
- Orchestration tracking files: `OPERATING_MANUAL.md`, `TASKS.md`, `DECISIONS.md` (seeded with DEC-001 through DEC-010), `SESSION_LOG.md`, and `TASK-001-agent-os-setup.md`.
- Project UI/UX conventions in `docs/conventions/UI_CONVENTIONS.md`.
- Design token baseline in `design/reference/tokens.css`, `tailwind.preset.js`, and `reference.html`.
- Automated token validation tool in `design/tools/check-tokens.mjs`.

# AGENTS.md — API Test Pilot Frontend Orchestration Entry Point

Welcome to the frontend of **API Test Pilot** (Version: `0.0.1-alpha`).
Working Directory Root: `frontend/` (`FE_ROOT`).

API Test Pilot is an AI-assisted API testing platform featuring intelligent OpenAPI-driven test generation, background worker execution, deterministic validation, failure analysis, and recovery-aware resilient workflows.

---

## 1. Scope & Execution Rules

1. **FE_ROOT Boundary (Mandatory)**: All file creation, editing, and deletion must remain strictly inside `frontend/`. Writing outside `frontend/` (e.g., in `backend/`, `ai-service/`, `deploy/`, root `README.MD`, root `.github/`) is strictly prohibited.
2. **Authority & Decisions**: Never make decisions on behalf of Memo (the frontend developer). Every architectural, library, schema, contract, or design decision requires explicit approval and is recorded in [DECISIONS.md](file:///Volumes/disk1/Projects/api-test-pilot/frontend/docs/orchestration/DECISIONS.md).
3. **Communication vs. Persistence Language**:
   - Conversations with Memo in chat: **Egyptian Arabic (عامية مصرية)**. Technical terms stay in English.
   - Everything written to disk: **English only** (code, docs, task files, commit messages, comments).
   - Exception: End-user visible UI copy follows project UI language decisions ([DEC-001](file:///Volumes/disk1/Projects/api-test-pilot/frontend/docs/orchestration/DECISIONS.md)).

---

## 2. Orchestration Architecture Map

- **Single Source of Truth Manual**: [OPERATING_MANUAL.md](file:///Volumes/disk1/Projects/api-test-pilot/frontend/docs/orchestration/OPERATING_MANUAL.md) (Distills rules, gates, loop stages, and design pipeline).
- **Project Structure & Map**: [PROJECT_MAP.md](file:///Volumes/disk1/Projects/api-test-pilot/frontend/PROJECT_MAP.md).
- **Task Tracking**: [TASKS.md](file:///Volumes/disk1/Projects/api-test-pilot/frontend/docs/orchestration/TASKS.md).
- **Decision Log**: [DECISIONS.md](file:///Volumes/disk1/Projects/api-test-pilot/frontend/docs/orchestration/DECISIONS.md).
- **Session Log**: [SESSION_LOG.md](file:///Volumes/disk1/Projects/api-test-pilot/frontend/docs/orchestration/SESSION_LOG.md).
- **UI Conventions**: [UI_CONVENTIONS.md](file:///Volumes/disk1/Projects/api-test-pilot/frontend/docs/conventions/UI_CONVENTIONS.md).
- **Design Tokens & Reference**: [tokens.css](file:///Volumes/disk1/Projects/api-test-pilot/frontend/design/reference/tokens.css) and [reference.html](file:///Volumes/disk1/Projects/api-test-pilot/frontend/design/reference/reference.html).

---

## 3. The 7-Stage Loop

Every task runs through the loop:
1. **Plan** (Planner confirms scope, creates task file, G1 gate approval; for UI pages: spec -> research -> 4 prototypes -> GD choice).
2. **Build** (Orchestrator implements on task branch with Conventional Commits, docs updated).
3. **Review** (Reviewer validates diff vs docs, verifies tests prove behavior, scope lock under `frontend/`).
4. **Test** (Tester runs test suite, lint, type-check, build, `check-tokens.mjs`, and API integration checks).
5. **Quality** (Quality checks complexity, naming, a11y, render performance, UI convention compliance).
6. **Security** (Security audits XSS/sanitization in JSON/AI responses, token handling, CSP, secrets).
7. **Integrity Check** (All orchestration files in sync; presents summary in chat; stops at Gate G3 for merge approval).

---

## 4. Team & Service Roles

- **Frontend**: Mohamed Essam (Memo), Mohamed Bayoumi.
- **UI/UX**: Hamdi Mohamed.
- **Backend (.NET 10 / ASP.NET Core)**: Ahmed Mohamed.
- **AI Service (FastAPI / Gemini)**: Fatma Mahmoud.
- **DevOps (Docker / CI/CD)**: Mohamed Ali, Mohamed Samir.

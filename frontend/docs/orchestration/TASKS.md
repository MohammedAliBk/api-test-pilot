# TASKS.md — Frontend Task Registry

This registry tracks all engineering tasks for the API Test Pilot frontend.

---

## 1. Active & Tracked Tasks

| ID | Title | Status | Branch | Version | Created | Updated | Depends on |
|---|---|---|---|---|---|---|---|
| TASK-001 | Frontend Agent Operating System Setup | DONE | chore/frontend-agent-setup | 0.0.1-alpha | 2026-10-24 | 2026-10-25 | None |
| TASK-002 | Base Tooling & Vite Application Bootstrap | DONE | chore/fe-tooling-vite-bootstrap | 0.0.1-alpha | 2026-10-25 | 2026-10-25 | TASK-001 |

---

## 2. Backlog / Proposed Tasks

These items are proposals awaiting Memo's formal promotion into tracked tasks:

1. **TASK-003: Design Reference Page & Component Primitives**  
   *Scope*: Implement interactive `reference.html` and headless base components (`Button`, `Input`, `Select`, `Dialog`, `StatusBadge`) in `src/components/ui/` adhering to the 36px control metric.  
   *Depends on*: TASK-002.

3. **TASK-004: Page Pipeline — Import Spec View**  
   *Scope*: Spec, research, 4 prototypes, Gate GD, and React implementation for OpenAPI specification input (URL / File upload) with server-side validation UX.  
   *Depends on*: TASK-003.

4. **TASK-005: Page Pipeline — Endpoint Explorer View**  
   *Scope*: Spec, research, 4 prototypes, Gate GD, and React implementation for browsing endpoints, parameters, methods, and schema definitions.  
   *Depends on*: TASK-004.

5. **TASK-006: Mock API Service Worker (MSW) & Contract Layer**  
   *Scope*: Establish MSW handlers matching backend OpenAPI models (`TestRunStatus`, `TestCase`, `TestResult`) to unblock frontend execution without waiting for backend deployment.  
   *Depends on*: TASK-002.

---

## 3. Requests to Other Teams

Requests for shared contracts or infrastructure outside `frontend/`:

| Date | Target Team | Service Area | Request Summary | Status |
|---|---|---|---|---|
| 2026-10-24 | Backend (Ahmed Mohamed) | API Contracts | Export generated OpenAPI v3 JSON spec from .NET backend (`Scalar`/`SwaggerGen`) to verify DTO schemas for TestRun, TestCase, and TestResult. | PENDING |
| 2026-10-25 | DevOps (Mohamed Ali, Mohamed Samir) | CI/CD & Docker | Handover guide provided for frontend Dockerfile multi-stage build, Nginx SPA routing, and GitHub Actions CI workflow (see `docs/summaries/DEVOPS_INTEGRATION_HANDOVER.md`). | PENDING |

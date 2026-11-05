---
name: api-integration
description: >-
  Use this skill when defining API client layers, OpenAPI contract generation,
  mock service worker handlers, and backend communication.
---

# API Integration Skill

This skill governs how the frontend communicates with the .NET 10 backend and handles service contracts.

## 1. Boundary & Monorepo Protocol

- The frontend must never edit files in `backend/` or `ai-service/`.
- If a backend endpoint or contract needs changes:
  1. Add an entry to `docs/orchestration/TASKS.md` under "Requests to other teams".
  2. Implement a local mock via MSW (`src/mocks/handlers.ts`) to unblock frontend development.
  3. Mark the dependent task as having an active mock layer.

## 2. API Client Architecture

- `src/lib/api/client.ts`: Typed fetch wrapper handling base URL, authentication headers, error serialization, and timeouts.
- `src/lib/api/queries/`: TanStack Query options and mutation wrappers.
- `src/types/api.ts`: TypeScript types generated or manually synchronized with backend contracts.

## 3. Resilient Request Handling

- Handle network drops, server timeouts (504), and 500 internal errors gracefully.
- Handle long-running test execution polling or Server-Sent Events (SSE) / WebSockets cleanly with auto-reconnection and exponential backoff.

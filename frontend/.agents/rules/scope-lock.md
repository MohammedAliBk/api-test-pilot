# SCOPE LOCK — THE MOST IMPORTANT RULE

FE_ROOT = the frontend/ directory (your working directory). Every path in this project is relative to FE_ROOT.

1. **Write access: FE_ROOT only.** You may create/modify/delete files only inside `frontend/`. Nothing outside it — not README, not docs/ at the repo root, not .github/, not backend/, ai-service/, deploy/, not the root .gitignore/AGENTS.md/.agents/, not global/user config (~/.gemini, etc.). No exceptions without Memo's explicit approval for that specific file.
2. **Read access outside frontend/ is allowed, read-only, only for context**: root README.MD, CONTRIBUTING.MD, the backend's OpenAPI/Swagger definition, shared docs. Never modify what you read.
3. **Pre-commit verification**: Before every commit run `git status` and confirm that every changed path starts with `frontend/`. If anything outside appears, stop, tell Memo, and do not commit. Stage with explicit paths (`git add frontend/...`), never `git add -A` at the repo root.
4. **Command execution boundary**: Do not run repo-wide commands (Docker Compose of the whole system, backend builds, root-level scripts, anything touching other services) without asking. Frontend-local commands (install, lint, type-check, test, build, dev server) are fine.
5. **Cross-boundary requests**: If a need arises that requires a change outside `frontend/` (backend contract, CI, root config), do not do it. Write it as a request in `docs/orchestration/TASKS.md` → "Requests to other teams" with the exact wording Memo can send them, and mark the dependent task BLOCKED or use a mock layer.
6. **Workspace configuration boundary**: If the agent workspace loads config from the git root instead of `frontend/` and you cannot make `frontend/.agents/` work from here, stop and ask Memo — do not "fix" it by writing at the root.

# API Test Pilot - Development Rules

This document defines how we organize code, name branches, collaborate, and contribute to API Test Pilot.

The goal is to keep the repository organized, make everyone's work easy to understand, and avoid conflicts when multiple developers work on the project.

These rules apply to every team member.

---

## 1. Repository Structure

All project code and shared configuration must live in the same repository (monorepo).

Each service has its own directory. Shared infrastructure, documentation, and tests belong in their respective directories.

```text
api-test-pilot/
├── frontend/              # React + TypeScript + Vite
├── backend/               # .NET API and backend logic
├── ai-service/            # Python + FastAPI + AI integration
├── deploy/                # Docker Compose and deployment config
├── tests/                 # Shared integration and smoke tests
├── scripts/               # Development and deployment scripts
├── docs/                  # Architecture and technical documentation
├── .github/
│   └── workflows/         # Future CI/CD workflows
├── .gitignore
├── .env.example
├── README.md
├── RULES.md
└── CONTRIBUTING.md        # Optional detailed contribution guide
```

**Important:** This is the intended structure. If a directory does not exist yet, create it when the relevant work begins. Do not create empty files just to fill the structure.

### Where does each type of work go?

| Directory            | Responsibility                                                      |
| -------------------- | ------------------------------------------------------------------- |
| `frontend/`          | UI, pages, components, frontend state and API client                |
| `backend/`           | API endpoints, business logic, authentication and job orchestration |
| `ai-service/`        | Test generation, AI prompts and AI-related API endpoints            |
| `deploy/`            | Docker Compose, reverse proxy and deployment configuration          |
| `tests/`             | Shared integration and end-to-end smoke tests                       |
| `scripts/`           | Reusable development, validation and deployment scripts             |
| `docs/`              | Architecture decisions, API contracts, setup guides and runbooks    |
| `.github/workflows/` | GitHub Actions workflows when CI/CD is introduced                   |

Service-specific unit tests should normally live alongside their respective service code. For example, .NET unit tests belong in the backend's test project, while Python unit tests belong in the AI service's test structure.

Do not move files between service directories without discussing the change with the affected developers.

---

## 2. Main Branch Rules

The `main` branch represents the shared, stable version of the project.

- Do not work directly on `main`.
- Create a separate branch for every task.
- Merge changes into `main` through pull requests.
- Ask at least one teammate to review your changes before merging.
- Resolve review feedback before merging.
- Do not force-push to `main` or delete it.
- Do not merge code that is known to be broken.
- Keep `main` in a state that the team can build and run.

Until automated CI checks are available, developers are responsible for running the relevant checks manually and reporting the results in their pull requests.

**Note:** These are team rules. Configure GitHub branch protection separately if you want GitHub to enforce them.

---

## 3. Branch Naming Convention

Use the following format:

`<type>/<short-description>`

Branch names must be lowercase, use hyphens between words, and describe the task clearly.

### Branch types

| Prefix      | Purpose                                                    | Example                   |
| ----------- | ---------------------------------------------------------- | ------------------------- |
| `feat/`     | Implementing a new feature                                 | `feat/swagger-import`     |
| `fix/`      | Fixing a bug                                               | `fix/test-run-timeout`    |
| `docs/`     | Documentation changes                                      | `docs/setup-guide`        |
| `test/`     | Adding or improving tests                                  | `test/openapi-validation` |
| `ci/`       | CI/CD configuration                                        | `ci/github-actions`       |
| `infra/`    | Docker, networking and infrastructure                      | `infra/docker-compose`    |
| `refactor/` | Restructuring code without intentionally changing behavior | `refactor/test-executor`  |

### Rules for naming branches

- Use one branch per task, not one permanent branch per developer.
- Choose the prefix based on the purpose of the change.
- Keep the description short but meaningful.
- Avoid names such as `my-branch`, `new-code`, `final-version`, or `test123`.
- Do not use `main` as a working branch.
- If a task grows into multiple independent tasks, split the work into separate branches when practical.

### Examples by service

Frontend:

- `feat/swagger-upload-ui`
- `fix/api-results-layout`

Backend:

- `feat/test-run-api`
- `fix/hangfire-job-state`

AI service:

- `feat/ai-test-generation`
- `fix/openapi-schema-parsing`

Infrastructure:

- `infra/backend-dockerfile`
- `infra/compose-network`

Documentation:

- `docs/architecture-overview`
- `docs/local-development-setup`

A branch name describes the task, not necessarily the directory being changed. A task that spans multiple services can still use one branch if the changes form one logical feature.

---

## 4. Working on a Task

Follow this workflow for every task.

### Step 1: Start from the latest main

```bash
git switch main
git pull origin main
```

### Step 2: Create your task branch

For example:

```bash
git switch -c feat/swagger-import
```

Replace the example with your actual task name.

### Step 3: Work only on your task

- Modify the files related to the task.
- Avoid unrelated formatting changes or refactoring.
- Do not overwrite another developer's work.
- If a shared interface or configuration must change, coordinate with the affected developer first.

### Step 4: Review your changes

Before committing:

```bash
git status
git diff
```

Check that you are not committing unrelated files, local configuration, credentials, or generated files that should not be tracked.

Run the relevant tests, linting, and build commands available for your service.

### Step 5: Commit your work

```bash
git add <files-you-intend-to-commit>
git commit -m "feat: add Swagger import"
```

Use the commit prefixes described in Section 5.

### Step 6: Push your branch

```bash
git push -u origin feat/swagger-import
```

### Step 7: Open a pull request

Open a pull request from your branch into `main`.

Explain what changed, why it changed, how you tested it, and whether another service or developer needs to make a corresponding change.

### Step 8: Review and merge

Wait for a teammate's review, address any requested changes, and merge only when the work is ready.

Use **Squash and merge** to keep the main branch history readable.

### Step 9: Clean up

After merging, return to `main` and remove your local task branch:

```bash
git switch main
git pull origin main
git branch -d feat/swagger-import  
```

Delete the remote branch through GitHub when appropriate.

---

## 5. Commit Message Convention

Use this format:

`<type>: <short-description>`

| Prefix      | Meaning                |
| ----------- | ---------------------- |
| `feat:`     | New functionality      |
| `fix:`      | Bug fix                |
| `docs:`     | Documentation          |
| `test:`     | Test changes           |
| `ci:`       | CI/CD changes          |
| `infra:`    | Infrastructure changes |
| `refactor:` | Code restructuring     |
| `chore:`    | Maintenance tasks      |

Examples:

```text
feat: add Swagger URL import
fix: handle empty API responses
docs: explain local setup
test: cover invalid OpenAPI schemas
infra: add backend Dockerfile
refactor: simplify test execution logic
chore: update Python dependencies
```

Commit messages must describe the actual change. Avoid vague messages such as `update`, `changes`, `stuff`, or `final`.

Prefer small, logically grouped commits over one huge commit containing unrelated work.

---

## 6. Pull Request Rules

Every pull request should include:

1. **Title:** A short description of the change.
2. **Purpose:** Why the change is needed.
3. **Changes:** What was implemented or modified.
4. **Testing:** What was tested and the actual result.
5. **Dependencies:** Any changes required from other services or teammates.

### Pull request checklist

- [ ] The branch follows the naming convention.
- [ ] The changes are related to the task.
- [ ] Relevant tests and builds were run, where available.
- [ ] Documentation was updated when necessary.
- [ ] No secrets or personal configuration files were committed.
- [ ] Breaking changes and integration requirements are documented.
- [ ] A teammate has reviewed the pull request.

Do not claim that tests passed if they were not run.

---

## 7. Collaboration Between Developers

### Service ownership

Each developer should primarily work within their assigned service or responsibility.

- Frontend developers primarily work in `frontend/`.
- Backend developers primarily work in `backend/`.
- AI developers primarily work in `ai-service/`.
- DevOps developers primarily work in `deploy/`, `scripts/`, infrastructure documentation, and `.github/workflows/`.

These are ownership guidelines, not restrictions. Cross-service changes are allowed when necessary, but affected teammates should be informed.

### Shared contracts

Before integrating services, agree on:

- API endpoint paths and HTTP methods.
- Request and response formats.
- Authentication requirements.
- Internal service URLs and ports.
- Environment variables.
- Error response formats.

Document important shared contracts in `docs/`.

Do not independently change a shared contract without notifying the developers who depend on it.

### Avoiding conflicts

- Do not edit the same shared configuration simultaneously without coordination.
- Communicate before changing environment variables, ports, or service startup commands.
- Pull the latest `main` before starting a new task.
- If conflicts occur, understand both changes before resolving them.
- Never resolve a conflict by blindly choosing one version and discarding the other.

---

## 8. Security Rules

- Never commit real API keys, passwords, tokens, or production credentials.
- Do not commit `.env` files containing secrets.
- Use `.env.example` to document required variable names and safe placeholder values.
- Do not place secrets in Dockerfiles or source code.
- Do not disable security checks just to make a feature work.
- Treat external API specifications and user-provided target URLs as untrusted input.
- Report exposed credentials immediately and rotate them as necessary.

Remember that removing a secret from the latest commit does not necessarily remove it from Git history. Exposed credentials must be treated as compromised.

---

## 9. Testing and Code Quality

Until CI/CD is implemented, each developer must run the checks relevant to their changes manually.

Examples include:

- Frontend: linting, unit tests and production build.
- Backend: build and unit tests.
- AI service: unit tests and application startup checks.
- Infrastructure: Dockerfile builds and Docker Compose configuration validation.
- Integration: verify communication between affected services when an integration environment is available.

Record the checks performed and their results in the pull request.

Do not introduce a testing command that the project does not support yet. If a service has no tests or build process, document that limitation and coordinate with the team to establish one.

When CI/CD becomes available, required automated checks can be added to the merge policy.

---

## 10. Adding New Files and Dependencies

- Put files in the directory responsible for their functionality.
- Use existing project conventions before introducing new ones.
- Avoid duplicate configuration files or multiple sources of truth.
- Add dependencies only when they serve a clear purpose.
- Update the relevant dependency manifest and lockfile together.
- Document new environment variables and setup requirements.
- Do not commit build output, caches, local IDE state, or other generated files unless the project explicitly requires them.

When introducing a new service, discuss its responsibilities, directory location, network access, environment variables, and deployment requirements with the team first.

---

## 11. Emergency Fixes

Urgent fixes still use the normal branch and pull request workflow.

1. Create a `fix/` branch.
2. Make the smallest safe change.
3. Run the relevant checks.
4. Open a pull request and request an expedited review.
5. Merge after approval.
6. Verify the result and document any remaining risk.

Do not bypass the workflow simply because the change is urgent. Any exceptional procedure must be agreed upon by the team and documented.

---

## 12. Future Improvements

As the project grows, the team can introduce:

- GitHub Actions for automated tests and builds.
- Required CI checks before merging.
- Automated Docker image builds.
- Container image publishing.
- Automated staging deployment.
- Deployment health checks and recovery procedures.

These are future improvements, not requirements that are already implemented.
#
---

## Final Principle

**Every branch should represent a clear task, every pull request should explain a clear change, and `main` should remain the shared version of the project that everyone can trust.**


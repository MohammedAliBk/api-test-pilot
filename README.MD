# API Test Pilot

**AI-Assisted API Testing with Intelligent Test Generation and Resilient Execution**

API Test Pilot is a platform designed to simplify API testing by automatically generating and executing test cases from an OpenAPI/Swagger specification. Instead of manually writing tests for every endpoint, developers can provide a specification URL or upload a specification file and let the platform help create, execute, and analyze API tests.

The project also aims to improve the reliability of test execution through background workers, persistent test results, and recovery mechanisms that help test runs handle worker interruptions and infrastructure failures.

> **Project status:** Graduation project in development. The architecture, recovery mechanisms, and deployment pipeline described here are planned capabilities unless explicitly marked as implemented.

## Table of Contents

- [The Problem](#the-problem)
- [Our Solution](#our-solution)
- [Key Features](#key-features)
- [How It Works](#how-it-works)
- [What Makes It Different](#what-makes-it-different)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [DevOps and Reliability](#devops-and-reliability)
- [Security Considerations](#security-considerations)
- [Repository Structure](#repository-structure)
- [Development Roadmap](#development-roadmap)
- [Team](#team)

## The Problem

Testing APIs manually can be time-consuming and difficult to maintain, especially as an API grows.

Developers and QA engineers often need to:

- Write repetitive test cases for multiple endpoints.
- Validate HTTP status codes, response structures, and expected behavior.
- Identify edge cases and invalid inputs.
- Execute tests repeatedly after code changes.
- Investigate failures across different services.
- Recover interrupted test runs without losing track of completed work.

Existing API testing workflows can require significant manual configuration, scripting, and maintenance.

## Our Solution

API Test Pilot aims to automate much of this workflow by combining OpenAPI-based test generation, AI-assisted test design, deterministic validation, and background execution.

Users provide an API specification, review the generated tests, and execute them against a target API. The platform collects results and helps explain failures.

Our design separates **AI-assisted test generation** from **deterministic test validation**. AI proposes test cases and helps interpret failures, while explicit validation rules determine whether actual responses satisfy the test expectations.

A further project objective is to make test execution resilient to worker and infrastructure failures, so interrupted runs can recover safely where possible instead of unnecessarily restarting everything.

## Key Features

### 1. OpenAPI / Swagger Import

- Accept an OpenAPI specification through a URL or uploaded file.
- Extract API endpoints, HTTP methods, parameters, and documented response schemas.
- Use the specification as the foundation for test generation.

### 2. AI-Assisted Test Generation

- Generate test cases based on endpoint definitions and documented behavior.
- Explore useful positive and negative test scenarios.
- Help identify missing coverage and potentially unexpected behavior.
- Provide explanations that help developers understand generated tests.

### 3. Automated Test Execution

- Execute generated HTTP requests against a target API.
- Run independent tests through background workers.
- Collect response status codes, response data, execution times, and errors.
- Support parallel execution where appropriate.

### 4. Deterministic Validation

- Compare actual HTTP status codes against expected outcomes.
- Validate response structures against documented schemas where supported.
- Record explicit pass/fail outcomes using defined validation rules.
- Distinguish assertion failures from execution errors where possible.

AI-generated tests are suggestions, not proof of correctness. The validation engine remains responsible for applying the configured test assertions.

### 5. Test Results and Failure Analysis

- Present test outcomes in a unified interface.
- Identify failed assertions and execution errors.
- Use AI assistance to explain failures and suggest possible causes.
- Help developers distinguish application defects from infrastructure or connectivity problems.

### 6. Resilient Test Execution — Planned

Reliability and recovery are a central engineering objective of the project.

The planned recovery workflow includes:

- Persisting test-run and individual test-case states.
- Tracking worker activity and execution attempts.
- Detecting work left unfinished after worker interruptions.
- Retrying eligible tests under bounded retry policies.
- Preserving completed results when a run is interrupted.
- Recording recovery outcomes for evaluation.

Recovery must account for the possibility that an HTTP request reached the target API even though the worker failed before saving its result. Such cases may require an explicit uncertain state instead of blindly retrying a potentially non-idempotent operation.

## How It Works

The intended workflow is:

1. **Import:** The user provides an OpenAPI/Swagger URL or uploads a specification.
2. **Analyze:** The backend parses the specification and extracts API definitions.
3. **Generate:** The AI service proposes test cases based on the available API information.
4. **Validate:** The platform applies deterministic rules to define expected outcomes.
5. **Execute:** Background workers execute the test cases against the target API.
6. **Persist:** Test states, attempts, and results are stored for tracking and recovery.
7. **Report:** The frontend displays results and provides failure explanations.
8. **Recover:** If a worker or service fails, the recovery mechanism identifies eligible unfinished work and resumes it according to the configured policy.

## What Makes It Different?

Generating API tests from Swagger and using AI to propose test cases are established approaches. Our goal is to go beyond test generation by focusing on **reliable execution, recovery, and measurable behavior under failure**.

The proposed differentiating direction is:

### Recovery-Aware API Testing

A test run should be treated as a durable workflow rather than a single process that either finishes or disappears.

The system aims to track individual test-case states, detect interrupted work, preserve completed results, and safely resume eligible tests.

### Explainable Failure Classification

The platform aims to distinguish between different failure categories, including:

- API assertion failures.
- Network and timeout errors.
- AI service failures.
- Worker interruptions.
- Database connectivity failures.

This helps users understand whether a failure indicates a potential API defect or a problem in the testing infrastructure.

### Measurable Reliability

We plan to evaluate the system under controlled failure scenarios rather than relying only on a successful demonstration.

Potential evaluation metrics include:

- Test completion rate.
- Recovery time after a worker interruption.
- Number of lost or duplicated results.
- Retry count and recovery success rate.
- Execution overhead introduced by recovery mechanisms.

These are proposed evaluation criteria, not measured results.

## Architecture


### Component Responsibilities

| Component | Responsibility |
|---|---|
| Frontend | Specification input, test management, execution controls, and results visualization |
| .NET backend | API orchestration, test-run management, persistence integration, and application logic |
| AI service | AI-assisted test generation and failure explanations |
| Background workers | Test execution, result persistence, and integration with recovery logic |
| SQL Server | Persistent application data and test-run state |
| GitHub Actions | Automated validation, image builds, and deployment workflows |
| Container registry | Versioned application image storage |
| Linux VM | Initial deployment environment for the containerized platform |

The architecture is a proposed design. Exact service boundaries, job scheduling commands, health endpoints, and worker execution behavior will be finalized during implementation.

## Technology Stack

| Area | Technology |
|---|---|
| Frontend | React, TypeScript, Vite |
| Backend API | .NET 10, C# 14, ASP.NET Core |
| Database | Microsoft SQL Server, Entity Framework Core |
| Background jobs | Hangfire |
| OpenAPI processing | Microsoft.OpenApi |
| HTTP execution | IHttpClientFactory, HTTPX |
| AI service | Python 3.12, FastAPI |
| Data validation | Pydantic and deterministic application-level validators |
| AI integration | Google Gemini API |
| Automated testing | Pytest and service-specific test frameworks |
| Containerization | Docker and Docker Compose |
| CI/CD | GitHub Actions |
| Container registry | GitHub Container Registry (GHCR), planned |
| Deployment | Linux VM / cloud server |
| Reverse proxy and HTTPS | Nginx or an equivalent supported ingress layer |

Versions, service configuration, and deployment choices will be confirmed against the actual application manifests before release.

## DevOps and Reliability

The DevOps workstream focuses on making the platform reproducible to build, deploy, observe, and recover.

### Containerization

- Build separate containers for the frontend, backend, and AI service.
- Run background workers as separate processes or services where supported by the application.
- Use Docker Compose for the initial multi-service deployment.
- Persist database data using managed Docker volumes.
- Keep internal services off public interfaces unless external access is explicitly required.

### CI/CD

The planned pipeline will:

1. Validate code and run available tests on pull requests.
2. Build the application images.
3. Publish versioned images for approved changes.
4. Deploy approved releases to the Linux server.
5. Run health checks and smoke tests.
6. Record the deployed versions and support rollback to a known-good application release where safe.

### Observability

The initial implementation will prioritize useful logs and health checks, with additional metrics as the recovery mechanism develops.

Candidate metrics include:

- Queue depth and waiting time.
- Worker heartbeat age.
- Test execution duration.
- Retry counts.
- Recovery time.
- Lost, uncertain, or duplicated execution results.

Prometheus and Grafana may be added if the implementation and project timeline justify them.

### Recovery Testing

We intend to inject controlled failures, such as terminating a worker during a test run, temporarily interrupting database connectivity, or making the AI service unavailable.

The goal is to measure what the platform actually recovers from, what it cannot recover from safely, and what impact recovery has on execution time and result integrity.

## Security Considerations

Because the platform can make HTTP requests to user-supplied API targets, security must be part of the design.

Planned safeguards include:

- Validate target URLs on the server side.
- Restrict requests to loopback, private, link-local, and cloud metadata destinations according to an explicit target-access policy.
- Account for DNS resolution and redirects when enforcing destination restrictions.
- Apply request timeouts, response-size limits, and concurrency limits.
- Store API credentials and AI provider keys in environment-specific secrets, not in source control or container images.
- Avoid exposing SQL Server, the AI service, and worker management interfaces publicly.
- Restrict deployment credentials and SSH access.
- Use HTTPS for externally accessible application endpoints.
- Apply authentication and authorization appropriate to the deployment.

Target isolation is particularly important because an API testing platform can otherwise become a way to send requests to unintended internal services.

## Repository Structure

The intended monorepo layout is:

```text
api-test-pilot/
├── frontend/
│   ├── Dockerfile
│   └── .dockerignore
├── backend/
│   ├── Dockerfile
│   └── .dockerignore
├── ai-service/
│   ├── Dockerfile
│   └── .dockerignore
├── deploy/
│   ├── compose.yaml
│   ├── compose.prod.yaml
│   └── nginx/
│       └── default.conf
├── tests/
│   ├── integration/
│   └── smoke/
├── scripts/
│   ├── deploy.sh
│   └── smoke-test.sh
├── docs/
│   ├── architecture.md
│   ├── deployment.md
│   └── recovery-runbook.md
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
├── .env.example
├── .gitignore
└── README.md
```

This is a proposed layout. It should be adapted to the team's existing solution files, package manifests, and application entry points rather than used to overwrite existing project structure.

## Development Roadmap

- [ ] Finalize service contracts, internal ports, and environment variables.
- [ ] Establish the monorepo and architecture documentation.
- [ ] Containerize and build each service independently.
- [ ] Integrate the services using Docker Compose.
- [ ] Implement persistent test-run and test-case state.
- [ ] Implement worker interruption detection and bounded recovery.
- [ ] Add automated tests and CI validation.
- [ ] Add health checks, structured logs, and recovery metrics.
- [ ] Deploy to a Linux VM using versioned images.
- [ ] Run controlled failure-injection experiments.
- [ ] Evaluate recovery time, result integrity, and execution overhead.
- [ ] Document deployment, backup, recovery, and rollback procedures.

## Team

| Role | Team Member |
|---|---|
| Backend | Ahmed Mohamed |
| AI | Fatma Mahmoud |
| Frontend | Mohamed Essam |
| Frontend | Mohamed Bayoumi |
| UI/UX | Hamdi Mohamed |
| DevOps | Mohamed Ali |
| DevOps | Mohamed Samir |

## Project Vision

API Test Pilot aims to make API testing more accessible while exploring how AI-assisted test generation can be combined with dependable execution infrastructure.

The long-term objective is not simply to generate more tests. It is to help developers run tests, understand failures, preserve results, and recover safely when the infrastructure executing those tests fails.

**Generate tests intelligently. Validate them deterministically. Execute them reliably.**


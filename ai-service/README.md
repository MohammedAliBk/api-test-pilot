# API Test Pilot - AI Service

Owner: Fatma Mahmoud | Contract: ATP-BE-AI-001 v1.0.0

## Run

    .\run.ps1

Or directly:

    .\.venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8000

## Endpoints (contract v1.0.0)

| Method | Path | Purpose |
|---|---|---|
| GET | /health/live | Liveness probe |
| GET | /health/ready | Readiness probe |
| GET | /v1/capabilities | Contract negotiation |

Interactive docs: http://127.0.0.1:8000/docs

## Tests

    .\.venv\Scripts\python.exe -m pytest -q

## Next step

Add Pydantic models from the contract schemas, then wire Google Gemini
for specification analysis, test-case generation and failure explanation.
Pass/fail stays deterministic in the .NET backend.

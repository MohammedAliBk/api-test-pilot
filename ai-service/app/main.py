from datetime import datetime, timezone

from fastapi import FastAPI, Header
from fastapi.responses import JSONResponse

from app.config import settings
from app.schemas import (
    AnalyzeRequest,
    AnalyzeResponseData,
    MetaInfo,
    OperationInfo,
    Readiness,
    SuccessEnvelope,
    UsageInfo,
)

app = FastAPI(
    title="API Test Pilot - AI Service",
    version="1.0.0",
    description="Contract ATP-BE-AI-001 v1.0.0 | AI Service owner: Fatma Mahmoud",
)


@app.get("/health/live", tags=["health"])
def health_live():
    return {"status": "ok"}


@app.get("/health/ready", tags=["health"])
def health_ready():
    if not settings.gemini_api_key:
        return JSONResponse(
            status_code=503,
            content={
                "status": "degraded",
                "code": "AI_MODEL_UNAVAILABLE",
                "detail": "GEMINI_API_KEY is not configured.",
            },
        )
    return {
        "status": "ready",
        "modelConfigured": True,
        "modelReachable": True,
        "model": settings.gemini_model,
    }


@app.get("/v1/capabilities", tags=["contract"])
def capabilities():
    return {
        "contractVersions": [settings.contract_version],
        "specFormats": [{"format": "openapi", "versions": ["3.0.x", "3.1.x"]}],
        "limits": {
            "maxSpecChars": 2000000,
            "maxTestCasesPerOperation": 15,
            "maxTestCasesPerSuite": 500,
        },
        "features": {"asyncJobs": False, "callbacks": False, "strictGrounding": True},
        "model": {"id": settings.gemini_model, "provider": "google"},
    }


@app.post(
    "/v1/specifications/analyze",
    tags=["workflows"],
    response_model=SuccessEnvelope,
)
def analyze_specification(
    request: AnalyzeRequest,
    x_correlation_id: str = Header(..., alias="X-Correlation-Id"),
):
    """W1 - Mock response to validate the contract shape before wiring Gemini."""
    data = AnalyzeResponseData(
        analysisId=request.analysisId,
        specFingerprint="sha256:mock_" + (request.specification.sourceName or "spec"),
        summary={
            "title": "Mock API",
            "apiVersion": request.specification.version,
            "pathCount": 1,
            "operationCount": 1,
            "securitySchemes": ["bearerAuth"],
        },
        operations=[
            OperationInfo(
                operationId="getMockData",
                method="GET",
                path="/api/data",
                documentedStatusCodes=[200, 404],
                requestBodyRequired=False,
                parameters=[{"name": "id", "in": "path", "required": True, "type": "integer"}],
                responseSchemaPointers={"200": "#/components/schemas/Data"},
                securityRequirements=[{"schemeId": "bearerAuth", "scopes": []}],
                completeness="complete",
            )
        ],
        issues=[],
        unsupportedElements=[],
        readiness=Readiness(
            canGenerateTestCases=True,
            blockedOperationIds=[],
            documentedCoveragePercent=100.0,
        ),
    )

    return SuccessEnvelope(
        contractVersion=request.contractVersion,
        correlationId=x_correlation_id,
        status="succeeded",
        data=data,
        warnings=[],
        usage=UsageInfo(inputTokens=150, outputTokens=300),
        meta=MetaInfo(
            model=settings.gemini_model,
            processingMs=45,
            generatedAt=datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
        ),
    )

from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Dict, Any
from enum import Enum


class SpecFormat(str, Enum):
    openapi = "openapi"


class Severity(str, Enum):
    warning = "warning"
    error = "error"


class Completeness(str, Enum):
    complete = "complete"
    partial = "partial"
    incomplete = "incomplete"


class Specification(BaseModel):
    format: SpecFormat
    version: str = Field(..., pattern=r"^3\.[01]\.\d+$")
    mediaType: str
    content: str = Field(..., min_length=1, max_length=2000000)
    sha256: Optional[str] = None
    sourceName: Optional[str] = None


class Scope(BaseModel):
    operationIds: List[str] = Field(default_factory=list)
    includeDeprecated: bool = False


class AnalyzeOptions(BaseModel):
    detectAmbiguities: bool = True


class AnalyzeRequest(BaseModel):
    model_config = ConfigDict(populate_by_name=True)
    contractVersion: str = Field(..., pattern=r"^\d+\.\d+$")
    tenantId: str = Field(..., pattern=r"^[a-zA-Z0-9_-]{3,64}$")
    projectId: str = Field(..., pattern=r"^[a-zA-Z0-9_-]{3,64}$")
    analysisId: str = Field(..., pattern=r"^an_[a-zA-Z0-9_-]{3,64}$")
    specification: Specification
    scope: Scope = Field(default_factory=Scope)
    options: AnalyzeOptions = Field(default_factory=AnalyzeOptions)


class OperationInfo(BaseModel):
    operationId: str
    method: str
    path: str
    documentedStatusCodes: List[int]
    requestBodyRequired: bool = False
    parameters: List[Dict[str, Any]] = Field(default_factory=list)
    responseSchemaPointers: Dict[str, str] = Field(default_factory=dict)
    securityRequirements: List[Dict[str, Any]] = Field(default_factory=list)
    completeness: Completeness


class Issue(BaseModel):
    code: str
    severity: Severity
    operationId: str
    pointer: str
    message: str
    blocking: bool = False


class Readiness(BaseModel):
    canGenerateTestCases: bool
    blockedOperationIds: List[str] = Field(default_factory=list)
    documentedCoveragePercent: float


class AnalyzeResponseData(BaseModel):
    analysisId: str
    specFingerprint: str
    summary: Dict[str, Any]
    operations: List[OperationInfo]
    issues: List[Issue] = Field(default_factory=list)
    unsupportedElements: List[str] = Field(default_factory=list)
    readiness: Readiness


class WarningItem(BaseModel):
    code: str
    message: str


class UsageInfo(BaseModel):
    inputTokens: int = 0
    outputTokens: int = 0


class MetaInfo(BaseModel):
    model: str
    processingMs: int
    generatedAt: str


class SuccessEnvelope(BaseModel):
    contractVersion: str
    correlationId: str
    status: str = "succeeded"
    data: AnalyzeResponseData
    warnings: List[WarningItem] = Field(default_factory=list)
    usage: UsageInfo = Field(default_factory=UsageInfo)
    meta: MetaInfo

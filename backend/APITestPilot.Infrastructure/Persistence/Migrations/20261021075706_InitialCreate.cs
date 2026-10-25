using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace APITestPilot.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    Email = table.Column<string>(type: "nvarchar(320)", maxLength: 320, nullable: false),
                    DisplayName = table.Column<string>(type: "nvarchar(120)", maxLength: 120, nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    AuthProvider = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2(3)", nullable: false, defaultValueSql: "SYSUTCDATETIME()"),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2(3)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false, defaultValue: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Projects",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    OwnerUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(120)", maxLength: 120, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2(3)", nullable: false, defaultValueSql: "SYSUTCDATETIME()"),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2(3)", nullable: true),
                    IsArchived = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projects", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Projects_Users_OwnerUserId",
                        column: x => x.OwnerUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ApiSpecifications",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    ProjectId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(160)", maxLength: 160, nullable: false),
                    SourceFileName = table.Column<string>(type: "nvarchar(260)", maxLength: 260, nullable: true),
                    Format = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    OpenApiVersion = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    ApiTitle = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    ApiVersion = table.Column<string>(type: "nvarchar(80)", maxLength: 80, nullable: true),
                    SpecificationJson = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ContentHash = table.Column<string>(type: "char(64)", nullable: false),
                    ImportedAt = table.Column<DateTime>(type: "datetime2(3)", nullable: false, defaultValueSql: "SYSUTCDATETIME()"),
                    IsActive = table.Column<bool>(type: "bit", nullable: false, defaultValue: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApiSpecifications", x => x.Id);
                    table.CheckConstraint("CK_ApiSpecifications_Format", "[Format] = 'OpenAPI'");
                    table.ForeignKey(
                        name: "FK_ApiSpecifications_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Environments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    ProjectId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    BaseUrl = table.Column<string>(type: "nvarchar(2048)", maxLength: 2048, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    IsDefault = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2(3)", nullable: false, defaultValueSql: "SYSUTCDATETIME()"),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2(3)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Environments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Environments_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TestSuites",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    ProjectId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(160)", maxLength: 160, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    CreatedByUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2(3)", nullable: false, defaultValueSql: "SYSUTCDATETIME()"),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2(3)", nullable: true),
                    IsArchived = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestSuites", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TestSuites_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TestSuites_Users_CreatedByUserId",
                        column: x => x.CreatedByUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Endpoints",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    ApiSpecificationId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Path = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    HttpMethod = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: false),
                    OperationId = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true),
                    Summary = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TagsJson = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Deprecated = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2(3)", nullable: false, defaultValueSql: "SYSUTCDATETIME()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Endpoints", x => x.Id);
                    table.CheckConstraint("CK_Endpoints_HttpMethod", "[HttpMethod] IN ('GET','POST','PUT','PATCH','DELETE','HEAD','OPTIONS','TRACE')");
                    table.ForeignKey(
                        name: "FK_Endpoints_ApiSpecifications_ApiSpecificationId",
                        column: x => x.ApiSpecificationId,
                        principalTable: "ApiSpecifications",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EnvironmentVariables",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    EnvironmentId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EncryptedValue = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    IsSecret = table.Column<bool>(type: "bit", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2(3)", nullable: false, defaultValueSql: "SYSUTCDATETIME()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EnvironmentVariables", x => x.Id);
                    table.CheckConstraint("CK_EnvironmentVariables_SecretStorage", "([IsSecret] = 0 AND [EncryptedValue] IS NULL) OR ([IsSecret] = 1 AND [Value] IS NULL)");
                    table.ForeignKey(
                        name: "FK_EnvironmentVariables_Environments_EnvironmentId",
                        column: x => x.EnvironmentId,
                        principalTable: "Environments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TestRuns",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    TestSuiteId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EnvironmentId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    StartedByUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Status = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: false),
                    TriggerType = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: false),
                    StartedAt = table.Column<DateTime>(type: "datetime2(3)", nullable: true),
                    CompletedAt = table.Column<DateTime>(type: "datetime2(3)", nullable: true),
                    TotalTests = table.Column<int>(type: "int", nullable: false),
                    PassedTests = table.Column<int>(type: "int", nullable: false),
                    FailedTests = table.Column<int>(type: "int", nullable: false),
                    SkippedTests = table.Column<int>(type: "int", nullable: false),
                    ErrorMessage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2(3)", nullable: false, defaultValueSql: "SYSUTCDATETIME()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestRuns", x => x.Id);
                    table.CheckConstraint("CK_TestRuns_Status", "[Status] IN ('Queued','Running','Passed','Failed','Cancelled','Error')");
                    table.CheckConstraint("CK_TestRuns_TriggerType", "[TriggerType] IN ('Manual','Scheduled','Api')");
                    table.ForeignKey(
                        name: "FK_TestRuns_Environments_EnvironmentId",
                        column: x => x.EnvironmentId,
                        principalTable: "Environments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TestRuns_TestSuites_TestSuiteId",
                        column: x => x.TestSuiteId,
                        principalTable: "TestSuites",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TestRuns_Users_StartedByUserId",
                        column: x => x.StartedByUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "EndpointParameters",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    EndpointId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Location = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: false),
                    DataType = table.Column<string>(type: "nvarchar(80)", maxLength: 80, nullable: true),
                    IsRequired = table.Column<bool>(type: "bit", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    SchemaJson = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ExampleJson = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SortOrder = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EndpointParameters", x => x.Id);
                    table.CheckConstraint("CK_EndpointParameters_Location", "[Location] IN ('path','query','header','cookie')");
                    table.ForeignKey(
                        name: "FK_EndpointParameters_Endpoints_EndpointId",
                        column: x => x.EndpointId,
                        principalTable: "Endpoints",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EndpointResponses",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    EndpointId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    StatusCode = table.Column<int>(type: "int", nullable: false),
                    IsDefault = table.Column<bool>(type: "bit", nullable: false),
                    MediaType = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: true),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    SchemaJson = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ExampleJson = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EndpointResponses", x => x.Id);
                    table.CheckConstraint("CK_EndpointResponses_StatusCode", "[StatusCode] BETWEEN 100 AND 599");
                    table.ForeignKey(
                        name: "FK_EndpointResponses_Endpoints_EndpointId",
                        column: x => x.EndpointId,
                        principalTable: "Endpoints",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TestCases",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    TestSuiteId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EndpointId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Category = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: false),
                    Source = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: false),
                    Priority = table.Column<byte>(type: "tinyint", nullable: false),
                    IsEnabled = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2(3)", nullable: false, defaultValueSql: "SYSUTCDATETIME()"),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2(3)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestCases", x => x.Id);
                    table.CheckConstraint("CK_TestCases_Category", "[Category] IN ('Functional','Validation','Negative','Boundary','Schema','Security')");
                    table.CheckConstraint("CK_TestCases_Priority", "[Priority] BETWEEN 1 AND 5");
                    table.CheckConstraint("CK_TestCases_Source", "[Source] IN ('Generated','Manual','Imported')");
                    table.ForeignKey(
                        name: "FK_TestCases_Endpoints_EndpointId",
                        column: x => x.EndpointId,
                        principalTable: "Endpoints",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TestCases_TestSuites_TestSuiteId",
                        column: x => x.TestSuiteId,
                        principalTable: "TestSuites",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TestAssertions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    TestCaseId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AssertionType = table.Column<string>(type: "varchar(40)", unicode: false, maxLength: 40, nullable: false),
                    Target = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Operator = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: false),
                    ExpectedValueJson = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsNegated = table.Column<bool>(type: "bit", nullable: false),
                    SortOrder = table.Column<int>(type: "int", nullable: false),
                    ErrorMessage = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestAssertions", x => x.Id);
                    table.CheckConstraint("CK_TestAssertions_Operator", "[Operator] IN ('Equals','NotEquals','Contains','NotContains','Exists','NotExists','GreaterThan','GreaterThanOrEqual','LessThan','LessThanOrEqual','MatchesRegex','IsValid')");
                    table.CheckConstraint("CK_TestAssertions_Type", "[AssertionType] IN ('StatusCode','JsonPath','Header','ResponseTime','ContentType','Schema','BodyContains')");
                    table.ForeignKey(
                        name: "FK_TestAssertions_TestCases_TestCaseId",
                        column: x => x.TestCaseId,
                        principalTable: "TestCases",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TestCaseRequests",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    TestCaseId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PathParametersJson = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    QueryParametersJson = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HeadersJson = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BodyJson = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ContentType = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    ExpectedStatusCode = table.Column<int>(type: "int", nullable: true),
                    TimeoutMilliseconds = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2(3)", nullable: false, defaultValueSql: "SYSUTCDATETIME()"),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2(3)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestCaseRequests", x => x.Id);
                    table.CheckConstraint("CK_TestCaseRequests_StatusCode", "[ExpectedStatusCode] IS NULL OR [ExpectedStatusCode] BETWEEN 100 AND 599");
                    table.CheckConstraint("CK_TestCaseRequests_Timeout", "[TimeoutMilliseconds] BETWEEN 1000 AND 300000");
                    table.ForeignKey(
                        name: "FK_TestCaseRequests_TestCases_TestCaseId",
                        column: x => x.TestCaseId,
                        principalTable: "TestCases",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TestResults",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    TestRunId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TestCaseId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Status = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: false),
                    RequestUrl = table.Column<string>(type: "nvarchar(2048)", maxLength: 2048, nullable: true),
                    RequestMethod = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: true),
                    RequestHeadersJson = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RequestBody = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ResponseStatusCode = table.Column<int>(type: "int", nullable: true),
                    ResponseHeadersJson = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ResponseBody = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DurationMilliseconds = table.Column<int>(type: "int", nullable: true),
                    StartedAt = table.Column<DateTime>(type: "datetime2(3)", nullable: true),
                    CompletedAt = table.Column<DateTime>(type: "datetime2(3)", nullable: true),
                    ErrorMessage = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestResults", x => x.Id);
                    table.CheckConstraint("CK_TestResults_Duration", "[DurationMilliseconds] IS NULL OR [DurationMilliseconds] >= 0");
                    table.CheckConstraint("CK_TestResults_ResponseCode", "[ResponseStatusCode] IS NULL OR [ResponseStatusCode] BETWEEN 100 AND 599");
                    table.CheckConstraint("CK_TestResults_Status", "[Status] IN ('Pending','Running','Passed','Failed','Skipped','Error')");
                    table.ForeignKey(
                        name: "FK_TestResults_TestCases_TestCaseId",
                        column: x => x.TestCaseId,
                        principalTable: "TestCases",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TestResults_TestRuns_TestRunId",
                        column: x => x.TestRunId,
                        principalTable: "TestRuns",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AssertionResults",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    TestResultId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TestAssertionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Status = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: false),
                    ActualValueJson = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ExpectedValueJson = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FailureMessage = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    EvaluatedAt = table.Column<DateTime>(type: "datetime2(3)", nullable: false, defaultValueSql: "SYSUTCDATETIME()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AssertionResults", x => x.Id);
                    table.CheckConstraint("CK_AssertionResults_Status", "[Status] IN ('Passed','Failed','Skipped','Error')");
                    table.ForeignKey(
                        name: "FK_AssertionResults_TestAssertions_TestAssertionId",
                        column: x => x.TestAssertionId,
                        principalTable: "TestAssertions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AssertionResults_TestResults_TestResultId",
                        column: x => x.TestResultId,
                        principalTable: "TestResults",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ApiSpecifications_ProjectId_ContentHash",
                table: "ApiSpecifications",
                columns: new[] { "ProjectId", "ContentHash" });

            migrationBuilder.CreateIndex(
                name: "IX_ApiSpecifications_ProjectId_ImportedAt",
                table: "ApiSpecifications",
                columns: new[] { "ProjectId", "ImportedAt" });

            migrationBuilder.CreateIndex(
                name: "IX_AssertionResults_TestAssertionId",
                table: "AssertionResults",
                column: "TestAssertionId");

            migrationBuilder.CreateIndex(
                name: "IX_AssertionResults_TestResultId_TestAssertionId",
                table: "AssertionResults",
                columns: new[] { "TestResultId", "TestAssertionId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_EndpointParameters_EndpointId_Name_Location",
                table: "EndpointParameters",
                columns: new[] { "EndpointId", "Name", "Location" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_EndpointResponses_EndpointId_StatusCode",
                table: "EndpointResponses",
                columns: new[] { "EndpointId", "StatusCode" });

            migrationBuilder.CreateIndex(
                name: "IX_Endpoints_ApiSpecificationId_HttpMethod_Path",
                table: "Endpoints",
                columns: new[] { "ApiSpecificationId", "HttpMethod", "Path" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Endpoints_OperationId",
                table: "Endpoints",
                column: "OperationId",
                filter: "[OperationId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Environments_ProjectId_Name",
                table: "Environments",
                columns: new[] { "ProjectId", "Name" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_EnvironmentVariables_EnvironmentId_Name",
                table: "EnvironmentVariables",
                columns: new[] { "EnvironmentId", "Name" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Projects_OwnerUserId_CreatedAt",
                table: "Projects",
                columns: new[] { "OwnerUserId", "CreatedAt" });

            migrationBuilder.CreateIndex(
                name: "IX_TestAssertions_TestCaseId_SortOrder",
                table: "TestAssertions",
                columns: new[] { "TestCaseId", "SortOrder" });

            migrationBuilder.CreateIndex(
                name: "IX_TestCaseRequests_TestCaseId",
                table: "TestCaseRequests",
                column: "TestCaseId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_TestCases_EndpointId",
                table: "TestCases",
                column: "EndpointId");

            migrationBuilder.CreateIndex(
                name: "IX_TestCases_TestSuiteId_IsEnabled",
                table: "TestCases",
                columns: new[] { "TestSuiteId", "IsEnabled" });

            migrationBuilder.CreateIndex(
                name: "IX_TestResults_TestCaseId",
                table: "TestResults",
                column: "TestCaseId");

            migrationBuilder.CreateIndex(
                name: "IX_TestResults_TestRunId_Status",
                table: "TestResults",
                columns: new[] { "TestRunId", "Status" });

            migrationBuilder.CreateIndex(
                name: "IX_TestResults_TestRunId_TestCaseId",
                table: "TestResults",
                columns: new[] { "TestRunId", "TestCaseId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_TestRuns_EnvironmentId",
                table: "TestRuns",
                column: "EnvironmentId");

            migrationBuilder.CreateIndex(
                name: "IX_TestRuns_StartedByUserId",
                table: "TestRuns",
                column: "StartedByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_TestRuns_Status_CreatedAt",
                table: "TestRuns",
                columns: new[] { "Status", "CreatedAt" });

            migrationBuilder.CreateIndex(
                name: "IX_TestRuns_TestSuiteId_CreatedAt",
                table: "TestRuns",
                columns: new[] { "TestSuiteId", "CreatedAt" });

            migrationBuilder.CreateIndex(
                name: "IX_TestSuites_CreatedByUserId",
                table: "TestSuites",
                column: "CreatedByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_TestSuites_ProjectId_Name",
                table: "TestSuites",
                columns: new[] { "ProjectId", "Name" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AssertionResults");

            migrationBuilder.DropTable(
                name: "EndpointParameters");

            migrationBuilder.DropTable(
                name: "EndpointResponses");

            migrationBuilder.DropTable(
                name: "EnvironmentVariables");

            migrationBuilder.DropTable(
                name: "TestCaseRequests");

            migrationBuilder.DropTable(
                name: "TestAssertions");

            migrationBuilder.DropTable(
                name: "TestResults");

            migrationBuilder.DropTable(
                name: "TestCases");

            migrationBuilder.DropTable(
                name: "TestRuns");

            migrationBuilder.DropTable(
                name: "Endpoints");

            migrationBuilder.DropTable(
                name: "Environments");

            migrationBuilder.DropTable(
                name: "TestSuites");

            migrationBuilder.DropTable(
                name: "ApiSpecifications");

            migrationBuilder.DropTable(
                name: "Projects");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}

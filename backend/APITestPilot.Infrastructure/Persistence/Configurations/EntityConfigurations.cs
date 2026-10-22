using APITestPilot.Domain.Entities;
using APITestPilot.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace APITestPilot.Infrastructure.Persistence.Configurations;


public sealed class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> b)
    {
        b.ToTable("Users");
        b.HasKey(x => x.Id);
        b.Property(x => x.Id).HasDefaultValueSql("NEWSEQUENTIALID()");
        b.Property(x => x.Email).HasMaxLength(320).IsRequired();
        b.Property(x => x.DisplayName).HasMaxLength(120).IsRequired();
        b.Property(x => x.PasswordHash).HasMaxLength(500);
        b.Property(x => x.AuthProvider).HasMaxLength(40).IsRequired();
        b.Property(x => x.CreatedAt).HasColumnType("datetime2(3)").HasDefaultValueSql("SYSUTCDATETIME()");
        b.Property(x => x.UpdatedAt).HasColumnType("datetime2(3)");
        // IsActive: no HasDefaultValue(true). The entity already initializes it to true in C#,
        // and a DB default would make EF ignore an explicit false.
        b.Property(x => x.RowVersion).IsRowVersion();
        b.HasIndex(x => x.Email).IsUnique();
    }
}

public sealed class ProjectConfiguration : IEntityTypeConfiguration<Project>
{
    public void Configure(EntityTypeBuilder<Project> b)
    {
        b.ToTable("Projects");
        b.HasKey(x => x.Id);
        b.Property(x => x.Id).HasDefaultValueSql("NEWSEQUENTIALID()");
        b.Property(x => x.Name).HasMaxLength(120).IsRequired();
        b.Property(x => x.Description).HasMaxLength(1000);
        b.Property(x => x.CreatedAt).HasColumnType("datetime2(3)").HasDefaultValueSql("SYSUTCDATETIME()");
        b.Property(x => x.UpdatedAt).HasColumnType("datetime2(3)");
        b.Property(x => x.IsArchived).HasDefaultValue(false);
        b.Property(x => x.RowVersion).IsRowVersion();
        b.HasOne(x => x.Owner).WithMany(x => x.OwnedProjects).HasForeignKey(x => x.OwnerUserId).OnDelete(DeleteBehavior.Restrict);
        b.HasIndex(x => new { x.OwnerUserId, x.CreatedAt });
    }
}

public sealed class ApiSpecificationConfiguration : IEntityTypeConfiguration<ApiSpecification>
{
    public void Configure(EntityTypeBuilder<ApiSpecification> b)
    {
        b.ToTable("ApiSpecifications", t => t.HasCheckConstraint("CK_ApiSpecifications_Format", "[Format] = 'OpenAPI'"));
        b.HasKey(x => x.Id);
        b.Property(x => x.Id).HasDefaultValueSql("NEWSEQUENTIALID()");
        b.Property(x => x.Name).HasMaxLength(160).IsRequired();
        b.Property(x => x.SourceFileName).HasMaxLength(260);
        b.Property(x => x.Format).HasMaxLength(20).IsRequired();
        b.Property(x => x.OpenApiVersion).HasMaxLength(20);
        b.Property(x => x.ApiTitle).HasMaxLength(200);
        b.Property(x => x.ApiVersion).HasMaxLength(80);
        b.Property(x => x.SpecificationJson).HasColumnType("nvarchar(max)").IsRequired();
        b.Property(x => x.ContentHash).HasColumnType("char(64)").IsRequired();
        b.Property(x => x.ImportedAt).HasColumnType("datetime2(3)").HasDefaultValueSql("SYSUTCDATETIME()");
        // IsActive: no HasDefaultValue(true) (see UserConfiguration).
        b.HasOne(x => x.Project).WithMany(x => x.ApiSpecifications).HasForeignKey(x => x.ProjectId).OnDelete(DeleteBehavior.Restrict);
        b.HasIndex(x => new { x.ProjectId, x.ImportedAt });
        b.HasIndex(x => new { x.ProjectId, x.ContentHash });                       // not unique: duplicate check is done in code
        b.HasIndex(x => new { x.ProjectId, x.VersionNumber }).IsUnique();          // v1, v2, v3 ... per project
        b.HasIndex(x => x.ProjectId).IsUnique().HasFilter("[IsActive] = 1");       // only one active spec per project
    }
}

public sealed class EndpointConfiguration : IEntityTypeConfiguration<Endpoint>
{
    public void Configure(EntityTypeBuilder<Endpoint> b)
    {
        b.ToTable("Endpoints", t => t.HasCheckConstraint("CK_Endpoints_HttpMethod", "[HttpMethod] IN ('GET','POST','PUT','PATCH','DELETE','HEAD','OPTIONS','TRACE')"));
        b.HasKey(x => x.Id);
        b.Property(x => x.Id).HasDefaultValueSql("NEWSEQUENTIALID()");
        b.Property(x => x.Path).HasMaxLength(1000).IsRequired();
        b.Property(x => x.HttpMethod).HasMaxLength(10).IsUnicode(false).IsRequired();
        b.Property(x => x.OperationId).HasMaxLength(250);
        b.Property(x => x.Summary).HasMaxLength(500);
        b.Property(x => x.Description).HasColumnType("nvarchar(max)");
        b.Property(x => x.TagsJson).HasColumnType("nvarchar(max)");
        b.Property(x => x.CreatedAt).HasColumnType("datetime2(3)").HasDefaultValueSql("SYSUTCDATETIME()");
        b.HasOne(x => x.ApiSpecification).WithMany(x => x.Endpoints).HasForeignKey(x => x.ApiSpecificationId).OnDelete(DeleteBehavior.Cascade);
        b.HasIndex(x => new { x.ApiSpecificationId, x.HttpMethod, x.Path }).IsUnique();
        b.HasIndex(x => x.OperationId).HasFilter("[OperationId] IS NOT NULL");
    }
}

public sealed class EndpointParameterConfiguration : IEntityTypeConfiguration<EndpointParameter>
{
    public void Configure(EntityTypeBuilder<EndpointParameter> b)
    {
        b.ToTable("EndpointParameters", t => t.HasCheckConstraint("CK_EndpointParameters_Location", "[Location] IN ('path','query','header','cookie')"));
        b.HasKey(x => x.Id);
        b.Property(x => x.Id).HasDefaultValueSql("NEWSEQUENTIALID()");
        b.Property(x => x.Name).HasMaxLength(200).IsRequired();
        b.Property(x => x.Location).HasMaxLength(20).IsUnicode(false).IsRequired();
        b.Property(x => x.DataType).HasMaxLength(80);
        b.Property(x => x.Description).HasMaxLength(1000);
        b.Property(x => x.SchemaJson).HasColumnType("nvarchar(max)");
        b.Property(x => x.ExampleJson).HasColumnType("nvarchar(max)");
        b.HasOne(x => x.Endpoint).WithMany(x => x.Parameters).HasForeignKey(x => x.EndpointId).OnDelete(DeleteBehavior.Cascade);
        b.HasIndex(x => new { x.EndpointId, x.Name, x.Location }).IsUnique();
    }
}

public sealed class EndpointResponseConfiguration : IEntityTypeConfiguration<EndpointResponse>
{
    public void Configure(EntityTypeBuilder<EndpointResponse> b)
    {
        // StatusCode is null for "default" and range keys like "2XX".
        b.ToTable("EndpointResponses", t => t.HasCheckConstraint("CK_EndpointResponses_StatusCode", "[StatusCode] IS NULL OR [StatusCode] BETWEEN 100 AND 599"));
        b.HasKey(x => x.Id);
        b.Property(x => x.Id).HasDefaultValueSql("NEWSEQUENTIALID()");
        b.Property(x => x.ResponseKey).HasMaxLength(10).IsUnicode(false).IsRequired();   // "200", "404", "default", "2XX"
        b.Property(x => x.MediaType).HasMaxLength(150);
        b.Property(x => x.Description).HasMaxLength(1000);
        b.Property(x => x.SchemaJson).HasColumnType("nvarchar(max)");
        b.Property(x => x.ExampleJson).HasColumnType("nvarchar(max)");
        b.HasOne(x => x.Endpoint).WithMany(x => x.Responses).HasForeignKey(x => x.EndpointId).OnDelete(DeleteBehavior.Cascade);
        b.HasIndex(x => new { x.EndpointId, x.ResponseKey });
    }
}

public sealed class ApiEnvironmentConfiguration : IEntityTypeConfiguration<ApiEnvironment>
{
    public void Configure(EntityTypeBuilder<ApiEnvironment> b)
    {
        b.ToTable("Environments");
        b.HasKey(x => x.Id);
        b.Property(x => x.Id).HasDefaultValueSql("NEWSEQUENTIALID()");
        b.Property(x => x.Name).HasMaxLength(100).IsRequired();
        b.Property(x => x.BaseUrl).HasMaxLength(2048).IsRequired();
        b.Property(x => x.Description).HasMaxLength(500);
        b.Property(x => x.CreatedAt).HasColumnType("datetime2(3)").HasDefaultValueSql("SYSUTCDATETIME()");
        b.Property(x => x.UpdatedAt).HasColumnType("datetime2(3)");
        b.HasOne(x => x.Project).WithMany(x => x.Environments).HasForeignKey(x => x.ProjectId).OnDelete(DeleteBehavior.Restrict);
        b.HasIndex(x => new { x.ProjectId, x.Name }).IsUnique();
        b.HasIndex(x => x.ProjectId).IsUnique().HasFilter("[IsDefault] = 1");   // only one default environment per project
    }
}

public sealed class EnvironmentVariableConfiguration : IEntityTypeConfiguration<EnvironmentVariable>
{
    public void Configure(EntityTypeBuilder<EnvironmentVariable> b)
    {
        b.ToTable("EnvironmentVariables", t => t.HasCheckConstraint("CK_EnvironmentVariables_SecretStorage", "([IsSecret] = 0 AND [EncryptedValue] IS NULL) OR ([IsSecret] = 1 AND [Value] IS NULL)"));
        b.HasKey(x => x.Id);
        b.Property(x => x.Id).HasDefaultValueSql("NEWSEQUENTIALID()");
        b.Property(x => x.Name).HasMaxLength(200).IsRequired();
        b.Property(x => x.Value).HasColumnType("nvarchar(max)");
        b.Property(x => x.EncryptedValue).HasColumnType("varbinary(max)");
        b.Property(x => x.UpdatedAt).HasColumnType("datetime2(3)").HasDefaultValueSql("SYSUTCDATETIME()");
        b.HasOne(x => x.Environment).WithMany(x => x.Variables).HasForeignKey(x => x.EnvironmentId).OnDelete(DeleteBehavior.Cascade);
        b.HasIndex(x => new { x.EnvironmentId, x.Name }).IsUnique();
    }
}

public sealed class TestSuiteConfiguration : IEntityTypeConfiguration<TestSuite>
{
    public void Configure(EntityTypeBuilder<TestSuite> b)
    {
        b.ToTable("TestSuites");
        b.HasKey(x => x.Id);
        b.Property(x => x.Id).HasDefaultValueSql("NEWSEQUENTIALID()");
        b.Property(x => x.Name).HasMaxLength(160).IsRequired();
        b.Property(x => x.Description).HasMaxLength(1000);
        b.Property(x => x.VariablesJson).HasColumnType("nvarchar(max)");
        b.Property(x => x.CreatedAt).HasColumnType("datetime2(3)").HasDefaultValueSql("SYSUTCDATETIME()");
        b.Property(x => x.UpdatedAt).HasColumnType("datetime2(3)");
        b.HasOne(x => x.Project).WithMany(x => x.TestSuites).HasForeignKey(x => x.ProjectId).OnDelete(DeleteBehavior.Restrict);
        b.HasOne(x => x.CreatedByUser).WithMany(x => x.CreatedTestSuites).HasForeignKey(x => x.CreatedByUserId).OnDelete(DeleteBehavior.Restrict);
        b.HasIndex(x => new { x.ProjectId, x.Name }).IsUnique();
    }
}

public sealed class TestCaseConfiguration : IEntityTypeConfiguration<TestCase>
{
    public void Configure(EntityTypeBuilder<TestCase> b)
    {
        b.ToTable("TestCases", t =>
        {
            t.HasCheckConstraint("CK_TestCases_Category", $"[Category] IN ({EnumSql.InList<TestCategory>()})");
            t.HasCheckConstraint("CK_TestCases_Source", $"[Source] IN ({EnumSql.InList<TestSource>()})");
            t.HasCheckConstraint("CK_TestCases_Priority", "[Priority] BETWEEN 1 AND 5");
            t.HasCheckConstraint("CK_TestCases_OnFailure", $"[OnFailure] IN ({EnumSql.InList<OnFailureAction>()})");
        });
        b.Property(x => x.OnFailure).HasConversion<string>().HasMaxLength(20).IsUnicode(false).IsRequired();
        b.HasIndex(x => new { x.TestSuiteId, x.SortOrder }).IsUnique();

        b.HasKey(x => x.Id);
        b.Property(x => x.Id).HasDefaultValueSql("NEWSEQUENTIALID()");
        b.Property(x => x.Name).HasMaxLength(200).IsRequired();
        b.Property(x => x.Description).HasMaxLength(1000);
        b.Property(x => x.Category).HasConversion<string>().HasMaxLength(30).IsUnicode(false).IsRequired();
        b.Property(x => x.Source).HasConversion<string>().HasMaxLength(30).IsUnicode(false).IsRequired();
        b.Property(x => x.CreatedAt).HasColumnType("datetime2(3)").HasDefaultValueSql("SYSUTCDATETIME()");
        b.Property(x => x.UpdatedAt).HasColumnType("datetime2(3)");
        b.HasOne(x => x.TestSuite).WithMany(x => x.TestCases).HasForeignKey(x => x.TestSuiteId).OnDelete(DeleteBehavior.Restrict);
        b.HasOne(x => x.Endpoint).WithMany(x => x.TestCases).HasForeignKey(x => x.EndpointId).OnDelete(DeleteBehavior.Restrict);
        b.HasIndex(x => new { x.TestSuiteId, x.IsEnabled });
    }
}

public sealed class TestCaseRequestConfiguration : IEntityTypeConfiguration<TestCaseRequest>
{
    public void Configure(EntityTypeBuilder<TestCaseRequest> b)
    {
        // ExpectedStatusCode was removed: the expected status is now a StatusCode assertion.
        b.ToTable("TestCaseRequests", t => t.HasCheckConstraint("CK_TestCaseRequests_Timeout", "[TimeoutMilliseconds] BETWEEN 1000 AND 300000"));
        b.HasKey(x => x.Id);
        b.Property(x => x.Id).HasDefaultValueSql("NEWSEQUENTIALID()");
        b.Property(x => x.PathParametersJson).HasColumnType("nvarchar(max)");
        b.Property(x => x.QueryParametersJson).HasColumnType("nvarchar(max)");
        b.Property(x => x.HeadersJson).HasColumnType("nvarchar(max)");
        b.Property(x => x.BodyJson).HasColumnType("nvarchar(max)");
        b.Property(x => x.ContentType).HasMaxLength(200);
        b.Property(x => x.CreatedAt).HasColumnType("datetime2(3)").HasDefaultValueSql("SYSUTCDATETIME()");
        b.Property(x => x.UpdatedAt).HasColumnType("datetime2(3)");
        b.HasOne(x => x.TestCase).WithOne(x => x.Request).HasForeignKey<TestCaseRequest>(x => x.TestCaseId).OnDelete(DeleteBehavior.Cascade);
        b.HasIndex(x => x.TestCaseId).IsUnique();
    }
}

public sealed class TestAssertionConfiguration : IEntityTypeConfiguration<TestAssertion>
{
    public void Configure(EntityTypeBuilder<TestAssertion> b)
    {
        // IsNegated was removed: use the Not* operators instead.
        b.ToTable("TestAssertions", t =>
        {
            t.HasCheckConstraint("CK_TestAssertions_Type", $"[AssertionType] IN ({EnumSql.InList<AssertionType>()})");
            t.HasCheckConstraint("CK_TestAssertions_Operator", $"[Operator] IN ({EnumSql.InList<AssertionOperator>()})");
        });
        b.HasKey(x => x.Id);
        b.Property(x => x.Id).HasDefaultValueSql("NEWSEQUENTIALID()");
        b.Property(x => x.AssertionType).HasConversion<string>().HasMaxLength(40).IsUnicode(false).IsRequired();
        b.Property(x => x.Target).HasMaxLength(500);
        b.Property(x => x.Operator).HasConversion<string>().HasMaxLength(30).IsUnicode(false).IsRequired();
        b.Property(x => x.ExpectedValueJson).HasColumnType("nvarchar(max)");
        b.Property(x => x.ErrorMessage).HasMaxLength(500);
        b.HasOne(x => x.TestCase).WithMany(x => x.Assertions).HasForeignKey(x => x.TestCaseId).OnDelete(DeleteBehavior.Cascade);
        b.HasIndex(x => new { x.TestCaseId, x.SortOrder });
    }
}

public sealed class TestRunConfiguration : IEntityTypeConfiguration<TestRun>
{
    public void Configure(EntityTypeBuilder<TestRun> b)
    {
        b.ToTable("TestRuns", t =>
        {
            t.HasCheckConstraint("CK_TestRuns_Status", $"[Status] IN ({EnumSql.InList<TestRunStatus>()})");
            t.HasCheckConstraint("CK_TestRuns_TriggerType", $"[TriggerType] IN ({EnumSql.InList<TriggerType>()})");
        });
        b.HasKey(x => x.Id);
        b.Property(x => x.Id).HasDefaultValueSql("NEWSEQUENTIALID()");
        b.Property(x => x.Status).HasConversion<string>().HasMaxLength(20).IsUnicode(false).IsRequired();
        b.Property(x => x.TriggerType).HasConversion<string>().HasMaxLength(20).IsUnicode(false).IsRequired();
        b.Property(x => x.StartedAt).HasColumnType("datetime2(3)");
        b.Property(x => x.CompletedAt).HasColumnType("datetime2(3)");
        b.Property(x => x.ErrorMessage).HasColumnType("nvarchar(max)");
        b.Property(x => x.CreatedAt).HasColumnType("datetime2(3)").HasDefaultValueSql("SYSUTCDATETIME()");
        b.HasOne(x => x.TestSuite).WithMany(x => x.TestRuns).HasForeignKey(x => x.TestSuiteId).OnDelete(DeleteBehavior.Restrict);
        b.HasOne(x => x.Environment).WithMany(x => x.TestRuns).HasForeignKey(x => x.EnvironmentId).OnDelete(DeleteBehavior.Restrict);
        b.HasOne(x => x.StartedByUser).WithMany(x => x.StartedTestRuns).HasForeignKey(x => x.StartedByUserId).OnDelete(DeleteBehavior.Restrict);
        b.HasIndex(x => new { x.TestSuiteId, x.CreatedAt });
        b.HasIndex(x => new { x.Status, x.CreatedAt });
    }
}

public sealed class TestResultConfiguration : IEntityTypeConfiguration<TestResult>
{
    public void Configure(EntityTypeBuilder<TestResult> b)
    {
        b.ToTable("TestResults", t =>
        {
            t.HasCheckConstraint("CK_TestResults_Status", $"[Status] IN ({EnumSql.InList<TestResultStatus>()})");
            t.HasCheckConstraint("CK_TestResults_ResponseCode", "[ResponseStatusCode] IS NULL OR [ResponseStatusCode] BETWEEN 100 AND 599");
            t.HasCheckConstraint("CK_TestResults_Duration", "[DurationMilliseconds] IS NULL OR [DurationMilliseconds] >= 0");
        });
        b.HasKey(x => x.Id);
        b.Property(x => x.Id).HasDefaultValueSql("NEWSEQUENTIALID()");
        b.Property(x => x.Status).HasConversion<string>().HasMaxLength(20).IsUnicode(false).IsRequired();
        b.Property(x => x.RequestUrl).HasMaxLength(2048);
        b.Property(x => x.RequestMethod).HasMaxLength(10).IsUnicode(false);
        b.Property(x => x.RequestHeadersJson).HasColumnType("nvarchar(max)");
        b.Property(x => x.RequestBody).HasColumnType("nvarchar(max)");
        b.Property(x => x.ResponseHeadersJson).HasColumnType("nvarchar(max)");
        b.Property(x => x.ResponseBody).HasColumnType("nvarchar(max)");
        b.Property(x => x.StartedAt).HasColumnType("datetime2(3)");
        b.Property(x => x.CompletedAt).HasColumnType("datetime2(3)");
        b.Property(x => x.ErrorMessage).HasColumnType("nvarchar(max)");
        b.HasOne(x => x.TestRun).WithMany(x => x.Results).HasForeignKey(x => x.TestRunId).OnDelete(DeleteBehavior.Cascade);
        b.HasOne(x => x.TestCase).WithMany(x => x.Results).HasForeignKey(x => x.TestCaseId).OnDelete(DeleteBehavior.Restrict);
        b.HasIndex(x => new { x.TestRunId, x.TestCaseId }).IsUnique();
        b.HasIndex(x => new { x.TestRunId, x.Status });
    }
}

public sealed class AssertionResultConfiguration : IEntityTypeConfiguration<AssertionResult>
{
    public void Configure(EntityTypeBuilder<AssertionResult> b)
    {
        b.ToTable("AssertionResults", t => t.HasCheckConstraint("CK_AssertionResults_Status", $"[Status] IN ({EnumSql.InList<AssertionResultStatus>()})"));
        b.HasKey(x => x.Id);
        b.Property(x => x.Id).HasDefaultValueSql("NEWSEQUENTIALID()");
        b.Property(x => x.Status).HasConversion<string>().HasMaxLength(10).IsUnicode(false).IsRequired();
        b.Property(x => x.ActualValueJson).HasColumnType("nvarchar(max)");
        b.Property(x => x.ExpectedValueJson).HasColumnType("nvarchar(max)");
        b.Property(x => x.FailureMessage).HasMaxLength(1000);
        b.Property(x => x.EvaluatedAt).HasColumnType("datetime2(3)").HasDefaultValueSql("SYSUTCDATETIME()");
        b.HasOne(x => x.TestResult).WithMany(x => x.AssertionResults).HasForeignKey(x => x.TestResultId).OnDelete(DeleteBehavior.Cascade);
        b.HasOne(x => x.TestAssertion).WithMany(x => x.Results).HasForeignKey(x => x.TestAssertionId).OnDelete(DeleteBehavior.Restrict);
        b.HasIndex(x => new { x.TestResultId, x.TestAssertionId }).IsUnique();
    }
}


public sealed class TestCaseExtractionConfiguration : IEntityTypeConfiguration<TestCaseExtraction>
{
    public void Configure(EntityTypeBuilder<TestCaseExtraction> b)
    {
        b.ToTable("TestCaseExtractions", t => t.HasCheckConstraint("CK_TestCaseExtractions_Source", $"[Source] IN ({EnumSql.InList<ExtractionSource>()})"));
        b.HasKey(x => x.Id);
        b.Property(x => x.Id).HasDefaultValueSql("NEWSEQUENTIALID()");
        b.Property(x => x.VariableName).HasMaxLength(100).IsRequired();
        b.Property(x => x.Source).HasConversion<string>().HasMaxLength(20).IsUnicode(false).IsRequired();
        b.Property(x => x.Path).HasMaxLength(500).IsRequired();
        b.HasOne(x => x.TestCase).WithMany(x => x.Extractions).HasForeignKey(x => x.TestCaseId).OnDelete(DeleteBehavior.Cascade);
        b.HasIndex(x => new { x.TestCaseId, x.VariableName }).IsUnique();
    }
}
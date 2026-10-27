using APITestPilot.Domain.Entities;
using Microsoft.EntityFrameworkCore;
namespace APITestPilot.Infrastructure.Persistence;

public sealed class APITestPilotDbContext : DbContext
{
    public APITestPilotDbContext(DbContextOptions<APITestPilotDbContext> options) : base(options){}
    public DbSet<User> Users => Set<User>();
    public DbSet<Project> Projects => Set<Project>();
    public DbSet<ApiSpecification> ApiSpecifications => Set<ApiSpecification>();
    public DbSet<Endpoint> Endpoints => Set<Endpoint>();
    public DbSet<EndpointParameter> EndpointParameters => Set<EndpointParameter>();
    public DbSet<EndpointResponse> EndpointResponses => Set<EndpointResponse>();
    public DbSet<ApiEnvironment> Environments => Set<ApiEnvironment>();
    public DbSet<EnvironmentVariable> EnvironmentVariables => Set<EnvironmentVariable>();
    public DbSet<TestSuite> TestSuites => Set<TestSuite>();
    public DbSet<TestCase> TestCases => Set<TestCase>();
    public DbSet<TestCaseRequest> TestCaseRequests => Set<TestCaseRequest>();
    public DbSet<TestAssertion> TestAssertions => Set<TestAssertion>();
    public DbSet<TestRun> TestRuns => Set<TestRun>();
    public DbSet<TestResult> TestResults => Set<TestResult>();
    public DbSet<AssertionResult> AssertionResults => Set<AssertionResult>();
    public DbSet<TestCaseExtraction> TestCaseExtractions => Set<TestCaseExtraction>();
    protected override void OnModelCreating(ModelBuilder modelBuilder) { base.OnModelCreating(modelBuilder); modelBuilder.ApplyConfigurationsFromAssembly(typeof(APITestPilotDbContext).Assembly); }
}

using APITestPilot.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace APITestPilot.Application.Interfaces;

public interface IAPITestPilotDbContext
{
    DbSet<User> Users { get; }
    DbSet<Project> Projects { get; }
    DbSet<ApiSpecification> ApiSpecifications { get; }
    DbSet<Endpoint> Endpoints { get; }
    DbSet<EndpointParameter> EndpointParameters { get; }
    DbSet<EndpointResponse> EndpointResponses { get; }
    DbSet<ApiEnvironment> Environments { get; }
    DbSet<EnvironmentVariable> EnvironmentVariables { get; }
    DbSet<TestSuite> TestSuites { get; }
    DbSet<TestCase> TestCases { get; }
    DbSet<TestCaseRequest> TestCaseRequests { get; }
    DbSet<TestAssertion> TestAssertions { get; }
    DbSet<TestRun> TestRuns { get; }
    DbSet<TestResult> TestResults { get; }
    DbSet<AssertionResult> AssertionResults { get; }
    DbSet<TestCaseExtraction> TestCaseExtractions { get; }
    DbSet<RefreshToken> RefreshTokens { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}

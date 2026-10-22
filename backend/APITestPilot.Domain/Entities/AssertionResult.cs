using APITestPilot.Domain.Enums;

namespace APITestPilot.Domain.Entities;

public class AssertionResult
{
    public Guid Id { get; set; }
    public Guid TestResultId { get; set; }
    public Guid TestAssertionId { get; set; }
    public AssertionResultStatus Status { get; set; }
    public string? ActualValueJson { get; set; }
    public string? ExpectedValueJson { get; set; }
    public string? FailureMessage { get; set; }
    public DateTime EvaluatedAt { get; set; }
    public TestResult TestResult { get; set; } = null!;
    public TestAssertion TestAssertion { get; set; } = null!;
}

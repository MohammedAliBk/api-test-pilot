using APITestPilot.Domain.Enums;

namespace APITestPilot.Domain.Entities;

public class TestRun
{
    public Guid Id { get; set; }
    public Guid TestSuiteId { get; set; }
    public Guid EnvironmentId { get; set; }
    public Guid StartedByUserId { get; set; }
    public TestRunStatus Status { get; set; } = TestRunStatus.Queued;
    public TriggerType TriggerType { get; set; } = TriggerType.Manual;
    public DateTime? StartedAt { get; set; }
    public DateTime? CompletedAt { get; set; }
    public int TotalTests { get; set; }
    public int PassedTests { get; set; }
    public int FailedTests { get; set; }
    public int SkippedTests { get; set; }
    public string? ErrorMessage { get; set; }
    public DateTime CreatedAt { get; set; }
    public TestSuite TestSuite { get; set; } = null!;
    public ApiEnvironment Environment { get; set; } = null!;
    public User StartedByUser { get; set; } = null!;
    public ICollection<TestResult> Results { get; set; } = new List<TestResult>();
}

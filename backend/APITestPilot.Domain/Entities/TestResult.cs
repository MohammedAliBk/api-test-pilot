using APITestPilot.Domain.Enums;

namespace APITestPilot.Domain.Entities;

public class TestResult
{
    public Guid Id { get; set; }
    public Guid TestRunId { get; set; }
    public Guid TestCaseId { get; set; }
    public TestResultStatus Status { get; set; } = TestResultStatus.Pending;
    public string? RequestUrl { get; set; }
    public string? RequestMethod { get; set; }
    public string? RequestHeadersJson { get; set; }
    public string? RequestBody { get; set; }
    public int? ResponseStatusCode { get; set; }
    public string? ResponseHeadersJson { get; set; }
    public string? ResponseBody { get; set; }
    public int? DurationMilliseconds { get; set; }
    public DateTime? StartedAt { get; set; }
    public DateTime? CompletedAt { get; set; }
    public string? ErrorMessage { get; set; }
    public TestRun TestRun { get; set; } = null!;
    public TestCase TestCase { get; set; } = null!;
    public ICollection<AssertionResult> AssertionResults { get; set; } = new List<AssertionResult>();
}

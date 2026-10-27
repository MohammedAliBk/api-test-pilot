using APITestPilot.Domain.Enums;

namespace APITestPilot.Domain.Entities;

public class TestCase
{
    public Guid Id { get; set; }
    public Guid TestSuiteId { get; set; }
    public Guid EndpointId { get; set; }
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    public TestCategory Category { get; set; } = TestCategory.Functional;
    public TestSource Source { get; set; } = TestSource.Generated;
    public byte Priority { get; set; } = 2;
    public bool IsEnabled { get; set; } = true;
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public TestSuite TestSuite { get; set; } = null!;
    public Endpoint Endpoint { get; set; } = null!;
    public TestCaseRequest? Request { get; set; }
    public int SortOrder { get; set; }
    public OnFailureAction OnFailure { get; set; } = OnFailureAction.Continue;
    public bool IsCleanup { get; set; }
    public ICollection<TestCaseExtraction> Extractions { get; set; } = new List<TestCaseExtraction>();
    public ICollection<TestAssertion> Assertions { get; set; } = new List<TestAssertion>();
    public ICollection<TestResult> Results { get; set; } = new List<TestResult>();
}

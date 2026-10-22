using APITestPilot.Domain.Enums;

namespace APITestPilot.Domain.Entities;

public class TestAssertion
{
    public Guid Id { get; set; }
    public Guid TestCaseId { get; set; }
    public AssertionType AssertionType { get; set; }
    public string? Target { get; set; }
    public AssertionOperator Operator { get; set; }
    public string? ExpectedValueJson { get; set; }
    public int SortOrder { get; set; }
    public string? ErrorMessage { get; set; }
    public TestCase TestCase { get; set; } = null!;
    public ICollection<AssertionResult> Results { get; set; } = new List<AssertionResult>();
}

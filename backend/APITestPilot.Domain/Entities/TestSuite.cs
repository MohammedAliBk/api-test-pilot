namespace APITestPilot.Domain.Entities;

public class TestSuite
{
    public Guid Id { get; set; }
    public Guid ProjectId { get; set; }
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    public string? VariablesJson { get; set; }
    public Guid CreatedByUserId { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public bool IsArchived { get; set; }
    public Project Project { get; set; } = null!;
    public User CreatedByUser { get; set; } = null!;
    public ICollection<TestCase> TestCases { get; set; } = new List<TestCase>();
    public ICollection<TestRun> TestRuns { get; set; } = new List<TestRun>();
}

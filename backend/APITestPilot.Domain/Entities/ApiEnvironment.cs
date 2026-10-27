namespace APITestPilot.Domain.Entities;

public class ApiEnvironment
{
    public Guid Id { get; set; }
    public Guid ProjectId { get; set; }
    public string Name { get; set; } = null!;
    public string BaseUrl { get; set; } = null!;
    public string? Description { get; set; }
    public bool IsDefault { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public Project Project { get; set; } = null!;
    public ICollection<EnvironmentVariable> Variables { get; set; } = new List<EnvironmentVariable>();
    public ICollection<TestRun> TestRuns { get; set; } = new List<TestRun>();
}

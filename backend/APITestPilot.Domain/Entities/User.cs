namespace APITestPilot.Domain.Entities;

public class User
{
    public Guid Id { get; set; }
    public string Email { get; set; } = null!;
    public string DisplayName { get; set; } = null!;
    public string? PasswordHash { get; set; }
    public string AuthProvider { get; set; } = "Local";
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public bool IsActive { get; set; } = true;
    public byte[] RowVersion { get; set; } = [];
    public ICollection<Project> OwnedProjects { get; set; } = new List<Project>();
    public ICollection<TestSuite> CreatedTestSuites { get; set; } = new List<TestSuite>();
    public ICollection<TestRun> StartedTestRuns { get; set; } = new List<TestRun>();
}

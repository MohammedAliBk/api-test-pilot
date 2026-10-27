namespace APITestPilot.Domain.Entities;

public class Project
{
    public Guid Id { get; set; }
    public Guid OwnerUserId { get; set; }
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public bool IsArchived { get; set; }
    public byte[] RowVersion { get; set; } = [];
    public User Owner { get; set; } = null!;
    public ICollection<ApiSpecification> ApiSpecifications { get; set; } = new List<ApiSpecification>();
    public ICollection<ApiEnvironment> Environments { get; set; } = new List<ApiEnvironment>();
    public ICollection<TestSuite> TestSuites { get; set; } = new List<TestSuite>();
}

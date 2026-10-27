namespace APITestPilot.Domain.Entities;

public class ApiSpecification
{
    public Guid Id { get; set; }
    public Guid ProjectId { get; set; }
    public string Name { get; set; } = null!;
    public string? SourceFileName { get; set; }
    public int VersionNumber { get; set; }
    public string Format { get; set; } = "OpenAPI";
    public string? OpenApiVersion { get; set; }
    public string? ApiTitle { get; set; }
    public string? ApiVersion { get; set; }
    public string SpecificationJson { get; set; } = null!;
    public string ContentHash { get; set; } = null!;
    public DateTime ImportedAt { get; set; }
    public bool IsActive { get; set; } = true;
    public Project Project { get; set; } = null!;
    public ICollection<Endpoint> Endpoints { get; set; } = new List<Endpoint>();
}

namespace APITestPilot.Domain.Entities;

public class EndpointParameter
{
    public Guid Id { get; set; }
    public Guid EndpointId { get; set; }
    public string Name { get; set; } = null!;
    public string Location { get; set; } = null!;
    public string? DataType { get; set; }
    public bool IsRequired { get; set; }
    public string? Description { get; set; }
    public string? SchemaJson { get; set; }
    public string? ExampleJson { get; set; }
    public int SortOrder { get; set; }
    public Endpoint Endpoint { get; set; } = null!;
}

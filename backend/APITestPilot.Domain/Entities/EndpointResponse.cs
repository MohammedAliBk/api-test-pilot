namespace APITestPilot.Domain.Entities;

public class EndpointResponse
{
    public Guid Id { get; set; }
    public Guid EndpointId { get; set; }
    public int? StatusCode { get; set; }
    public string? MediaType { get; set; }
    public string? Description { get; set; }
    public string? SchemaJson { get; set; }
    public string? ExampleJson { get; set; }
    public string ResponseKey { get; set; } = null!;
    public Endpoint Endpoint { get; set; } = null!;
}

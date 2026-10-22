namespace APITestPilot.Domain.Entities;

public class Endpoint
{
    public Guid Id { get; set; }
    public Guid ApiSpecificationId { get; set; }
    public string Path { get; set; } = null!;
    public string HttpMethod { get; set; } = null!;
    public string? OperationId { get; set; }
    public string? Summary { get; set; }
    public string? Description { get; set; }
    public string? TagsJson { get; set; }
    public bool Deprecated { get; set; }
    public DateTime CreatedAt { get; set; }
    public ApiSpecification ApiSpecification { get; set; } = null!;
    public ICollection<EndpointParameter> Parameters { get; set; } = new List<EndpointParameter>();
    public ICollection<EndpointResponse> Responses { get; set; } = new List<EndpointResponse>();
    public ICollection<TestCase> TestCases { get; set; } = new List<TestCase>();
}

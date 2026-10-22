namespace APITestPilot.Domain.Entities;

public class TestCaseRequest
{
    public Guid Id { get; set; }
    public Guid TestCaseId { get; set; }
    public string? PathParametersJson { get; set; }
    public string? QueryParametersJson { get; set; }
    public string? HeadersJson { get; set; }
    public string? BodyJson { get; set; }
    public string? ContentType { get; set; }
    public int TimeoutMilliseconds { get; set; } = 30000;
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public TestCase TestCase { get; set; } = null!;
}

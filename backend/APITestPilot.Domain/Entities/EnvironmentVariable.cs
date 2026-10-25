namespace APITestPilot.Domain.Entities;

public class EnvironmentVariable
{
    public Guid Id { get; set; }
    public Guid EnvironmentId { get; set; }
    public string Name { get; set; } = null!;
    public string? Value { get; set; }
    public byte[]? EncryptedValue { get; set; }
    public bool IsSecret { get; set; }
    public DateTime UpdatedAt { get; set; }
    public ApiEnvironment Environment { get; set; } = null!;
}

using APITestPilot.Domain.Entities;

namespace APITestPilot.Application.Interfaces
{
    public interface IJwtTokenGenerator
    {
        string GenerateToken(User user);
        (string Token, string TokenHash, DateTime ExpiresAt) GenerateRefreshToken();
    }
}

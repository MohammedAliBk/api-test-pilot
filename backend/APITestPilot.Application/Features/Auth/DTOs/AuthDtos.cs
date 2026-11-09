namespace APITestPilot.Application.Features.Auth.DTOs;

public record UserDto(
    Guid Id,
    string Email,
    string DisplayName,
    string AuthProvider
);

public record AuthResponse(
    string Token,
    string? RefreshToken,
    DateTime? RefreshTokenExpiresAt,
    UserDto User
);

public record RegisterRequest(
    string Email,
    string Password,
    string DisplayName
);

public record LoginRequest(
    string Email,
    string Password
);

public record FirebaseLoginRequest(
    string IdToken
);

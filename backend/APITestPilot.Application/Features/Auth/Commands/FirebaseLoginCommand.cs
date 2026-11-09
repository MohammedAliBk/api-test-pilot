using APITestPilot.Application.Features.Auth.DTOs;
using APITestPilot.Application.Interfaces;
using APITestPilot.Domain.Entities;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace APITestPilot.Application.Features.Auth.Commands;

public record FirebaseLoginCommand(
    string IdToken
) : IRequest<AuthResponse>;

public class FirebaseLoginCommandHandler : IRequestHandler<FirebaseLoginCommand, AuthResponse>
{
    private readonly IAPITestPilotDbContext _context;
    private readonly IFirebaseAuthService _firebaseAuthService;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;
    private readonly IValidator<FirebaseLoginCommand>? _validator;

    public FirebaseLoginCommandHandler(
        IAPITestPilotDbContext context,
        IFirebaseAuthService firebaseAuthService,
        IJwtTokenGenerator jwtTokenGenerator,
        IValidator<FirebaseLoginCommand>? validator = null)
    {
        _context = context;
        _firebaseAuthService = firebaseAuthService;
        _jwtTokenGenerator = jwtTokenGenerator;
        _validator = validator;
    }

    public async Task<AuthResponse> Handle(FirebaseLoginCommand request, CancellationToken cancellationToken)
    {
        if (_validator != null)
        {
            var validationResult = await _validator.ValidateAsync(request, cancellationToken);
            if (!validationResult.IsValid)
            {
                throw new ValidationException(validationResult.Errors);
            }
        }

        var firebaseUser = await _firebaseAuthService.VerifyTokenAsync(request.IdToken, cancellationToken);
        if (firebaseUser == null || string.IsNullOrWhiteSpace(firebaseUser.Uid))
        {
            throw new UnauthorizedAccessException("Invalid or expired Firebase ID token.");
        }

        var normalizedEmail = !string.IsNullOrWhiteSpace(firebaseUser.Email)
            ? firebaseUser.Email.Trim().ToLowerInvariant()
            : null;

        User? user = null;
        if (!string.IsNullOrEmpty(firebaseUser.Uid))
        {
            user = await _context.Users
                .FirstOrDefaultAsync(u => u.FirebaseUid == firebaseUser.Uid, cancellationToken);
        }

        if (user == null && normalizedEmail != null)
        {
            user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email.ToLower() == normalizedEmail, cancellationToken);
        }

        if (user != null)
        {
            if (string.IsNullOrEmpty(user.FirebaseUid))
            {
                user.FirebaseUid = firebaseUser.Uid;
            }

            if (string.IsNullOrWhiteSpace(user.DisplayName) && !string.IsNullOrWhiteSpace(firebaseUser.Name))
            {
                user.DisplayName = firebaseUser.Name;
            }

            user.UpdatedAt = DateTime.UtcNow;
        }
        else
        {
            var email = !string.IsNullOrWhiteSpace(firebaseUser.Email)
                ? firebaseUser.Email.Trim()
                : $"{firebaseUser.Uid}@firebase.local";

            var displayName = !string.IsNullOrWhiteSpace(firebaseUser.Name)
                ? firebaseUser.Name.Trim()
                : (email.Contains('@') ? email.Split('@')[0] : "User");

            user = new User
            {
                Id = Guid.NewGuid(),
                Email = email,
                DisplayName = displayName,
                FirebaseUid = firebaseUser.Uid,
                AuthProvider = "Firebase",
                PasswordHash = null,
                CreatedAt = DateTime.UtcNow,
                IsActive = true
            };

            _context.Users.Add(user);
        }

        var (rawRefreshToken, tokenHash, expiresAt) = _jwtTokenGenerator.GenerateRefreshToken();
        var refreshToken = new RefreshToken
        {
            Id = Guid.NewGuid(),
            UserId = user.Id,
            TokenHash = tokenHash,
            CreatedAt = DateTime.UtcNow,
            ExpiresAt = expiresAt
        };

        _context.RefreshTokens.Add(refreshToken);
        await _context.SaveChangesAsync(cancellationToken);

        var token = _jwtTokenGenerator.GenerateToken(user);

        return new AuthResponse(
            Token: token,
            RefreshToken: rawRefreshToken,
            RefreshTokenExpiresAt: expiresAt,
            User: new UserDto(user.Id, user.Email, user.DisplayName, user.AuthProvider)
        );
    }
}

using System;
using System.Collections.Generic;
using System.Text;

namespace APITestPilot.Application.Interfaces
{
    public interface IFirebaseAuthService
    {
        Task<FirebaseTokenResult?> VerifyTokenAsync(string idToken, CancellationToken cancellationToken = default);
    }

    public record FirebaseTokenResult(string Uid, string Email, string? Name);
}

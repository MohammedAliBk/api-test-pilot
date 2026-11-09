using APITestPilot.Application.Interfaces;
using FirebaseAdmin;
using FirebaseAdmin.Auth;

namespace APITestPilot.Infrastructure.Identity;

public class FirebaseAuthService : IFirebaseAuthService
{
    public async Task<FirebaseTokenResult?> VerifyTokenAsync(string idToken, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(idToken))
            return null;

        if (FirebaseApp.DefaultInstance == null)
            throw new InvalidOperationException("FirebaseApp has not been initialized. Please ensure Firebase is configured.");

        try
        {
            var auth = FirebaseAuth.DefaultInstance;
            var decoded = await auth.VerifyIdTokenAsync(idToken, cancellationToken);
            if (decoded == null)
                return null;

            var email = decoded.Claims.TryGetValue("email", out var emailObj) && emailObj is string emailStr
                ? emailStr
                : string.Empty;

            var name = decoded.Claims.TryGetValue("name", out var nameObj) && nameObj is string nameStr
                ? nameStr
                : null;

            return new FirebaseTokenResult(decoded.Uid, email, name);
        }
        catch (FirebaseAuthException)
        {
            return null;
        }
        catch (ArgumentException)
        {
            return null;
        }
    }
}

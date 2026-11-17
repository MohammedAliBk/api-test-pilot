using APITestPilot.Application.Features.Auth.Commands;
using APITestPilot.Application.Features.Auth.DTOs;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace APITestPilot.Controllers;

/// <summary>
/// Handles all authentication operations including local registration, local login,
/// Firebase OAuth login, and retrieving the currently authenticated user.
/// </summary>
/// <remarks>
/// All endpoints that return tokens provide both a short-lived JWT access token
/// (default: 15 minutes) and a long-lived refresh token (default: 7 days).
/// Protected endpoints require the <c>Authorization: Bearer {token}</c> header.
/// </remarks>
[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class AuthController : ControllerBase
{
    private readonly ISender _sender;
    private readonly ILogger<AuthController> _logger;

    /// <summary>
    /// Initializes a new instance of <see cref="AuthController"/>.
    /// </summary>
    /// <param name="sender">MediatR sender used to dispatch CQRS commands.</param>
    /// <param name="logger">Logger for recording unexpected errors.</param>
    public AuthController(ISender sender, ILogger<AuthController> logger)
    {
        _sender = sender;
        _logger = logger;
    }

    // ─── POST /api/auth/register ──────────────────────────────────────────────

    /// <summary>
    /// Registers a new local user account.
    /// </summary>
    /// <remarks>
    /// Creates a new user with the provided email, password, and display name.
    /// The password is hashed using BCrypt before storage and is never returned.
    ///
    /// **Flow:**
    /// 1. Validates the request payload using FluentValidation.
    /// 2. Checks that the email address is not already in use.
    /// 3. Hashes the password with BCrypt Enhanced.
    /// 4. Persists the new `User` record and an initial `RefreshToken`.
    /// 5. Returns a signed JWT access token and a refresh token.
    ///
    /// **Example request:**
    /// ```json
    /// {
    ///   "email": "ahmed@example.com",
    ///   "password": "SecurePass123!",
    ///   "displayName": "Ahmed Mohamed"
    /// }
    /// ```
    /// </remarks>
    /// <param name="command">
    /// Registration payload containing:
    /// <list type="bullet">
    ///   <item><description><b>Email</b> — Must be a valid email address (max 320 chars).</description></item>
    ///   <item><description><b>Password</b> — Minimum 6 characters.</description></item>
    ///   <item><description><b>DisplayName</b> — Visible username (max 100 chars).</description></item>
    /// </list>
    /// </param>
    /// <param name="cancellationToken">Token to cancel the asynchronous operation.</param>
    /// <returns>
    /// An <see cref="AuthResponse"/> containing the JWT access token, refresh token,
    /// refresh token expiry, and a <see cref="UserDto"/> with safe user details.
    /// </returns>
    /// <response code="200">Registration succeeded. Returns tokens and user info.</response>
    /// <response code="400">Validation failed — invalid email format, missing fields, or password too short.</response>
    /// <response code="409">Conflict — the email address is already registered.</response>
    /// <response code="500">Unexpected server error during registration.</response>
    [HttpPost("register")]
    [ProducesResponseType(typeof(AuthResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> Register([FromBody] RegisterCommand command, CancellationToken cancellationToken)
    {
        try
        {
            var result = await _sender.Send(command, cancellationToken);
            return Ok(result);
        }
        catch (ValidationException ex)
        {
            return BadRequest(new
            {
                message = "Validation failed.",
                errors = ex.Errors.Select(e => new { e.PropertyName, e.ErrorMessage })
            });
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unexpected error during registration.");
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred during registration." });
        }
    }

    // ─── POST /api/auth/login ─────────────────────────────────────────────────

    /// <summary>
    /// Authenticates a local user with their email and password.
    /// </summary>
    /// <remarks>
    /// Looks up the user by email (case-insensitive), verifies the BCrypt password
    /// hash, issues a new refresh token, and returns a signed JWT access token.
    ///
    /// **Flow:**
    /// 1. Validates that email and password fields are not empty.
    /// 2. Fetches the active user record by normalised email.
    /// 3. Verifies the submitted password against the stored BCrypt hash.
    /// 4. Generates a new `RefreshToken` and persists it.
    /// 5. Returns a signed JWT access token and the new refresh token.
    ///
    /// **Example request:**
    /// ```json
    /// {
    ///   "email": "ahmed@example.com",
    ///   "password": "SecurePass123!"
    /// }
    /// ```
    /// </remarks>
    /// <param name="command">
    /// Login payload containing:
    /// <list type="bullet">
    ///   <item><description><b>Email</b> — The registered email address.</description></item>
    ///   <item><description><b>Password</b> — The account password in plain text (transmitted over HTTPS).</description></item>
    /// </list>
    /// </param>
    /// <param name="cancellationToken">Token to cancel the asynchronous operation.</param>
    /// <returns>
    /// An <see cref="AuthResponse"/> containing the JWT access token, refresh token,
    /// refresh token expiry, and a <see cref="UserDto"/> with safe user details.
    /// </returns>
    /// <response code="200">Login succeeded. Returns tokens and user info.</response>
    /// <response code="400">Validation failed — email or password field is empty or malformed.</response>
    /// <response code="401">Unauthorized — email not found, account inactive, or password incorrect.</response>
    /// <response code="500">Unexpected server error during login.</response>
    [HttpPost("login")]
    [ProducesResponseType(typeof(AuthResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> Login([FromBody] LoginCommand command, CancellationToken cancellationToken)
    {
        try
        {
            var result = await _sender.Send(command, cancellationToken);
            return Ok(result);
        }
        catch (ValidationException ex)
        {
            return BadRequest(new
            {
                message = "Validation failed.",
                errors = ex.Errors.Select(e => new { e.PropertyName, e.ErrorMessage })
            });
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (UnauthorizedAccessException ex)
        {
            return Unauthorized(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unexpected error during login.");
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred during login." });
        }
    }

    // ─── POST /api/auth/firebase-login ────────────────────────────────────────

    /// <summary>
    /// Authenticates or registers a user via a Google Firebase ID token.
    /// </summary>
    /// <remarks>
    /// Accepts a Firebase ID token obtained from the Firebase Auth client SDK
    /// (e.g., after a Google Sign-In on the frontend). The token is verified
    /// server-side using the Firebase Admin SDK.
    ///
    /// **Upsert Logic:**
    /// - If a user with the same `FirebaseUid` already exists → links the session and updates metadata.
    /// - If no match by UID but the email exists → links the Firebase UID to the existing local account.
    /// - If no match at all → creates a brand-new user record with `AuthProvider = "Firebase"`.
    ///
    /// **Flow:**
    /// 1. Validates that the `idToken` field is not empty.
    /// 2. Verifies the token with the Firebase Admin SDK (checks signature and expiry).
    /// 3. Upserts the user record by `FirebaseUid` or `Email`.
    /// 4. Generates a new `RefreshToken` and persists it.
    /// 5. Returns a backend-issued JWT access token and refresh token.
    ///
    /// **Example request:**
    /// ```json
    /// {
    ///   "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6Ii..."
    /// }
    /// ```
    /// </remarks>
    /// <param name="command">
    /// Firebase login payload containing:
    /// <list type="bullet">
    ///   <item><description>
    ///     <b>IdToken</b> — The raw Firebase ID token string from the client SDK.
    ///     Obtain this via <c>firebase.auth().currentUser.getIdToken()</c> on the frontend.
    ///   </description></item>
    /// </list>
    /// </param>
    /// <param name="cancellationToken">Token to cancel the asynchronous operation.</param>
    /// <returns>
    /// An <see cref="AuthResponse"/> containing the backend JWT access token, refresh token,
    /// refresh token expiry, and a <see cref="UserDto"/> with safe user details.
    /// </returns>
    /// <response code="200">Firebase login succeeded. Returns backend tokens and user info.</response>
    /// <response code="400">Validation failed — the <c>idToken</c> field is missing or empty.</response>
    /// <response code="401">Unauthorized — the Firebase token is invalid, expired, or revoked.</response>
    /// <response code="500">Unexpected server error during Firebase authentication.</response>
    [HttpPost("firebase-login")]
    [ProducesResponseType(typeof(AuthResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> FirebaseLogin([FromBody] FirebaseLoginCommand command, CancellationToken cancellationToken)
    {
        try
        {
            var result = await _sender.Send(command, cancellationToken);
            return Ok(result);
        }
        catch (ValidationException ex)
        {
            return BadRequest(new
            {
                message = "Validation failed.",
                errors = ex.Errors.Select(e => new { e.PropertyName, e.ErrorMessage })
            });
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (UnauthorizedAccessException ex)
        {
            return Unauthorized(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unexpected error during Firebase login.");
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred during Firebase login." });
        }
    }

    // ─── GET /api/auth/me ─────────────────────────────────────────────────────

    /// <summary>
    /// Returns the identity of the currently authenticated user.
    /// </summary>
    /// <remarks>
    /// Reads identity claims directly from the validated JWT bearer token.
    /// No database call is made — the information is extracted purely from the token.
    ///
    /// **Requires:** <c>Authorization: Bearer {access_token}</c> header.
    ///
    /// **Returned claims:**
    /// <list type="bullet">
    ///   <item><description><b>id</b> — The user's unique <see cref="Guid"/>.</description></item>
    ///   <item><description><b>email</b> — The user's email address.</description></item>
    ///   <item><description><b>displayName</b> — The user's display name.</description></item>
    /// </list>
    ///
    /// **Example response:**
    /// ```json
    /// {
    ///   "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    ///   "email": "ahmed@example.com",
    ///   "displayName": "Ahmed Mohamed"
    /// }
    /// ```
    /// </remarks>
    /// <returns>
    /// A JSON object with the authenticated user's <c>id</c>, <c>email</c>, and <c>displayName</c>.
    /// </returns>
    /// <response code="200">Returns the authenticated user's identity claims from the JWT.</response>
    /// <response code="401">Unauthorized — no token provided, token is invalid, or token has expired.</response>
    [Authorize]
    [HttpGet("me")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public IActionResult GetMe()
    {
        var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        var email  = User.FindFirst(System.Security.Claims.ClaimTypes.Email)?.Value;
        var name   = User.FindFirst("name")?.Value;

        return Ok(new
        {
            id          = userId,
            email,
            displayName = name
        });
    }
}

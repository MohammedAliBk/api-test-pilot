import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { authApi, AuthApiError } from '../api/authApi';

describe('authApi client', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('posts credentials to /api/Auth/login and parses success response', async () => {
    const mockAuthResponse = {
      token: 'jwt-test-token-12345',
      refreshToken: 'refresh-test-token-67890',
      user: {
        id: 'usr-1',
        email: 'pilot@example.com',
        displayName: 'Test Pilot',
      },
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: async () => mockAuthResponse,
    });

    const res = await authApi.login({
      email: 'pilot@example.com',
      password: 'SecretPassword123!',
      rememberMe: true,
    });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/Auth/login'),
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json, application/problem+json',
        },
        body: JSON.stringify({
          email: 'pilot@example.com',
          password: 'SecretPassword123!',
        }),
      })
    );
    expect(res).toEqual(mockAuthResponse);
  });

  it('parses RFC 7807 ProblemDetails on HTTP 400 error', async () => {
    const mockProblemDetails = {
      type: 'https://tools.ietf.org/html/rfc7231#section-6.5.1',
      title: 'One or more validation errors occurred.',
      status: 400,
      errors: {
        Password: ['The Password field is required.'],
      },
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      statusText: 'Bad Request',
      headers: new Headers({ 'content-type': 'application/problem+json' }),
      json: async () => mockProblemDetails,
    });

    await expect(
      authApi.login({
        email: 'invalid@example.com',
        password: '',
      })
    ).rejects.toThrow(AuthApiError);

    try {
      await authApi.login({ email: 'invalid@example.com', password: '' });
    } catch (err) {
      expect(err).toBeInstanceOf(AuthApiError);
      const apiErr = err as AuthApiError;
      expect(apiErr.problem.title).toBe('One or more validation errors occurred.');
      expect(apiErr.problem.status).toBe(400);
      expect(apiErr.problem.errors?.Password).toContain('The Password field is required.');
    }
  });

  it('handles network failure with fallback problem details', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Failed to fetch'));

    await expect(
      authApi.login({
        email: 'network@example.com',
        password: 'Password123!',
      })
    ).rejects.toThrow(AuthApiError);

    try {
      await authApi.login({ email: 'network@example.com', password: 'Password123!' });
    } catch (err) {
      expect(err).toBeInstanceOf(AuthApiError);
      const apiErr = err as AuthApiError;
      expect(apiErr.problem.title).toBe('Network Error');
      expect(apiErr.problem.detail).toBe('Failed to fetch');
    }
  });
});

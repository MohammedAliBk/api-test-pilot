import type {
  AuthResponse,
  LoginCredentials,
  ProblemDetails,
  RegisterCredentials,
  User,
} from '../types';

const API_BASE_URL =
  (import.meta.env.VITE_API_URL as string | undefined) || '';

export class AuthApiError extends Error {
  public problem: ProblemDetails;
  public status: number;

  constructor(problem: ProblemDetails, status = 400) {
    super(problem.detail || problem.title || 'Authentication request failed');
    this.name = 'AuthApiError';
    this.problem = problem;
    this.status = status;
  }
}

async function safeFetch(url: string, init: RequestInit): Promise<Response> {
  try {
    return await fetch(url, init);
  } catch (err) {
    throw new AuthApiError(
      {
        title: 'Network Error',
        detail:
          err instanceof Error
            ? err.message
            : 'Unable to connect to the authentication server. Please check your network connection.',
        status: 0,
      },
      0
    );
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let problem: ProblemDetails;
    try {
      const body = (await response.json()) as Record<string, unknown>;
      problem = {
        title:
          (body.title as string) ||
          (body.message as string) ||
          response.statusText ||
          'Request failed',
        status: (body.status as number) || response.status,
        detail:
          (body.detail as string) ||
          (body.title && body.message ? (body.message as string) : undefined),
        errors: body.errors as Record<string, string[]> | undefined,
      };
    } catch {
      problem = {
        title: response.statusText || 'Request failed',
        status: response.status,
        detail: `The server returned HTTP ${response.status}`,
      };
    }
    throw new AuthApiError(problem, response.status);
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return {} as T;
  }

  return (await response.json()) as T;
}

export const authApi = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const res = await safeFetch(`${API_BASE_URL}/api/Auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json, application/problem+json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    return handleResponse<AuthResponse>(res);
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const res = await safeFetch(`${API_BASE_URL}/api/Auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json, application/problem+json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
        displayName: credentials.displayName,
      }),
    });
    return handleResponse<AuthResponse>(res);
  },

  async firebaseLogin(idToken: string): Promise<AuthResponse> {
    const res = await safeFetch(`${API_BASE_URL}/api/Auth/firebase-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json, application/problem+json',
      },
      body: JSON.stringify({ idToken }),
    });
    return handleResponse<AuthResponse>(res);
  },

  async getMe(token: string): Promise<User> {
    const res = await safeFetch(`${API_BASE_URL}/api/Auth/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    return handleResponse<User>(res);
  },
};

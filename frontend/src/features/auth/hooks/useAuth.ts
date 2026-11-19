import { useState, useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { authApi, AuthApiError } from '../api/authApi';
import type {
  AuthMode,
  AuthResponse,
  LoginCredentials,
  ProblemDetails,
  RegisterCredentials,
  User,
} from '../types';

export const TOKEN_KEY = 'api_test_pilot_token';
export const USER_KEY = 'api_test_pilot_user';

function parseJwtClaims(token?: string): Record<string, unknown> {
  if (!token || typeof token !== 'string') return {};
  try {
    const parts = token.split('.');
    if (parts.length < 2) return {};
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload) as Record<string, unknown>;
  } catch {
    return {};
  }
}

export function normalizeAuthUser(
  auth: AuthResponse,
  fallback?: { email?: string; displayName?: string }
): User {
  const raw = auth as unknown as Record<string, unknown>;
  const rawUser = (auth?.user || {}) as unknown as Record<string, unknown>;
  const claims = parseJwtClaims(auth?.token);

  const email =
    (rawUser.email as string) ||
    (raw.email as string) ||
    (claims.email as string) ||
    (claims['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] as string) ||
    fallback?.email ||
    '';

  const displayName =
    (rawUser.displayName as string) ||
    (rawUser.name as string) ||
    (rawUser.fullName as string) ||
    (raw.displayName as string) ||
    (raw.name as string) ||
    (claims.name as string) ||
    (claims.unique_name as string) ||
    (claims['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] as string) ||
    fallback?.displayName ||
    (email ? email.split('@')[0] : 'Developer');

  const id =
    (rawUser.id as string) ||
    (raw.userId as string) ||
    (claims.sub as string) ||
    (claims.nameid as string) ||
    email ||
    'user';

  return {
    id,
    email,
    displayName,
    avatarUrl: (rawUser.avatarUrl as string) || undefined,
  };
}

export function getStoredUser(): User | null {
  try {
    const saved = localStorage.getItem(USER_KEY);
    return saved ? (JSON.parse(saved) as User) : null;
  } catch {
    return null;
  }
}

export function clearStoredSession(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => getStoredUser());

  const [mode, setMode] = useState<AuthMode>('signin');
  const [problemDetails, setProblemDetails] = useState<ProblemDetails | null>(null);

  const saveSession = useCallback(
    (auth: AuthResponse, fallback?: { email?: string; displayName?: string }): User => {
      const normalizedUser = normalizeAuthUser(auth, fallback);
      if (auth?.token) {
        localStorage.setItem(TOKEN_KEY, auth.token);
      }
      localStorage.setItem(USER_KEY, JSON.stringify(normalizedUser));
      setUser(normalizedUser);
      setProblemDetails(null);
      return normalizedUser;
    },
    []
  );

  const clearSession = useCallback(() => {
    clearStoredSession();
    setUser(null);
    setProblemDetails(null);
  }, []);

  const loginMutation = useMutation({
    mutationFn: async (creds: LoginCredentials) => {
      const data = await authApi.login(creds);
      const savedUser = saveSession(data, { email: creds.email });
      return { ...data, user: savedUser };
    },
    onError: (err: unknown) => {
      if (err instanceof AuthApiError) {
        setProblemDetails(err.problem);
      } else {
        setProblemDetails({
          title: 'Sign In Failed',
          detail: 'An unexpected network error occurred. Please try again.',
        });
      }
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (creds: RegisterCredentials) => {
      const data = await authApi.register(creds);
      const savedUser = saveSession(data, {
        email: creds.email,
        displayName: creds.displayName,
      });
      return { ...data, user: savedUser };
    },
    onError: (err: unknown) => {
      if (err instanceof AuthApiError) {
        setProblemDetails(err.problem);
      } else {
        setProblemDetails({
          title: 'Registration Failed',
          detail: 'An unexpected network error occurred. Please try again.',
        });
      }
    },
  });

  const ssoMutation = useMutation({
    mutationFn: async (idToken: string) => {
      const data = await authApi.firebaseLogin(idToken);
      const savedUser = saveSession(data);
      return { ...data, user: savedUser };
    },
    onError: (err: unknown) => {
      if (err instanceof AuthApiError) {
        setProblemDetails(err.problem);
      } else {
        setProblemDetails({
          title: 'Google SSO Failed',
          detail: 'Could not complete single sign-on with Google.',
        });
      }
    },
  });

  const toggleMode = useCallback(() => {
    setMode((prev) => (prev === 'signin' ? 'signup' : 'signin'));
    setProblemDetails(null);
  }, []);

  const clearError = useCallback(() => {
    setProblemDetails(null);
  }, []);

  const isLoading =
    loginMutation.isPending || registerMutation.isPending || ssoMutation.isPending;

  return {
    user,
    mode,
    setMode,
    toggleMode,
    isLoading,
    problemDetails,
    setProblemDetails,
    clearError,
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    firebaseLogin: ssoMutation.mutateAsync,
    logout: clearSession,
  };
}

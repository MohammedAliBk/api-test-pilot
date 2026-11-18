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

const TOKEN_KEY = 'api_test_pilot_token';
const USER_KEY = 'api_test_pilot_user';

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(USER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [mode, setMode] = useState<AuthMode>('signin');
  const [problemDetails, setProblemDetails] = useState<ProblemDetails | null>(null);

  const saveSession = useCallback((auth: AuthResponse) => {
    localStorage.setItem(TOKEN_KEY, auth.token);
    localStorage.setItem(USER_KEY, JSON.stringify(auth.user));
    setUser(auth.user);
    setProblemDetails(null);
  }, []);

  const clearSession = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
    setProblemDetails(null);
  }, []);

  const loginMutation = useMutation({
    mutationFn: (creds: LoginCredentials) => authApi.login(creds),
    onSuccess: (data) => {
      saveSession(data);
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
    mutationFn: (creds: RegisterCredentials) => authApi.register(creds),
    onSuccess: (data) => {
      saveSession(data);
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
    mutationFn: (idToken: string) => authApi.firebaseLogin(idToken),
    onSuccess: (data) => {
      saveSession(data);
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

export interface User {
  id: string;
  email: string;
  displayName?: string;
  avatarUrl?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  expiresAt?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  displayName?: string;
  agreeToTerms?: boolean;
}

export interface ProblemDetails {
  type?: string;
  title: string;
  status?: number;
  detail?: string;
  instance?: string;
  errors?: Record<string, string[]>;
}

export type AuthMode = 'signin' | 'signup';

export type AuthFormState =
  | 'idle'
  | 'loading'
  | 'validation_error'
  | 'auth_error'
  | 'conflict_error'
  | 'sso_pending';

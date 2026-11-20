import React, { useState } from 'react';
import { AuthLayout, AuthCard, useAuth, type User } from '@/features/auth';
import { signInWithGoogle, isFirebaseConfigured } from '@/lib/firebase';

export interface AuthPageProps {
  onAuthSuccess?: (user: User) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onAuthSuccess }) => {
  const {
    mode,
    toggleMode,
    isLoading,
    problemDetails,
    setProblemDetails,
    clearError,
    login,
    register,
    firebaseLogin,
  } = useAuth();

  const [ssoPending, setSsoPending] = useState(false);

  const handleSubmit = async (data: {
    email: string;
    password: string;
    displayName?: string;
    rememberMe?: boolean;
  }) => {
    if (mode === 'signin') {
      const res = await login({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      });
      if (res?.user) {
        onAuthSuccess?.(res.user);
      }
    } else {
      const res = await register({
        email: data.email,
        password: data.password,
        displayName: data.displayName || data.email.split('@')[0],
      });
      if (res?.user) {
        onAuthSuccess?.(res.user);
      }
    }
  };

  const handleGoogleSSO = async () => {
    setSsoPending(true);
    clearError();
    try {
      if (isFirebaseConfigured()) {
        const idToken = await signInWithGoogle();
        const res = await firebaseLogin(idToken);
        if (res?.user) {
          onAuthSuccess?.(res.user);
        }
      } else {
        setProblemDetails({
          title: 'SSO Unavailable',
          detail: 'Firebase configuration keys not found in current environment.',
          status: 503,
        });
      }
    } catch (err: unknown) {
      setProblemDetails({
        title: 'Single Sign-On Failed',
        detail: err instanceof Error ? err.message : 'Google authentication could not be completed.',
        status: 400,
      });
    } finally {
      setSsoPending(false);
    }
  };

  return (
    <AuthLayout>
      <AuthCard
        mode={mode}
        onToggleMode={toggleMode}
        onSubmit={handleSubmit}
        onGoogleSSO={handleGoogleSSO}
        isLoading={isLoading || ssoPending}
        problemDetails={problemDetails}
        onClearProblem={clearError}
      />
    </AuthLayout>
  );
};

import React, { useState } from 'react';
import { AuthLayout } from '../components/AuthLayout';
import { AuthCard } from '../components/AuthCard';
import { useAuth } from '../hooks/useAuth';
import { signInWithGoogle, isFirebaseConfigured } from '@/lib/firebase';
import type { User } from '../types';

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
        const res = await firebaseLogin('simulated-google-oauth-token');
        if (res?.user) {
          onAuthSuccess?.(res.user);
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error && !problemDetails) {
        setProblemDetails({
          title: 'Google Sign-In',
          detail: err.message,
          status: 400,
        });
      }
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

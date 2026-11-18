import React, { useState } from 'react';
import { AuthLayout } from '../components/AuthLayout';
import { AuthCard } from '../components/AuthCard';
import { useAuth } from '../hooks/useAuth';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { signInWithGoogle, isFirebaseConfigured } from '@/lib/firebase';
import type { User } from '../types';

export interface AuthPageProps {
  onAuthSuccess?: (user: User) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onAuthSuccess }) => {
  const {
    user,
    mode,
    toggleMode,
    isLoading,
    problemDetails,
    setProblemDetails,
    clearError,
    login,
    register,
    firebaseLogin,
    logout,
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
        // Fallback / simulated flow when credentials are not yet configured
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
      {user ? (
        <div
          className="w-full max-w-md p-8 border rounded-panel text-center transition-all animate-in fade-in zoom-in-95 duration-200"
          style={{
            backgroundColor: 'var(--color-surface-raised)',
            borderColor: 'var(--color-line-strong)',
            boxShadow: 'var(--shadow-hero)',
          }}
        >
          <div
            className="w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-4 border"
            style={{
              backgroundColor: 'var(--color-state-passed-bg)',
              borderColor: 'var(--color-state-passed-border)',
              color: 'var(--color-state-passed-fg)',
            }}
          >
            <CheckCircle2 className="w-6 h-6 text-success" />
          </div>
          <h2 className="text-xl font-display font-bold text-text-primary mb-1">
            Authenticated Successfully
          </h2>
          <p className="text-xs text-text-secondary mb-6 font-mono">
            Signed in as <span className="text-text-primary font-medium">{user.email}</span>
          </p>

          <div
            className="p-3 rounded-control border text-left text-xs space-y-1 mb-6 font-mono"
            style={{
              backgroundColor: 'var(--color-surface-subtle)',
              borderColor: 'var(--color-line)',
            }}
          >
            <div className="flex justify-between">
              <span className="text-text-muted">User ID:</span>
              <span className="text-text-primary truncate max-w-48">{user.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Name:</span>
              <span className="text-text-primary">{user.displayName || 'Developer'}</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={logout}
            className="w-full h-9 min-h-[36px] rounded-control text-xs font-medium btn-press"
            style={{
              backgroundColor: 'var(--color-surface-subtle)',
              borderColor: 'var(--color-line-strong)',
              color: 'var(--color-text-primary)',
            }}
          >
            Sign Out
          </Button>
        </div>
      ) : (
        <AuthCard
          mode={mode}
          onToggleMode={toggleMode}
          onSubmit={handleSubmit}
          onGoogleSSO={handleGoogleSSO}
          isLoading={isLoading || ssoPending}
          problemDetails={problemDetails}
          onClearProblem={clearError}
        />
      )}
    </AuthLayout>
  );
};

import React, { useState, useId } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import type { AuthMode, ProblemDetails } from '../types';

export interface AuthCardProps {
  mode: AuthMode;
  onToggleMode: () => void;
  onSubmit: (data: {
    email: string;
    password: string;
    displayName?: string;
    rememberMe?: boolean;
  }) => Promise<void>;
  onGoogleSSO?: () => void;
  isLoading?: boolean;
  problemDetails?: ProblemDetails | null;
  onClearProblem?: () => void;
}

export const AuthCard: React.FC<AuthCardProps> = ({
  mode,
  onToggleMode,
  onSubmit,
  onGoogleSSO,
  isLoading = false,
  problemDetails,
  onClearProblem,
}) => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const nameId = useId();
  const emailId = useId();
  const passwordId = useId();
  const termsId = useId();

  // Password strength calculation for sign up mode
  const getPasswordStrength = (pass: string) => {
    let score = 0;
    const hasLength = pass.length >= 8;
    const hasUpper = /[A-Z]/.test(pass);
    const hasNumOrSym = /[0-9!@#$%^&*]/.test(pass);

    if (hasLength) score++;
    if (hasUpper) score++;
    if (hasNumOrSym) score++;

    return { score, hasLength, hasUpper, hasNumOrSym };
  };

  const strength = getPasswordStrength(password);

  const validate = () => {
    const errors: Record<string, string> = {};

    if (!email) {
      errors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please provide a valid email address.';
    }

    if (!password) {
      errors.password = 'Password is required.';
    } else if (mode === 'signup' && password.length < 8) {
      errors.password = 'Password must be at least 8 characters long.';
    }

    if (mode === 'signup' && !displayName.trim()) {
      errors.displayName = 'Full name is required.';
    }

    if (mode === 'signup' && !agreeToTerms) {
      errors.terms = 'You must agree to the Terms of Service and Privacy Policy.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onClearProblem?.();

    if (!validate()) return;

    try {
      await onSubmit({
        email,
        password,
        displayName: mode === 'signup' ? displayName : undefined,
      });
    } catch {
      // Error handled via problemDetails in hook
    }
  };

  return (
    <Card
      className="w-full max-w-md px-4 py-4 min-[420px]:px-5 min-[420px]:py-5 sm:p-6 min-[901px]:p-8 border border-border rounded-panel bg-card text-card-foreground shadow-hero transition-all my-auto"
    >
      {/* Mobile Branding Header (Visible <= 900px) */}
      <div className="min-[901px]:hidden flex items-center gap-2.5 mb-2.5 sm:mb-4">
        <div
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-control border border-input bg-secondary flex items-center justify-center p-1 shadow-scalar-1"
        >
          <svg viewBox="0 0 64 64" className="w-full h-full" aria-hidden="true">
            <defs>
              <linearGradient id="auth-card-mob-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--primary)" />
                <stop offset="100%" stopColor="var(--sidebar-primary)" />
              </linearGradient>
            </defs>
            <g stroke="url(#auth-card-mob-grad)" strokeWidth="1.8" opacity="0.6">
              <line x1="14" y1="32" x2="50" y2="16" />
              <line x1="50" y1="16" x2="36" y2="50" />
              <line x1="36" y1="50" x2="14" y2="32" />
            </g>
            <path d="M14 32 L50 16 L36 50 L30 36 Z" fill="url(#auth-card-mob-grad)" opacity="0.95" />
            <g fill="var(--card)" stroke="url(#auth-card-mob-grad)" strokeWidth="2.2">
              <circle cx="14" cy="32" r="3.4" />
              <circle cx="50" cy="16" r="3.4" />
              <circle cx="36" cy="50" r="3.4" />
            </g>
          </svg>
        </div>
        <span className="font-display font-bold tracking-tight text-card-foreground text-sm sm:text-base">
          ApiTest<span className="gradient-text">Pilot</span>
        </span>
      </div>

      {/* Heading with Clean Inline Switcher */}
      <div className="mb-2.5 sm:mb-4 min-[901px]:mb-6">
        <h2 className="text-xl sm:text-2xl font-display font-bold tracking-tight text-card-foreground leading-tight">
          {mode === 'signin' ? 'Welcome back' : 'Create your account'}
        </h2>
        <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1.5 flex items-center gap-1.5">
          <span>
            {mode === 'signin' ? "Don't have an account yet?" : 'Already have an account?'}
          </span>
          <button
            type="button"
            onClick={onToggleMode}
            className="text-primary hover:underline font-semibold transition-colors focus:outline-none cursor-pointer"
          >
            {mode === 'signin' ? 'Sign up for free' : 'Sign in'}
          </button>
        </p>
      </div>

      {/* RFC 7807 ProblemDetails Feedback Alert */}
      {problemDetails && (
        <div
          role="alert"
          className="mb-2.5 sm:mb-4 p-2.5 sm:p-3 rounded-control border border-state-failed-border bg-state-failed-bg text-state-failed-fg text-xs flex items-start gap-2.5 transition-all"
        >
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-destructive" />
          <div className="flex-1">
            <span className="font-semibold block">{problemDetails.title}</span>
            {problemDetails.detail && (
              <span className="text-[11px] block mt-0.5 opacity-90">
                {problemDetails.detail}
              </span>
            )}
            {problemDetails.errors && (
              <ul className="list-disc list-inside mt-1 space-y-0.5 text-[11px]">
                {Object.entries(problemDetails.errors).map(([f, msgs]) => (
                  <li key={f}>{msgs.join(', ')}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Social Google SSO Button */}
      <Button
        disabled
        type="button"
        variant="outline"
        onClick={onGoogleSSO}
        // disabled={isLoading}
        className="w-full h-9 min-h-[36px] px-3.5 rounded-control border-input bg-secondary hover:bg-accent text-secondary-foreground text-xs font-medium flex items-center justify-center gap-2.5 transition-all shadow-scalar-1 btn-press mb-2 sm:mb-3 min-[901px]:mb-4 cursor-pointer"
      >
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="var(--destructive)"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="var(--color-success)"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="var(--color-warning)"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="var(--primary)"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
        <span>Continue with Google</span>
      </Button>

      {/* Divider */}
      <div className="flex items-center gap-2.5 my-2 sm:my-3 min-[901px]:my-4">
        <div className="flex-1 h-px bg-border" />
        <span className="text-[10px] sm:text-[11px] text-muted-foreground uppercase font-mono tracking-wider">
          or continue with email
        </span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Auth Form */}
      <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-3.5 min-[901px]:space-y-4" noValidate>
        {/* Full Name Field (Sign Up Only) */}
        {mode === 'signup' && (
          <div>
            <Label htmlFor={nameId} className="block text-[11px] sm:text-xs font-medium text-muted-foreground mb-1 sm:mb-1.5">
              Full Name
            </Label>
            <Input
              id={nameId}
              type="text"
              placeholder="Ahmed Mohamed"
              value={displayName}
              onChange={(e) => {
                setDisplayName(e.target.value);
                if (fieldErrors.displayName) {
                  setFieldErrors((prev) => ({ ...prev, displayName: '' }));
                }
              }}
              disabled={isLoading}
              aria-invalid={Boolean(fieldErrors.displayName)}
              className="h-9 min-h-[36px] text-[13px] rounded-control bg-secondary text-card-foreground border-input"
              style={{
                borderColor: fieldErrors.displayName ? 'var(--destructive)' : undefined,
              }}
            />
            {fieldErrors.displayName && (
              <span className="text-destructive text-[11px] mt-1 block">
                {fieldErrors.displayName}
              </span>
            )}
          </div>
        )}

        {/* Email Address */}
        <div>
          <Label htmlFor={emailId} className="block text-[11px] sm:text-xs font-medium text-muted-foreground mb-1 sm:mb-1.5">
            Email address
          </Label>
          <Input
            id={emailId}
            type="email"
            placeholder="developer@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (fieldErrors.email) {
                setFieldErrors((prev) => ({ ...prev, email: '' }));
              }
            }}
            disabled={isLoading}
            aria-invalid={Boolean(fieldErrors.email)}
            className="h-9 min-h-[36px] text-[13px] rounded-control bg-secondary text-card-foreground border-input"
            style={{
              borderColor: fieldErrors.email ? 'var(--destructive)' : undefined,
            }}
          />
          {fieldErrors.email && (
            <span className="text-destructive text-[11px] mt-1 block">
              {fieldErrors.email}
            </span>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1 sm:mb-1.5">
            <Label htmlFor={passwordId} className="text-[11px] sm:text-xs font-medium text-muted-foreground">
              Password
            </Label>
            {mode === 'signin' && (
              <a href="#forgot" className="text-[10px] sm:text-[11px] text-primary hover:underline">
                Forgot password?
              </a>
            )}
          </div>
          <div className="relative">
            <Input
              id={passwordId}
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (fieldErrors.password) {
                  setFieldErrors((prev) => ({ ...prev, password: '' }));
                }
              }}
              disabled={isLoading}
              aria-invalid={Boolean(fieldErrors.password)}
              className="h-9 min-h-[36px] text-[13px] rounded-control pr-10 bg-secondary text-card-foreground border-input"
              style={{
                borderColor: fieldErrors.password ? 'var(--destructive)' : undefined,
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-card-foreground focus:outline-none cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {fieldErrors.password && (
            <span className="text-destructive text-[11px] mt-1 block">
              {fieldErrors.password}
            </span>
          )}
        </div>

        {/* Password Strength Indicator (Sign Up Only) */}
        {mode === 'signup' && (
          <div className="space-y-1 pt-0.5 sm:pt-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-muted-foreground">Password Strength</span>
              <span
                className="font-semibold transition-colors duration-200"
                style={{
                  color:
                    strength.score === 1
                      ? 'var(--destructive)'
                      : strength.score === 2
                      ? 'var(--color-warning)'
                      : strength.score === 3
                      ? 'var(--color-success)'
                      : 'var(--muted-foreground)',
                }}
              >
                {strength.score === 1
                  ? 'Weak'
                  : strength.score === 2
                  ? 'Medium'
                  : strength.score === 3
                  ? 'Strong'
                  : 'None'}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1.5" aria-hidden="true">
              {/* Segment 1: Weak */}
              <div
                className="h-1 rounded-full transition-all duration-300"
                style={{
                  backgroundColor:
                    strength.score === 1
                      ? 'var(--destructive)'
                      : strength.score === 2
                      ? 'var(--color-warning)'
                      : strength.score === 3
                      ? 'var(--color-success)'
                      : 'var(--border)',
                }}
              />
              {/* Segment 2: Medium */}
              <div
                className="h-1 rounded-full transition-all duration-300"
                style={{
                  backgroundColor:
                    strength.score === 2
                      ? 'var(--color-warning)'
                      : strength.score === 3
                      ? 'var(--color-success)'
                      : 'var(--border)',
                }}
              />
              {/* Segment 3: Strong */}
              <div
                className="h-1 rounded-full transition-all duration-300"
                style={{
                  backgroundColor:
                    strength.score === 3 ? 'var(--color-success)' : 'var(--border)',
                }}
              />
            </div>
          </div>
        )}

        {/* Checkbox: Terms Agreement (Sign Up Only) */}
        {mode === 'signup' && (
          <div className="flex items-start gap-2 pt-0.5 sm:pt-1">
            <Checkbox
              id={termsId}
              checked={agreeToTerms}
              onCheckedChange={(checked) => {
                const val = Boolean(checked);
                setAgreeToTerms(val);
                if (val && fieldErrors.terms) {
                  setFieldErrors((prev) => ({ ...prev, terms: '' }));
                }
              }}
              disabled={isLoading}
              className="rounded-control mt-0.5 cursor-pointer"
              style={{
                borderColor: fieldErrors.terms ? 'var(--destructive)' : undefined,
              }}
            />
            <div className="flex-1">
              <Label
                htmlFor={termsId}
                className="text-[11px] sm:text-xs text-muted-foreground select-none font-normal cursor-pointer leading-tight block"
              >
                I agree to the{' '}
                <a
                  href="#terms"
                  onClick={(e) => e.stopPropagation()}
                  className="text-card-foreground hover:underline font-medium"
                >
                  Terms of Service
                </a>{' '}
                and{' '}
                <a
                  href="#privacy"
                  onClick={(e) => e.stopPropagation()}
                  className="text-card-foreground hover:underline font-medium"
                >
                  Privacy Policy
                </a>
              </Label>
              {fieldErrors.terms && (
                <span className="text-destructive text-[11px] mt-1 block">
                  {fieldErrors.terms}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Primary Submit Button */}
        <Button
          type="submit"
          disabled={isLoading || (mode === 'signup' && !agreeToTerms)}
          className="w-full h-9 min-h-[36px] px-3.5 rounded-control bg-primary hover:bg-primary-hover text-primary-foreground text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-scalar-1 btn-press cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-primary-foreground" />
              <span>Please wait...</span>
            </>
          ) : (
            <span>{mode === 'signin' ? 'Sign In to Test Pilot' : 'Create Account'}</span>
          )}
        </Button>
      </form>

      {/* Footer Disclaimer */}
      {mode === 'signin' && (
        <p className="text-[10px] sm:text-[11px] text-muted-foreground text-center mt-2.5 sm:mt-4 min-[901px]:mt-6 leading-tight">
          By continuing, you agree to the{' '}
          <a href="#terms" className="text-card-foreground hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#privacy" className="text-card-foreground hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      )}
    </Card>
  );
};

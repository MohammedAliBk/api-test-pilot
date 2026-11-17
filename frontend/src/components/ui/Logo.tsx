import React from 'react';

export interface LogoProps {
  size?: number;
  showWordmark?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 28, showWordmark = true, className = '' }) => {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 64 64"
        role="img"
        aria-label="ApiTestPilot"
        style={{ width: size, height: size }}
        className="shrink-0"
      >
        <defs>
          <linearGradient id="logo-brand-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--color-primary)" />
            <stop offset="1" stopColor="var(--color-primary-glow)" />
          </linearGradient>
        </defs>
        <g stroke="url(#logo-brand-grad)" strokeWidth="1.5" opacity="0.55">
          <line x1="14" y1="32" x2="50" y2="16" />
          <line x1="50" y1="16" x2="36" y2="50" />
          <line x1="36" y1="50" x2="14" y2="32" />
        </g>
        <path d="M14 32 L50 16 L36 50 L30 36 Z" fill="url(#logo-brand-grad)" opacity="0.92" />
        <g fill="var(--color-surface)" stroke="url(#logo-brand-grad)" strokeWidth="2">
          <circle cx="14" cy="32" r="3.2" />
          <circle cx="50" cy="16" r="3.2" />
          <circle cx="36" cy="50" r="3.2" />
        </g>
      </svg>
      {showWordmark && (
        <span className="font-display text-lg font-semibold tracking-tight text-foreground select-none">
          <span className="sr-only">API Test Pilot</span>
          <span aria-hidden="true">
            ApiTest<span className="gradient-text">Pilot</span>
          </span>
        </span>
      )}
    </span>
  );
};

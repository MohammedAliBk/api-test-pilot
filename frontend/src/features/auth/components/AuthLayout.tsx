import React, { useState, useEffect } from 'react';
import { AuthAtmosphere } from './AuthAtmosphere';
import { Logo } from '@/components/ui/Logo';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden selection:bg-primary-subtle selection:text-primary">
      {/* Full-viewport atmospheric canvas background */}
      <AuthAtmosphere />

      {/* Main Dual-Pane Content Container */}
      <main className="relative z-10 w-full min-h-screen flex flex-col min-[901px]:flex-row">
        {/* Left Half: Branding & Atmospheric Showcase */}
        <div className="hidden min-[901px]:flex w-1/2 flex-col justify-between p-12 md:p-16 select-none pointer-events-none">
          {/* Top-Left: Brand Logo & Wordmark */}
          <div className="flex items-center gap-3.5 pointer-events-auto">
            <div
              className="w-11 h-11 rounded-xl border flex items-center justify-center p-2 shadow-scalar-2 backdrop-blur-md"
              style={{
                backgroundColor: 'var(--color-surface-subtle)',
                borderColor: 'var(--color-line-strong)',
              }}
            >
              <Logo size={28} showWordmark={false} />
            </div>
            <div>
              <span className="font-display font-bold tracking-tight text-white text-xl select-none">
                ApiTest<span className="gradient-text">Pilot</span>
              </span>
            </div>
          </div>

          {/* Bottom-Left: Hero Value Proposition */}
          <div className="max-w-md pointer-events-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight leading-tight drop-shadow-sm">
              API testing is{' '}
              <span
                className="inline-block font-black text-white transition-all duration-150"
                style={{
                  mixBlendMode: 'difference',
                }}
              >
                faster
              </span>{' '}
              than ever.
            </h2>
          </div>
        </div>

        {/* Right Half: Form Container & Theme Switcher */}
        <div className="w-full min-[901px]:w-1/2 min-h-screen flex flex-col justify-center items-center p-6 min-[901px]:p-12 relative z-20">
          {/* Top-Right Utility Toolbar */}
          <div className="absolute top-6 right-6 z-30 flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-9 h-9 min-h-[36px] rounded-control shadow-scalar-1 btn-press"
              style={{
                backgroundColor: 'var(--color-surface-subtle)',
                borderColor: 'var(--color-line-strong)',
                color: 'var(--color-text-secondary)',
              }}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-warning" />
              ) : (
                <Moon className="w-4 h-4 text-primary" />
              )}
            </Button>
          </div>

          {/* Centered Auth Card */}
          {children}
        </div>
      </main>
    </div>
  );
};

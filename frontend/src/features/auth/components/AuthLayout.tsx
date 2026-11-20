import React, { useEffect } from 'react';
import { AuthAtmosphere } from './AuthAtmosphere';
import { Logo } from '@/components/ui/Logo';

export interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  // Automatically synchronize theme with device/system preference (prefers-color-scheme)
  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    const applySystemTheme = (isLight: boolean) => {
      if (isLight) {
        document.documentElement.setAttribute('data-theme', 'light');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
    };

    // Apply on initial mount
    applySystemTheme(mediaQuery.matches);

    // Listen for device/system preference changes dynamically
    const handleChange = (e: MediaQueryListEvent) => {
      applySystemTheme(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else if ('addListener' in mediaQuery) {
      // Compatibility fallback for older web engines
      (mediaQuery as { addListener: (cb: (e: MediaQueryListEvent) => void) => void; removeListener: (cb: (e: MediaQueryListEvent) => void) => void }).addListener(handleChange);
      return () => (mediaQuery as { addListener: (cb: (e: MediaQueryListEvent) => void) => void; removeListener: (cb: (e: MediaQueryListEvent) => void) => void }).removeListener(handleChange);
    }
  }, []);

  return (
    <div className="relative min-h-screen min-h-dvh h-dvh w-full overflow-hidden selection:bg-primary-subtle selection:text-primary flex flex-col">
      {/* Full-viewport atmospheric canvas background */}
      <AuthAtmosphere />

      {/* Main Dual-Pane Content Container */}
      <main className="relative z-10 w-full h-full min-h-screen min-h-dvh flex flex-col min-[901px]:flex-row flex-1 overflow-hidden">
        {/* Left Half: Branding & Atmospheric Showcase */}
        <div className="hidden min-[901px]:flex w-1/2 flex-col justify-center relative p-8 md:p-10 lg:p-12 select-none pointer-events-none">
          {/* Top-Left: Brand Logo & Wordmark (Anchored Top-Left) */}
          <div className="absolute top-8 md:top-10 lg:top-12 left-8 md:left-10 lg:left-12 flex items-center gap-3.5 pointer-events-auto">
            <div
              className="w-11 h-11 rounded-xl border flex items-center justify-center p-2 shadow-scalar-2 backdrop-blur-md"
              style={{
                backgroundColor: 'var(--color-surface-subtle)',
                borderColor: 'var(--color-line-strong)',
              }}
            >
              <Logo size={30} showWordmark={false} />
            </div>
            <div>
              <span className="font-display font-bold tracking-tight text-white text-xl select-none">
                ApiTest<span className="gradient-text">Pilot</span>
              </span>
            </div>
          </div>

          {/* Center-Left: Hero Value Proposition (Vertically in the middle, flush to left edge) */}
          <div className="w-full max-w-xl lg:max-w-2xl pointer-events-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight leading-[1.08] drop-shadow-md text-left">
              <span className="block">API testing is</span>
              <span>
              </span>
              <span className="font-display italic">faster</span>
              <span className="block">than ever</span>
            </h1>
          </div>
        </div>

        {/* Right Half: Form Workspace Container */}
        <div className="w-full min-[901px]:w-1/2 h-full flex flex-col justify-center items-center px-4 py-2 sm:px-6 sm:py-4 min-[901px]:p-12 relative z-20 overflow-y-auto min-[901px]:overflow-visible">
          {/* Centered Auth Card */}
          {children}
        </div>
      </main>
    </div>
  );
};

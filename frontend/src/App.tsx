import { useState, useEffect } from 'react';
import { AuthPage, TermsPage, PrivacyPage } from './features/auth';

export default function App() {
  const [currentHash, setCurrentHash] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.hash.toLowerCase();
    }
    return '';
  });

  // Root-level theme synchronization: dynamically listen to system prefers-color-scheme
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

    // Listen for dynamic system preference changes
    const handleChange = (e: MediaQueryListEvent) => {
      applySystemTheme(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else if ('addListener' in mediaQuery) {
      (mediaQuery as { addListener: (cb: (e: MediaQueryListEvent) => void) => void; removeListener: (cb: (e: MediaQueryListEvent) => void) => void }).addListener(handleChange);
      return () => (mediaQuery as { addListener: (cb: (e: MediaQueryListEvent) => void) => void; removeListener: (cb: (e: MediaQueryListEvent) => void) => void }).removeListener(handleChange);
    }
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash.toLowerCase());
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleBackToAuth = () => {
    window.location.hash = '';
    setCurrentHash('');
  };

  if (currentHash === '#terms') {
    return <TermsPage onBack={handleBackToAuth} />;
  }

  if (currentHash === '#privacy') {
    return <PrivacyPage onBack={handleBackToAuth} />;
  }

  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden">
      <AuthPage />
    </div>
  );
}

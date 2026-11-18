import { useState, useEffect } from 'react';
import { TeamShowcase } from './components/TeamShowcase';
import { AuthPage } from './features/auth';

const TOKEN_KEY = 'api_test_pilot_token';

export interface AppProps {
  initialAuthenticated?: boolean;
}

export default function App({ initialAuthenticated }: AppProps = {}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof initialAuthenticated === 'boolean') {
      return initialAuthenticated;
    }
    if (typeof window !== 'undefined') {
      return Boolean(localStorage.getItem(TOKEN_KEY));
    }
    return false;
  });

  // Sync authentication state across storage events (e.g. multi-tab login/logout)
  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(Boolean(localStorage.getItem(TOKEN_KEY)));
    };

    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem('api_test_pilot_user');
    setIsAuthenticated(false);
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="relative min-h-screen">
      {isAuthenticated ? (
        <div className="relative">
          {/* Top Session Bar for Authenticated Users */}
          <div
            className="fixed top-3 right-3 z-50 flex items-center gap-2 p-1.5 px-3 rounded-control border text-xs font-mono shadow-scalar-2 backdrop-blur-md"
            style={{
              backgroundColor: 'var(--color-surface-subtle)',
              borderColor: 'var(--color-line-strong)',
            }}
          >
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-text-secondary">Connected</span>
            <button
              type="button"
              onClick={handleSignOut}
              className="ml-2 text-danger hover:underline font-semibold"
            >
              Sign Out
            </button>
          </div>

          <TeamShowcase onSignOut={handleSignOut} />
        </div>
      ) : (
        <AuthPage onAuthSuccess={handleAuthSuccess} />
      )}
    </div>
  );
}

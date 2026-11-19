import React, { useState, useEffect, useMemo, createContext, useContext } from 'react';
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from '@tanstack/react-router';
import { HomePage, AuthPage, TermsPage, PrivacyPage } from './pages';
import { AppShell } from './components/layout/AppShell';
import {
  authApi,
  clearStoredSession,
  getStoredUser,
  TOKEN_KEY,
  USER_KEY,
  type User,
} from './features/auth';
import { navigateTo, registerNavigateHandler, type AppRoutePath } from './lib/navigation';

interface AuthSessionContextValue {
  currentUser: User | null;
  onAuthSuccess: (user: User) => void;
  onSignOut: () => void;
}

const AuthSessionContext = createContext<AuthSessionContextValue>({
  currentUser: null,
  onAuthSuccess: () => {},
  onSignOut: () => {},
});

const RootComponent: React.FC = () => {
  return <Outlet />;
};

const HomeRouteComponent: React.FC = () => {
  const { currentUser, onAuthSuccess, onSignOut } = useContext(AuthSessionContext);

  useEffect(() => {
    if (!currentUser) {
      navigateTo('/login', { replace: true });
    }
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="relative min-h-screen w-full max-w-full overflow-x-hidden">
        <AuthPage onAuthSuccess={onAuthSuccess} />
      </div>
    );
  }

  const displayUserName =
    currentUser.displayName ||
    (currentUser.email ? currentUser.email.split('@')[0] : 'Developer');

  return (
    <AppShell
      currentRoute="dashboard"
      onSignOut={onSignOut}
      userName={displayUserName}
      userEmail={currentUser.email}
    >
      <HomePage />
    </AppShell>
  );
};

const LoginRouteComponent: React.FC = () => {
  const { currentUser, onAuthSuccess, onSignOut } = useContext(AuthSessionContext);

  useEffect(() => {
    if (currentUser) {
      navigateTo('/', { replace: true });
    }
  }, [currentUser]);

  if (currentUser) {
    const displayUserName =
      currentUser.displayName ||
      (currentUser.email ? currentUser.email.split('@')[0] : 'Developer');

    return (
      <AppShell
        currentRoute="dashboard"
        onSignOut={onSignOut}
        userName={displayUserName}
        userEmail={currentUser.email}
      >
        <HomePage />
      </AppShell>
    );
  }

  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden">
      <AuthPage onAuthSuccess={onAuthSuccess} />
    </div>
  );
};

const TermsRouteComponent: React.FC = () => {
  const { currentUser } = useContext(AuthSessionContext);
  return (
    <TermsPage
      onBack={() => {
        navigateTo(currentUser ? '/' : '/login');
      }}
    />
  );
};

const PrivacyRouteComponent: React.FC = () => {
  const { currentUser } = useContext(AuthSessionContext);
  return (
    <PrivacyPage
      onBack={() => {
        navigateTo(currentUser ? '/' : '/login');
      }}
    />
  );
};

function normalizeInitialUrl(): void {
  if (typeof window === 'undefined') return;
  const hash = window.location.hash.toLowerCase();
  if (hash === '#terms') {
    window.history.replaceState({}, '', '/terms');
  } else if (hash === '#privacy') {
    window.history.replaceState({}, '', '/privacy');
  } else if (hash === '#auth' || hash === '#login') {
    window.history.replaceState({}, '', '/login');
  } else if (window.location.href.includes('#')) {
    window.history.replaceState(
      {},
      '',
      window.location.pathname + window.location.search
    );
  }
}

function buildAppRouter() {
  const rootRoute = createRootRoute({
    component: RootComponent,
  });

  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: HomeRouteComponent,
  });

  const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/login',
    component: LoginRouteComponent,
  });

  const termsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/terms',
    component: TermsRouteComponent,
  });

  const privacyRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/privacy',
    component: PrivacyRouteComponent,
  });

  const catchAllRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '$',
    component: HomeRouteComponent,
  });

  const routeTree = rootRoute.addChildren([
    indexRoute,
    loginRoute,
    termsRoute,
    privacyRoute,
    catchAllRoute,
  ]);

  return createRouter({
    routeTree,
    defaultPreload: 'intent',
  });
}

export default function App() {
  // Strip any legacy trailing '#' or '#terms'/'#privacy' before initializing router
  useMemo(() => {
    normalizeInitialUrl();
  }, []);

  const [currentUser, setCurrentUser] = useState<User | null>(() => getStoredUser());
  const router = useMemo(() => buildAppRouter(), []);

  useEffect(() => {
    registerNavigateHandler((to: AppRoutePath, options?: { replace?: boolean }) => {
      void router.navigate({ to, replace: options?.replace });
    });
    return () => {
      registerNavigateHandler(null);
    };
  }, [router]);

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

    applySystemTheme(mediaQuery.matches);

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

  // Refresh profile details from /api/Auth/me when a valid token exists
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return;

    let cancelled = false;
    authApi
      .getMe(token)
      .then((profile) => {
        if (cancelled || !profile?.email) return;
        const updatedUser: User = {
          id: profile.id || currentUser?.id || profile.email,
          email: profile.email,
          displayName:
            profile.displayName ||
            currentUser?.displayName ||
            profile.email.split('@')[0],
          avatarUrl: profile.avatarUrl || currentUser?.avatarUrl,
        };
        localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
        setCurrentUser(updatedUser);
      })
      .catch(() => {
        // Keep existing local session if /me endpoint is unreachable
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleSignOut = () => {
    clearStoredSession();
    setCurrentUser(null);
    navigateTo('/login', { replace: true });
  };

  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    navigateTo('/', { replace: true });
  };

  return (
    <AuthSessionContext.Provider
      value={{
        currentUser,
        onAuthSuccess: handleAuthSuccess,
        onSignOut: handleSignOut,
      }}
    >
      <RouterProvider router={router} />
    </AuthSessionContext.Provider>
  );
}

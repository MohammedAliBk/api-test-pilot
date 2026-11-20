export type AppRoutePath = '/' | '/login' | '/terms' | '/privacy';

type NavigateHandler = (to: AppRoutePath, options?: { replace?: boolean }) => void;

let activeNavigateHandler: NavigateHandler | null = null;

export function registerNavigateHandler(handler: NavigateHandler | null): void {
  activeNavigateHandler = handler;
}

export function navigateTo(to: AppRoutePath, options?: { replace?: boolean }): void {
  if (activeNavigateHandler) {
    activeNavigateHandler(to, options);
    return;
  }
  if (typeof window !== 'undefined') {
    if (options?.replace) {
      window.history.replaceState({}, '', to);
    } else {
      window.history.pushState({}, '', to);
    }
    window.dispatchEvent(new PopStateEvent('popstate'));
  }
}

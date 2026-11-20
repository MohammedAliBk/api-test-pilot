import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthPage } from '@/pages/AuthPage';

function renderWithProviders(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
}

describe('AuthPage Feature Integration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders auth layout and signin form initially', () => {
    renderWithProviders(<AuthPage />);

    expect(screen.getByRole('heading', { name: /welcome back/i })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /api testing (is )?faster than ever/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up for free/i })).toBeInTheDocument();
  });

  it('toggles to registration view when clicking header toggle button', () => {
    renderWithProviders(<AuthPage />);

    const toggleBtn = screen.getByRole('button', { name: /sign up for free/i });
    fireEvent.click(toggleBtn);

    expect(screen.getByRole('heading', { name: /create your account/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('never renders a demo sign-out card inside the authentication view', () => {
    localStorage.setItem(
      'api_test_pilot_user',
      JSON.stringify({
        id: 'usr-999',
        email: 'developer@apitestpilot.com',
        displayName: 'Test Pilot Lead',
      })
    );

    renderWithProviders(<AuthPage />);

    expect(screen.queryByText('Authenticated Successfully')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /sign out/i })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /welcome back/i })).toBeInTheDocument();
  });

  it('does not render manual theme toggle button on auth page', () => {
    renderWithProviders(<AuthPage />);
    expect(screen.queryByRole('button', { name: /toggle theme/i })).not.toBeInTheDocument();
  });

  it('automatically applies light theme if system prefers light mode', () => {
    const listeners: ((e: { matches: boolean }) => void)[] = [];
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes('prefers-color-scheme: light'),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: (_: string, cb: (e: { matches: boolean }) => void) => {
        listeners.push(cb);
      },
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    renderWithProviders(<AuthPage />);
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');

    // Simulate system changing to dark mode
    listeners.forEach((listener) => listener({ matches: false }));
    expect(document.documentElement.getAttribute('data-theme')).toBeNull();
  });
});

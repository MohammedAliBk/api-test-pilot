import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthPage } from '../pages/AuthPage';

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
      screen.getByRole('heading', { name: /api testing is faster than ever/i })
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

  it('displays authenticated profile view if user exists in storage', () => {
    localStorage.setItem(
      'api_test_pilot_user',
      JSON.stringify({
        id: 'usr-999',
        email: 'developer@apitestpilot.com',
        displayName: 'Test Pilot Lead',
      })
    );

    renderWithProviders(<AuthPage />);

    expect(screen.getByText('Authenticated Successfully')).toBeInTheDocument();
    expect(screen.getByText('developer@apitestpilot.com')).toBeInTheDocument();
    expect(screen.getByText('usr-999')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign out/i })).toBeInTheDocument();
  });
});

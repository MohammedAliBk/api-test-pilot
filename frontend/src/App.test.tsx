import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import { USER_KEY } from './features/auth';

function renderWithProviders(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
}

describe('App Root Harness (TanStack Router)', () => {
  beforeEach(() => {
    localStorage.clear();
    window.history.replaceState({}, '', '/');
    document.documentElement.removeAttribute('data-theme');
  });

  it('guards HomePage and redirects unauthenticated user to clean /login route without #', async () => {
    renderWithProviders(<App />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /welcome back/i })).toBeInTheDocument();
    });
    expect(
      screen.getByRole('heading', { name: /api testing (is )?faster than ever/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in to test pilot/i })).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: /waiting for backend and ai to finish work/i })
    ).not.toBeInTheDocument();
    expect(window.location.pathname).toBe('/login');
    expect(window.location.href.includes('#')).toBe(false);
  });

  it('renders HomePage in AppShell with logged-in user name and email in NavUser after authentication', async () => {
    localStorage.setItem(
      USER_KEY,
      JSON.stringify({
        id: 'usr-101',
        email: 'memo@apitestpilot.com',
        displayName: 'Mohamed Essam',
      })
    );

    renderWithProviders(<App />);

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /waiting for backend and ai to finish work/i })
      ).toBeInTheDocument();
    });
    expect(screen.getAllByText(/platform workspace/i).length).toBeGreaterThan(0);
    expect(screen.getByText('Mohamed Essam')).toBeInTheDocument();
    expect(screen.getByText('memo@apitestpilot.com')).toBeInTheDocument();
    expect(screen.getByText('ME')).toBeInTheDocument();
    expect(window.location.pathname).toBe('/');
    expect(window.location.href.includes('#')).toBe(false);
  });

  it('switches between sign in and sign up modes inside the AuthCard when unauthenticated', async () => {
    window.history.replaceState({}, '', '/login');
    renderWithProviders(<App />);

    const toggleBtn = await screen.findByRole('button', { name: /sign up for free/i });
    fireEvent.click(toggleBtn);

    expect(screen.getByRole('heading', { name: /create your account/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
  });

  it('renders separate Terms of Service page on clean /terms route and returns to /login', async () => {
    window.history.replaceState({}, '', '/terms');
    renderWithProviders(<App />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /^Terms of Service$/i })).toBeInTheDocument();
    });
    expect(screen.getByText(/Explicit Authorization Required/i)).toBeInTheDocument();

    const backBtn = screen.getAllByRole('button', { name: /back to sign in|return to sign in/i })[0];
    fireEvent.click(backBtn);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /welcome back/i })).toBeInTheDocument();
    });
    expect(window.location.pathname).toBe('/login');
    expect(window.location.href.includes('#')).toBe(false);
  });

  it('renders separate Privacy Policy page on clean /privacy route and returns to /login', async () => {
    window.history.replaceState({}, '', '/privacy');
    renderWithProviders(<App />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /^Privacy Policy$/i })).toBeInTheDocument();
    });
    expect(screen.getByText(/Zero Client Plain-Text Secrets/i)).toBeInTheDocument();

    const backBtn = screen.getAllByRole('button', { name: /back to sign in|return to sign in/i })[0];
    fireEvent.click(backBtn);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /welcome back/i })).toBeInTheDocument();
    });
    expect(window.location.pathname).toBe('/login');
    expect(window.location.href.includes('#')).toBe(false);
  });
});

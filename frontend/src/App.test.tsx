import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';

function renderWithProviders(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
}

describe('App Root Harness', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders AuthPage initially when user is not authenticated', () => {
    renderWithProviders(<App />);
    expect(screen.getByRole('heading', { name: /welcome back/i })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /api testing is faster than ever/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in to test pilot/i })).toBeInTheDocument();
  });

  it('renders application dashboard when user is authenticated', () => {
    renderWithProviders(<App initialAuthenticated={true} />);
    expect(screen.getByText('API Test Pilot')).toBeInTheDocument();
    expect(screen.getByText(/^Queued$/i)).toBeInTheDocument();
    expect(screen.getByText(/^Running$/i)).toBeInTheDocument();
    expect(screen.getByText(/^Passed$/i)).toBeInTheDocument();
    expect(screen.getByText(/^Failed$/i)).toBeInTheDocument();
    expect(screen.getByText(/^Uncertain$/i)).toBeInTheDocument();
  });

  it('renders OpenAPI URL form input with 36px control metric in dashboard', () => {
    renderWithProviders(<App initialAuthenticated={true} />);
    const input = screen.getByLabelText(/OpenAPI Specification URL/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('min-h-[36px]');
  });

  it('allows user to sign out from authenticated dashboard', () => {
    renderWithProviders(<App initialAuthenticated={true} />);
    expect(screen.getByText('Connected')).toBeInTheDocument();

    const signOutBtn = screen.getAllByRole('button', { name: /sign out/i })[0];
    fireEvent.click(signOutBtn);

    expect(screen.getByRole('heading', { name: /welcome back/i })).toBeInTheDocument();
  });

  it('toggles theme between dark and light mode', () => {
    renderWithProviders(<App initialAuthenticated={true} />);
    const toggleBtn = screen.getByRole('button', { name: /toggle theme/i });
    expect(toggleBtn).toBeInTheDocument();

    fireEvent.click(toggleBtn);
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');

    fireEvent.click(toggleBtn);
    expect(document.documentElement.getAttribute('data-theme')).toBeNull();
  });
});

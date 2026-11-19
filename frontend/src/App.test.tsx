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
    window.location.hash = '';
    document.documentElement.removeAttribute('data-theme');
  });

  it('renders AuthPage initially with login card and left branding', () => {
    renderWithProviders(<App />);
    expect(screen.getByRole('heading', { name: /welcome back/i })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /api testing (is )?faster than ever/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in to test pilot/i })).toBeInTheDocument();
  });

  it('switches between sign in and sign up modes inside the AuthCard', () => {
    renderWithProviders(<App />);
    const toggleBtn = screen.getByRole('button', { name: /sign up for free/i });
    fireEvent.click(toggleBtn);

    expect(screen.getByRole('heading', { name: /create your account/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
  });

  it('renders separate Terms of Service page when hash is #terms', () => {
    window.location.hash = '#terms';
    renderWithProviders(<App />);

    expect(screen.getByRole('heading', { name: /^Terms of Service$/i })).toBeInTheDocument();
    expect(screen.getByText(/Explicit Authorization Required/i)).toBeInTheDocument();

    const backBtn = screen.getAllByRole('button', { name: /back to sign in|return to sign in/i })[0];
    fireEvent.click(backBtn);

    expect(screen.getByRole('heading', { name: /welcome back/i })).toBeInTheDocument();
  });

  it('renders separate Privacy Policy page when hash is #privacy', () => {
    window.location.hash = '#privacy';
    renderWithProviders(<App />);

    expect(screen.getByRole('heading', { name: /^Privacy Policy$/i })).toBeInTheDocument();
    expect(screen.getByText(/Zero Client Plain-Text Secrets/i)).toBeInTheDocument();

    const backBtn = screen.getAllByRole('button', { name: /back to sign in|return to sign in/i })[0];
    fireEvent.click(backBtn);

    expect(screen.getByRole('heading', { name: /welcome back/i })).toBeInTheDocument();
  });
});

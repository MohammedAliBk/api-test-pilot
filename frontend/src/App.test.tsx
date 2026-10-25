import { describe, it, expect } from 'vitest';
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
  it('renders application title and branding', () => {
    renderWithProviders(<App />);
    expect(screen.getByText('API Test Pilot')).toBeInTheDocument();
    expect(screen.getByText('v0.0.1-alpha')).toBeInTheDocument();
  });

  it('renders all domain test states including uncertain', () => {
    renderWithProviders(<App />);
    expect(screen.getByText(/^Queued$/i)).toBeInTheDocument();
    expect(screen.getByText(/^Running$/i)).toBeInTheDocument();
    expect(screen.getByText(/^Passed$/i)).toBeInTheDocument();
    expect(screen.getByText(/^Failed$/i)).toBeInTheDocument();
    expect(screen.getByText(/^Uncertain$/i)).toBeInTheDocument();
  });

  it('renders OpenAPI URL form input with 36px control metric', () => {
    renderWithProviders(<App />);
    const input = screen.getByLabelText(/OpenAPI Specification URL/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('min-h-[36px]');
  });

  it('toggles theme between dark and light mode', () => {
    renderWithProviders(<App />);
    const toggleBtn = screen.getByRole('button', { name: /toggle theme/i });
    expect(toggleBtn).toBeInTheDocument();

    fireEvent.click(toggleBtn);
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');

    fireEvent.click(toggleBtn);
    expect(document.documentElement.getAttribute('data-theme')).toBeNull();
  });
});

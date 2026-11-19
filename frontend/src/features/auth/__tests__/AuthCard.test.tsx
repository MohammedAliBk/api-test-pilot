import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthCard } from '../components/AuthCard';

describe('AuthCard Component', () => {
  it('renders sign in view with all standard fields and 36px controls', () => {
    const onToggleMode = vi.fn();
    const onSubmit = vi.fn();

    render(
      <AuthCard
        mode="signin"
        onToggleMode={onToggleMode}
        onSubmit={onSubmit}
      />
    );

    expect(screen.getByRole('heading', { name: /welcome back/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/^email address$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.queryByText(/keep me signed in for 30 days/i)).not.toBeInTheDocument();

    const submitBtn = screen.getByRole('button', { name: /sign in to test pilot/i });
    expect(submitBtn).toBeInTheDocument();
    expect(submitBtn).toHaveClass('min-h-[36px]');
  });

  it('renders sign up view with full name field and password strength meter', () => {
    const onToggleMode = vi.fn();
    const onSubmit = vi.fn();

    render(
      <AuthCard
        mode="signup"
        onToggleMode={onToggleMode}
        onSubmit={onSubmit}
      />
    );

    expect(screen.getByRole('heading', { name: /create your account/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByText(/password strength/i)).toBeInTheDocument();
    expect(screen.getByText(/i agree to the/i)).toBeInTheDocument();

    const submitBtn = screen.getByRole('button', { name: /create account/i });
    expect(submitBtn).toBeInTheDocument();
    expect(submitBtn).toBeDisabled();
  });

  it('disables create account button until user agrees to terms and privacy policy', () => {
    const onToggleMode = vi.fn();
    const onSubmit = vi.fn();

    render(
      <AuthCard
        mode="signup"
        onToggleMode={onToggleMode}
        onSubmit={onSubmit}
      />
    );

    const submitBtn = screen.getByRole('button', { name: /create account/i });
    expect(submitBtn).toBeDisabled();

    const termsCheckbox = screen.getByRole('checkbox');
    expect(termsCheckbox).not.toBeChecked();

    fireEvent.click(termsCheckbox);
    expect(submitBtn).not.toBeDisabled();

    fireEvent.click(termsCheckbox);
    expect(submitBtn).toBeDisabled();
  });

  it('triggers onToggleMode when clicking switch button', () => {
    const onToggleMode = vi.fn();
    const onSubmit = vi.fn();

    render(
      <AuthCard
        mode="signin"
        onToggleMode={onToggleMode}
        onSubmit={onSubmit}
      />
    );

    const toggleBtn = screen.getByRole('button', { name: /sign up for free/i });
    fireEvent.click(toggleBtn);
    expect(onToggleMode).toHaveBeenCalledTimes(1);
  });

  it('validates required fields on submission', async () => {
    const onSubmit = vi.fn();

    render(
      <AuthCard
        mode="signin"
        onToggleMode={vi.fn()}
        onSubmit={onSubmit}
      />
    );

    const submitBtn = screen.getByRole('button', { name: /sign in to test pilot/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText('Email address is required.')).toBeInTheDocument();
      expect(screen.getByText('Password is required.')).toBeInTheDocument();
    });

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('toggles password visibility with eye button', () => {
    render(
      <AuthCard
        mode="signin"
        onToggleMode={vi.fn()}
        onSubmit={vi.fn()}
      />
    );

    const passwordInput = screen.getByPlaceholderText('••••••••••••');
    expect(passwordInput).toHaveAttribute('type', 'password');

    const toggleEye = screen.getByRole('button', { name: /show password/i });
    fireEvent.click(toggleEye);
    expect(passwordInput).toHaveAttribute('type', 'text');

    fireEvent.click(screen.getByRole('button', { name: /hide password/i }));
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('displays RFC 7807 problem details error alert', () => {
    render(
      <AuthCard
        mode="signin"
        onToggleMode={vi.fn()}
        onSubmit={vi.fn()}
        problemDetails={{
          title: 'Invalid Credentials',
          detail: 'The email address or password provided is incorrect.',
          status: 401,
        }}
      />
    );

    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(screen.getByText('Invalid Credentials')).toBeInTheDocument();
    expect(
      screen.getByText('The email address or password provided is incorrect.')
    ).toBeInTheDocument();
  });

  it('shows loading spinner and disables submit button when isLoading is true', () => {
    render(
      <AuthCard
        mode="signin"
        onToggleMode={vi.fn()}
        onSubmit={vi.fn()}
        isLoading={true}
      />
    );

    const submitBtn = screen.getByRole('button', { name: /please wait/i });
    expect(submitBtn).toBeDisabled();
  });
});

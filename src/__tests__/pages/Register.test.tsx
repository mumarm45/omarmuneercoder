import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

import Register from '../../pages/Auth/Register';
import { useAuth } from '../../context/AuthContext';

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

function renderRegister() {
  return render(<MemoryRouter><Register /></MemoryRouter>);
}

describe('Register page', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockUseAuth.mockReturnValue({
      user: null,
      session: null,
      loading: false,
      signIn: jest.fn(),
      signUp: jest.fn().mockResolvedValue({ error: null }),
      signOut: jest.fn(),
    });
  });

  it('renders all form fields', () => {
    renderRegister();
    expect(screen.getByPlaceholderText(/you@example.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Min. 8 characters')).toBeInTheDocument();
  });

  it('shows error when passwords do not match', async () => {
    renderRegister();
    fireEvent.change(screen.getByPlaceholderText(/you@example.com/i), { target: { value: 'a@b.com' } });
    fireEvent.change(screen.getByPlaceholderText('Min. 8 characters'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('••••••••'), { target: { value: 'different456' } });
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));
    await waitFor(() => expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument());
  });

  it('shows error when password is too short', async () => {
    renderRegister();
    fireEvent.change(screen.getByPlaceholderText(/you@example.com/i), { target: { value: 'a@b.com' } });
    fireEvent.change(screen.getByPlaceholderText('Min. 8 characters'), { target: { value: 'short' } });
    fireEvent.change(screen.getByPlaceholderText('••••••••'), { target: { value: 'short' } });
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));
    await waitFor(() => expect(screen.getByText(/at least 8 characters/i)).toBeInTheDocument());
  });

  it('calls signUp with email and password', async () => {
    const signUp = jest.fn().mockResolvedValue({ error: null });
    mockUseAuth.mockReturnValue({ user: null, session: null, loading: false, signIn: jest.fn(), signUp, signOut: jest.fn() });
    renderRegister();

    fireEvent.change(screen.getByPlaceholderText(/you@example.com/i), { target: { value: 'new@user.com' } });
    fireEvent.change(screen.getByPlaceholderText('Min. 8 characters'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('••••••••'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));

    await waitFor(() => expect(signUp).toHaveBeenCalledWith('new@user.com', 'password123'));
  });

  it('navigates to /dashboard on successful registration', async () => {
    const signUp = jest.fn().mockResolvedValue({ error: null });
    mockUseAuth.mockReturnValue({ user: null, session: null, loading: false, signIn: jest.fn(), signUp, signOut: jest.fn() });
    renderRegister();

    fireEvent.change(screen.getByPlaceholderText(/you@example.com/i), { target: { value: 'new@user.com' } });
    fireEvent.change(screen.getByPlaceholderText('Min. 8 characters'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('••••••••'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/dashboard'));
  });

  it('shows API error on failed registration', async () => {
    const signUp = jest.fn().mockResolvedValue({ error: new Error('Email already in use') });
    mockUseAuth.mockReturnValue({ user: null, session: null, loading: false, signIn: jest.fn(), signUp, signOut: jest.fn() });
    renderRegister();

    fireEvent.change(screen.getByPlaceholderText(/you@example.com/i), { target: { value: 'taken@user.com' } });
    fireEvent.change(screen.getByPlaceholderText('Min. 8 characters'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('••••••••'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));

    await waitFor(() => expect(screen.getByText('Email already in use')).toBeInTheDocument());
  });
});

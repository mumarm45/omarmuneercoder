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

import Login from '../../pages/Auth/Login';
import { useAuth } from '../../context/AuthContext';

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

function renderLogin() {
  return render(<MemoryRouter><Login /></MemoryRouter>);
}

describe('Login page', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockUseAuth.mockReturnValue({
      user: null,
      session: null,
      loading: false,
      signIn: jest.fn().mockResolvedValue({ error: null }),
      signUp: jest.fn(),
      signOut: jest.fn(),
    });
  });

  it('renders email and password inputs', () => {
    renderLogin();
    expect(screen.getByPlaceholderText(/you@example.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
  });

  it('renders sign in button', () => {
    renderLogin();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('calls signIn with email and password on submit', async () => {
    const signIn = jest.fn().mockResolvedValue({ error: null });
    mockUseAuth.mockReturnValue({ user: null, session: null, loading: false, signIn, signUp: jest.fn(), signOut: jest.fn() });
    renderLogin();

    fireEvent.change(screen.getByPlaceholderText(/you@example.com/i), { target: { value: 'user@test.com' } });
    fireEvent.change(screen.getByPlaceholderText('••••••••'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => expect(signIn).toHaveBeenCalledWith('user@test.com', 'password123'));
  });

  it('navigates to /dashboard on successful sign in', async () => {
    const signIn = jest.fn().mockResolvedValue({ error: null });
    mockUseAuth.mockReturnValue({ user: null, session: null, loading: false, signIn, signUp: jest.fn(), signOut: jest.fn() });
    renderLogin();

    fireEvent.change(screen.getByPlaceholderText(/you@example.com/i), { target: { value: 'a@b.com' } });
    fireEvent.change(screen.getByPlaceholderText('••••••••'), { target: { value: 'pass' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/dashboard'));
  });

  it('shows error message on failed sign in', async () => {
    const signIn = jest.fn().mockResolvedValue({ error: new Error('Invalid credentials') });
    mockUseAuth.mockReturnValue({ user: null, session: null, loading: false, signIn, signUp: jest.fn(), signOut: jest.fn() });
    renderLogin();

    fireEvent.change(screen.getByPlaceholderText(/you@example.com/i), { target: { value: 'bad@bad.com' } });
    fireEvent.change(screen.getByPlaceholderText('••••••••'), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => expect(screen.getByText('Invalid credentials')).toBeInTheDocument());
  });
});

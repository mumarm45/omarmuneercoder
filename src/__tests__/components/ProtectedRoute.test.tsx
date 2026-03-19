import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Mock AuthContext before any import of the component
jest.mock('../../context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

import { ProtectedRoute } from '../../components/ProtectedRoute';
import { useAuth } from '../../context/AuthContext';

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

function renderWithRouter(ui: React.ReactElement, initialPath = '/') {
  return render(<MemoryRouter initialEntries={[initialPath]}>{ui}</MemoryRouter>);
}

describe('ProtectedRoute', () => {
  it('shows spinner while loading', () => {
    mockUseAuth.mockReturnValue({
      user: null,
      session: null,
      loading: true,
      signIn: jest.fn(),
      signUp: jest.fn(),
      signOut: jest.fn(),
    });
    const { container } = renderWithRouter(
      <ProtectedRoute>
        <div>Protected</div>
      </ProtectedRoute>
    );
    expect(container.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('redirects to /login when not authenticated', () => {
    mockUseAuth.mockReturnValue({
      user: null,
      session: null,
      loading: false,
      signIn: jest.fn(),
      signUp: jest.fn(),
      signOut: jest.fn(),
    });
    renderWithRouter(
      <ProtectedRoute>
        <div>Secret</div>
      </ProtectedRoute>
    );
    expect(screen.queryByText('Secret')).not.toBeInTheDocument();
  });

  it('renders children when user is authenticated', () => {
    mockUseAuth.mockReturnValue({
      user: { id: '123' } as any,
      session: null,
      loading: false,
      signIn: jest.fn(),
      signUp: jest.fn(),
      signOut: jest.fn(),
    });
    renderWithRouter(
      <ProtectedRoute>
        <div>Secret Page</div>
      </ProtectedRoute>
    );
    expect(screen.getByText('Secret Page')).toBeInTheDocument();
  });
});

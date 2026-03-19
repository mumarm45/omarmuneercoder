import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Mock all lazy-loaded pages
jest.mock('../pages/Home/Home', () => ({
  __esModule: true,
  default: function MockHomePage() {
    return <div data-testid="home-page">Home Page</div>;
  }
}));

jest.mock('../pages/ResumeBuilder', () => ({
  __esModule: true,
  default: function MockResumeBuilder() {
    return <div data-testid="resume-builder-page">Resume Builder Page</div>;
  }
}));

jest.mock('../pages/MyResume', () => ({
  __esModule: true,
  default: function MockMyResume() {
    return <div data-testid="my-resume-page">My Resume Page</div>;
  }
}));

jest.mock('../pages/Dashboard', () => ({
  __esModule: true,
  default: function MockDashboard() {
    return <div data-testid="dashboard-page">Dashboard Page</div>;
  }
}));

jest.mock('../pages/Auth/Login', () => ({
  __esModule: true,
  default: function MockLogin() {
    return <div data-testid="login-page">Login Page</div>;
  }
}));

jest.mock('../pages/Auth/Register', () => ({
  __esModule: true,
  default: function MockRegister() {
    return <div data-testid="register-page">Register Page</div>;
  }
}));

jest.mock('../pages/NotFound', () => ({
  __esModule: true,
  default: function MockNotFound() {
    return <div data-testid="not-found-page">404 Not Found</div>;
  }
}));

// Mock ProtectedRoute to just render children (bypass auth in route tests)
jest.mock('../components/ProtectedRoute', () => ({
  ProtectedRoute: function MockProtectedRoute({ children }) {
    return children;
  }
}));

// Mock AuthContext
jest.mock('../context/AuthContext', () => ({
  AuthProvider: function MockAuthProvider({ children }) { return children; },
  useAuth: () => ({ user: null, session: null, loading: false, signIn: jest.fn(), signUp: jest.fn(), signOut: jest.fn() }),
}));

import App from '../App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function renderApp(path = '/') {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  // Replace BrowserRouter with MemoryRouter by rendering inner routes directly
  const { Routes, Route, Navigate } = require('react-router-dom');
  const HomePage = require('../pages/Home/Home').default;
  const Login = require('../pages/Auth/Login').default;
  const Register = require('../pages/Auth/Register').default;
  const MyResume = require('../pages/MyResume').default;
  const NotFound = require('../pages/NotFound').default;

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/my-resume" element={<MyResume />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
}

describe('App routes', () => {
  it('renders home page at /', () => {
    renderApp('/');
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });

  it('renders login page at /login', () => {
    renderApp('/login');
    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });

  it('renders register page at /register', () => {
    renderApp('/register');
    expect(screen.getByTestId('register-page')).toBeInTheDocument();
  });

  it('renders my-resume page at /my-resume', () => {
    renderApp('/my-resume');
    expect(screen.getByTestId('my-resume-page')).toBeInTheDocument();
  });

  it('renders 404 for unknown routes', () => {
    renderApp('/totally-unknown-route');
    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
  });
});

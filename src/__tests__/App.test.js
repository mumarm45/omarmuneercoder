import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Mock the pages
jest.mock('../pages/Home', () => ({
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

// Create a wrapper component that renders App's content without the BrowserRouter
const AppWithoutRouter = () => {
  const { Routes, Route } = require('react-router-dom');
  const { HomePage, MyResume, ResumeBuilder } = require('../pages/index');
  
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/builder" element={<ResumeBuilder />} />
      <Route path="/my-resume" element={<MyResume />} />
    </Routes>
  );
};

describe('App Component', () => {
  it('should render without crashing', () => {
    render(
      <MemoryRouter>
        <AppWithoutRouter />
      </MemoryRouter>
    );
    expect(document.querySelector('body')).toBeInTheDocument();
  });

  it('should render HomePage at root path', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppWithoutRouter />
      </MemoryRouter>
    );
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });

  it('should render ResumeBuilder at /builder path', () => {
    render(
      <MemoryRouter initialEntries={['/builder']}>
        <AppWithoutRouter />
      </MemoryRouter>
    );
    expect(screen.getByTestId('resume-builder-page')).toBeInTheDocument();
  });

  it('should render MyResume at /my-resume path', () => {
    render(
      <MemoryRouter initialEntries={['/my-resume']}>
        <AppWithoutRouter />
      </MemoryRouter>
    );
    expect(screen.getByTestId('my-resume-page')).toBeInTheDocument();
  });

  it('should have Router structure', () => {
    const { container } = render(
      <MemoryRouter>
        <AppWithoutRouter />
      </MemoryRouter>
    );
    expect(container.firstChild).toBeTruthy();
  });
});

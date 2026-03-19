import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';

const HomePage = lazy(() => import('./pages/Home/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const ResumeBuilder = lazy(() => import('./pages/ResumeBuilder'));
const MyResume = lazy(() => import('./pages/MyResume'));
const Login = lazy(() => import('./pages/Auth/Login'));
const Register = lazy(() => import('./pages/Auth/Register'));
const ForgotPassword = lazy(() => import('./pages/Auth/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/Auth/ResetPassword'));
const NotFound = lazy(() => import('./pages/NotFound'));

const Spinner = (
  <div className="flex min-h-screen items-center justify-center bg-slate-50">
    <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-slate-900" />
  </div>
);

function App(): JSX.Element {
  return (
    <Router>
      <Suspense fallback={Spinner}>
        <Routes>
          {/* Public */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/my-resume" element={<MyResume />} />

          {/* Protected */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/builder"
            element={
              <ProtectedRoute>
                <ResumeBuilder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/builder/:resumeId"
            element={
              <ProtectedRoute>
                <ResumeBuilder />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

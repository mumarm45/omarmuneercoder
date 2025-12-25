import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const HomePage = lazy(() => import('./pages/Home'));
const ResumeBuilder = lazy(() => import('./pages/ResumeBuilder'));
const MyResume = lazy(() => import('./pages/MyResume'));

function App(): JSX.Element {
  return (
    <Router>
      <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/builder" element={<ResumeBuilder />} />
          <Route path="/my-resume" element={<MyResume />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

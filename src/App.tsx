import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage, MyResume, ResumeBuilder } from './pages/index';

function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/builder" element={<ResumeBuilder />} />
        <Route path="/my-resume" element={<MyResume />} />
      </Routes>
    </Router>
  );
}

export default App;

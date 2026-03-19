import { Link } from 'react-router-dom';
import { FileText, Github } from 'lucide-react';
function HomePageHeader(): JSX.Element {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-rose-500">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">ResumePro Beta</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/mumarm45/omarmuneercoder"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 text-slate-300 transition-colors hover:text-white sm:flex"
            >
              <Github className="h-5 w-5" />
              <span className="text-sm">GitHub</span>
            </a>
            <Link
              to="/my-resume"
              className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
            >
              View My CV
            </Link>
            <Link
              to="/dashboard"
              className="rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-2.5 font-semibold text-white shadow-lg transition-all hover:from-pink-600 hover:to-rose-600 hover:shadow-xl"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HomePageHeader;

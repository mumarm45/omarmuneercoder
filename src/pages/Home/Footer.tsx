import { FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="border-t border-slate-800 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-rose-500">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">ResumePro</span>
            </div>
            <p className="text-sm text-slate-400">
              Professional resume builder for modern job seekers
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Quick Links</h3>
            <div className="space-y-2">
              <Link
                to="/dashboard"
                className="block text-slate-400 transition-colors hover:text-white"
              >
                Resume Builder
              </Link>
              <Link
                to="/my-resume"
                className="block text-slate-400 transition-colors hover:text-white"
              >
                My Resume
              </Link>
              <a
                href="https://github.com/mumarm45/omarmuneercoder"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-slate-400 transition-colors hover:text-white"
              >
                GitHub
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Contact</h3>
            <p className="mb-2 text-sm text-slate-400">Muhammad Omar Muneer</p>
            <p className="text-sm text-slate-400">Senior Full-Stack Engineer</p>
            <Link
              to="/my-resume"
              className="mt-2 inline-flex items-center gap-1 text-sm text-pink-400 transition-colors hover:text-pink-300"
            >
              View Full Resume
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-slate-500">
              Built with TypeScript, React, Zustand, and Tailwind CSS
            </p>
            <p className="text-sm text-slate-500">© 2024 ResumePro. Sample portfolio project.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

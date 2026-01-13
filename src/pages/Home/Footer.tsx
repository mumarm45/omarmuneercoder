
import { FileText, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function Footer(){
    return (
       <footer className="border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">ResumePro</span>
              </div>
              <p className="text-slate-400 text-sm">
                Professional resume builder for modern job seekers
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link to="/dashboard" className="block text-slate-400 hover:text-white transition-colors">
                  Resume Builder
                </Link>
                <Link to="/my-resume" className="block text-slate-400 hover:text-white transition-colors">
                  My Resume
                </Link>
                <a
                  href="https://github.com/mumarm45/omarmuneercoder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-slate-400 hover:text-white transition-colors"
                >
                  GitHub
                </a>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <p className="text-slate-400 text-sm mb-2">Muhammad Omar Muneer</p>
              <p className="text-slate-400 text-sm">Senior Full-Stack Engineer</p>
              <Link
                to="/my-resume"
                className="inline-flex items-center gap-1 text-pink-400 hover:text-pink-300 transition-colors text-sm mt-2"
              >
                View Full Resume
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-slate-500 text-sm">
                Built with TypeScript, React, Zustand, and Tailwind CSS
              </p>
              <p className="text-slate-500 text-sm">
                © 2024 ResumePro. Sample portfolio project.
              </p>
            </div>
          </div>
        </div>
      </footer> 
    )
}

export default Footer
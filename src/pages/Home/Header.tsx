
import { Link } from 'react-router-dom';
import { FileText, Github } from 'lucide-react';   
function HomePageHeader() : JSX.Element {
    return (<header className="border-b border-slate-700/50 backdrop-blur-sm sticky top-0 z-50 bg-slate-900/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold text-white">ResumePro</span>
                </div>

                <div className="flex items-center gap-4">
                    <a
                        href="https://github.com/mumarm45/omarmuneercoder"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden sm:flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
                    >
                        <Github className="w-5 h-5" />
                        <span className="text-sm">GitHub</span>
                    </a>
                    <Link
                        to="/my-resume"
                        className="text-slate-300 hover:text-white transition-colors text-sm font-medium"
                    >
                        View My CV
                    </Link>
                    <Link
                        to="/dashboard"
                        className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-2.5 rounded-lg font-semibold hover:from-pink-600 hover:to-rose-600 transition-all shadow-lg hover:shadow-xl"
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </div>
    </header>
            
    )
}

export default HomePageHeader
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowRight, Sparkles, Zap, Award, Check, Github } from 'lucide-react';
import { cn } from '@/hooks/useTheme';

function HomePage(): JSX.Element {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 backdrop-blur-sm sticky top-0 z-50 bg-slate-900/80">
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

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-full px-4 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-pink-400" />
                <span className="text-sm text-slate-300">100% Free Forever</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Build a{' '}
                <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-orange-400 text-transparent bg-clip-text">
                  job-winning
                </span>
                <br />
                resume for free
              </h1>

              <p className="text-xl text-slate-300 mb-4">
                Your first resume is 100% free forever.
              </p>
              <p className="text-lg text-slate-400 mb-8">
                Unlimited downloads. No hidden fees. Yes, really 🚀
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/dashboard"
                  className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-pink-600 hover:to-rose-600 transition-all shadow-2xl hover:shadow-pink-500/50 hover:scale-105"
                >
                  Get started — it's free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link
                  to="/my-resume"
                  className="inline-flex items-center justify-center gap-2 bg-slate-800/50 border-2 border-slate-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-slate-800 hover:border-slate-600 transition-all"
                >
                  See Example
                </Link>
              </div>
            </div>

            {/* Right Content - Resume Preview */}
            <div className="hidden lg:block">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-rose-500/20 blur-3xl"></div>
                
                {/* Resume Preview Card */}
                <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-300">
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-700 to-slate-800"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-slate-900 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-slate-300 rounded w-1/2"></div>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="flex gap-4">
                      <div className="h-2 bg-slate-200 rounded w-1/4"></div>
                      <div className="h-2 bg-slate-200 rounded w-1/4"></div>
                      <div className="h-2 bg-slate-200 rounded w-1/4"></div>
                    </div>

                    {/* Summary */}
                    <div className="space-y-2">
                      <div className="h-3 bg-slate-700 rounded w-1/4 mb-3"></div>
                      <div className="h-2 bg-slate-200 rounded w-full"></div>
                      <div className="h-2 bg-slate-200 rounded w-full"></div>
                      <div className="h-2 bg-slate-200 rounded w-3/4"></div>
                    </div>

                    {/* Experience */}
                    <div className="space-y-3">
                      <div className="h-3 bg-slate-700 rounded w-1/3 mb-3"></div>
                      <div className="space-y-2">
                        <div className="h-3 bg-slate-800 rounded w-2/3"></div>
                        <div className="h-2 bg-slate-300 rounded w-1/2"></div>
                        <div className="h-2 bg-slate-200 rounded w-full"></div>
                        <div className="h-2 bg-slate-200 rounded w-5/6"></div>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="space-y-2">
                      <div className="h-3 bg-slate-700 rounded w-1/4 mb-3"></div>
                      <div className="flex flex-wrap gap-2">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                          <div key={i} className="h-6 bg-slate-100 rounded-full px-4 w-20"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-32 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Why Choose ResumePro?
            </h2>
            <p className="text-xl text-slate-400">
              Everything you need to create a professional resume
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group bg-slate-900/50 border border-slate-700 rounded-2xl p-8 hover:border-pink-500/50 transition-all hover:shadow-xl hover:shadow-pink-500/10">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Lightning Fast</h3>
              <p className="text-slate-400">
                Create professional resumes in minutes with our intuitive drag-and-drop builder
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-slate-900/50 border border-slate-700 rounded-2xl p-8 hover:border-pink-500/50 transition-all hover:shadow-xl hover:shadow-pink-500/10">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Beautiful Templates</h3>
              <p className="text-slate-400">
                Choose from professionally designed templates that help you stand out
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-slate-900/50 border border-slate-700 rounded-2xl p-8 hover:border-pink-500/50 transition-all hover:shadow-xl hover:shadow-pink-500/10">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Award className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Export Options</h3>
              <p className="text-slate-400">
                Download as PDF, Word, or text format. Perfect for any application
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Benefits */}
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Everything you need to succeed
              </h2>
              <p className="text-xl text-slate-400 mb-8">
                Build professional resumes with our powerful features
              </p>

              <div className="space-y-4">
                {[
                  'Multiple resume templates',
                  'Real-time preview',
                  'Auto-save functionality',
                  'Export to PDF & Word',
                  'Mobile responsive builder',
                  'No credit card required',
                  'Free forever',
                  'Unlimited downloads'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-slate-300 text-lg">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-8">
                <div className="text-5xl font-bold text-white mb-2">100%</div>
                <div className="text-slate-400">Free Forever</div>
              </div>
              <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-8">
                <div className="text-5xl font-bold text-white mb-2">3</div>
                <div className="text-slate-400">Templates</div>
              </div>
              <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-8">
                <div className="text-5xl font-bold text-white mb-2">∞</div>
                <div className="text-slate-400">Downloads</div>
              </div>
              <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-8">
                <div className="text-5xl font-bold text-white mb-2">2s</div>
                <div className="text-slate-400">Auto-save</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 bg-gradient-to-r from-pink-500/10 to-rose-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to build your resume?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Join thousands of professionals who trust ResumePro
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-10 py-5 rounded-xl font-bold text-xl hover:from-pink-600 hover:to-rose-600 transition-all shadow-2xl hover:shadow-pink-500/50 hover:scale-105"
          >
            Start Building Now — It's Free
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>

      {/* Footer */}
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
    </div>
  );
}

export default memo(HomePage);


import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
function HeroSection(){
    return (
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
    )
}

export default HeroSection
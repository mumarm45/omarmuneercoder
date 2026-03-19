import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-80 w-80 animate-pulse rounded-full bg-pink-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 animate-pulse rounded-full bg-blue-500/10 blur-3xl delay-1000" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/50 px-4 py-2">
              <Sparkles className="h-4 w-4 text-pink-400" />
              <span className="text-sm text-slate-300">100% Free Forever</span>
            </div>

            <h1 className="mb-6 text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
              Build a{' '}
              <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-orange-400 bg-clip-text text-transparent">
                job-winning
              </span>
              <br />
              resume for free
            </h1>

            <p className="mb-4 text-xl text-slate-300">Your first resume is 100% free forever.</p>
            <p className="mb-8 text-lg text-slate-400">
              Unlimited downloads. No hidden fees. Yes, really 🚀
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <Link
                to="/dashboard"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 px-8 py-4 text-lg font-bold text-white shadow-2xl transition-all hover:scale-105 hover:from-pink-600 hover:to-rose-600 hover:shadow-pink-500/50"
              >
                Get started — it&apos;s free
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                to="/my-resume"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-slate-700 bg-slate-800/50 px-8 py-4 text-lg font-semibold text-white transition-all hover:border-slate-600 hover:bg-slate-800"
              >
                See Example
              </Link>
            </div>
          </div>

          {/* Right Content - Resume Preview */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-rose-500/20 blur-3xl" />

              {/* Resume Preview Card */}
              <div className="relative transform rounded-2xl bg-white p-8 shadow-2xl transition-transform duration-300 hover:scale-105">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-start gap-4">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-slate-700 to-slate-800" />
                    <div className="flex-1">
                      <div className="mb-2 h-4 w-3/4 rounded bg-slate-900" />
                      <div className="h-3 w-1/2 rounded bg-slate-300" />
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="flex gap-4">
                    <div className="h-2 w-1/4 rounded bg-slate-200" />
                    <div className="h-2 w-1/4 rounded bg-slate-200" />
                    <div className="h-2 w-1/4 rounded bg-slate-200" />
                  </div>

                  {/* Summary */}
                  <div className="space-y-2">
                    <div className="mb-3 h-3 w-1/4 rounded bg-slate-700" />
                    <div className="h-2 w-full rounded bg-slate-200" />
                    <div className="h-2 w-full rounded bg-slate-200" />
                    <div className="h-2 w-3/4 rounded bg-slate-200" />
                  </div>

                  {/* Experience */}
                  <div className="space-y-3">
                    <div className="mb-3 h-3 w-1/3 rounded bg-slate-700" />
                    <div className="space-y-2">
                      <div className="h-3 w-2/3 rounded bg-slate-800" />
                      <div className="h-2 w-1/2 rounded bg-slate-300" />
                      <div className="h-2 w-full rounded bg-slate-200" />
                      <div className="h-2 w-5/6 rounded bg-slate-200" />
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="space-y-2">
                    <div className="mb-3 h-3 w-1/4 rounded bg-slate-700" />
                    <div className="flex flex-wrap gap-2">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="h-6 w-20 rounded-full bg-slate-100 px-4" />
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
  );
}

export default HeroSection;

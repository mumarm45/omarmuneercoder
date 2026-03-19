import { Award, Sparkles, Zap } from 'lucide-react';

function FeatureSection() {
  return (
    <section className="bg-slate-800/50 py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-white sm:text-5xl">Why Choose ResumePro?</h2>
          <p className="text-xl text-slate-400">
            Everything you need to create a professional resume
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Feature 1 */}
          <div className="group rounded-2xl border border-slate-700 bg-slate-900/50 p-8 transition-all hover:border-pink-500/50 hover:shadow-xl hover:shadow-pink-500/10">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 transition-transform group-hover:scale-110">
              <Zap className="h-7 w-7 text-white" />
            </div>
            <h3 className="mb-4 text-2xl font-bold text-white">Lightning Fast</h3>
            <p className="text-slate-400">
              Create professional resumes in minutes with our intuitive drag-and-drop builder
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group rounded-2xl border border-slate-700 bg-slate-900/50 p-8 transition-all hover:border-pink-500/50 hover:shadow-xl hover:shadow-pink-500/10">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 transition-transform group-hover:scale-110">
              <Sparkles className="h-7 w-7 text-white" />
            </div>
            <h3 className="mb-4 text-2xl font-bold text-white">Beautiful Templates</h3>
            <p className="text-slate-400">
              Choose from professionally designed templates that help you stand out
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group rounded-2xl border border-slate-700 bg-slate-900/50 p-8 transition-all hover:border-pink-500/50 hover:shadow-xl hover:shadow-pink-500/10">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 transition-transform group-hover:scale-110">
              <Award className="h-7 w-7 text-white" />
            </div>
            <h3 className="mb-4 text-2xl font-bold text-white">Export Options</h3>
            <p className="text-slate-400">
              Download as PDF, Word, or text format. Perfect for any application
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeatureSection;

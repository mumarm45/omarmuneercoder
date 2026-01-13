
import { Award, Sparkles, Zap } from 'lucide-react';

function FeatureSection (){
    return (
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
    )
}

export default FeatureSection
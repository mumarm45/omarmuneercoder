import { Check } from 'lucide-react';

function BenefitsSection(){
    return (
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
                  'Free for life 😜',
                  'Unlimited downloads',
                  'Beta and Everything is in localStorage'
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
    )
}

export default BenefitsSection
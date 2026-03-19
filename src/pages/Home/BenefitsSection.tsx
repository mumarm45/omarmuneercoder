import { Check } from 'lucide-react';

function BenefitsSection() {
  return (
    <section className="py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left - Benefits */}
          <div>
            <h2 className="mb-6 text-4xl font-bold text-white sm:text-5xl">
              Everything you need to succeed
            </h2>
            <p className="mb-8 text-xl text-slate-400">
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
                'Beta and Everything is in localStorage',
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-rose-500">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-lg text-slate-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Stats */}
          <div className="grid grid-cols-2 gap-6">
            <div className="rounded-2xl border border-slate-700 bg-slate-900/50 p-8">
              <div className="mb-2 text-5xl font-bold text-white">100%</div>
              <div className="text-slate-400">Free Forever</div>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-900/50 p-8">
              <div className="mb-2 text-5xl font-bold text-white">3</div>
              <div className="text-slate-400">Templates</div>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-900/50 p-8">
              <div className="mb-2 text-5xl font-bold text-white">∞</div>
              <div className="text-slate-400">Downloads</div>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-900/50 p-8">
              <div className="mb-2 text-5xl font-bold text-white">2s</div>
              <div className="text-slate-400">Auto-save</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BenefitsSection;

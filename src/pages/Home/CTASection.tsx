import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

function CTASection() {
  return (
    <section className="bg-gradient-to-r from-pink-500/10 to-rose-500/10 py-20 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="mb-6 text-4xl font-bold text-white sm:text-5xl">
          Ready to build your resume?
        </h2>
        <p className="mb-8 text-xl text-slate-300">
          Join thousands of professionals who trust ResumePro
        </p>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 px-10 py-5 text-xl font-bold text-white shadow-2xl transition-all hover:scale-105 hover:from-pink-600 hover:to-rose-600 hover:shadow-pink-500/50"
        >
          Start Building Now — It&apos;s Free
          <ArrowRight className="h-6 w-6" />
        </Link>
      </div>
    </section>
  );
}

export default CTASection;

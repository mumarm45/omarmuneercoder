import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function CTASection(){
    return (
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
    )
}

export default CTASection
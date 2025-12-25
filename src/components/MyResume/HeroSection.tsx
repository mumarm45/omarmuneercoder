interface HeroSectionProps {
  isDark: boolean;
  title: string;
  summary: string;
  getInTouchText: string;
  linkedinProfileText: string;
}

function HeroSection({
  isDark,
  title,
  summary,
  getInTouchText,
  linkedinProfileText,
}: HeroSectionProps): JSX.Element {
  return (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-indigo-500 shadow-xl">
          <img
            src="/images/omar_muneer_2.jpg"
            alt="Muhammad Omar Muneer"
            className="w-full h-full object-cover object-top"
          />
        </div>
        <h1 className="text-5xl font-bold mb-4">
          Muhammad{' '}
          <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
            Omar Muneer
          </span>
        </h1>
        <p className="text-2xl text-cyan-500 mb-4">{title}</p>
        <p
          className={`text-lg max-w-3xl mx-auto mb-8 ${isDark ? 'text-slate-300' : 'text-gray-600'}`}
        >
          {summary}
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="mailto:mumarm45@gmail.com"
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white rounded-full font-semibold hover:shadow-lg transition"
          >
            {getInTouchText}
          </a>
          <a
            href="https://www.linkedin.com/in/mumarm45/"
            target="_blank"
            rel="noopener noreferrer"
            className={`px-6 py-3 border-2 border-indigo-600 rounded-full font-semibold hover:bg-indigo-600 hover:text-white transition ${isDark ? 'text-white' : 'text-indigo-600'}`}
          >
            {linkedinProfileText}
          </a>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

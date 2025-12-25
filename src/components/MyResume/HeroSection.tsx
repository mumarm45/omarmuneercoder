import { theme } from '@/theme/colors';
import { cn } from '@/hooks/useTheme';

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
        <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-slate-600 shadow-xl">
          <img
            src="/images/omar_muneer_2.jpg"
            alt="Muhammad Omar Muneer"
            className="w-full h-full object-cover object-top"
          />
        </div>
        <h1 className="text-5xl font-bold mb-4">
          Muhammad{' '}
          <span className="bg-gradient-to-r from-slate-700 to-slate-600 bg-clip-text text-transparent">
            Omar Muneer
          </span>
        </h1>
        <p className={cn('text-2xl mb-4', theme.text.heading)}>{title}</p>
        <p className={cn('text-lg max-w-3xl mx-auto mb-8', isDark ? theme.text.secondary.dark : theme.text.secondary.light)}>
          {summary}
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="mailto:mumarm45@gmail.com"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold hover:shadow-lg transition"
          >
            {getInTouchText}
          </a>
          <a
            href="https://www.linkedin.com/in/mumarm45/"
            target="_blank"
            rel="noopener noreferrer"
            className={`px-6 py-3 border-2 border-slate-600 rounded-full font-semibold hover:bg-slate-600 hover:text-white transition ${isDark ? 'text-white' : 'text-slate-600'}`}
          >
            {linkedinProfileText}
          </a>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

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
    <section className="px-6 py-16">
      <div className="mx-auto max-w-5xl text-center">
        <div className="mx-auto mb-6 h-40 w-40 overflow-hidden rounded-full border-4 border-slate-600 shadow-xl">
          <img
            src="/images/omar_muneer_2.jpg"
            alt="Muhammad Omar Muneer"
            className="h-full w-full object-cover object-top"
          />
        </div>
        <h1 className="mb-4 text-5xl font-bold">
          Muhammad{' '}
          <span className="bg-gradient-to-r from-slate-700 to-slate-600 bg-clip-text text-transparent">
            Omar Muneer
          </span>
        </h1>
        <p className={cn('mb-4 text-2xl', theme.text.heading)}>{title}</p>
        <p
          className={cn(
            'mx-auto mb-8 max-w-3xl text-lg',
            isDark ? theme.text.secondary.dark : theme.text.secondary.light
          )}
        >
          {summary}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="mailto:mumarm45@gmail.com"
            className="rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 hover:shadow-lg"
          >
            {getInTouchText}
          </a>
          <a
            href="https://www.linkedin.com/in/mumarm45/"
            target="_blank"
            rel="noopener noreferrer"
            className={`rounded-full border-2 border-slate-600 px-6 py-3 font-semibold transition hover:bg-slate-600 hover:text-white ${isDark ? 'text-white' : 'text-slate-600'}`}
          >
            {linkedinProfileText}
          </a>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

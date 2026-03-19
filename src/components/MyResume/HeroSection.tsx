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
    <section
      className={cn(
        'relative overflow-hidden px-6 py-20',
        isDark
          ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
          : 'bg-gradient-to-br from-slate-50 via-white to-rose-50'
      )}
    >
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-pink-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-rose-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl text-center">
        {/* Profile photo with gradient ring */}
        <div className="mx-auto mb-6 h-44 w-44 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 p-1 shadow-2xl shadow-pink-500/20">
          <div className="h-full w-full overflow-hidden rounded-full">
            <img
              src="/images/omar_muneer_2.jpg"
              alt="Muhammad Omar Muneer"
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>

        {/* Name */}
        <h1 className="mb-3 text-5xl font-bold">
          Muhammad{' '}
          <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
            Omar Muneer
          </span>
        </h1>

        {/* Role badge */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-4 py-1.5">
          <span className="h-2 w-2 animate-pulse rounded-full bg-pink-500" />
          <span className={cn('text-sm font-semibold', theme.text.heading)}>{title}</span>
        </div>

        {/* Summary */}
        <p
          className={cn(
            'mx-auto mb-8 max-w-3xl text-lg leading-relaxed',
            isDark ? theme.text.secondary.dark : theme.text.secondary.light
          )}
        >
          {summary}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="mailto:mumarm45@gmail.com"
            className="rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-3 font-semibold text-white shadow-lg shadow-pink-500/25 transition hover:opacity-90 hover:shadow-pink-500/40"
          >
            {getInTouchText}
          </a>
          <a
            href="https://www.linkedin.com/in/mumarm45/"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'rounded-full border-2 px-6 py-3 font-semibold transition',
              isDark
                ? 'border-slate-600 text-white hover:border-pink-500 hover:text-pink-400'
                : 'border-slate-300 text-slate-700 hover:border-pink-500 hover:text-pink-600'
            )}
          >
            {linkedinProfileText}
          </a>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

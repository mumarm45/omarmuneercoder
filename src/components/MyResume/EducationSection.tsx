import { MapPin, Calendar } from 'lucide-react';
import { theme } from '@/theme/colors';
import { cn } from '@/hooks/useTheme';

interface EducationSectionProps {
  isDark: boolean;
  title: string;
  degree: string;
  school: string;
  location: string;
  period: string;
}

function EducationSection({
  isDark,
  title,
  degree,
  school,
  location,
  period,
}: EducationSectionProps): JSX.Element {
  return (
    <section className="px-6 py-16" id="education">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-12 text-center text-3xl font-bold">
          <span className={theme.text.heading}>{title}</span>
        </h2>
        <div
          className={cn(
            'rounded-2xl border p-8 shadow-lg',
            isDark ? theme.backgrounds.card.dark : theme.backgrounds.card.light,
            isDark ? theme.borders.dark : theme.borders.light
          )}
        >
          <div className="flex items-start gap-4">
            <div className="text-4xl">🎓</div>
            <div className="flex-1">
              <h3 className={cn('mb-2 text-2xl font-bold', theme.text.heading)}>{degree}</h3>
              <p className="mb-2 text-xl font-semibold">{school}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> {location}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> {period}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EducationSection;

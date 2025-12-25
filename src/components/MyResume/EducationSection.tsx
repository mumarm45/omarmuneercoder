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
    <section className="py-16 px-6" id="education">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          <span className={theme.text.heading}>{title}</span>
        </h2>
        <div
          className={cn(
            'rounded-2xl p-8 shadow-lg border',
            isDark ? theme.backgrounds.card.dark : theme.backgrounds.card.light,
            isDark ? theme.borders.dark : theme.borders.light
          )}
        >
          <div className="flex items-start gap-4">
            <div className="text-4xl">🎓</div>
            <div className="flex-1">
              <h3 className={cn('text-2xl font-bold mb-2', theme.text.heading)}>{degree}</h3>
              <p className="text-xl font-semibold mb-2">{school}</p>
              <div className="flex gap-4 text-sm flex-wrap">
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> {location}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> {period}
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

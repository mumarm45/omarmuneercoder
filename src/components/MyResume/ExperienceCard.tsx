import { MapPin, Calendar } from 'lucide-react';
import { theme } from '@/theme/colors';
import { cn } from '@/hooks/useTheme';

interface ExperienceCardProps {
  title: string;
  company: string;
  location: string;
  period: string;
  description?: string;
  responsibilities: string[];
  isDark: boolean;
}

function ExperienceCard({
  title,
  company,
  location,
  period,
  description,
  responsibilities,
  isDark,
}: ExperienceCardProps): JSX.Element {
  return (
    <div
      className={cn(
        'rounded-xl border-l-4 border-l-slate-600 p-8 shadow-lg',
        isDark ? theme.backgrounds.card.dark : theme.backgrounds.card.light,
        isDark ? theme.borders.dark : theme.borders.light
      )}
    >
      <h3 className={cn('mb-2 text-2xl font-bold', theme.text.heading)}>{title}</h3>
      <p className="mb-2 text-xl font-semibold">{company}</p>
      <div className="mb-4 flex flex-wrap gap-4 text-sm">
        <span className="flex items-center gap-2">
          <MapPin className="h-4 w-4" /> {location}
        </span>
        <span className="flex items-center gap-2">
          <Calendar className="h-4 w-4" /> {period}
        </span>
      </div>
      {description && (
        <p className={cn('mb-4', isDark ? theme.text.secondary.dark : theme.text.secondary.light)}>
          {description}
        </p>
      )}
      <ul className={cn('space-y-2', isDark ? theme.text.secondary.dark : 'text-gray-700')}>
        {responsibilities.map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="mt-1 text-slate-600">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExperienceCard;

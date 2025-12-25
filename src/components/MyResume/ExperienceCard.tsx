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
        'rounded-xl p-8 border-l-4 border-l-slate-600 shadow-lg',
        isDark ? theme.backgrounds.card.dark : theme.backgrounds.card.light,
        isDark ? theme.borders.dark : theme.borders.light
      )}
    >
      <h3 className={cn('text-2xl font-bold mb-2', theme.text.heading)}>{title}</h3>
      <p className="text-xl font-semibold mb-2">{company}</p>
      <div className="flex gap-4 mb-4 text-sm flex-wrap">
        <span className="flex items-center gap-2">
          <MapPin className="w-4 h-4" /> {location}
        </span>
        <span className="flex items-center gap-2">
          <Calendar className="w-4 h-4" /> {period}
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
            <span className="text-slate-600 mt-1">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExperienceCard;

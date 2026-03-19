import { theme } from '@/theme/colors';
import { cn } from '@/hooks/useTheme';

interface HobbyCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isDark: boolean;
}

function HobbyCard({ icon, title, description, isDark }: HobbyCardProps): JSX.Element {
  return (
    <div
      className={cn(
        'rounded-xl border p-8 text-center shadow-lg transition hover:border-slate-500',
        isDark ? theme.backgrounds.card.dark : theme.backgrounds.card.light,
        isDark ? theme.borders.dark : theme.borders.light
      )}
    >
      <div className="mb-4 flex justify-center">{icon}</div>
      <h3 className={cn('mb-3 text-xl font-bold', theme.text.heading)}>{title}</h3>
      <p
        className={cn(
          'text-sm leading-relaxed',
          isDark ? theme.text.secondary.dark : theme.text.secondary.light
        )}
      >
        {description}
      </p>
    </div>
  );
}

export default HobbyCard;

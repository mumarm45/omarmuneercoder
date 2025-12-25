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
        'rounded-xl p-8 border hover:border-slate-500 transition shadow-lg text-center',
        isDark ? theme.backgrounds.card.dark : theme.backgrounds.card.light,
        isDark ? theme.borders.dark : theme.borders.light
      )}
    >
      <div className="mb-4 flex justify-center">{icon}</div>
      <h3 className={cn('text-xl font-bold mb-3', theme.text.heading)}>{title}</h3>
      <p className={cn('text-sm leading-relaxed', isDark ? theme.text.secondary.dark : theme.text.secondary.light)}>
        {description}
      </p>
    </div>
  );
}

export default HobbyCard;

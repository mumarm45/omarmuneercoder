import { theme } from '@/theme/colors';
import { cn } from '@/hooks/useTheme';

interface SkillCardProps {
  title: string;
  icon: string;
  skills: string[];
  isDark: boolean;
}

function SkillCard({ title, icon, skills, isDark }: SkillCardProps): JSX.Element {
  return (
    <div
      className={cn(
        'rounded-xl border p-6 shadow-lg transition hover:border-pink-500/50 hover:shadow-pink-500/10',
        isDark ? theme.backgrounds.card.dark : theme.backgrounds.card.light,
        isDark ? theme.borders.dark : theme.borders.light
      )}
    >
      <h3 className={cn('mb-4 flex items-center gap-2 text-xl font-bold', theme.text.heading)}>
        <span>{icon}</span> {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className={`rounded-full px-3 py-1 text-sm transition ${isDark ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-pink-50 text-slate-700 hover:bg-pink-100'}`}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default SkillCard;

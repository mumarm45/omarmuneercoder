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
        'rounded-xl border p-6 shadow-lg transition hover:border-slate-500',
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
            className={`px-3 py-1 ${isDark ? 'bg-slate-700' : 'bg-slate-100'} rounded-full text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default SkillCard;

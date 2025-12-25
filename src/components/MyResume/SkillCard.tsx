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
        'rounded-xl p-6 border hover:border-slate-500 transition shadow-lg',
        isDark ? theme.backgrounds.card.dark : theme.backgrounds.card.light,
        isDark ? theme.borders.dark : theme.borders.light
      )}
    >
      <h3 className={cn('text-xl font-bold mb-4 flex items-center gap-2', theme.text.heading)}>
        <span>{icon}</span> {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className={`px-3 py-1 ${isDark ? 'bg-slate-700' : 'bg-slate-100'} text-sm rounded-full ${isDark ? 'text-slate-300' : 'text-slate-700'}`}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default SkillCard;

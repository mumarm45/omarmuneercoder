import { Lightbulb } from 'lucide-react';
import useResumeStore from '@store/resumeStore';
import { TEMPLATE_STYLES } from '@utils/constants';
import { theme } from '@/theme/colors';
import { cn } from '@/hooks/useTheme';

function SkillsSection(): JSX.Element | null {
  const { resumeData, selectedTemplate } = useResumeStore();
  const styles = TEMPLATE_STYLES[selectedTemplate];

  if (resumeData.skills.length === 0) return null;

  return (
    <section className="mb-8 border-b-2 border-slate-200 pb-6">
      <h2
        className={cn(
          'mb-6 flex items-center gap-2 pl-3 text-xl font-bold',
          styles.section,
          styles.accent
        )}
      >
        <Lightbulb className="h-5 w-5" />
        SKILLS
      </h2>

      <div className="ml-3 flex flex-wrap gap-2">
        {resumeData.skills.map((skill, index) => (
          <span
            key={index}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-medium',
              styles.accentBg,
              theme.text.body
            )}
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}

export default SkillsSection;

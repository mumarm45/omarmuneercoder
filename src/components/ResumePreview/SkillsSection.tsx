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
    <section className="mb-8 pb-6 border-b-2 border-slate-200">
      <h2 className={cn(
        'text-xl font-bold mb-6 pl-3 flex items-center gap-2',
        styles.section,
        styles.accent
      )}>
        <Lightbulb className="w-5 h-5" />
        SKILLS
      </h2>
      
      <div className="flex flex-wrap gap-2 ml-3">
        {resumeData.skills.map((skill, index) => (
          <span
            key={index}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium',
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

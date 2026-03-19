import { Briefcase } from 'lucide-react';
import useResumeStore from '@store/resumeStore';
import { TEMPLATE_STYLES } from '@utils/constants';
import { theme } from '@/theme/colors';
import { cn } from '@/hooks/useTheme';
import { DEFAULT_SECTION_LABELS } from '@/types';

function ExperienceSection(): JSX.Element | null {
  const { resumeData, selectedTemplate } = useResumeStore();
  const styles = TEMPLATE_STYLES[selectedTemplate];
  const label = resumeData.sectionLabels?.experience ?? DEFAULT_SECTION_LABELS.experience;

  if (resumeData.experience.length === 0) return null;

  return (
    <section className="mb-8 border-b-2 border-slate-200 pb-6">
      <h2
        className={cn(
          'mb-6 flex items-center gap-2 pl-3 text-xl font-bold',
          styles.section,
          styles.accent
        )}
      >
        <Briefcase className="h-5 w-5" />
        {label}
      </h2>

      <div className="space-y-6">
        {resumeData.experience.map((exp) => (
          <div key={exp.id} className="ml-3">
            <div className="mb-2 flex items-start justify-between">
              <div>
                <h3 className={cn('font-bold', theme.text.heading)}>{exp.title}</h3>
                <p className={cn('text-sm', theme.text.secondary.light)}>
                  {exp.company} | {exp.location}
                </p>
              </div>
              <span className={cn('ml-4 whitespace-nowrap text-sm', theme.text.secondary.light)}>
                {exp.startDate} - {exp.endDate}
              </span>
            </div>
            <p className={cn('whitespace-pre-line text-sm', theme.text.body)}>{exp.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ExperienceSection;

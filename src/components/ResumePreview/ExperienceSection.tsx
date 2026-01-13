import { Briefcase } from 'lucide-react';
import useResumeStore from '@store/resumeStore';
import { TEMPLATE_STYLES } from '@utils/constants';
import { theme } from '@/theme/colors';
import { cn } from '@/hooks/useTheme';

function ExperienceSection(): JSX.Element | null {
  const { resumeData, selectedTemplate } = useResumeStore();
  const styles = TEMPLATE_STYLES[selectedTemplate];

  if (resumeData.experience.length === 0) return null;

  return (
    <section className="mb-8 pb-6 border-b-2 border-slate-200">
      <h2 className={cn(
        'text-xl font-bold mb-6 pl-3 flex items-center gap-2',
        styles.section,
        styles.accent
      )}>
        <Briefcase className="w-5 h-5" />
        EXPERIENCE
      </h2>
      
      <div className="space-y-6">
        {resumeData.experience.map((exp) => (
          <div key={exp.id} className="ml-3">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className={cn('font-bold', theme.text.heading)}>{exp.title}</h3>
                <p className={cn('text-sm', theme.text.secondary.light)}>
                  {exp.company} | {exp.location}
                </p>
              </div>
              <span className={cn('text-sm whitespace-nowrap ml-4', theme.text.secondary.light)}>
                {exp.startDate} - {exp.endDate}
              </span>
            </div>
            <p className={cn('text-sm whitespace-pre-line', theme.text.body)}>
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ExperienceSection;

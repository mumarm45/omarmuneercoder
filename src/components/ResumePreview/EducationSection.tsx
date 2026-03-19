import { GraduationCap } from 'lucide-react';
import useResumeStore from '@store/resumeStore';
import { TEMPLATE_STYLES } from '@utils/constants';
import { theme } from '@/theme/colors';
import { cn } from '@/hooks/useTheme';
import { DEFAULT_SECTION_LABELS } from '@/types';

function EducationSection(): JSX.Element | null {
  const { resumeData, selectedTemplate } = useResumeStore();
  const styles = TEMPLATE_STYLES[selectedTemplate];
  const label = resumeData.sectionLabels?.education ?? DEFAULT_SECTION_LABELS.education;

  if (resumeData.education.length === 0) return null;

  return (
    <section className="mb-8 border-b-2 border-slate-200 pb-6">
      <h2
        className={cn(
          'mb-6 flex items-center gap-2 pl-3 text-xl font-bold',
          styles.section,
          styles.accent
        )}
      >
        <GraduationCap className="h-5 w-5" />
        {label}
      </h2>

      <div className="space-y-4">
        {resumeData.education.map((edu) => (
          <div key={edu.id} className="ml-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className={cn('font-bold', theme.text.heading)}>{edu.degree}</h3>
                <p className={cn('text-sm', theme.text.secondary.light)}>
                  {edu.school} | {edu.location}
                </p>
              </div>
              <span className={cn('ml-4 whitespace-nowrap text-sm', theme.text.secondary.light)}>
                {edu.year}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default EducationSection;

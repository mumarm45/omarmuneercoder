import { FileText } from 'lucide-react';
import useResumeStore from '@store/resumeStore';
import { TEMPLATE_STYLES } from '@utils/constants';
import { theme } from '@/theme/colors';
import { cn } from '@/hooks/useTheme';

function SummarySection(): JSX.Element | null {
  const { resumeData, selectedTemplate } = useResumeStore();
  const styles = TEMPLATE_STYLES[selectedTemplate];

  if (!resumeData.summary) return null;

  return (
    <section className="mb-8 border-b-2 border-slate-200 pb-6">
      <h2
        className={cn(
          'mb-6 flex items-center gap-2 pl-3 text-xl font-bold',
          styles.section,
          styles.accent
        )}
      >
        <FileText className="h-5 w-5" />
        PROFESSIONAL SUMMARY
      </h2>

      <p
        className={cn(
          'ml-3 whitespace-pre-wrap break-words text-sm leading-relaxed',
          theme.text.body
        )}
      >
        {resumeData.summary}
      </p>
    </section>
  );
}

export default SummarySection;

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
    <section className="mb-8 pb-6 border-b-2 border-slate-200">
      <h2 className={cn(
        'text-xl font-bold mb-6 pl-3 flex items-center gap-2',
        styles.section,
        styles.accent
      )}>
        <FileText className="w-5 h-5" />
        PROFESSIONAL SUMMARY
      </h2>
      
      <p className={cn('text-sm leading-relaxed ml-3 break-words whitespace-pre-wrap', theme.text.body)}>
        {resumeData.summary}
      </p>
    </section>
  );
}

export default SummarySection;

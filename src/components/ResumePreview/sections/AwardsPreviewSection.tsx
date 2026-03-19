import { Trophy } from 'lucide-react';
import { Award, DEFAULT_SECTION_LABELS } from '@/types';
import { TEMPLATE_STYLES } from '@/utils/constants';
import useResumeStore from '@/store/resumeStore';

function AwardsPreviewSection(): JSX.Element | null {
  const { resumeData, selectedTemplate } = useResumeStore();
  const awards = resumeData.awards || [];
  const styles = TEMPLATE_STYLES[selectedTemplate];
  const label = resumeData.sectionLabels?.awards ?? DEFAULT_SECTION_LABELS.awards;

  if (awards.length === 0) return null;

  return (
    <section className="mb-8 border-b-2 border-slate-200 pb-6 last:border-0">
      <h2
        className={`mb-4 pl-3 text-xl font-bold ${styles.section} ${styles.accent} flex items-center gap-2`}
      >
        <Trophy className="h-5 w-5" />
        {label}
      </h2>

      <div className="space-y-4">
        {awards.map((award) => (
          <AwardPreviewItem key={award.id} award={award} />
        ))}
      </div>
    </section>
  );
}

interface AwardPreviewItemProps {
  award: Award;
}

function AwardPreviewItem({ award }: AwardPreviewItemProps): JSX.Element {
  return (
    <div className="pl-3">
      <div className="mb-1 flex items-baseline justify-between">
        <h3 className="text-base font-bold text-slate-900">{award.title}</h3>
        <span className="ml-4 text-sm text-slate-600">{award.date}</span>
      </div>
      <p className="mb-2 text-sm text-slate-600">{award.issuer}</p>
      {award.description && (
        <p className="text-sm leading-relaxed text-slate-700">{award.description}</p>
      )}
    </div>
  );
}

export default AwardsPreviewSection;

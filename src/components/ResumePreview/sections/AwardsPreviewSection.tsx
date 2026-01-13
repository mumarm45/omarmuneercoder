import { Trophy } from 'lucide-react';
import { Award } from '@/types';
import { TEMPLATE_STYLES } from '@/utils/constants';
import useResumeStore from '@/store/resumeStore';

function AwardsPreviewSection(): JSX.Element | null {
  const { resumeData, selectedTemplate } = useResumeStore();
  const awards = resumeData.awards || [];
  const styles = TEMPLATE_STYLES[selectedTemplate];

  if (awards.length === 0) return null;

  return (
    <section className="mb-8 pb-6 border-b-2 border-slate-200 last:border-0">
      <h2 className={`text-xl font-bold mb-4 pl-3 ${styles.section} ${styles.accent} flex items-center gap-2`}>
        <Trophy className="w-5 h-5" />
        AWARDS & ACHIEVEMENTS
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
      <div className="flex items-baseline justify-between mb-1">
        <h3 className="font-bold text-slate-900 text-base">{award.title}</h3>
        <span className="text-sm text-slate-600 ml-4">{award.date}</span>
      </div>
      <p className="text-sm text-slate-600 mb-2">{award.issuer}</p>
      {award.description && (
        <p className="text-sm text-slate-700 leading-relaxed">{award.description}</p>
      )}
    </div>
  );
}

export default AwardsPreviewSection;

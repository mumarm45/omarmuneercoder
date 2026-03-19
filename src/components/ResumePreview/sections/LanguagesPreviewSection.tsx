import { Globe } from 'lucide-react';
import { Language } from '@/types';
import { TEMPLATE_STYLES } from '@/utils/constants';
import useResumeStore from '@/store/resumeStore';

function LanguagesPreviewSection(): JSX.Element | null {
  const { resumeData, selectedTemplate } = useResumeStore();
  const languages = resumeData.languages || [];
  const styles = TEMPLATE_STYLES[selectedTemplate];

  if (languages.length === 0) return null;

  return (
    <section className="mb-8 border-b-2 border-slate-200 pb-6 last:border-0">
      <h2
        className={`mb-4 pl-3 text-xl font-bold ${styles.section} ${styles.accent} flex items-center gap-2`}
      >
        <Globe className="h-5 w-5" />
        LANGUAGES
      </h2>

      <div className="grid grid-cols-2 gap-4 pl-3">
        {languages.map((language) => (
          <LanguagePreviewItem key={language.id} language={language} />
        ))}
      </div>
    </section>
  );
}

interface LanguagePreviewItemProps {
  language: Language;
}

function LanguagePreviewItem({ language }: LanguagePreviewItemProps): JSX.Element {
  // Determine the number of filled dots based on proficiency
  const dots = {
    Native: 5,
    Fluent: 4,
    Professional: 3,
    Intermediate: 2,
    Basic: 1,
  }[language.proficiency];

  return (
    <div className="flex items-center justify-between pr-4">
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-slate-900">{language.name}</h3>
        <p className="text-xs text-slate-600">{language.proficiency}</p>
      </div>

      {/* Proficiency Dots */}
      <div className="flex gap-1.5">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full ${index < dots ? 'bg-slate-900' : 'bg-slate-300'}`}
          />
        ))}
      </div>
    </div>
  );
}

export default LanguagesPreviewSection;

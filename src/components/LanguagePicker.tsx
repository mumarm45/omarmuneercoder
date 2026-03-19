export interface SupportedLanguage {
  code: string;
  name: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
  { code: 'en', name: 'English',    flag: '🇬🇧' },
  { code: 'ar', name: 'Arabic',     flag: '🇸🇦' },
  { code: 'fr', name: 'French',     flag: '🇫🇷' },
  { code: 'es', name: 'Spanish',    flag: '🇪🇸' },
  { code: 'de', name: 'German',     flag: '🇩🇪' },
  { code: 'zh', name: 'Chinese',    flag: '🇨🇳' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'it', name: 'Italian',    flag: '🇮🇹' },
  { code: 'ja', name: 'Japanese',   flag: '🇯🇵' },
  { code: 'ko', name: 'Korean',     flag: '🇰🇷' },
];

interface LanguagePickerProps {
  onSelect: (language: SupportedLanguage) => void;
  /** Language codes already in use — grayed out / hidden */
  excludeCodes?: string[];
  title?: string;
  description?: string;
}

function LanguagePicker({
  onSelect,
  excludeCodes = [],
  title = 'Choose resume language',
  description = 'Select the language this resume is written in',
}: LanguagePickerProps): JSX.Element {
  const available = SUPPORTED_LANGUAGES.filter(l => !excludeCodes.includes(l.code));

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8 w-full max-w-md shadow-2xl">
        <h2 className="text-xl font-bold text-white mb-1">{title}</h2>
        <p className="text-slate-400 text-sm mb-6">{description}</p>

        <div className="grid grid-cols-2 gap-3">
          {available.map((lang) => (
            <button
              key={lang.code}
              onClick={() => onSelect(lang)}
              className="flex items-center gap-3 p-3 rounded-xl border border-slate-700 hover:border-blue-500 hover:bg-slate-700/50 transition-all text-left group"
            >
              <span className="text-2xl leading-none">{lang.flag}</span>
              <div>
                <div className="text-white font-medium text-sm group-hover:text-blue-300 transition-colors">
                  {lang.name}
                </div>
                <div className="text-slate-500 text-xs uppercase tracking-wider">{lang.code}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LanguagePicker;

export interface SupportedLanguage {
  code: string;
  name: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
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
  const available = SUPPORTED_LANGUAGES.filter((l) => !excludeCodes.includes(l.code));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-800 p-8 shadow-2xl">
        <h2 className="mb-1 text-xl font-bold text-white">{title}</h2>
        <p className="mb-6 text-sm text-slate-400">{description}</p>

        <div className="grid grid-cols-2 gap-3">
          {available.map((lang) => (
            <button
              key={lang.code}
              onClick={() => onSelect(lang)}
              className="group flex items-center gap-3 rounded-xl border border-slate-700 p-3 text-left transition-all hover:border-blue-500 hover:bg-slate-700/50"
            >
              <span className="text-2xl leading-none">{lang.flag}</span>
              <div>
                <div className="text-sm font-medium text-white transition-colors group-hover:text-blue-300">
                  {lang.name}
                </div>
                <div className="text-xs uppercase tracking-wider text-slate-500">{lang.code}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LanguagePicker;

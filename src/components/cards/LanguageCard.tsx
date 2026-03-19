import { Globe, Pencil, Trash2 } from 'lucide-react';
import { Language } from '@/types';

interface LanguageCardProps {
  language: Language;
  onEdit: (language: Language) => void;
  onDelete: (id: number) => void;
}

const PROFICIENCY_COLORS = {
  Native: 'bg-green-100 text-green-700',
  Fluent: 'bg-blue-100 text-blue-700',
  Professional: 'bg-purple-100 text-purple-700',
  Intermediate: 'bg-yellow-100 text-yellow-700',
  Basic: 'bg-slate-100 text-slate-700',
};

const PROFICIENCY_DOTS = {
  Native: 5,
  Fluent: 4,
  Professional: 3,
  Intermediate: 2,
  Basic: 1,
};

function LanguageCard({ language, onEdit, onDelete }: LanguageCardProps): JSX.Element {
  const dots = PROFICIENCY_DOTS[language.proficiency];

  return (
    <div className="group rounded-lg border border-slate-200 bg-white p-4 transition-all hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex flex-1 gap-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
            <Globe className="h-5 w-5 text-white" />
          </div>

          <div className="flex-1">
            <h4 className="mb-1 font-semibold text-slate-900">{language.name}</h4>

            {/* Proficiency Badge */}
            <span
              className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${PROFICIENCY_COLORS[language.proficiency]}`}
            >
              {language.proficiency}
            </span>

            {/* Proficiency Dots */}
            <div className="mt-2 flex gap-1">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 w-1.5 rounded-full ${
                    index < dots ? 'bg-blue-500' : 'bg-slate-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={() => onEdit(language)}
            className="rounded p-1.5 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
            title="Edit"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(language.id)}
            className="rounded p-1.5 text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default LanguageCard;

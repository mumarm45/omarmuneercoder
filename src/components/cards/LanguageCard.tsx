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
    <div className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-all group">
      <div className="flex items-start justify-between">
        <div className="flex gap-3 flex-1">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <Globe className="w-5 h-5 text-white" />
          </div>
          
          <div className="flex-1">
            <h4 className="font-semibold text-slate-900 mb-1">{language.name}</h4>
            
            {/* Proficiency Badge */}
            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${PROFICIENCY_COLORS[language.proficiency]}`}>
              {language.proficiency}
            </span>

            {/* Proficiency Dots */}
            <div className="flex gap-1 mt-2">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full ${
                    index < dots ? 'bg-blue-500' : 'bg-slate-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(language)}
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
            title="Edit"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(language.id)}
            className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default LanguageCard;

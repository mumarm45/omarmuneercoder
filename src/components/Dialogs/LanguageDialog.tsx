import { useState } from 'react';
import { X, Globe } from 'lucide-react';
import { Language } from '@/types';
import useResumeStore from '@/store/resumeStore';

interface LanguageDialogProps {
  isOpen: boolean;
  onClose: () => void;
  language?: Language;
}

const PROFICIENCY_LEVELS: Language['proficiency'][] = [
  'Native',
  'Fluent',
  'Professional',
  'Intermediate',
  'Basic',
];

function LanguageDialog({ isOpen, onClose, language }: LanguageDialogProps): JSX.Element | null {
  const { addLanguage, updateLanguage } = useResumeStore();
  const [formData, setFormData] = useState<Language>(
    language || {
      id: Date.now(),
      name: '',
      proficiency: 'Professional',
    }
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (language) {
      updateLanguage(formData);
    } else {
      addLanguage(formData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              {language ? 'Edit Language' : 'Add Language'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Language Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Language <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., English, Spanish, Mandarin"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                required
              />
            </div>

            {/* Proficiency Level */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Proficiency Level <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 gap-2">
                {PROFICIENCY_LEVELS.map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setFormData({ ...formData, proficiency: level })}
                    className={`px-4 py-3 text-left rounded-lg border-2 transition-all ${
                      formData.proficiency === level
                        ? 'border-slate-900 bg-slate-50 text-slate-900 font-medium'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{level}</span>
                      {formData.proficiency === level && (
                        <div className="w-2 h-2 rounded-full bg-slate-900"></div>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      {level === 'Native' && 'First language'}
                      {level === 'Fluent' && 'Complete command of the language'}
                      {level === 'Professional' && 'Working proficiency'}
                      {level === 'Intermediate' && 'Conversational proficiency'}
                      {level === 'Basic' && 'Elementary proficiency'}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              {language ? 'Update Language' : 'Add Language'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LanguageDialog;

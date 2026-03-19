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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
              <Globe className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              {language ? 'Edit Language' : 'Add Language'}
            </h2>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 transition-colors hover:bg-slate-100">
            <X className="h-5 w-5 text-slate-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Language Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Language <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., English, Spanish, Mandarin"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900"
                required
              />
            </div>

            {/* Proficiency Level */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Proficiency Level <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 gap-2">
                {PROFICIENCY_LEVELS.map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setFormData({ ...formData, proficiency: level })}
                    className={`rounded-lg border-2 px-4 py-3 text-left transition-all ${
                      formData.proficiency === level
                        ? 'border-slate-900 bg-slate-50 font-medium text-slate-900'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{level}</span>
                      {formData.proficiency === level && (
                        <div className="h-2 w-2 rounded-full bg-slate-900" />
                      )}
                    </div>
                    <p className="mt-1 text-xs text-slate-500">
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
          <div className="mt-8 flex justify-end gap-3 border-t border-slate-200 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-6 py-2.5 text-slate-700 transition-colors hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-slate-900 px-6 py-2.5 text-white transition-colors hover:bg-slate-800"
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

import { useState } from 'react';
import { Plus, Globe } from 'lucide-react';
import useResumeStore from '@/store/resumeStore';
import LanguageCard from '../cards/LanguageCard';
import LanguageDialog from '../Dialogs/LanguageDialog';
import { Language } from '@/types';

function LanguagesSection(): JSX.Element {
  const { resumeData, deleteLanguage } = useResumeStore();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingLanguage, setEditingLanguage] = useState<Language | undefined>();

  const languages = resumeData.languages || [];

  const handleEdit = (language: Language) => {
    setEditingLanguage(language);
    setDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this language?')) {
      deleteLanguage(id);
    }
  };

  const handleClose = () => {
    setDialogOpen(false);
    setEditingLanguage(undefined);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-md flex items-center justify-center">
            <Globe className="w-3.5 h-3.5 text-white" />
          </div>
          <h4 className="text-sm font-semibold text-slate-900">Languages</h4>
          {languages.length > 0 && (
            <span className="text-xs text-slate-500">({languages.length})</span>
          )}
        </div>

        <button
          onClick={() => setDialogOpen(true)}
          className="inline-flex items-center gap-1 px-2 py-1 bg-slate-900 text-white text-xs rounded-md hover:bg-slate-800 transition-colors"
        >
          <Plus className="w-3 h-3" />
          Add
        </button>
      </div>

      {/* Languages List */}
      <div className="space-y-2">
        {languages.length === 0 ? (
          <div className="text-center py-6 px-4 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200">
            <Globe className="w-10 h-10 mx-auto mb-2 text-slate-300" />
            <p className="text-xs text-slate-500 mb-2">No languages yet</p>
            <button
              onClick={() => setDialogOpen(true)}
              className="text-xs text-blue-600 hover:text-blue-700 font-medium"
            >
              Add your first language
            </button>
          </div>
        ) : (
          languages.map((language) => (
            <LanguageCard
              key={language.id}
              language={language}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

      {/* Dialog */}
      <LanguageDialog
        isOpen={dialogOpen}
        onClose={handleClose}
        language={editingLanguage}
      />
    </div>
  );
}

export default LanguagesSection;

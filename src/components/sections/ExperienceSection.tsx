import { useState } from 'react';
import { Plus, Briefcase, Pencil, Trash2 } from 'lucide-react';
import useResumeStore from '@/store/resumeStore';
import ExperienceDialog from '../Dialogs/ExperienceDialog';
import { Experience } from '@/types';

function ExperienceSection(): JSX.Element {
  const { resumeData, deleteExperience } = useResumeStore();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);

  const handleEdit = (exp: Experience) => {
    setEditingExp(exp);
    setDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Delete this experience?')) deleteExperience(id);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setEditingExp(null);
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-indigo-500">
            <Briefcase className="h-3.5 w-3.5 text-white" />
          </div>
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Experience</h4>
          {resumeData.experience.length > 0 && (
            <span className="text-xs text-slate-500">({resumeData.experience.length})</span>
          )}
        </div>
        <button
          onClick={() => {
            setEditingExp(null);
            setDialogOpen(true);
          }}
          className="inline-flex items-center gap-1 rounded-md bg-slate-800 px-2 py-1 text-xs text-white transition-colors hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600"
        >
          <Plus className="h-3 w-3" />
          Add
        </button>
      </div>

      <div className="space-y-2">
        {resumeData.experience.length === 0 ? (
          <div className="rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-center dark:border-slate-700 dark:bg-slate-800/50">
            <p className="mb-1 text-xs text-slate-500">No experience yet</p>
            <button
              onClick={() => setDialogOpen(true)}
              className="text-xs font-medium text-blue-600 hover:text-blue-700"
            >
              Add your first experience
            </button>
          </div>
        ) : (
          resumeData.experience.map((exp) => (
            <div
              key={exp.id}
              className="group rounded-lg border border-slate-200 bg-white p-3 transition-all hover:shadow-sm dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {exp.title}
                  </p>
                  <p className="truncate text-xs text-slate-500">
                    {exp.company} · {exp.startDate}–{exp.endDate}
                  </p>
                </div>
                <div className="flex shrink-0 gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    onClick={() => handleEdit(exp)}
                    className="rounded p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-700 dark:hover:text-slate-200"
                    title="Edit"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(exp.id)}
                    className="rounded p-1 text-red-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30"
                    title="Delete"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <ExperienceDialog isOpen={dialogOpen} onClose={handleClose} experience={editingExp} />
    </div>
  );
}

export default ExperienceSection;

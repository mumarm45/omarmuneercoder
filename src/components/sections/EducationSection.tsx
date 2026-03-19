import { useState } from 'react';
import { Plus, GraduationCap, Pencil, Trash2 } from 'lucide-react';
import useResumeStore from '@/store/resumeStore';
import EducationDialog from '../Dialogs/EducationDialog';
import { Education } from '@/types';

function EducationSection(): JSX.Element {
  const { resumeData, deleteEducation } = useResumeStore();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEdu, setEditingEdu] = useState<Education | null>(null);

  const handleEdit = (edu: Education) => {
    setEditingEdu(edu);
    setDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Delete this education entry?')) deleteEducation(id);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setEditingEdu(null);
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-violet-500 to-purple-500">
            <GraduationCap className="h-3.5 w-3.5 text-white" />
          </div>
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Education</h4>
          {resumeData.education.length > 0 && (
            <span className="text-xs text-slate-500">({resumeData.education.length})</span>
          )}
        </div>
        <button
          onClick={() => {
            setEditingEdu(null);
            setDialogOpen(true);
          }}
          className="inline-flex items-center gap-1 rounded-md bg-slate-800 px-2 py-1 text-xs text-white transition-colors hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600"
        >
          <Plus className="h-3 w-3" />
          Add
        </button>
      </div>

      <div className="space-y-2">
        {resumeData.education.length === 0 ? (
          <div className="rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-center dark:border-slate-700 dark:bg-slate-800/50">
            <p className="mb-1 text-xs text-slate-500">No education yet</p>
            <button
              onClick={() => setDialogOpen(true)}
              className="text-xs font-medium text-blue-600 hover:text-blue-700"
            >
              Add your first entry
            </button>
          </div>
        ) : (
          resumeData.education.map((edu) => (
            <div
              key={edu.id}
              className="group rounded-lg border border-slate-200 bg-white p-3 transition-all hover:shadow-sm dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {edu.degree}
                  </p>
                  <p className="truncate text-xs text-slate-500">
                    {edu.school} · {edu.year}
                  </p>
                </div>
                <div className="flex shrink-0 gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    onClick={() => handleEdit(edu)}
                    className="rounded p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-700 dark:hover:text-slate-200"
                    title="Edit"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(edu.id)}
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

      <EducationDialog isOpen={dialogOpen} onClose={handleClose} education={editingEdu} />
    </div>
  );
}

export default EducationSection;

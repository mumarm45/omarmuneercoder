import { useState } from 'react';
import { Plus, Star, X, Check } from 'lucide-react';
import useResumeStore from '@/store/resumeStore';

function SkillsSection(): JSX.Element {
  const { resumeData, addSkill, updateSkill, deleteSkill } = useResumeStore();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');

  const startEdit = (index: number, value: string) => {
    setEditingIndex(index);
    setEditValue(value);
  };

  const commitEdit = () => {
    if (editingIndex !== null) {
      const trimmed = editValue.trim();
      if (trimmed) updateSkill(editingIndex, trimmed);
      setEditingIndex(null);
    }
  };

  const cancelEdit = () => setEditingIndex(null);

  const handleDelete = (index: number) => {
    deleteSkill(index);
    if (editingIndex === index) setEditingIndex(null);
  };

  const handleAdd = () => {
    addSkill();
    // Immediately start editing the new skill (it's appended at the end)
    setEditingIndex(resumeData.skills.length);
    setEditValue('New Skill');
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-emerald-500 to-teal-500">
            <Star className="h-3.5 w-3.5 text-white" />
          </div>
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Skills</h4>
          {resumeData.skills.length > 0 && (
            <span className="text-xs text-slate-500">({resumeData.skills.length})</span>
          )}
        </div>
        <button
          onClick={handleAdd}
          className="inline-flex items-center gap-1 rounded-md bg-slate-800 px-2 py-1 text-xs text-white transition-colors hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600"
        >
          <Plus className="h-3 w-3" />
          Add
        </button>
      </div>

      {resumeData.skills.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-center dark:border-slate-700 dark:bg-slate-800/50">
          <p className="mb-1 text-xs text-slate-500">No skills yet</p>
          <button
            onClick={handleAdd}
            className="text-xs font-medium text-blue-600 hover:text-blue-700"
          >
            Add your first skill
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {resumeData.skills.map((skill, index) => (
            <div key={index} className="group relative">
              {editingIndex === index ? (
                <div className="flex items-center gap-1">
                  <input
                    autoFocus
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') commitEdit();
                      if (e.key === 'Escape') cancelEdit();
                    }}
                    className="h-7 w-28 rounded-full border border-blue-400 bg-white px-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-slate-700 dark:text-slate-100"
                  />
                  <button
                    onClick={commitEdit}
                    className="rounded p-1 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30"
                    title="Save"
                  >
                    <Check className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="rounded p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                    title="Cancel"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-0.5 rounded-full bg-slate-100 pl-3 pr-1.5 py-1 dark:bg-slate-700">
                  <button
                    onClick={() => startEdit(index, skill)}
                    className="text-xs font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                    title="Click to edit"
                  >
                    {skill}
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="ml-1 rounded-full p-0.5 text-slate-400 opacity-0 transition-opacity hover:text-red-500 group-hover:opacity-100 dark:hover:text-red-400"
                    title="Delete"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SkillsSection;

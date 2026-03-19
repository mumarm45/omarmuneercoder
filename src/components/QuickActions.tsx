import { useState } from 'react';
import { Plus } from 'lucide-react';
import ExperienceDialog from './Dialogs/ExperienceDialog';
import EducationDialog from './Dialogs/EducationDialog';
import useResumeStore from '@store/resumeStore';

function QuickActions(): JSX.Element {
  const { addSkill } = useResumeStore();
  const [showExpDialog, setShowExpDialog] = useState<boolean>(false);
  const [showEduDialog, setShowEduDialog] = useState<boolean>(false);

  return (
    <>
      <div className="space-y-2 mt-4">
        <button
          onClick={() => setShowExpDialog(true)}
          className="w-full flex items-center gap-2 px-4 py-2 rounded-lg transition duration-200 text-slate-300 hover:text-white hover:bg-slate-700"
        >
          <Plus className="w-4 h-4" />
          Add Experience
        </button>
        <button
          onClick={() => setShowEduDialog(true)}
          className="w-full flex items-center gap-2 px-4 py-2 rounded-lg transition duration-200 text-slate-300 hover:text-white hover:bg-slate-700"
        >
          <Plus className="w-4 h-4" />
          Add Education
        </button>
        <button
          onClick={addSkill}
          className="w-full flex items-center gap-2 px-4 py-2 rounded-lg transition duration-200 text-slate-300 hover:text-white hover:bg-slate-700"
        >
          <Plus className="w-4 h-4" />
          Add Skill
        </button>
      </div>

      <ExperienceDialog
        isOpen={showExpDialog}
        onClose={() => setShowExpDialog(false)}
      />

      <EducationDialog
        isOpen={showEduDialog}
        onClose={() => setShowEduDialog(false)}
      />
    </>
  );
}

export default QuickActions;

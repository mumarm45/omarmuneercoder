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
      <div className="mt-4 space-y-2">
        <button
          onClick={() => setShowExpDialog(true)}
          className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-slate-300 transition duration-200 hover:bg-slate-700 hover:text-white"
        >
          <Plus className="h-4 w-4" />
          Add Experience
        </button>
        <button
          onClick={() => setShowEduDialog(true)}
          className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-slate-300 transition duration-200 hover:bg-slate-700 hover:text-white"
        >
          <Plus className="h-4 w-4" />
          Add Education
        </button>
        <button
          onClick={addSkill}
          className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-slate-300 transition duration-200 hover:bg-slate-700 hover:text-white"
        >
          <Plus className="h-4 w-4" />
          Add Skill
        </button>
      </div>

      <ExperienceDialog isOpen={showExpDialog} onClose={() => setShowExpDialog(false)} />

      <EducationDialog isOpen={showEduDialog} onClose={() => setShowEduDialog(false)} />
    </>
  );
}

export default QuickActions;

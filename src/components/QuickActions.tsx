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
      <div className="card">
        <h2 className="text-lg font-semibold mb-4 text-slate-800">Quick Actions</h2>
        <div className="space-y-2">
          <button
            onClick={() => setShowExpDialog(true)}
            className="w-full flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition duration-200"
          >
            <Plus className="w-4 h-4" />
            Add Experience
          </button>
          <button
            onClick={() => setShowEduDialog(true)}
            className="w-full flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition duration-200"
          >
            <Plus className="w-4 h-4" />
            Add Education
          </button>
          <button
            onClick={addSkill}
            className="w-full flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition duration-200"
          >
            <Plus className="w-4 h-4" />
            Add Skill
          </button>
        </div>
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

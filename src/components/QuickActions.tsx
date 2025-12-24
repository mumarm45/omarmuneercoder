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
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Quick Actions</h2>
        <div className="space-y-2">
          <button
            onClick={() => setShowExpDialog(true)}
            className="w-full flex items-center gap-2 px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition duration-200"
          >
            <Plus className="w-4 h-4" />
            Add Experience
          </button>
          <button
            onClick={() => setShowEduDialog(true)}
            className="w-full flex items-center gap-2 px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg transition duration-200"
          >
            <Plus className="w-4 h-4" />
            Add Education
          </button>
          <button
            onClick={addSkill}
            className="w-full flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition duration-200"
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

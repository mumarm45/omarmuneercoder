import { useState } from 'react';
import { Edit2 } from 'lucide-react';
import useResumeStore from '@store/resumeStore';
import { TEMPLATE_STYLES } from '@utils/constants';
import PersonalInfoDialog from '../Dialogs/PersonalInfoDialog';

function PersonalInfoSection(): JSX.Element {
  const { resumeData, selectedTemplate } = useResumeStore();
  const [showDialog, setShowDialog] = useState<boolean>(false);
  
  const style = TEMPLATE_STYLES[selectedTemplate];

  return (
    <>
      <div className={`${style.header} p-8 rounded-lg mb-6 relative group`}>
        <button
          onClick={() => setShowDialog(true)}
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 p-2 bg-white/20 hover:bg-white/30 rounded transition"
        >
          <Edit2 className="w-4 h-4" />
        </button>
        <h1 className="text-4xl font-bold mb-2">{resumeData.personalInfo.name}</h1>
        <p className="text-xl mb-4">{resumeData.personalInfo.title}</p>
        <div className="flex flex-wrap gap-4 text-sm">
          <span>{resumeData.personalInfo.email}</span>
          <span>{resumeData.personalInfo.phone}</span>
          <span>{resumeData.personalInfo.location}</span>
          <span>{resumeData.personalInfo.linkedin}</span>
        </div>
      </div>

      <PersonalInfoDialog 
        isOpen={showDialog} 
        onClose={() => setShowDialog(false)} 
      />
    </>
  );
}

export default PersonalInfoSection;

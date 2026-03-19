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
      <div className={`${style.header} group relative mb-6 rounded-lg p-8`}>
        <button
          onClick={() => setShowDialog(true)}
          className="absolute right-4 top-4 rounded bg-white/20 p-2 opacity-0 transition hover:bg-white/30 group-hover:opacity-100"
        >
          <Edit2 className="h-4 w-4" />
        </button>
        <h1 className="mb-2 text-4xl font-bold">{resumeData.personalInfo.name}</h1>
        <p className="mb-4 text-xl">{resumeData.personalInfo.title}</p>
        <div className="flex flex-wrap gap-4 text-sm">
          <span>{resumeData.personalInfo.email}</span>
          <span>{resumeData.personalInfo.phone}</span>
          <span>{resumeData.personalInfo.location}</span>
          <span>{resumeData.personalInfo.linkedin}</span>
        </div>
      </div>

      <PersonalInfoDialog isOpen={showDialog} onClose={() => setShowDialog(false)} />
    </>
  );
}

export default PersonalInfoSection;

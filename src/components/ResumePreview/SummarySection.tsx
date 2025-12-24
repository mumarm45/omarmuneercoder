import { useState } from 'react';
import { Edit2 } from 'lucide-react';
import useResumeStore from '@store/resumeStore';
import { TEMPLATE_STYLES } from '@utils/constants';
import SummaryDialog from '../Dialogs/SummaryDialog';

function SummarySection(): JSX.Element {
  const { resumeData, selectedTemplate } = useResumeStore();
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const style = TEMPLATE_STYLES[selectedTemplate];

  return (
    <>
      <div className="mb-6 relative group">
        <h2 className={`text-2xl font-bold mb-3 ${style.accent}`}>
          Professional Summary
        </h2>
        <button
          onClick={() => setShowDialog(true)}
          className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 p-2 bg-gray-100 hover:bg-gray-200 rounded transition"
        >
          <Edit2 className="w-4 h-4 text-gray-600" />
        </button>
        <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>
      </div>

      <SummaryDialog 
        isOpen={showDialog} 
        onClose={() => setShowDialog(false)} 
      />
    </>
  );
}

export default SummarySection;

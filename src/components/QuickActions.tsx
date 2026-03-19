import { useState } from 'react';
import { User, FileText, Tag } from 'lucide-react';
import PersonalInfoDialog from './Dialogs/PersonalInfoDialog';
import SummaryDialog from './Dialogs/SummaryDialog';
import SectionLabelsDialog from './Dialogs/SectionLabelsDialog';

function QuickActions(): JSX.Element {
  const [showPersonalDialog, setShowPersonalDialog] = useState(false);
  const [showSummaryDialog, setShowSummaryDialog] = useState(false);
  const [showLabelsDialog, setShowLabelsDialog] = useState(false);

  const btnClass =
    'flex w-full items-center gap-2 rounded-lg px-4 py-2 text-slate-600 transition duration-200 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white';

  return (
    <>
      <div className="mt-4 space-y-2">
        <button onClick={() => setShowPersonalDialog(true)} className={btnClass}>
          <User className="h-4 w-4" />
          Edit Heading
        </button>
        <button onClick={() => setShowSummaryDialog(true)} className={btnClass}>
          <FileText className="h-4 w-4" />
          Edit Summary
        </button>
        <button onClick={() => setShowLabelsDialog(true)} className={btnClass}>
          <Tag className="h-4 w-4" />
          Edit Section Labels
        </button>
      </div>

      <PersonalInfoDialog
        isOpen={showPersonalDialog}
        onClose={() => setShowPersonalDialog(false)}
      />
      <SummaryDialog isOpen={showSummaryDialog} onClose={() => setShowSummaryDialog(false)} />
      <SectionLabelsDialog isOpen={showLabelsDialog} onClose={() => setShowLabelsDialog(false)} />
    </>
  );
}

export default QuickActions;

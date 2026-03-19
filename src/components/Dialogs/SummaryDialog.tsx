import { useState } from 'react';
import Dialog from '../Dialog';
import useResumeStore from '@store/resumeStore';

interface SummaryDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

function SummaryDialog({ isOpen, onClose }: SummaryDialogProps): JSX.Element {
  const { resumeData, updateSummary } = useResumeStore();
  const [summary, setSummary] = useState<string>(resumeData.summary);

  const handleSave = (): void => {
    updateSummary(summary);
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Edit Professional Summary" size="md">
      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Professional Summary *
          </label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
            rows={6}
            placeholder="Write a brief summary of your professional background, skills, and career objectives..."
          />
          <p className="mt-1 text-sm text-gray-500">
            Tip: Keep it concise and highlight your key strengths and achievements
          </p>
        </div>

        <div className="flex justify-end gap-3 border-t pt-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-6 py-2 text-gray-700 transition hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="rounded-lg bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </Dialog>
  );
}

export default SummaryDialog;

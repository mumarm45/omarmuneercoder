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
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Professional Summary *
          </label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={6}
            placeholder="Write a brief summary of your professional background, skills, and career objectives..."
          />
          <p className="text-sm text-gray-500 mt-1">
            Tip: Keep it concise and highlight your key strengths and achievements
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </Dialog>
  );
}

export default SummaryDialog;

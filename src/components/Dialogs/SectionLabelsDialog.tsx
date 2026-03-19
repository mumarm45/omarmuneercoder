import { useState, useEffect } from 'react';
import Dialog from '../Dialog';
import useResumeStore from '@store/resumeStore';
import { SectionLabels, DEFAULT_SECTION_LABELS } from '../../types';

interface SectionLabelsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const SECTION_FIELDS: { key: keyof SectionLabels; label: string }[] = [
  { key: 'summary', label: 'Summary' },
  { key: 'experience', label: 'Experience' },
  { key: 'education', label: 'Education' },
  { key: 'skills', label: 'Skills' },
  { key: 'projects', label: 'Projects' },
  { key: 'certifications', label: 'Certifications' },
  { key: 'languages', label: 'Languages' },
  { key: 'awards', label: 'Awards' },
];

function SectionLabelsDialog({ isOpen, onClose }: SectionLabelsDialogProps): JSX.Element {
  const { resumeData, updateSectionLabel } = useResumeStore();
  const [labels, setLabels] = useState<SectionLabels>({
    ...DEFAULT_SECTION_LABELS,
    ...resumeData.sectionLabels,
  });

  useEffect(() => {
    if (isOpen) {
      setLabels({ ...DEFAULT_SECTION_LABELS, ...resumeData.sectionLabels });
    }
  }, [isOpen]);

  const handleSave = () => {
    SECTION_FIELDS.forEach(({ key }) => {
      const value = labels[key].trim() || DEFAULT_SECTION_LABELS[key];
      updateSectionLabel(key, value);
    });
    onClose();
  };

  const handleReset = () => {
    setLabels({ ...DEFAULT_SECTION_LABELS });
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Edit Section Labels" size="md">
      <div className="space-y-4">
        <p className="text-sm text-gray-500">
          Customize the heading text for each section on your resume.
        </p>

        <div className="grid grid-cols-2 gap-3">
          {SECTION_FIELDS.map(({ key, label }) => (
            <div key={key}>
              <label className="mb-1 block text-xs font-medium text-gray-600">{label}</label>
              <input
                type="text"
                value={labels[key]}
                onChange={(e) => setLabels({ ...labels, [key]: e.target.value })}
                placeholder={DEFAULT_SECTION_LABELS[key]}
                className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t pt-4">
          <button
            onClick={handleReset}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Reset to defaults
          </button>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-5 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="rounded-lg bg-blue-600 px-5 py-2 text-sm text-white transition hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default SectionLabelsDialog;

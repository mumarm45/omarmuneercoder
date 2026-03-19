import { useState, useEffect } from 'react';
import Dialog from '../Dialog';
import useResumeStore from '@store/resumeStore';
import { Experience } from '../../types';

interface ExperienceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  experience?: Experience | null;
}

interface ExperienceFormData {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

function ExperienceDialog({
  isOpen,
  onClose,
  experience = null,
}: ExperienceDialogProps): JSX.Element {
  const { addExperience, updateExperience } = useResumeStore();
  const [formData, setFormData] = useState<ExperienceFormData>({
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
  });

  useEffect(() => {
    if (experience) {
      setFormData({
        title: experience.title,
        company: experience.company,
        location: experience.location,
        startDate: experience.startDate,
        endDate: experience.endDate,
        description: experience.description,
      });
    } else {
      setFormData({
        title: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        description: '',
      });
    }
  }, [experience, isOpen]);

  const handleChange = (field: keyof ExperienceFormData, value: string): void => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = (): void => {
    if (experience) {
      // Update existing
      Object.keys(formData).forEach((key) => {
        if (key !== 'id') {
          updateExperience(
            experience.id,
            key as keyof Experience,
            formData[key as keyof ExperienceFormData]
          );
        }
      });
    } else {
      // Add new
      const newExp: Experience = {
        id: Date.now(),
        ...formData,
      };
      addExperience(newExp);
    }
    onClose();
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={experience ? 'Edit Experience' : 'Add Experience'}
      size="lg"
    >
      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Job Title *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
            placeholder="Senior Software Engineer"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Company *</label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => handleChange('company', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              placeholder="Tech Corp"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              placeholder="San Francisco, CA"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Start Date *</label>
            <input
              type="text"
              value={formData.startDate}
              onChange={(e) => handleChange('startDate', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              placeholder="Jan 2021"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">End Date</label>
            <input
              type="text"
              value={formData.endDate}
              onChange={(e) => handleChange('endDate', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              placeholder="Present"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Description *</label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
            rows={8}
            placeholder="• Led development of scalable web applications&#10;• Mentored junior developers&#10;• Improved system performance by 40%"
          />
          <p className="mt-1 text-sm text-gray-500">
            Tip: Start each bullet point with • for better formatting
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
            {experience ? 'Save Changes' : 'Add Experience'}
          </button>
        </div>
      </div>
    </Dialog>
  );
}

export default ExperienceDialog;

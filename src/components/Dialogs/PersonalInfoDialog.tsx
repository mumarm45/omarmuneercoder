import { useState, useEffect } from 'react';
import Dialog from '../Dialog';
import useResumeStore from '@store/resumeStore';
import { PersonalInfo } from '../../types';

interface PersonalInfoDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

function PersonalInfoDialog({ isOpen, onClose }: PersonalInfoDialogProps): JSX.Element {
  const { resumeData, updatePersonalInfo } = useResumeStore();
  const [formData, setFormData] = useState<PersonalInfo>(resumeData.personalInfo);

  useEffect(() => {
    if (isOpen) setFormData(resumeData.personalInfo);
  }, [isOpen]);

  const handleChange = (field: keyof PersonalInfo, value: string): void => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = (): void => {
    Object.keys(formData).forEach((key) => {
      updatePersonalInfo(key as keyof PersonalInfo, formData[key as keyof PersonalInfo] ?? '');
    });
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Edit Personal Information" size="md">
      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Full Name *</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Job Title *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
            placeholder="Software Engineer"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Phone *</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              placeholder="+1 (555) 123-4567"
            />
          </div>
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

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">LinkedIn</label>
          <input
            type="text"
            value={formData.linkedin}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
            placeholder="linkedin.com/in/johndoe"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Portfolio/Website</label>
          <input
            type="text"
            value={formData.portfolio}
            onChange={(e) => handleChange('portfolio', e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
            placeholder="johndoe.dev"
          />
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

export default PersonalInfoDialog;

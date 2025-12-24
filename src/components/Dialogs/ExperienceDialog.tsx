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

function ExperienceDialog({ isOpen, onClose, experience = null }: ExperienceDialogProps): JSX.Element {
  const { addExperience, updateExperience } = useResumeStore();
  const [formData, setFormData] = useState<ExperienceFormData>({
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  useEffect(() => {
    if (experience) {
      setFormData({
        title: experience.title,
        company: experience.company,
        location: experience.location,
        startDate: experience.startDate,
        endDate: experience.endDate,
        description: experience.description
      });
    } else {
      setFormData({
        title: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        description: ''
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
          updateExperience(experience.id, key as keyof Experience, formData[key as keyof ExperienceFormData]);
        }
      });
    } else {
      // Add new
      const newExp: Experience = {
        id: Date.now(),
        ...formData
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
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Senior Software Engineer"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company *
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => handleChange('company', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Tech Corp"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="San Francisco, CA"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date *
            </label>
            <input
              type="text"
              value={formData.startDate}
              onChange={(e) => handleChange('startDate', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Jan 2021"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="text"
              value={formData.endDate}
              onChange={(e) => handleChange('endDate', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Present"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={8}
            placeholder="• Led development of scalable web applications&#10;• Mentored junior developers&#10;• Improved system performance by 40%"
          />
          <p className="text-sm text-gray-500 mt-1">
            Tip: Start each bullet point with • for better formatting
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
            {experience ? 'Save Changes' : 'Add Experience'}
          </button>
        </div>
      </div>
    </Dialog>
  );
}

export default ExperienceDialog;

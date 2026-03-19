import { useState, useEffect } from 'react';
import useResumeStore from '@store/resumeStore';
import { Education } from '../../types';
import Dialog from '../Dialog';

interface EducationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  education?: Education | null;
}

interface EducationFormData {
  degree: string;
  school: string;
  location: string;
  year: string;
}

function EducationDialog({ isOpen, onClose, education = null }: EducationDialogProps): JSX.Element {
  const { addEducation, updateEducation } = useResumeStore();
  const [formData, setFormData] = useState<EducationFormData>({
    degree: '',
    school: '',
    location: '',
    year: '',
  });

  useEffect(() => {
    if (education) {
      setFormData({
        degree: education.degree,
        school: education.school,
        location: education.location,
        year: education.year,
      });
    } else {
      setFormData({
        degree: '',
        school: '',
        location: '',
        year: '',
      });
    }
  }, [education, isOpen]);

  const handleChange = (field: keyof EducationFormData, value: string): void => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = (): void => {
    if (education) {
      // Update existing
      Object.keys(formData).forEach((key) => {
        if (key !== 'id') {
          updateEducation(
            education.id,
            key as keyof Education,
            formData[key as keyof EducationFormData]
          );
        }
      });
    } else {
      // Add new
      const newEdu: Education = {
        id: Date.now(),
        ...formData,
      };
      addEducation(newEdu);
    }
    onClose();
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={education ? 'Edit Education' : 'Add Education'}
      size="md"
    >
      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Degree *</label>
          <input
            type="text"
            value={formData.degree}
            onChange={(e) => handleChange('degree', e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
            placeholder="Bachelor of Science in Computer Science"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            School/University *
          </label>
          <input
            type="text"
            value={formData.school}
            onChange={(e) => handleChange('school', e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
            placeholder="University of Technology"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              placeholder="Boston, MA"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Graduation Year *
            </label>
            <input
              type="text"
              value={formData.year}
              onChange={(e) => handleChange('year', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              placeholder="2019"
            />
          </div>
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
            {education ? 'Save Changes' : 'Add Education'}
          </button>
        </div>
      </div>
    </Dialog>
  );
}

export default EducationDialog;

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
    year: ''
  });

  useEffect(() => {
    if (education) {
      setFormData({
        degree: education.degree,
        school: education.school,
        location: education.location,
        year: education.year
      });
    } else {
      setFormData({
        degree: '',
        school: '',
        location: '',
        year: ''
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
          updateEducation(education.id, key as keyof Education, formData[key as keyof EducationFormData]);
        }
      });
    } else {
      // Add new
      const newEdu: Education = {
        id: Date.now(),
        ...formData
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
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Degree *
          </label>
          <input
            type="text"
            value={formData.degree}
            onChange={(e) => handleChange('degree', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Bachelor of Science in Computer Science"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            School/University *
          </label>
          <input
            type="text"
            value={formData.school}
            onChange={(e) => handleChange('school', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="University of Technology"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Boston, MA"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Graduation Year *
            </label>
            <input
              type="text"
              value={formData.year}
              onChange={(e) => handleChange('year', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="2019"
            />
          </div>
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
            {education ? 'Save Changes' : 'Add Education'}
          </button>
        </div>
      </div>
    </Dialog>
  );
}

export default EducationDialog;

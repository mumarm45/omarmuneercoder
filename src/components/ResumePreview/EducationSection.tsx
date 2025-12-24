import { useState } from 'react';
import { Edit2, Trash2, GripVertical } from 'lucide-react';
import useResumeStore from '@store/resumeStore';
import { TEMPLATE_STYLES } from '@utils/constants';
import EducationDialog from '../Dialogs/EducationDialog';
import { Education } from '../../types';

function EducationSection(): JSX.Element {
  const { resumeData, selectedTemplate, deleteEducation, reorderEducation } = useResumeStore();
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [editingEdu, setEditingEdu] = useState<Education | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  
  const style = TEMPLATE_STYLES[selectedTemplate];

  const handleEdit = (edu: Education): void => {
    setEditingEdu(edu);
    setShowDialog(true);
  };

  const handleClose = (): void => {
    setShowDialog(false);
    setEditingEdu(null);
  };

  const handleDragStart = (e: React.DragEvent, index: number): void => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number): void => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    reorderEducation(draggedIndex, index);
    setDraggedIndex(index);
  };

  const handleDragEnd = (): void => {
    setDraggedIndex(null);
  };

  return (
    <>
      <div className="mb-6">
        <h2 className={`text-2xl font-bold mb-4 ${style.accent}`}>Education</h2>
        {resumeData.education.map((edu, index) => (
          <div
            key={edu.id}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
            className={`${style.section} pl-4 mb-4 relative group cursor-move ${
              draggedIndex === index ? 'opacity-50' : ''
            }`}
          >
            <div className="absolute -left-6 top-2 opacity-0 group-hover:opacity-100">
              <GripVertical className="w-5 h-5 text-gray-400" />
            </div>

            <div className="absolute -top-2 right-0 opacity-0 group-hover:opacity-100 flex gap-2">
              <button
                onClick={() => handleEdit(edu)}
                className="p-2 bg-blue-100 hover:bg-blue-200 rounded transition"
              >
                <Edit2 className="w-4 h-4 text-blue-600" />
              </button>
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to delete this education?')) {
                    deleteEducation(edu.id);
                  }
                }}
                className="p-2 bg-red-100 hover:bg-red-200 rounded transition"
              >
                <Trash2 className="w-4 h-4 text-red-600" />
              </button>
            </div>

            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{edu.degree}</h3>
                <p className="text-gray-600">
                  {edu.school} • {edu.location}
                </p>
              </div>
              <span className="text-sm text-gray-500">{edu.year}</span>
            </div>
          </div>
        ))}
      </div>

      <EducationDialog 
        isOpen={showDialog} 
        onClose={handleClose}
        education={editingEdu}
      />
    </>
  );
}

export default EducationSection;

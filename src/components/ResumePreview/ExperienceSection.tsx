import { useState } from 'react';
import { Edit2, Trash2, GripVertical } from 'lucide-react';
import useResumeStore from '@store/resumeStore';
import { TEMPLATE_STYLES } from '@utils/constants';
import ExperienceDialog from '../Dialogs/ExperienceDialog';
import { Experience } from '../../types';

function ExperienceSection(): JSX.Element {
  const { resumeData, selectedTemplate, deleteExperience, reorderExperience } = useResumeStore();
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  
  const style = TEMPLATE_STYLES[selectedTemplate];

  const handleEdit = (exp: Experience): void => {
    setEditingExp(exp);
    setShowDialog(true);
  };

  const handleClose = (): void => {
    setShowDialog(false);
    setEditingExp(null);
  };

  const handleDragStart = (e: React.DragEvent, index: number): void => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number): void => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    reorderExperience(draggedIndex, index);
    setDraggedIndex(index);
  };

  const handleDragEnd = (): void => {
    setDraggedIndex(null);
  };

  return (
    <>
      <div className="mb-6">
        <h2 className={`text-2xl font-bold mb-4 ${style.accent}`}>Experience</h2>
        {resumeData.experience.map((exp, index) => (
          <div
            key={exp.id}
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
                onClick={() => handleEdit(exp)}
                className="p-2 bg-blue-100 hover:bg-blue-200 rounded transition"
              >
                <Edit2 className="w-4 h-4 text-blue-600" />
              </button>
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to delete this experience?')) {
                    deleteExperience(exp.id);
                  }
                }}
                className="p-2 bg-red-100 hover:bg-red-200 rounded transition"
              >
                <Trash2 className="w-4 h-4 text-red-600" />
              </button>
            </div>

            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{exp.title}</h3>
                <p className="text-gray-600">
                  {exp.company} • {exp.location}
                </p>
              </div>
              <span className="text-sm text-gray-500">
                {exp.startDate} - {exp.endDate}
              </span>
            </div>
            <p className="text-gray-700 whitespace-pre-line">{exp.description}</p>
          </div>
        ))}
      </div>

      <ExperienceDialog 
        isOpen={showDialog} 
        onClose={handleClose}
        experience={editingExp}
      />
    </>
  );
}

export default ExperienceSection;

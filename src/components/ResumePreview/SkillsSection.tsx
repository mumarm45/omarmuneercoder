import { useState } from 'react';
import { Edit2, Trash2, Plus, GripVertical } from 'lucide-react';
import useResumeStore from '@store/resumeStore';
import { TEMPLATE_STYLES } from '@utils/constants';
import Dialog from '../Dialog';

function SkillsSection(): JSX.Element {
  const { resumeData, selectedTemplate, updateSkill, deleteSkill, addSkill } = useResumeStore();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editSkills, setEditSkills] = useState<string[]>([...resumeData.skills]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  
  const style = TEMPLATE_STYLES[selectedTemplate];

  const handleOpenDialog = (): void => {
    setEditSkills([...resumeData.skills]);
    setIsEditing(true);
  };

  const handleSave = (): void => {
    // Update all skills
    editSkills.forEach((skill, index) => {
      if (index < resumeData.skills.length) {
        updateSkill(index, skill);
      } else {
        addSkill();
        updateSkill(resumeData.skills.length, skill);
      }
    });
    
    // Remove extra skills if list got shorter
    if (editSkills.length < resumeData.skills.length) {
      for (let i = resumeData.skills.length - 1; i >= editSkills.length; i--) {
        deleteSkill(i);
      }
    }
    
    setIsEditing(false);
  };

  const handleSkillChange = (index: number, value: string): void => {
    const newSkills = [...editSkills];
    newSkills[index] = value;
    setEditSkills(newSkills);
  };

  const handleDeleteSkill = (index: number): void => {
    const newSkills = editSkills.filter((_, i) => i !== index);
    setEditSkills(newSkills);
  };

  const handleAddSkill = (): void => {
    setEditSkills([...editSkills, 'New Skill']);
  };

  const handleDragStart = (e: React.DragEvent, index: number): void => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number): void => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newSkills = [...editSkills];
    const [removed] = newSkills.splice(draggedIndex, 1);
    newSkills.splice(index, 0, removed);
    
    setEditSkills(newSkills);
    setDraggedIndex(index);
  };

  const handleDragEnd = (): void => {
    setDraggedIndex(null);
  };

  return (
    <>
      <div>
        <h2 className={`text-2xl font-bold mb-4 ${style.accent}`}>Skills</h2>
        <div className="relative group">
          <button
            onClick={handleOpenDialog}
            className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 p-2 bg-gray-100 hover:bg-gray-200 rounded transition"
          >
            <Edit2 className="w-4 h-4 text-gray-600" />
          </button>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <Dialog isOpen={isEditing} onClose={() => setIsEditing(false)} title="Edit Skills" size="md">
        <div className="space-y-4">
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {editSkills.map((skill, index) => (
              <div
                key={index}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                className={`flex gap-2 items-center ${
                  draggedIndex === index ? 'opacity-50' : ''
                }`}
              >
                <div className="cursor-move">
                  <GripVertical className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => handleSkillChange(index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Skill name"
                />
                <button
                  onClick={() => handleDeleteSkill(index)}
                  className="p-2 bg-red-100 hover:bg-red-200 rounded transition"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={handleAddSkill}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition"
          >
            <Plus className="w-4 h-4" />
            Add Skill
          </button>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              onClick={() => {
                setEditSkills([...resumeData.skills]);
                setIsEditing(false);
              }}
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
    </>
  );
}

export default SkillsSection;

import { useState } from 'react';
import { X, Plus, Trash2, ExternalLink } from 'lucide-react';
import { Project } from '@/types';
import useResumeStore from '@/store/resumeStore';

interface ProjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  project?: Project;
  onSave?: (project: Project) => void;
}

function ProjectDialog({ isOpen, onClose, project }: ProjectDialogProps): JSX.Element | null {
  const { addProject, updateProject } = useResumeStore();
  const [formData, setFormData] = useState<Project>(
    project || {
      id: Date.now(),
      name: '',
      description: '',
      technologies: [],
      link: '',
      github: '',
      startDate: '',
      endDate: '',
      highlights: [''],
    }
  );
  const [newTech, setNewTech] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Clean up empty highlights
    const cleanedData = {
      ...formData,
      highlights: formData.highlights?.filter((h) => h.trim() !== ''),
    };

    if (project) {
      updateProject(cleanedData);
    } else {
      addProject(cleanedData);
    }
    onClose();
  };

  const addTechnology = () => {
    if (newTech.trim()) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, newTech.trim()],
      });
      setNewTech('');
    }
  };

  const removeTechnology = (index: number) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((_, i) => i !== index),
    });
  };

  const addHighlight = () => {
    setFormData({
      ...formData,
      highlights: [...(formData.highlights || []), ''],
    });
  };

  const updateHighlight = (index: number, value: string) => {
    const newHighlights = [...(formData.highlights || [])];
    newHighlights[index] = value;
    setFormData({ ...formData, highlights: newHighlights });
  };

  const removeHighlight = (index: number) => {
    setFormData({
      ...formData,
      highlights: formData.highlights?.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 p-6">
          <h2 className="text-2xl font-bold text-slate-900">
            {project ? 'Edit Project' : 'Add Project'}
          </h2>
          <button onClick={onClose} className="rounded-lg p-2 transition-colors hover:bg-slate-100">
            <X className="h-5 w-5 text-slate-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-h-[calc(90vh-140px)] overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Project Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Project Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., E-commerce Platform"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of the project..."
                rows={4}
                className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900"
                required
              />
            </div>

            {/* Technologies */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Technologies Used
              </label>
              <div className="mb-3 flex gap-2">
                <input
                  type="text"
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                  placeholder="e.g., React, Node.js"
                  className="flex-1 rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
                <button
                  type="button"
                  onClick={addTechnology}
                  className="rounded-lg bg-slate-900 px-4 py-2 text-white transition-colors hover:bg-slate-800"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTechnology(index)}
                      className="hover:text-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  <ExternalLink className="mr-1 inline h-4 w-4" />
                  Live Demo URL
                </label>
                <input
                  type="url"
                  value={formData.link || ''}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  placeholder="https://example.com"
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  GitHub Repository
                </label>
                <input
                  type="url"
                  value={formData.github || ''}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  placeholder="https://github.com/username/repo"
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>
            </div>

            {/* Dates */}
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Start Date</label>
                <input
                  type="text"
                  value={formData.startDate || ''}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  placeholder="e.g., Jan 2023"
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">End Date</label>
                <input
                  type="text"
                  value={formData.endDate || ''}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  placeholder="e.g., Present"
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>
            </div>

            {/* Key Highlights */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Key Highlights
              </label>
              <div className="space-y-2">
                {formData.highlights?.map((highlight, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={highlight}
                      onChange={(e) => updateHighlight(index, e.target.value)}
                      placeholder="Achievement or feature..."
                      className="flex-1 rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                    <button
                      type="button"
                      onClick={() => removeHighlight(index)}
                      className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addHighlight}
                className="mt-2 flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900"
              >
                <Plus className="h-4 w-4" />
                Add Highlight
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 flex justify-end gap-3 border-t border-slate-200 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-6 py-2.5 text-slate-700 transition-colors hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-slate-900 px-6 py-2.5 text-white transition-colors hover:bg-slate-800"
            >
              {project ? 'Update Project' : 'Add Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectDialog;

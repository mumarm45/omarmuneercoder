import { useState } from 'react';
import { Plus, FolderOpen } from 'lucide-react';
import useResumeStore from '@/store/resumeStore';
import ProjectCard from '../cards/ProjectCard';
import ProjectDialog from '../Dialogs/ProjectDialog';
import { Project } from '@/types';

function ProjectsSection(): JSX.Element {
  const { resumeData, deleteProject } = useResumeStore();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>();

  const projects = resumeData.projects || [];

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteProject(id);
    }
  };

  const handleClose = () => {
    setDialogOpen(false);
    setEditingProject(undefined);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-pink-500 to-rose-500 rounded-md flex items-center justify-center">
            <FolderOpen className="w-3.5 h-3.5 text-white" />
          </div>
          <h4 className="text-sm font-semibold text-slate-900">Projects</h4>
          {projects.length > 0 && (
            <span className="text-xs text-slate-500">({projects.length})</span>
          )}
        </div>

        <button
          onClick={() => setDialogOpen(true)}
          className="inline-flex items-center gap-1 px-2 py-1 bg-slate-900 text-white text-xs rounded-md hover:bg-slate-800 transition-colors"
        >
          <Plus className="w-3 h-3" />
          Add
        </button>
      </div>

      {/* Projects List */}
      <div className="space-y-2">
        {projects.length === 0 ? (
          <div className="text-center py-6 px-4 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200">
            <FolderOpen className="w-10 h-10 mx-auto mb-2 text-slate-300" />
            <p className="text-xs text-slate-500 mb-2">No projects yet</p>
            <button
              onClick={() => setDialogOpen(true)}
              className="text-xs text-blue-600 hover:text-blue-700 font-medium"
            >
              Add your first project
            </button>
          </div>
        ) : (
          projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

      {/* Dialog */}
      <ProjectDialog
        isOpen={dialogOpen}
        onClose={handleClose}
        project={editingProject}
      />
    </div>
  );
}

export default ProjectsSection;

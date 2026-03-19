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
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-pink-500 to-rose-500">
            <FolderOpen className="h-3.5 w-3.5 text-white" />
          </div>
          <h4 className="text-sm font-semibold text-slate-900">Projects</h4>
          {projects.length > 0 && (
            <span className="text-xs text-slate-500">({projects.length})</span>
          )}
        </div>

        <button
          onClick={() => setDialogOpen(true)}
          className="inline-flex items-center gap-1 rounded-md bg-slate-900 px-2 py-1 text-xs text-white transition-colors hover:bg-slate-800"
        >
          <Plus className="h-3 w-3" />
          Add
        </button>
      </div>

      {/* Projects List */}
      <div className="space-y-2">
        {projects.length === 0 ? (
          <div className="rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-center">
            <FolderOpen className="mx-auto mb-2 h-10 w-10 text-slate-300" />
            <p className="mb-2 text-xs text-slate-500">No projects yet</p>
            <button
              onClick={() => setDialogOpen(true)}
              className="text-xs font-medium text-blue-600 hover:text-blue-700"
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
      <ProjectDialog isOpen={dialogOpen} onClose={handleClose} project={editingProject} />
    </div>
  );
}

export default ProjectsSection;

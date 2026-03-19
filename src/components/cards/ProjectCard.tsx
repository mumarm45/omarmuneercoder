import { ExternalLink, Github, Calendar, Pencil, Trash2 } from 'lucide-react';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: number) => void;
}

function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps): JSX.Element {
  return (
    <div className="group rounded-lg border border-slate-200 bg-white p-4 transition-all hover:shadow-md">
      {/* Header */}
      <div className="mb-3 flex items-start justify-between">
        <div className="flex-1">
          <h4 className="mb-1 font-semibold text-slate-900">{project.name}</h4>
          {(project.startDate || project.endDate) && (
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <Calendar className="h-3 w-3" />
              <span>
                {project.startDate} {project.endDate && `- ${project.endDate}`}
              </span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={() => onEdit(project)}
            className="rounded p-1.5 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
            title="Edit"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(project.id)}
            className="rounded p-1.5 text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Description */}
      <p className="mb-3 line-clamp-2 text-sm text-slate-600">{project.description}</p>

      {/* Technologies */}
      {project.technologies && project.technologies.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech, index) => (
            <span
              key={index}
              className="inline-block rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="inline-block px-2 py-0.5 text-xs text-slate-500">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>
      )}

      {/* Links */}
      <div className="flex gap-3">
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-blue-600 transition-colors hover:text-blue-700"
          >
            <ExternalLink className="h-3 w-3" />
            <span>Live Demo</span>
          </a>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-slate-600 transition-colors hover:text-slate-900"
          >
            <Github className="h-3 w-3" />
            <span>Code</span>
          </a>
        )}
      </div>
    </div>
  );
}

export default ProjectCard;

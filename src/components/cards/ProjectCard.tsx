import { ExternalLink, Github, Calendar, Pencil, Trash2 } from 'lucide-react';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: number) => void;
}

function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps): JSX.Element {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-all group">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-semibold text-slate-900 mb-1">{project.name}</h4>
          {(project.startDate || project.endDate) && (
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <Calendar className="w-3 h-3" />
              <span>
                {project.startDate} {project.endDate && `- ${project.endDate}`}
              </span>
            </div>
          )}
        </div>
        
        {/* Actions */}
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(project)}
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
            title="Edit"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(project.id)}
            className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-600 mb-3 line-clamp-2">{project.description}</p>

      {/* Technologies */}
      {project.technologies && project.technologies.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.technologies.slice(0, 4).map((tech, index) => (
            <span
              key={index}
              className="inline-block px-2 py-0.5 bg-slate-100 text-slate-700 text-xs rounded-full"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="inline-block px-2 py-0.5 text-slate-500 text-xs">
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
            className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            <span>Live Demo</span>
          </a>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 transition-colors"
          >
            <Github className="w-3 h-3" />
            <span>Code</span>
          </a>
        )}
      </div>
    </div>
  );
}

export default ProjectCard;

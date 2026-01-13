import { ExternalLink, Github, FolderOpen } from 'lucide-react';
import { Project } from '@/types';
import { TEMPLATE_STYLES } from '@/utils/constants';
import useResumeStore from '@/store/resumeStore';

function ProjectsPreviewSection(): JSX.Element | null {
  const { resumeData, selectedTemplate } = useResumeStore();
  const projects = resumeData.projects || [];
  const styles = TEMPLATE_STYLES[selectedTemplate];

  if (projects.length === 0) return null;

  return (
    <section className="mb-8 pb-6 border-b-2 border-slate-200 last:border-0">
      <h2 className={`text-xl font-bold mb-4 pl-3 ${styles.section} ${styles.accent} flex items-center gap-2`}>
        <FolderOpen className="w-5 h-5" />
        PROJECTS
      </h2>
      
      <div className="space-y-5">
        {projects.map((project) => (
          <ProjectPreviewItem key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

interface ProjectPreviewItemProps {
  project: Project;
}

function ProjectPreviewItem({ project }: ProjectPreviewItemProps): JSX.Element {
  return (
    <div className="pl-3">
      {/* Project Header */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h3 className="font-bold text-slate-900 text-base">{project.name}</h3>
          {(project.startDate || project.endDate) && (
            <p className="text-sm text-slate-600">
              {project.startDate} {project.endDate && `- ${project.endDate}`}
            </p>
          )}
        </div>
        
        {/* Links */}
        <div className="flex gap-2 ml-4">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 print:text-blue-600"
              title="Live Demo"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-slate-900 print:text-slate-600"
              title="GitHub Repository"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-700 mb-3 leading-relaxed">{project.description}</p>

      {/* Technologies */}
      {project.technologies && project.technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="inline-block px-2.5 py-0.5 bg-slate-100 text-slate-700 text-xs rounded-full font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {/* Highlights */}
      {project.highlights && project.highlights.length > 0 && (
        <ul className="list-disc list-inside text-sm text-slate-700 space-y-1 ml-2">
          {project.highlights.map((highlight, index) => (
            <li key={index} className="leading-relaxed">{highlight}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProjectsPreviewSection;

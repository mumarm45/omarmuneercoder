import { ExternalLink, Github, FolderOpen } from 'lucide-react';
import { Project, DEFAULT_SECTION_LABELS } from '@/types';
import { TEMPLATE_STYLES } from '@/utils/constants';
import useResumeStore from '@/store/resumeStore';

function ProjectsPreviewSection(): JSX.Element | null {
  const { resumeData, selectedTemplate } = useResumeStore();
  const projects = resumeData.projects || [];
  const styles = TEMPLATE_STYLES[selectedTemplate];
  const label = resumeData.sectionLabels?.projects ?? DEFAULT_SECTION_LABELS.projects;

  if (projects.length === 0) return null;

  return (
    <section className="mb-8 border-b-2 border-slate-200 pb-6 last:border-0">
      <h2
        className={`mb-4 pl-3 text-xl font-bold ${styles.section} ${styles.accent} flex items-center gap-2`}
      >
        <FolderOpen className="h-5 w-5" />
        {label}
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
      <div className="mb-2 flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-base font-bold text-slate-900">{project.name}</h3>
          {(project.startDate || project.endDate) && (
            <p className="text-sm text-slate-600">
              {project.startDate} {project.endDate && `- ${project.endDate}`}
            </p>
          )}
        </div>

        {/* Links */}
        <div className="ml-4 flex gap-2">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 print:text-blue-600"
              title="Live Demo"
            >
              <ExternalLink className="h-4 w-4" />
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
              <Github className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="mb-3 text-sm leading-relaxed text-slate-700">{project.description}</p>

      {/* Technologies */}
      {project.technologies && project.technologies.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="inline-block rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {/* Highlights */}
      {project.highlights && project.highlights.length > 0 && (
        <ul className="ml-2 list-inside list-disc space-y-1 text-sm text-slate-700">
          {project.highlights.map((highlight, index) => (
            <li key={index} className="leading-relaxed">
              {highlight}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProjectsPreviewSection;

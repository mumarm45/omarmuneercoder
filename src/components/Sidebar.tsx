import { Zap, Briefcase, FolderOpen, Award, Globe, Trophy } from 'lucide-react';
import TemplateSelector from './TemplateSelector';
import QuickActions from './QuickActions';
import ProjectsSection from './sections/ProjectsSection';
import CertificationsSection from './sections/CertificationsSection';
import LanguagesSection from './sections/LanguagesSection';
import AwardsSection from './sections/AwardsSection';
import SidebarGroup from './SidebarGroup';
import useResumeStore from '@/store/resumeStore';

function Sidebar(): JSX.Element {
  const { resumeData } = useResumeStore();

  // Calculate totals for badges
  const projectsCount = resumeData.projects?.length || 0;
  const certificationsCount = resumeData.certifications?.length || 0;
  const languagesCount = resumeData.languages?.length || 0;
  const awardsCount = resumeData.awards?.length || 0;
  const portfolioCount = projectsCount + certificationsCount;
  const additionalCount = languagesCount + awardsCount;

  return (
    <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2 pb-4">
      {/* Template Selector - Always visible */}
      <TemplateSelector />

      {/* Quick Actions Group */}
      <SidebarGroup
        title="Quick Actions"
        icon={Zap}
        defaultExpanded={true}
      >
        <QuickActions />
      </SidebarGroup>

      {/* Portfolio Group */}
      <SidebarGroup
        title="Portfolio"
        icon={Briefcase}
        defaultExpanded={portfolioCount > 0}
        badge={portfolioCount}
      >
        <div className="space-y-4 mt-4">
          <ProjectsSection />
          <CertificationsSection />
        </div>
      </SidebarGroup>

      {/* Additional Sections Group */}
      <SidebarGroup
        title="Additional"
        icon={Globe}
        defaultExpanded={additionalCount > 0}
        badge={additionalCount}
      >
        <div className="space-y-4 mt-4">
          <LanguagesSection />
          <AwardsSection />
        </div>
      </SidebarGroup>
    </div>
  );
}

export default Sidebar;

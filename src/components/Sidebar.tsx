import { useState } from 'react';
import { Zap, Briefcase, Globe, Layout } from 'lucide-react';
import TemplateSelector from './TemplateSelector';
import QuickActions from './QuickActions';
import ProjectsSection from './sections/ProjectsSection';
import CertificationsSection from './sections/CertificationsSection';
import LanguagesSection from './sections/LanguagesSection';
import AwardsSection from './sections/AwardsSection';
import SidebarGroup from './SidebarGroup';
import useResumeStore from '@/store/resumeStore';

type SidebarTab = 'edit' | 'templates';

function Sidebar(): JSX.Element {
  const { resumeData } = useResumeStore();
  const [activeTab, setActiveTab] = useState<SidebarTab>('edit');

  // Calculate totals for badges
  const projectsCount = resumeData.projects?.length || 0;
  const certificationsCount = resumeData.certifications?.length || 0;
  const languagesCount = resumeData.languages?.length || 0;
  const awardsCount = resumeData.awards?.length || 0;
  const portfolioCount = projectsCount + certificationsCount;
  const additionalCount = languagesCount + awardsCount;

  return (
    <div className="flex flex-col h-full">
      {/* Tab bar */}
      <div className="shrink-0 border-b border-slate-700/60 px-4 py-3 flex gap-1">
        <button
          onClick={() => setActiveTab('edit')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'edit'
              ? 'bg-slate-700 text-white'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Zap className="w-4 h-4" />
          Edit
        </button>
        <button
          onClick={() => setActiveTab('templates')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'templates'
              ? 'bg-slate-700 text-white'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Layout className="w-4 h-4" />
          Templates
        </button>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-3">
        {activeTab === 'edit' && (
          <>
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
          </>
        )}

        {activeTab === 'templates' && (
          <TemplateSelector />
        )}
      </div>
    </div>
  );
}

export default Sidebar;

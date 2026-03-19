import PersonalInfoSection from './PersonalInfoSection';
import SummarySection from './SummarySection';
import ExperienceSection from './ExperienceSection';
import EducationSection from './EducationSection';
import SkillsSection from './SkillsSection';
import ProjectsPreviewSection from './sections/ProjectsPreviewSection';
import CertificationsPreviewSection from './sections/CertificationsPreviewSection';
import LanguagesPreviewSection from './sections/LanguagesPreviewSection';
import AwardsPreviewSection from './sections/AwardsPreviewSection';
import { theme } from '@/theme/colors';
import { cn } from '@/hooks/useTheme';

function ResumePreview(): JSX.Element {
  return (
    <div className="w-full max-w-[850px]">
      <div
        id="resume-preview"
        className={cn(
          'resume-preview rounded-sm p-10',
          theme.backgrounds.card.light,
          'shadow-[0_4px_6px_-1px_rgba(0,0,0,0.15),_0_20px_60px_-10px_rgba(0,0,0,0.25)]'
        )}
      >
        <PersonalInfoSection />
        <SummarySection />
        <ExperienceSection />
        <ProjectsPreviewSection />
        <EducationSection />
        <CertificationsPreviewSection />
        <SkillsSection />
        <LanguagesPreviewSection />
        <AwardsPreviewSection />
      </div>
    </div>
  );
}

export default ResumePreview;

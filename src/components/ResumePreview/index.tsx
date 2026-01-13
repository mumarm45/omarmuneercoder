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
    <div 
      id="resume-preview" 
      className={cn('resume-preview rounded-xl p-8 max-w-4xl mx-auto', theme.backgrounds.card.light, theme.shadows.lg)}
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
  );
}

export default ResumePreview;

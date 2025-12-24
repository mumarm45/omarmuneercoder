
import PersonalInfoSection from './PersonalInfoSection';
import SummarySection from './SummarySection';
import ExperienceSection from './ExperienceSection';
import EducationSection from './EducationSection';
import SkillsSection from './SkillsSection';

function ResumePreview(): JSX.Element {
  return (
    <div 
      id="resume-preview" 
      className="resume-preview bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto"
    >
      <PersonalInfoSection />
      <SummarySection />
      <ExperienceSection />
      <EducationSection />
      <SkillsSection />
    </div>
  );
}

export default ResumePreview;

import { useState, useCallback, useMemo } from 'react';
import useMyResumeStore from '@/store/pages/myResumeStore';
import TopBar from '@/components/MyResume/TopBar';
import Navigation from '@/components/MyResume/Navigation';
import HeroSection from '@/components/MyResume/HeroSection';
import SkillsSection from '@/components/MyResume/SkillsSection';
import ExperienceSection from '@/components/MyResume/ExperienceSection';
import EducationSection from '@/components/MyResume/EducationSection';
import HobbiesSection from '@/components/MyResume/HobbiesSection';
import ContactSection from '@/components/MyResume/ContactSection';
import Footer from '@/components/MyResume/Footer';
import Toast from '@/components/Toast';
import { translations } from '@/i18n';
import { contactInfo, getSkillCategories, getHobbiesData } from '@/data/resumeData';
import { theme } from '@/theme/colors';
import { cn } from '@/hooks/useTheme';

interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  description?: string;
  responsibilities: string[];
}

function MyResume(): JSX.Element {
  const { theme: themeMode, language, toggleTheme, toggleLanguage, downloadResume } = useMyResumeStore();
  const [isDownloading, setIsDownloading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const isDark = themeMode === 'dark';
  const t = translations[language];

  const handleDownload = useCallback(async (): Promise<void> => {
    setIsDownloading(true);
    const result = await downloadResume();
    setIsDownloading(false);

    if (result.success) {
      setToast({ message: 'Resume downloaded successfully!', type: 'success' });
    } else {
      setToast({ message: 'Failed to download resume. Please try again.', type: 'error' });
      console.error(result.error);
    }
  }, [downloadResume]);

  const experiences: Experience[] = useMemo(
    () => [
      {
        title: t.exp1Title,
        company: t.exp1Company,
        location: t.ingolstadtGermany,
        period: t.exp1Period,
        description: t.exp1Desc,
        responsibilities: t.exp1Points,
      },
      {
        title: t.exp2Title,
        company: t.exp2Company,
        location: t.abuDhabiUAE,
        period: t.exp2Period,
        description: t.exp2Desc,
        responsibilities: t.exp2Points,
      },
      {
        title: t.exp3Title,
        company: t.exp3Company,
        location: t.dubaiUAE,
        period: t.exp3Period,
        responsibilities: t.exp3Points,
      },
      {
        title: t.exp4Title,
        company: t.exp4Company,
        location: t.dubaiUAE,
        period: t.exp4Period,
        responsibilities: t.exp4Points,
      },
      {
        title: t.exp5Title,
        company: t.exp5Company,
        location: t.lahorePakistan,
        period: t.exp5Period,
        description: t.exp5Desc,
        responsibilities: t.exp5Points,
      },
    ],
    [t]
  );

  const skillCategories = useMemo(() => getSkillCategories(t), [t]);
  const hobbiesData = useMemo(() => getHobbiesData(t), [t]);

  return (
    <div
      className={cn(
        'min-h-screen transition-colors duration-300',
        isDark ? theme.backgrounds.section.dark : theme.backgrounds.section.light,
        isDark ? theme.text.primary.dark : theme.text.primary.light
      )}
    >
      <TopBar email={contactInfo.email} phone={contactInfo.phone} location={t.ingolstadtGermany} />

      <Navigation
        isDark={isDark}
        language={language}
        isDownloading={isDownloading}
        backToHomeText={t.backToHome}
        downloadText={t.downloadPDF}
        downloadingText={t.downloading}
        onToggleLanguage={toggleLanguage}
        onToggleTheme={toggleTheme}
        onDownload={handleDownload}
      />

      <HeroSection
        isDark={isDark}
        title={t.title}
        summary={t.summary}
        getInTouchText={t.getInTouch}
        linkedinProfileText={t.linkedinProfile}
      />

      <SkillsSection isDark={isDark} title={t.skillsTitle} categories={skillCategories} />

      <ExperienceSection isDark={isDark} title={t.experienceTitle} experiences={experiences} />

      <EducationSection
        isDark={isDark}
        title={t.educationTitle}
        degree={t.eduDegree}
        school={t.eduSchool}
        location={t.lahorePakistan}
        period={t.eduPeriod}
      />

      <HobbiesSection
        isDark={isDark}
        title={t.hobbiesTitle}
        intro={t.hobbiesIntro}
        hobbies={hobbiesData.map((hobby) => ({
          ...hobby,
          icon: <span className="text-6xl">{hobby.icon}</span>,
        }))}
      />

      <ContactSection
        title={t.contactTitle}
        emailLabel={t.email}
        linkedinLabel={t.linkedin}
        phoneLabel={t.phone}
        websiteLabel={t.website}
        locationLabel={t.location}
        locationValue={t.locationValue}
      />

      <Footer isDark={isDark} />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

export default MyResume;

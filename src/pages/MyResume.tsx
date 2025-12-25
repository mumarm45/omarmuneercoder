import { useState } from 'react';
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


// Types  
interface Translation {
  backToHome: string;
  downloadPDF: string;
  downloading: string;
  getInTouch: string;
  linkedinProfile: string;
  title: string;
  summary: string;
  skillsTitle: string;
  experienceTitle: string;
  educationTitle: string;
  contactTitle: string;
  frontend: string;
  backend: string;
  databases: string;
  devopsCloud: string;
  security: string;
  architecture: string;
  testing: string;
  toolsOther: string;
  email: string;
  linkedin: string;
  phone: string;
  website: string;
  location: string;
  locationValue: string;
  ingolstadtGermany: string;
  abuDhabiUAE: string;
  dubaiUAE: string;
  lahorePakistan: string;
  present: string;
  exp1Title: string;
  exp1Company: string;
  exp1Period: string;
  exp1Desc: string;
  exp1Points: string[];
  exp2Title: string;
  exp2Company: string;
  exp2Period: string;
  exp2Desc: string;
  exp2Points: string[];
  exp3Title: string;
  exp3Company: string;
  exp3Period: string;
  exp3Points: string[];
  exp4Title: string;
  exp4Company: string;
  exp4Period: string;
  exp4Points: string[];
  exp5Title: string;
  exp5Company: string;
  exp5Period: string;
  exp5Desc: string;
  exp5Points: string[];
  eduDegree: string;
  eduSchool: string;
  eduPeriod: string;
  hobbiesTitle: string;
  hobbiesIntro: string;
  hobbyProgramming: string;
  hobbyProgrammingDesc: string;
  hobbyRunning: string;
  hobbyRunningDesc: string;
  hobbyFitness: string;
  hobbyFitnessDesc: string;
}

interface Translations {
  en: Translation;
  de: Translation;
}

interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  description?: string;
  responsibilities: string[];
}


// Translation data
const translations: Translations = {
  en: {
    backToHome: 'Back to Home',
    downloadPDF: 'Download PDF',
    downloading: 'Downloading...',
    getInTouch: 'Get in Touch',
    linkedinProfile: 'LinkedIn Profile',

    // Hero section
    title: 'Senior Full-Stack Software Engineer',
    summary:
      '11+ years of experience designing and building scalable web applications. Strong expertise in Angular, Java/Spring Boot, Node.js, GraphQL, and microservices. Passionate about design principles, clean architecture, and mentoring teams. Currently exploring AI integrations using Model Context Protocol (MCP).',

    // Section titles
    skillsTitle: 'Skills & Expertise',
    experienceTitle: 'Professional Experience',
    educationTitle: 'Education',
    contactTitle: 'Get In Touch',

    // Skills categories
    frontend: 'Frontend',
    backend: 'Backend',
    databases: 'Databases',
    devopsCloud: 'DevOps & Cloud',
    security: 'Security',
    architecture: 'Architecture',
    testing: 'Testing',
    toolsOther: 'Tools & Other',

    // Contact
    email: 'Email',
    linkedin: 'LinkedIn',
    phone: 'Phone',
    website: 'Website',
    location: 'Location',
    locationValue: 'Ingolstadt, Germany',

    // Companies and locations
    ingolstadtGermany: 'Ingolstadt, Germany',
    abuDhabiUAE: 'Abu Dhabi, UAE',
    dubaiUAE: 'Dubai, UAE',
    lahorePakistan: 'Lahore, Pakistan',

    // Dates
    present: 'Present',

    // Experience descriptions
    exp1Title: 'Senior Software Engineer',
    exp1Company: 'Init-Consulting AG',
    exp1Period: 'Aug 2022 - Present',
    exp1Desc:
      'Leading development on B1web application, mentoring developers, enhancing performance, and implementing new technologies.',
    exp1Points: [
      'Leading development using Angular 18, .NET, and MongoDB',
      'Integrated SAP Service Layer and CRM platforms (newsletters, sales funnels)',
      'Implemented AI chatbot integration using MCP (Model Context Protocol)',
      'Designed Docker-based deployments and CI/CD pipelines with Azure DevOps',
      'Optimized API performance and database queries',
      'Actively mentor junior developers on architecture and best practices',
    ],

    exp2Title: 'Fullstack Web Developer',
    exp2Company: 'Alef Education',
    exp2Period: 'Jan 2020 - Jul 2022',
    exp2Desc:
      'Full-stack developer on K-12 education technology platform with microservices architecture.',
    exp2Points: [
      'Built frontend using React and GraphQL',
      'Developed middleware services with Node.js and GraphQL',
      'Participated in REST APIs development using Kotlin',
      'Dockerized microservices and implemented CI/CD pipelines',
      'Supported DevOps operations ensuring reliability and security',
    ],

    exp3Title: 'Fullstack Web Developer',
    exp3Company: 'Etisalat',
    exp3Period: 'Jul 2019 - Dec 2019',
    exp3Points: [
      'Worked in CIM team on inquiry and customer management applications',
      'Built components using Angular 8 and Java Spring Boot backend',
      'Collaborated with cross-functional teams under tight timelines',
    ],

    exp4Title: 'Fullstack Web Developer',
    exp4Company: 'Emirates Group',
    exp4Period: 'Dec 2017 - Jun 2019',
    exp4Points: [
      'Developed enterprise applications: ACP, Customer-List, and ASBC',
      'Built responsive UI with Angular 7 and RESTful APIs with Spring Boot',
      'Enhanced performance through code optimization, caching, and load balancing',
      'Wrote unit and integration tests using Jasmine and JUnit (TDD)',
    ],

    exp5Title: 'Sr. Software Engineer / Software Engineer',
    exp5Company: 'Expertflow (Pvt.) Ltd.',
    exp5Period: 'Apr 2013 - Sep 2017',
    exp5Desc:
      'Cisco ATP Partner for EMEAR region, specialized in Cisco Enterprise and Express Contact Centre.',
    exp5Points: [
      'Led development of modules linking CRM vendors with CISCO contact center',
      'Published applications on the Cisco Marketplace',
      'Managed and trained junior developers, conducted code reviews',
      'Delivered solutions for PITB, PTCL, Eagle Hills, MCB, GR Europe',
      'Re-architected applications into microservices architecture',
      'Provided Day-2 support and participated in UAT sessions',
    ],

    // Education
    eduDegree: 'Bachelor of Science in Computer Science',
    eduSchool: 'COMSATS Institute of Information Technology',
    eduPeriod: 'Jan 2009 - Dec 2013',

    // Hobbies
    hobbiesTitle: 'Hobbies & Interests',
    hobbiesIntro: 'Beyond coding, I believe staying physically active is essential for mental health and productivity. Here\'s what keeps me balanced:',
    hobbyProgramming: 'Programming',
    hobbyProgrammingDesc: 'I love exploring new technologies, building side projects, and contributing to open source. Coding is not just my job—it\'s my passion.',
    hobbyRunning: 'Running',
    hobbyRunningDesc: 'Running clears my mind and boosts creativity. Whether it\'s a morning jog or weekend long runs, it helps me stay focused and energized.',
    hobbyFitness: 'Physical Fitness',
    hobbyFitnessDesc: 'A healthy body supports a healthy mind. Regular exercise helps me maintain focus, reduce stress, and stay productive in my work.',
  },
  de: {
    backToHome: 'Zurück zur Startseite',
    downloadPDF: 'PDF herunterladen',
    downloading: 'Wird heruntergeladen...',
    getInTouch: 'Kontakt aufnehmen',
    linkedinProfile: 'LinkedIn Profil',

    // Hero section
    title: 'Senior Full-Stack Software Engineer',
    summary:
      'Über 11 Jahre Erfahrung in Konzeption und Entwicklung skalierbarer Webanwendungen. Starke Expertise in Angular, Java/Spring Boot, Node.js, GraphQL und Microservices. Leidenschaft für Designprinzipien, Clean Architecture und Team-Mentoring. Aktuell beschäftige ich mich mit KI-Integrationen über das Model Context Protocol (MCP).',

    // Section titles
    skillsTitle: 'Fähigkeiten & Expertise',
    experienceTitle: 'Berufserfahrung',
    educationTitle: 'Ausbildung',
    contactTitle: 'Kontakt',

    // Skills categories
    frontend: 'Frontend',
    backend: 'Backend',
    databases: 'Datenbanken',
    devopsCloud: 'DevOps & Cloud',
    security: 'Sicherheit',
    architecture: 'Architektur',
    testing: 'Testing',
    toolsOther: 'Tools & Sonstiges',

    // Contact
    email: 'E-Mail',
    linkedin: 'LinkedIn',
    phone: 'Telefon',
    website: 'Webseite',
    location: 'Standort',
    locationValue: 'Ingolstadt, Deutschland',

    // Companies and locations
    ingolstadtGermany: 'Ingolstadt, Deutschland',
    abuDhabiUAE: 'Abu Dhabi, VAE',
    dubaiUAE: 'Dubai, VAE',
    lahorePakistan: 'Lahore, Pakistan',

    // Dates
    present: 'Heute',

    // Experience descriptions
    exp1Title: 'Senior Software Engineer',
    exp1Company: 'Init-Consulting AG',
    exp1Period: 'Aug 2022 - Heute',
    exp1Desc:
      'Leitung der Entwicklung der B1web-Anwendung, Mentoring von Entwicklern, Performance-Optimierung und Einführung neuer Technologien.',
    exp1Points: [
      'Leitung der Entwicklung mit Angular 18, .NET und MongoDB',
      'Integration der SAP Service Layer und CRM-Plattformen (Newsletter, Sales Funnels)',
      'Implementierung einer KI-Chatbot-Integration mit MCP (Model Context Protocol)',
      'Konzeption von Docker-basierten Deployments und CI/CD-Pipelines mit Azure DevOps',
      'Optimierung der API-Performance und Datenbankabfragen',
      'Aktives Mentoring von Junior-Entwicklern zu Architektur und Best Practices',
    ],

    exp2Title: 'Fullstack Web Developer',
    exp2Company: 'Alef Education',
    exp2Period: 'Jan 2020 - Jul 2022',
    exp2Desc:
      'Full-Stack-Entwickler auf einer K-12-EdTech-Plattform mit Microservices-Architektur.',
    exp2Points: [
      'Entwicklung des Frontends mit React und GraphQL',
      'Entwicklung von Middleware-Services mit Node.js und GraphQL',
      'Mitarbeit an der Entwicklung von REST-APIs mit Kotlin',
      'Dockerisierung von Microservices und Implementierung von CI/CD-Pipelines',
      'Unterstützung von DevOps-Betrieb zur Sicherstellung von Zuverlässigkeit und Sicherheit',
    ],

    exp3Title: 'Fullstack Web Developer',
    exp3Company: 'Etisalat',
    exp3Period: 'Jul 2019 - Dez 2019',
    exp3Points: [
      'Arbeit im CIM-Team an Auskunfts- und Kundenmanagement-Anwendungen',
      'Entwicklung von Komponenten mit Angular 8 und Java Spring Boot Backend',
      'Zusammenarbeit mit funktionsübergreifenden Teams unter engen Zeitplänen',
    ],

    exp4Title: 'Fullstack Web Developer',
    exp4Company: 'Emirates Group',
    exp4Period: 'Dez 2017 - Jun 2019',
    exp4Points: [
      'Entwicklung von Enterprise-Anwendungen: ACP, Customer-List und ASBC',
      'Entwicklung eines responsiven UI mit Angular 7 und RESTful APIs mit Spring Boot',
      'Performance-Verbesserung durch Code-Optimierung, Caching und Load Balancing',
      'Erstellung von Unit- und Integrationstests mit Jasmine und JUnit (TDD)',
    ],

    exp5Title: 'Sr. Software Engineer / Software Engineer',
    exp5Company: 'Expertflow (Pvt.) Ltd.',
    exp5Period: 'Apr 2013 - Sep 2017',
    exp5Desc:
      'Cisco ATP Partner für die EMEAR-Region, spezialisiert auf Cisco Enterprise und Express Contact Centre.',
    exp5Points: [
      'Leitung der Entwicklung von Modulen zur Anbindung von CRM-Anbietern an das CISCO Contact Center',
      'Veröffentlichung von Anwendungen im Cisco Marketplace',
      'Führung und Training von Junior-Entwicklern sowie Durchführung von Code-Reviews',
      'Lieferung von Lösungen für PITB, PTCL, Eagle Hills, MCB, GR Europe',
      'Neugestaltung der Anwendungen hin zu einer Microservices-Architektur',
      'Day-2-Support und Teilnahme an UAT-Sessions',
    ],

    // Education
    eduDegree: 'Bachelor of Science in Informatik',
    eduSchool: 'COMSATS Institut für Informationstechnologie',
    eduPeriod: 'Jan 2009 - Dez 2013',

    // Hobbies
    hobbiesTitle: 'Hobbys & Interessen',
    hobbiesIntro: 'Neben dem Programmieren glaube ich, dass körperliche Aktivität essenziell für die mentale Gesundheit und Produktivität ist. Das hält mich im Gleichgewicht:',
    hobbyProgramming: 'Programmieren',
    hobbyProgrammingDesc: 'Ich liebe es, neue Technologien zu erkunden, Nebenprojekte zu entwickeln und zu Open Source beizutragen. Programmieren ist nicht nur mein Beruf – es ist meine Leidenschaft.',
    hobbyRunning: 'Laufen',
    hobbyRunningDesc: 'Laufen befreit meinen Kopf und fördert die Kreativität. Ob morgendliches Joggen oder lange Wochenendläufe – es hilft mir, fokussiert und energiegeladen zu bleiben.',
    hobbyFitness: 'Körperliche Fitness',
    hobbyFitnessDesc: 'Ein gesunder Körper unterstützt einen gesunden Geist. Regelmäßiges Training hilft mir, konzentriert zu bleiben, Stress abzubauen und produktiv zu arbeiten.',
  },
};

function MyResume(): JSX.Element {
  const { theme, language, toggleTheme, toggleLanguage, downloadResume } = useMyResumeStore();
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const isDark = theme === 'dark';
  const t = translations[language];

  const handleDownload = async (): Promise<void> => {
    setIsDownloading(true);
    const result = await downloadResume();
    setIsDownloading(false);

    if (result.success) {
      // Success notification (you can replace with a toast library)
      console.log('Resume downloaded successfully');
    } else {
      // Error notification
      alert('Failed to download resume. Please try again.');
      console.error(result.error);
    }
  };

  // Experience data
  const experiences: Experience[] = [
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
  ];

  const skillCategories = [
    {
      title: t.frontend,
      icon: '💻',
      skills: [
        'Angular 7-18',
        'React',
        'TypeScript',
        'JavaScript ES6',
        'NgRx',
        'Redux',
        'Zustand',
        'Apollo GraphQL',
        'AngularJS',
      ],
    },
    {
      title: t.backend,
      icon: '⚙️',
      skills: [
        'Java',
        'Spring Boot',
        'Node.js',
        'Kotlin',
        '.NET',
        'Python',
        'GraphQL',
        'Grails',
        'Groovy',
        'REST/SOAP',
      ],
    },
    {
      title: t.databases,
      icon: '🗄️',
      skills: ['MongoDB', 'MySQL', 'MSSQL', 'Hibernate'],
    },
    {
      title: t.devopsCloud,
      icon: '☁️',
      skills: [
        'Docker',
        'Azure DevOps',
        'Jenkins',
        'GitHub Actions',
        'AWS EC2',
        'S3',
        'Lambda',
        'Beanstalk',
      ],
    },
    {
      title: t.security,
      icon: '🔒',
      skills: ['Spring Security', 'JWT', 'Apache Shiro', 'LDAP', 'SSO'],
    },
    {
      title: t.architecture,
      icon: '🏗️',
      skills: [
        'Microservices',
        'MVC',
        'Design Patterns',
        'RabbitMQ',
        'Multi-tenant',
        'Client-Server',
      ],
    },
    {
      title: t.testing,
      icon: '🧪',
      skills: ['TDD', 'BDD', 'Jasmine', 'Jest', 'JUnit', 'Spock'],
    },
    {
      title: t.toolsOther,
      icon: '🛠️',
      skills: ['Git', 'Maven', 'Gradle', 'NPM', 'SCSS', 'Bootstrap', 'Agile'],
    },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-slate-900 text-slate-100' : 'bg-gray-50 text-gray-900'}`}
    >
      <TopBar
        email="mumarm45@gmail.com"
        phone="+49 162 473 9773"
        location={t.ingolstadtGermany}
      />

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
        hobbies={[
          {
            icon: <span className="text-6xl">💻</span>,
            title: t.hobbyProgramming,
            description: t.hobbyProgrammingDesc,
          },
          {
            icon: <span className="text-6xl">🏃</span>,
            title: t.hobbyRunning,
            description: t.hobbyRunningDesc,
          },
          {
            icon: <span className="text-6xl">💪</span>,
            title: t.hobbyFitness,
            description: t.hobbyFitnessDesc,
          },
        ]}
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
    </div>
  );
}


export default MyResume;

import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Globe,
  Calendar,
  Languages,
} from 'lucide-react';
import useMyResumeStore from '@/store/pages/myResumeStore';


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

interface SkillCardProps {
  title: string;
  icon: string;
  skills: string[];
  isDark: boolean;
}

interface ExperienceCardProps extends Experience {
  isDark: boolean;
}

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  href?: string;
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

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-slate-900 text-slate-100' : 'bg-gray-50 text-gray-900'}`}
    >
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-indigo-600 to-cyan-500 py-3 px-6 flex justify-center gap-8 flex-wrap text-sm text-white">
        <a
          href="mailto:mumarm45@gmail.com"
          className="flex items-center gap-2 hover:opacity-80 transition"
        >
          <Mail className="w-4 h-4" /> mumarm45@gmail.com
        </a>
        <a
          href="tel:+491624739773"
          className="flex items-center gap-2 hover:opacity-80 transition"
        >
          <Phone className="w-4 h-4" /> +49 162 473 9773
        </a>
        <a
          href="https://www.linkedin.com/in/mumarm45/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:opacity-80 transition"
        >
          <Linkedin className="w-4 h-4" /> LinkedIn
        </a>
        <span className="flex items-center gap-2">
          <MapPin className="w-4 h-4" /> {t.ingolstadtGermany}
        </span>
      </div>

      {/* Navigation */}
      <nav
        className={`sticky top-0 z-50 ${isDark ? 'bg-slate-800/95' : 'bg-white/95'} backdrop-blur-md shadow-md`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-indigo-500 hover:text-indigo-600 transition"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">{t.backToHome}</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className={`flex items-center gap-2 px-4 py-2 rounded-full ${isDark ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-200 hover:bg-gray-300'} transition font-semibold`}
              aria-label="Toggle language"
            >
              <Languages className="w-4 h-4" />
              {language === 'en' ? 'DE' : 'EN'}
            </button>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${isDark ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-200 hover:bg-gray-300'} transition`}
              aria-label="Toggle theme"
            >
              {isDark ? '🌙' : '☀️'}
            </button>
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDownloading ? t.downloading : t.downloadPDF}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-indigo-500 shadow-xl">
            <img
              src="/images/omar_muneer_2.jpg"
              alt="Muhammad Omar Muneer"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <h1 className="text-5xl font-bold mb-4">
            Muhammad{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
              Omar Muneer
            </span>
          </h1>
          <p className="text-2xl text-cyan-500 mb-4">{t.title}</p>
          <p
            className={`text-lg max-w-3xl mx-auto mb-8 ${isDark ? 'text-slate-300' : 'text-gray-600'}`}
          >
            {t.summary}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="mailto:mumarm45@gmail.com"
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white rounded-full font-semibold hover:shadow-lg transition"
            >
              {t.getInTouch}
            </a>
            <a
              href="https://www.linkedin.com/in/mumarm45/"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-6 py-3 border-2 border-indigo-600 rounded-full font-semibold hover:bg-indigo-600 hover:text-white transition ${isDark ? 'text-white' : 'text-indigo-600'}`}
            >
              {t.linkedinProfile}
            </a>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 px-6" id="skills">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t.skillsTitle.split(' & ')[0]} &{' '}
            <span className="text-indigo-500">{t.skillsTitle.split(' & ')[1]}</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SkillCard
              title={t.frontend}
              icon="💻"
              skills={[
                'Angular 7-18',
                'React',
                'TypeScript',
                'JavaScript ES6',
                'NgRx',
                'Redux',
                'Zustand',
                'Apollo GraphQL',
                'AngularJS',
              ]}
              isDark={isDark}
            />
            <SkillCard
              title={t.backend}
              icon="⚙️"
              skills={[
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
              ]}
              isDark={isDark}
            />
            <SkillCard
              title={t.databases}
              icon="🗄️"
              skills={['MongoDB', 'MySQL', 'MSSQL', 'Hibernate']}
              isDark={isDark}
            />
            <SkillCard
              title={t.devopsCloud}
              icon="☁️"
              skills={[
                'Docker',
                'Azure DevOps',
                'Jenkins',
                'GitHub Actions',
                'AWS EC2',
                'S3',
                'Lambda',
                'Beanstalk',
              ]}
              isDark={isDark}
            />
            <SkillCard
              title={t.security}
              icon="🔒"
              skills={['Spring Security', 'JWT', 'Apache Shiro', 'LDAP', 'SSO']}
              isDark={isDark}
            />
            <SkillCard
              title={t.architecture}
              icon="🏗️"
              skills={[
                'Microservices',
                'MVC',
                'Design Patterns',
                'RabbitMQ',
                'Multi-tenant',
                'Client-Server',
              ]}
              isDark={isDark}
            />
            <SkillCard
              title={t.testing}
              icon="🧪"
              skills={['TDD', 'BDD', 'Jasmine', 'Jest', 'JUnit', 'Spock']}
              isDark={isDark}
            />
            <SkillCard
              title={t.toolsOther}
              icon="🛠️"
              skills={['Git', 'Maven', 'Gradle', 'NPM', 'SCSS', 'Bootstrap', 'Agile']}
              isDark={isDark}
            />
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16 px-6" id="experience">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t.experienceTitle.split(' ')[0]}{' '}
            <span className="text-indigo-500">{t.experienceTitle.split(' ')[1]}</span>
          </h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <ExperienceCard key={index} {...exp} isDark={isDark} />
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-16 px-6" id="education">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-indigo-500">{t.educationTitle}</span>
          </h2>
          <div
            className={`${isDark ? 'bg-slate-800' : 'bg-white'} rounded-2xl p-8 shadow-lg border ${isDark ? 'border-slate-700' : 'border-gray-200'}`}
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl">🎓</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-indigo-500 mb-2">{t.eduDegree}</h3>
                <p className="text-xl font-semibold mb-2">{t.eduSchool}</p>
                <div className="flex gap-4 text-sm flex-wrap">
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> {t.lahorePakistan}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> {t.eduPeriod}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        className="py-16 px-6 bg-gradient-to-r from-indigo-600 to-cyan-500"
        id="contact"
      >
        <div className="max-w-5xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-8">{t.contactTitle}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            <ContactCard
              icon={<Mail />}
              title={t.email}
              value="mumarm45@gmail.com"
              href="mailto:mumarm45@gmail.com"
            />
            <ContactCard
              icon={<Linkedin />}
              title={t.linkedin}
              value="linkedin.com/in/mumarm45"
              href="https://www.linkedin.com/in/mumarm45/"
            />
            <ContactCard
              icon={<Phone />}
              title={t.phone}
              value="+49 162 473 9773"
              href="tel:+491624739773"
            />
            <ContactCard
              icon={<Globe />}
              title={t.website}
              value="omarmuneercoder.de"
              href="https://www.omarmuneercoder.de/"
            />
            <ContactCard icon={<MapPin />} title={t.location} value={t.locationValue} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`py-8 text-center ${isDark ? 'bg-slate-900 border-t border-slate-800' : 'bg-gray-50 border-t border-gray-200'}`}
      >
        <p className={isDark ? 'text-slate-400' : 'text-gray-600'}>
          © 2025 Muhammad Omar Muneer. Built with passion.
        </p>
      </footer>
    </div>
  );
}

// Skill Card Component
function SkillCard({ title, icon, skills, isDark }: SkillCardProps): JSX.Element {
  return (
    <div
      className={`${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} rounded-xl p-6 border hover:border-indigo-500 transition shadow-lg`}
    >
      <h3 className="text-xl font-bold text-indigo-500 mb-4 flex items-center gap-2">
        <span>{icon}</span> {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className={`px-3 py-1 ${isDark ? 'bg-indigo-900/30' : 'bg-indigo-100'} text-sm rounded-full ${isDark ? 'text-indigo-300' : 'text-indigo-700'}`}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

// Experience Card Component
function ExperienceCard({ 
  title, 
  company, 
  location, 
  period, 
  description, 
  responsibilities, 
  isDark 
}: ExperienceCardProps): JSX.Element {
  return (
    <div
      className={`${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} rounded-xl p-8 border-l-4 border-l-indigo-500 shadow-lg`}
    >
      <h3 className="text-2xl font-bold text-indigo-500 mb-2">{title}</h3>
      <p className="text-xl font-semibold mb-2">{company}</p>
      <div className="flex gap-4 mb-4 text-sm flex-wrap">
        <span className="flex items-center gap-2">
          <MapPin className="w-4 h-4" /> {location}
        </span>
        <span className="flex items-center gap-2">
          <Calendar className="w-4 h-4" /> {period}
        </span>
      </div>
      {description && (
        <p className={`mb-4 ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>{description}</p>
      )}
      <ul className={`space-y-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
        {responsibilities.map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-indigo-500 mt-1">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Contact Card Component
function ContactCard({ icon, title, value, href }: ContactCardProps): JSX.Element {
  const content = (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm opacity-90 break-all">{value}</p>
    </div>
  );

  return href ? (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {content}
    </a>
  ) : (
    content
  );
}

export default MyResume;

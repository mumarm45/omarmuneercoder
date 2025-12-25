export interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
}

export interface HobbyData {
  icon: string;
  title: string;
  description: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
}

export const contactInfo: ContactInfo = {
  email: 'mumarm45@gmail.com',
  phone: '+49 162 473 9773',
};

export const getSkillCategories = (t: {
  frontend: string;
  backend: string;
  databases: string;
  devopsCloud: string;
  security: string;
  architecture: string;
  testing: string;
  toolsOther: string;
}): SkillCategory[] => [
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

export const getHobbiesData = (t: {
  hobbyProgramming: string;
  hobbyProgrammingDesc: string;
  hobbyRunning: string;
  hobbyRunningDesc: string;
  hobbyFitness: string;
  hobbyFitnessDesc: string;
}) => [
  {
    icon: '💻',
    title: t.hobbyProgramming,
    description: t.hobbyProgrammingDesc,
  },
  {
    icon: '🏃',
    title: t.hobbyRunning,
    description: t.hobbyRunningDesc,
  },
  {
    icon: '💪',
    title: t.hobbyFitness,
    description: t.hobbyFitnessDesc,
  },
];

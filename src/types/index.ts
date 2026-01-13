// Common type definitions for the Resume Builder application

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  portfolio: string;
  website?: string;
  github?: string;
}

export interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  current?: boolean;
  achievements?: string[];
}

export interface Education {
  id: number;
  degree: string;
  school: string;
  location: string;
  year: string;
  gpa?: string;
  honors?: string;
  coursework?: string[];
}

export interface Project {
  id: number;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
  startDate?: string;
  endDate?: string;
  highlights?: string[];
}

export interface Certification {
  id: number;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
  link?: string;
}

export interface Language {
  id: number;
  name: string;
  proficiency: 'Native' | 'Fluent' | 'Professional' | 'Intermediate' | 'Basic';
}

export interface Award {
  id: number;
  title: string;
  issuer: string;
  date: string;
  description?: string;
}

export interface Reference {
  id: number;
  name: string;
  title: string;
  company: string;
  email?: string;
  phone?: string;
  relationship?: string;
}

export interface SocialLinks {
  linkedin?: string;
  github?: string;
  twitter?: string;
  portfolio?: string;
  website?: string;
  medium?: string;
  stackoverflow?: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  projects?: Project[];
  certifications?: Certification[];
  languages?: Language[];
  awards?: Award[];
  references?: Reference[];
  socialLinks?: SocialLinks;
  customSections?: CustomSection[];
}

export interface CustomSection {
  id: number;
  title: string;
  content: string;
  order: number;
}

export type TemplateType = 'modern' | 'classic' | 'minimal' | 'professional' | 'creative';

export interface TemplateConfig {
  id: TemplateType;
  name: string;
  description: string;
  color: string;
  preview?: string;
  features?: string[];
}

export interface ResumeState {
  selectedTemplate: TemplateType;
  showPreview: boolean;
  resumeData: ResumeData;
  visibleSections: VisibleSections;
  currentResumeId?: string;
}

export interface VisibleSections {
  summary: boolean;
  experience: boolean;
  education: boolean;
  skills: boolean;
  projects: boolean;
  certifications: boolean;
  languages: boolean;
  awards: boolean;
  references: boolean;
  customSections: boolean;
}

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export interface EditableFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
  label?: string;
  required?: boolean;
  maxLength?: number;
  helperText?: string;
}

// Validation types
export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings?: ValidationError[];
}

// Export/Import types
export interface ExportOptions {
  format: 'pdf' | 'docx' | 'txt' | 'json';
  template?: TemplateType;
  sections?: string[];
  includeReferences?: boolean;
}

export interface ImportResult {
  success: boolean;
  data?: ResumeData;
  errors?: string[];
}

// Analytics types
export interface ResumeAnalytics {
  completenessScore: number;
  sectionScores: {
    [key: string]: number;
  };
  suggestions: string[];
  atsScore?: number;
  estimatedReadTime?: number;
}

// Theme types
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  headingColor?: string;
}

export interface ResumeTheme {
  id: string;
  name: string;
  colors: ThemeColors;
  fontFamily: string;
  fontSize: {
    heading: string;
    body: string;
    small: string;
  };
  spacing: {
    section: string;
    item: string;
  };
}

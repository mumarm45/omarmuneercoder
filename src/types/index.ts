// Common type definitions for the Resume Builder application

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  portfolio: string;
}

export interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: number;
  degree: string;
  school: string;
  location: string;
  year: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
}

export type TemplateType = 'modern' | 'classic' | 'minimal';

export interface ResumeState {
  selectedTemplate: TemplateType;
  showPreview: boolean;
  resumeData: ResumeData;
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
}

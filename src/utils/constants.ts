import { TemplateType } from '../types';

export interface Template {
  id: TemplateType;
  name: string;
  color: string;
}

export interface TemplateStyle {
  header: string;
  accent: string;
  accentBg: string;
  section: string;
}

export const TEMPLATES: Template[] = [
  { id: 'modern', name: 'Modern', color: 'bg-blue-500' },
  { id: 'classic', name: 'Classic', color: 'bg-gray-700' },
  { id: 'minimal', name: 'Minimal', color: 'bg-green-500' }
];

export const TEMPLATE_STYLES: Record<TemplateType, TemplateStyle> = {
  modern: {
    header: 'bg-gradient-to-r from-blue-600 to-blue-400 text-white',
    accent: 'text-blue-600',
    accentBg: 'bg-blue-100',
    section: 'border-l-4 border-blue-500'
  },
  classic: {
    header: 'bg-gray-800 text-white',
    accent: 'text-gray-700',
    accentBg: 'bg-gray-100',
    section: 'border-l-4 border-gray-700'
  },
  minimal: {
    header: 'bg-white border-b-4 border-green-500 text-gray-800',
    accent: 'text-green-600',
    accentBg: 'bg-green-100',
    section: 'border-l-4 border-green-500'
  }
};

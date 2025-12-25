import { TemplateType } from '../types';

/**
 * Unified template styles using the theme system
 */
export interface TemplateStyle {
  header: string;
  accent: string;
  accentBg: string;
  section: string;
}

export const TEMPLATE_STYLES: Record<TemplateType, TemplateStyle> = {
  modern: {
    header: 'bg-gradient-to-r from-slate-700 to-slate-600 text-white',
    accent: 'text-slate-700',
    accentBg: 'bg-slate-100',
    section: 'border-l-4 border-slate-600',
  },
  classic: {
    header: 'bg-slate-800 text-white',
    accent: 'text-slate-700',
    accentBg: 'bg-slate-100',
    section: 'border-l-4 border-slate-700',
  },
  minimal: {
    header: 'bg-white border-b-4 border-slate-600 text-slate-800',
    accent: 'text-slate-700',
    accentBg: 'bg-slate-100',
    section: 'border-l-4 border-slate-600',
  },
};

export interface Template {
  id: TemplateType;
  name: string;
  color: string;
}

export const TEMPLATES: Template[] = [
  { id: 'modern', name: 'Modern', color: 'bg-slate-600' },
  { id: 'classic', name: 'Classic', color: 'bg-slate-700' },
  { id: 'minimal', name: 'Minimal', color: 'bg-slate-500' },
];

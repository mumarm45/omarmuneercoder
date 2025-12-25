// Centralized color palette for the entire application
export const colors = {
  // Primary colors - Slate theme
  primary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  
  // Accent colors - Blue for CTAs
  accent: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  
  // Neutral colors
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  
  // Semantic colors
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
} as const;

// Theme configuration
export const theme = {
  colors,
  
  // Background gradients
  backgrounds: {
    page: 'bg-gradient-to-br from-slate-50 to-slate-200',
    header: 'bg-gradient-to-r from-slate-600 to-slate-700',
    card: {
      light: 'bg-white',
      dark: 'bg-slate-800',
    },
    section: {
      light: 'bg-gray-50',
      dark: 'bg-slate-900',
    },
  },
  
  // Text colors
  text: {
    primary: {
      light: 'text-gray-900',
      dark: 'text-slate-100',
    },
    secondary: {
      light: 'text-gray-600',
      dark: 'text-slate-300',
    },
    muted: {
      light: 'text-gray-500',
      dark: 'text-slate-400',
    },
    heading: 'text-slate-700',
    onDark: 'text-white',
  },
  
  // Border colors
  borders: {
    light: 'border-gray-200',
    dark: 'border-slate-700',
    hover: {
      light: 'hover:border-slate-500',
      dark: 'hover:border-slate-600',
    },
  },
  
  // Button styles
  buttons: {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-700',
    secondaryLight: 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm',
    outline: 'border-2 border-slate-600 hover:bg-slate-600 hover:text-white',
  },
  
  // Shadows
  shadows: {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  },
  
  // Spacing
  spacing: {
    section: 'py-16 px-6',
    container: 'max-w-7xl mx-auto',
    containerSmall: 'max-w-5xl mx-auto',
  },
} as const;

export type Theme = typeof theme;
export type ThemeColors = typeof colors;

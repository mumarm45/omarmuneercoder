import { theme } from '@/theme/colors';

/**
 * Hook to access theme configuration
 * Can be extended to support dynamic theming in the future
 */
export function useTheme() {
  return theme;
}

/**
 * Helper function to get theme-aware class names
 */
export function getThemeClass(
  lightClass: string,
  darkClass: string,
  isDark: boolean
): string {
  return isDark ? darkClass : lightClass;
}

/**
 * Helper to combine theme classes
 */
export function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

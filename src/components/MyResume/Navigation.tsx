import { Link } from 'react-router-dom';
import { ArrowLeft, Languages } from 'lucide-react';
import { theme } from '@/theme/colors';
import { cn } from '@/hooks/useTheme';

interface NavigationProps {
  isDark: boolean;
  language: 'en' | 'de';
  isDownloading: boolean;
  backToHomeText: string;
  downloadText: string;
  downloadingText: string;
  onToggleLanguage: () => void;
  onToggleTheme: () => void;
  onDownload: () => void;
}

function Navigation({
  isDark,
  language,
  isDownloading,
  backToHomeText,
  downloadText,
  downloadingText,
  onToggleLanguage,
  onToggleTheme,
  onDownload,
}: NavigationProps): JSX.Element {
  return (
    <nav
      className={`sticky top-0 z-50 ${isDark ? 'bg-slate-800/95' : 'bg-white/95'} shadow-md backdrop-blur-md`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-slate-600 transition hover:text-slate-800"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-semibold">{backToHomeText}</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleLanguage}
            className={`flex items-center gap-2 rounded-full px-4 py-2 ${isDark ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-200 hover:bg-gray-300'} font-semibold transition`}
            aria-label="Toggle language"
          >
            <Languages className="h-4 w-4" />
            {language === 'en' ? 'DE' : 'EN'}
          </button>
          <button
            onClick={onToggleTheme}
            className={`rounded-full p-2 ${isDark ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-200 hover:bg-gray-300'} transition`}
            aria-label="Toggle theme"
          >
            {isDark ? '🌙' : '☀️'}
          </button>
          <button
            onClick={onDownload}
            disabled={isDownloading}
            className={cn(
              'flex items-center gap-2 rounded-lg px-4 py-2 transition disabled:cursor-not-allowed disabled:opacity-50',
              theme.buttons.primary
            )}
          >
            {isDownloading ? downloadingText : downloadText}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;

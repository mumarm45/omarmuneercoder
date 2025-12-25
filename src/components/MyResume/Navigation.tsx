import { Link } from 'react-router-dom';
import { ArrowLeft, Languages } from 'lucide-react';

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
      className={`sticky top-0 z-50 ${isDark ? 'bg-slate-800/95' : 'bg-white/95'} backdrop-blur-md shadow-md`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-indigo-500 hover:text-indigo-600 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">{backToHomeText}</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleLanguage}
            className={`flex items-center gap-2 px-4 py-2 rounded-full ${isDark ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-200 hover:bg-gray-300'} transition font-semibold`}
            aria-label="Toggle language"
          >
            <Languages className="w-4 h-4" />
            {language === 'en' ? 'DE' : 'EN'}
          </button>
          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-full ${isDark ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-200 hover:bg-gray-300'} transition`}
            aria-label="Toggle theme"
          >
            {isDark ? '🌙' : '☀️'}
          </button>
          <button
            onClick={onDownload}
            disabled={isDownloading}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDownloading ? downloadingText : downloadText}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;

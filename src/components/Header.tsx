import { useState, useCallback, useEffect, useRef, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileText,
  Download,
  Eye,
  EyeOff,
  FileDown,
  ArrowLeft,
  Home,
  Save,
  Check,
  Loader2,
  Pencil,
  ChevronDown,
  Plus,
} from 'lucide-react';
import type { SaveStatus } from '../pages/ResumeBuilder';
import useResumeStore from '@store/resumeStore';
import { useAsyncOperation } from '@hooks/useAsyncOperation';
import { logger } from '@utils/errorHandling';
import Toast from './Toast';
import { theme } from '@/theme/colors';
import { cn } from '@/hooks/useTheme';
import { SUPPORTED_LANGUAGES } from './LanguagePicker';

export interface LinkedLanguage {
  id: string;
  language: string;
  name: string;
}

// Download menu item component
interface DownloadMenuItemProps {
  onClick: () => void;
  icon: typeof FileDown;
  label: string;
  disabled?: boolean;
}

const DownloadMenuItem = memo(({ onClick, icon: Icon, label, disabled }: DownloadMenuItemProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="flex w-full items-center gap-3 px-4 py-2 text-left transition-colors
               hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
  >
    <Icon className="h-4 w-4 text-slate-600" />
    <span className="text-slate-700">{label}</span>
  </button>
));

DownloadMenuItem.displayName = 'DownloadMenuItem';

interface HeaderProps {
  resumeName?: string;
  resumeId?: string;
  onSave?: () => void;
  saveStatus?: SaveStatus;
  onNameChange?: (name: string) => void;
  resumeLanguage?: string;
  linkedLanguages?: LinkedLanguage[];
  onAddLanguage?: () => void;
  onSwitchLanguage?: (id: string) => void;
}

function Header({
  resumeName,
  resumeId,
  onSave,
  saveStatus = 'idle',
  onNameChange,
  resumeLanguage = 'en',
  linkedLanguages = [],
  onAddLanguage,
  onSwitchLanguage,
}: HeaderProps): JSX.Element {
  const navigate = useNavigate();
  const { showPreview, togglePreview, resumeData } = useResumeStore();

  const [showDownloadMenu, setShowDownloadMenu] = useState<boolean>(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [localName, setLocalName] = useState(resumeName || 'Resume Builder');
  const nameInputRef = useRef<HTMLInputElement>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);

  // Close lang menu on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setShowLangMenu(false);
      }
    }
    if (showLangMenu) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showLangMenu]);

  useEffect(() => {
    setLocalName(resumeName || 'Resume Builder');
  }, [resumeName]);

  useEffect(() => {
    if (isEditingName) {
      nameInputRef.current?.focus();
      nameInputRef.current?.select();
    }
  }, [isEditingName]);

  const commitName = useCallback(() => {
    const trimmed = localName.trim() || 'Untitled Resume';
    setLocalName(trimmed);
    setIsEditingName(false);
    onNameChange?.(trimmed);
  }, [localName, onNameChange]);

  const handleNameKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        commitName();
      } else if (e.key === 'Escape') {
        setLocalName(resumeName || 'Resume Builder');
        setIsEditingName(false);
      }
    },
    [commitName, resumeName]
  );

  // Async operations for PDF export
  const { execute: executePDFExport, state: pdfState } = useAsyncOperation(async () => {
    logger.info('Starting PDF export');
    const { exportToPDF } = await import('@utils/exportToPDF');
    return await exportToPDF({
      elementId: 'resume-preview',
      fileName: `${resumeName || 'resume'}.pdf`,
    });
  });

  // Async operations for Word export
  const { execute: executeWordExport, state: wordState } = useAsyncOperation(async () => {
    logger.info('Starting Word export');
    const { exportToWord } = await import('@utils/exportToWord');
    return await exportToWord(resumeData, {
      fileName: `${resumeName || 'resume'}.txt`,
      format: 'txt',
    });
  });

  const isExporting = pdfState.loading || wordState.loading;

  // Handle PDF download
  const handleDownloadPDF = useCallback(async () => {
    await executePDFExport();
    setShowDownloadMenu(false);

    if (pdfState.error) {
      setToast({ message: 'Failed to download PDF. Please try again.', type: 'error' });
    } else if (!pdfState.loading) {
      setToast({ message: 'PDF downloaded successfully!', type: 'success' });
    }
  }, [executePDFExport, pdfState.error, pdfState.loading]);

  // Handle Word download
  const handleDownloadWord = useCallback(async () => {
    await executeWordExport();
    setShowDownloadMenu(false);

    if (wordState.error) {
      setToast({ message: 'Failed to download document. Please try again.', type: 'error' });
    } else if (!wordState.loading) {
      setToast({ message: 'Document downloaded successfully!', type: 'success' });
    }
  }, [executeWordExport, wordState.error, wordState.loading]);

  // Toggle download menu
  const toggleDownloadMenu = useCallback(() => {
    if (!isExporting) {
      setShowDownloadMenu((prev) => !prev);
    }
  }, [isExporting]);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 border-b shadow-lg',
          theme.backgrounds.header,
          'border-slate-800'
        )}
      >
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between">
            {/* Left section */}
            <div className="flex items-center gap-4">
              {/* Back to Dashboard */}
              {resumeId && (
                <button
                  onClick={() => navigate('/dashboard')}
                  className="group flex items-center gap-2 text-slate-200 transition-colors duration-200 hover:text-white"
                >
                  <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                  <span className="hidden font-semibold sm:inline">Dashboard</span>
                </button>
              )}

              {/* Home Link (only show if no resumeId) */}
              {!resumeId && (
                <Link
                  to="/"
                  className="group flex items-center gap-2 text-slate-200 transition-colors duration-200 hover:text-white"
                >
                  <Home className="h-5 w-5 transition-transform group-hover:scale-110" />
                  <span className="font-semibold">Home</span>
                </Link>
              )}

              <div className="flex items-center gap-3">
                <FileText className={cn('h-8 w-8', theme.text.onDark)} />
                <div>
                  {isEditingName ? (
                    <input
                      ref={nameInputRef}
                      value={localName}
                      onChange={(e) => setLocalName(e.target.value)}
                      onBlur={commitName}
                      onKeyDown={handleNameKeyDown}
                      className="rounded border border-white/30 bg-white/10 px-2 py-0.5 text-xl font-bold text-white focus:border-white/60 focus:outline-none sm:text-2xl"
                    />
                  ) : (
                    <button
                      onClick={() => setIsEditingName(true)}
                      className="group flex items-center gap-2 text-left"
                    >
                      <h1 className={cn('text-xl font-bold sm:text-2xl', theme.text.onDark)}>
                        {localName}
                      </h1>
                      <Pencil className="h-4 w-4 text-white/40 opacity-0 transition-opacity group-hover:opacity-100" />
                    </button>
                  )}
                  {saveStatus === 'saved' && <p className="text-xs text-green-400">Saved</p>}
                  {saveStatus === 'error' && <p className="text-xs text-red-400">Save failed</p>}
                </div>

                {/* Language badge */}
                <div className="relative" ref={langMenuRef}>
                  <button
                    onClick={() => setShowLangMenu((v) => !v)}
                    className="flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-sm font-medium text-white transition-colors hover:bg-white/20"
                  >
                    <span>
                      {SUPPORTED_LANGUAGES.find((l) => l.code === resumeLanguage)?.flag ?? '🌐'}
                    </span>
                    <span className="text-xs uppercase tracking-wide">{resumeLanguage}</span>
                    <ChevronDown className="h-3 w-3 text-white/60" />
                  </button>

                  {showLangMenu && (
                    <div className="absolute left-0 top-full z-20 mt-2 w-56 overflow-hidden rounded-xl border border-slate-700 bg-slate-800 py-1 shadow-xl">
                      <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Language versions
                      </p>

                      {linkedLanguages.length > 0 ? (
                        linkedLanguages.map((ll) => {
                          const lang = SUPPORTED_LANGUAGES.find((l) => l.code === ll.language);
                          const isCurrent = ll.id === resumeId;
                          return (
                            <button
                              key={ll.id}
                              onClick={() => {
                                setShowLangMenu(false);
                                if (!isCurrent) onSwitchLanguage?.(ll.id);
                              }}
                              className={`flex w-full items-center gap-3 px-3 py-2 text-sm transition-colors ${
                                isCurrent
                                  ? 'cursor-default bg-slate-700 text-white'
                                  : 'text-slate-300 hover:bg-slate-700/60 hover:text-white'
                              }`}
                            >
                              <span className="text-base">{lang?.flag ?? '🌐'}</span>
                              <span className="flex-1 text-left">{lang?.name ?? ll.language}</span>
                              {isCurrent && <Check className="h-4 w-4 text-blue-400" />}
                            </button>
                          );
                        })
                      ) : (
                        <p className="px-3 py-2 text-xs italic text-slate-500">
                          No versions saved yet
                        </p>
                      )}

                      {onAddLanguage && (
                        <>
                          <div className="my-1 border-t border-slate-700" />
                          <button
                            onClick={() => {
                              setShowLangMenu(false);
                              onAddLanguage();
                            }}
                            className="flex w-full items-center gap-3 px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700/60 hover:text-white"
                          >
                            <Plus className="h-4 w-4" />
                            Add language version
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right section */}
            <div className="flex gap-3">
              {/* Save Button */}
              {onSave && (
                <button
                  onClick={onSave}
                  disabled={saveStatus === 'saving'}
                  className="btn-secondary-light flex items-center gap-2 disabled:opacity-60"
                  aria-label="Save resume"
                >
                  {saveStatus === 'saving' && <Loader2 className="h-4 w-4 animate-spin" />}
                  {saveStatus === 'saved' && <Check className="h-4 w-4 text-green-400" />}
                  {saveStatus === 'error' && <Save className="h-4 w-4 text-red-400" />}
                  {saveStatus === 'idle' && <Save className="h-4 w-4" />}
                  <span className="hidden sm:inline">
                    {saveStatus === 'saving'
                      ? 'Saving...'
                      : saveStatus === 'saved'
                        ? 'Saved'
                        : 'Save'}
                  </span>
                </button>
              )}

              {/* Toggle Preview Button */}
              <button
                onClick={togglePreview}
                className="btn-secondary-light flex items-center gap-2"
                aria-label={showPreview ? 'Hide preview' : 'Show preview'}
              >
                {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span className="hidden sm:inline">{showPreview ? 'Hide' : 'Show'}</span>
              </button>

              {/* Download Dropdown */}
              <div className="relative">
                <button
                  onClick={toggleDownloadMenu}
                  disabled={isExporting}
                  className="btn-primary-light flex items-center gap-2"
                  aria-label="Download options"
                  aria-expanded={showDownloadMenu}
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {isExporting ? 'Exporting...' : 'Download'}
                  </span>
                </button>

                {showDownloadMenu && !isExporting && (
                  <div
                    className="animate-fade-in absolute right-0 z-10 mt-2 w-48 rounded-lg 
                               border border-slate-200 bg-white py-2 shadow-lg"
                    role="menu"
                  >
                    <DownloadMenuItem
                      onClick={handleDownloadPDF}
                      icon={FileDown}
                      label="Download as PDF"
                      disabled={pdfState.loading}
                    />
                    <DownloadMenuItem
                      onClick={handleDownloadWord}
                      icon={FileDown}
                      label="Download as Text"
                      disabled={wordState.loading}
                    />
                  </div>
                )}
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Toast notifications */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  );
}

export default memo(Header);

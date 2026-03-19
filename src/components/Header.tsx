import { useState, useCallback, useEffect, useRef, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, Download, Eye, EyeOff, FileDown, ArrowLeft, Home, Save, Check, Loader2, Pencil, ChevronDown, Plus } from 'lucide-react';
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
    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-50 transition-colors
               disabled:opacity-50 disabled:cursor-not-allowed text-left"
  >
    <Icon className="w-4 h-4 text-slate-600" />
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

  const handleNameKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      commitName();
    } else if (e.key === 'Escape') {
      setLocalName(resumeName || 'Resume Builder');
      setIsEditingName(false);
    }
  }, [commitName, resumeName]);

  // Async operations for PDF export
  const { execute: executePDFExport, state: pdfState } = useAsyncOperation(
    async () => {
      logger.info('Starting PDF export');
      const { exportToPDF } = await import('@utils/exportToPDF');
      return await exportToPDF({
        elementId: 'resume-preview',
        fileName: `${resumeName || 'resume'}.pdf`,
      });
    }
  );

  // Async operations for Word export
  const { execute: executeWordExport, state: wordState } = useAsyncOperation(
    async () => {
      logger.info('Starting Word export');
      const { exportToWord } = await import('@utils/exportToWord');
      return await exportToWord(resumeData, {
        fileName: `${resumeName || 'resume'}.txt`,
        format: 'txt',
      });
    }
  );

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
      <header className={cn('border-b shadow-lg sticky top-0 z-50', theme.backgrounds.header, 'border-slate-800')}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center justify-between">
            {/* Left section */}
            <div className="flex items-center gap-4">
              {/* Back to Dashboard */}
              {resumeId && (
                <button
                  onClick={() => navigate('/dashboard')}
                  className="flex items-center gap-2 text-slate-200 hover:text-white transition-colors duration-200 group"
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  <span className="font-semibold hidden sm:inline">Dashboard</span>
                </button>
              )}

              {/* Home Link (only show if no resumeId) */}
              {!resumeId && (
                <Link 
                  to="/" 
                  className="flex items-center gap-2 text-slate-200 hover:text-white transition-colors duration-200 group"
                >
                  <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Home</span>
                </Link>
              )}
              
              <div className="flex items-center gap-3">
                <FileText className={cn('w-8 h-8', theme.text.onDark)} />
                <div>
                  {isEditingName ? (
                    <input
                      ref={nameInputRef}
                      value={localName}
                      onChange={(e) => setLocalName(e.target.value)}
                      onBlur={commitName}
                      onKeyDown={handleNameKeyDown}
                      className="text-xl sm:text-2xl font-bold bg-white/10 border border-white/30 rounded px-2 py-0.5 text-white focus:outline-none focus:border-white/60"
                    />
                  ) : (
                    <button
                      onClick={() => setIsEditingName(true)}
                      className="group flex items-center gap-2 text-left"
                    >
                      <h1 className={cn('text-xl sm:text-2xl font-bold', theme.text.onDark)}>
                        {localName}
                      </h1>
                      <Pencil className="w-4 h-4 text-white/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  )}
                  {saveStatus === 'saved' && (
                    <p className="text-xs text-green-400">Saved</p>
                  )}
                  {saveStatus === 'error' && (
                    <p className="text-xs text-red-400">Save failed</p>
                  )}
                </div>

                {/* Language badge */}
                <div className="relative" ref={langMenuRef}>
                  <button
                    onClick={() => setShowLangMenu((v) => !v)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white text-sm font-medium"
                  >
                    <span>{SUPPORTED_LANGUAGES.find(l => l.code === resumeLanguage)?.flag ?? '🌐'}</span>
                    <span className="uppercase tracking-wide text-xs">{resumeLanguage}</span>
                    <ChevronDown className="w-3 h-3 text-white/60" />
                  </button>

                  {showLangMenu && (
                    <div className="absolute left-0 top-full mt-2 w-56 bg-slate-800 border border-slate-700 rounded-xl shadow-xl z-20 py-1 overflow-hidden">
                      <p className="px-3 pt-2 pb-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Language versions
                      </p>

                      {linkedLanguages.length > 0 ? (
                        linkedLanguages.map((ll) => {
                          const lang = SUPPORTED_LANGUAGES.find(l => l.code === ll.language);
                          const isCurrent = ll.id === resumeId;
                          return (
                            <button
                              key={ll.id}
                              onClick={() => {
                                setShowLangMenu(false);
                                if (!isCurrent) onSwitchLanguage?.(ll.id);
                              }}
                              className={`w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors ${
                                isCurrent
                                  ? 'bg-slate-700 text-white cursor-default'
                                  : 'text-slate-300 hover:bg-slate-700/60 hover:text-white'
                              }`}
                            >
                              <span className="text-base">{lang?.flag ?? '🌐'}</span>
                              <span className="flex-1 text-left">{lang?.name ?? ll.language}</span>
                              {isCurrent && <Check className="w-4 h-4 text-blue-400" />}
                            </button>
                          );
                        })
                      ) : (
                        <p className="px-3 py-2 text-xs text-slate-500 italic">No versions saved yet</p>
                      )}

                      {onAddLanguage && (
                        <>
                          <div className="border-t border-slate-700 my-1" />
                          <button
                            onClick={() => { setShowLangMenu(false); onAddLanguage(); }}
                            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700/60 hover:text-white transition-colors"
                          >
                            <Plus className="w-4 h-4" />
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
                  {saveStatus === 'saving' && <Loader2 className="w-4 h-4 animate-spin" />}
                  {saveStatus === 'saved' && <Check className="w-4 h-4 text-green-400" />}
                  {saveStatus === 'error' && <Save className="w-4 h-4 text-red-400" />}
                  {saveStatus === 'idle' && <Save className="w-4 h-4" />}
                  <span className="hidden sm:inline">
                    {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved' : 'Save'}
                  </span>
                </button>
              )}

              {/* Toggle Preview Button */}
              <button
                onClick={togglePreview}
                className="btn-secondary-light flex items-center gap-2"
                aria-label={showPreview ? 'Hide preview' : 'Show preview'}
              >
                {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span className="hidden sm:inline">
                  {showPreview ? 'Hide' : 'Show'}
                </span>
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
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    {isExporting ? 'Exporting...' : 'Download'}
                  </span>
                </button>
                
                {showDownloadMenu && !isExporting && (
                  <div 
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg 
                               border border-slate-200 py-2 z-10 animate-fade-in"
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
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}

export default memo(Header);

import { useState, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Download, Eye, EyeOff, FileDown, Home } from 'lucide-react';
import { exportToPDF } from '@utils/exportToPDF';
import { exportToWord } from '@utils/exportToWord';
import useResumeStore from '@store/resumeStore';
import { useAsyncOperation } from '@hooks/useAsyncOperation';
import { logger } from '@utils/errorHandling';
import Toast from './Toast';
import { theme } from '@/theme/colors';
import { cn } from '@/hooks/useTheme';

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

function Header(): JSX.Element {
  const { showPreview, togglePreview, resumeData } = useResumeStore();
  
  const [showDownloadMenu, setShowDownloadMenu] = useState<boolean>(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Async operations for PDF export
  const { execute: executePDFExport, state: pdfState } = useAsyncOperation(
    async () => {
      logger.info('Starting PDF export');
      return await exportToPDF({
        elementId: 'resume-preview',
        fileName: 'resume.pdf',
      });
    }
  );

  // Async operations for Word export
  const { execute: executeWordExport, state: wordState } = useAsyncOperation(
    async () => {
      logger.info('Starting Word export');
      return await exportToWord(resumeData, {
        fileName: 'resume.txt',
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
            <div className="flex items-center gap-6">
              <Link 
                to="/" 
                className="flex items-center gap-2 text-slate-200 hover:text-white transition-colors duration-200 group"
              >
                <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="font-semibold">Home</span>
              </Link>
              
              <div className="flex items-center gap-3">
                <FileText className={cn('w-8 h-8', theme.text.onDark)} />
                <h1 className={cn('text-2xl font-bold', theme.text.onDark)}>Resume Builder</h1>
              </div>
            </div>
            
            {/* Right section */}
            <div className="flex gap-3">
              {/* Toggle Preview Button */}
              <button
                onClick={togglePreview}
                className="btn-secondary-light flex items-center gap-2"
                aria-label={showPreview ? 'Hide preview' : 'Show preview'}
              >
                {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span className="hidden sm:inline">
                  {showPreview ? 'Hide Preview' : 'Show Preview'}
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
                  {isExporting ? 'Exporting...' : 'Download'}
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

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Download, Eye, FileDown, Home } from 'lucide-react';
import { exportToPDF, exportToWord } from '@utils/exportToWord';
import useResumeStore from '@store/resumeStore';

function Header(): JSX.Element {
  const { showPreview, togglePreview, resumeData } = useResumeStore();
  const [showDownloadMenu, setShowDownloadMenu] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const handleDownloadPDF = async (): Promise<void> => {
    setIsExporting(true);
    const result = await exportToPDF('resume-preview', 'resume.pdf');
    setIsExporting(false);
    setShowDownloadMenu(false);
    
    if (result.success) {
      alert('PDF downloaded successfully!');
    } else {
      alert('Failed to download PDF. Please try again.');
    }
  };

  const handleDownloadWord = async (): Promise<void> => {
    setIsExporting(true);
    const result = await exportToWord(resumeData, 'resume.txt');
    setIsExporting(false);
    setShowDownloadMenu(false);
    
    if (result.success) {
      alert('Document downloaded successfully!');
    } else {
      alert('Failed to download document. Please try again.');
    }
  };

  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition">
              <Home className="w-5 h-5" />
              <span className="font-semibold">Home</span>
            </Link>
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-800">Resume Builder</h1>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={togglePreview}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition duration-200"
            >
              <Eye className="w-4 h-4" />
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </button>
            
            <div className="relative">
              <button
                onClick={() => setShowDownloadMenu(!showDownloadMenu)}
                disabled={isExporting}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-4 h-4" />
                {isExporting ? 'Exporting...' : 'Download'}
              </button>
              
              {showDownloadMenu && !isExporting && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                  <button
                    onClick={handleDownloadPDF}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition"
                  >
                    <FileDown className="w-4 h-4 text-red-600" />
                    <span className="text-gray-700">Download as PDF</span>
                  </button>
                  <button
                    onClick={handleDownloadWord}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition"
                  >
                    <FileDown className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-700">Download as Text</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Types
export type Theme = 'dark' | 'light';
export type Language = 'en' | 'de';

export interface DownloadResult {
  success: boolean;
  message: string;
  error?: Error;
}

interface MyResumeState {
  // UI State
  theme: Theme;
  language: Language;
  
  // Resume file path
  resumePdfPath: string;
  
  // Actions
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  setResumePdfPath: (path: string) => void;
  downloadResume: () => Promise<DownloadResult>;
}

// Helper function to detect theme based on time of day
const getAutoTheme = (): Theme => {
  const hour = new Date().getHours();
  // Light theme between 7 AM and 7 PM, dark theme otherwise
  return hour >= 7 && hour < 19 ? 'light' : 'dark';
};

const useMyResumeStore = create<MyResumeState>()(
  persist(
    (set, get) => ({
      // UI State - Auto-detect theme based on time of day
      theme: getAutoTheme(),
      language: 'en',
      
      // Resume file path - MUST match the actual file location
      resumePdfPath: '/resume.pdf',
      
      // Actions
      setTheme: (theme) => set({ theme }),
      
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'dark' ? 'light' : 'dark',
        })),
      
      setLanguage: (language) => set({ language }),
      
      toggleLanguage: () =>
        set((state) => ({
          language: state.language === 'en' ? 'de' : 'en',
        })),
      
      setResumePdfPath: (path) => set({ resumePdfPath: path }),
      
      // Download resume - Force download the static PDF
      downloadResume: async (): Promise<DownloadResult> => {
        try {
          const state = get();
          
          console.log('Starting PDF download from:', state.resumePdfPath);
          
          // Fetch the static PDF file
          const response = await fetch(state.resumePdfPath);
          
          if (!response.ok) {
            throw new Error(`Failed to fetch resume PDF: ${response.status} ${response.statusText}`);
          }
          
          console.log('PDF fetched successfully, size:', response.headers.get('content-length'));
          
          // Get the blob
          const blob = await response.blob();
          console.log('Blob created, type:', blob.type, 'size:', blob.size);
          
          // Create blob URL with explicit PDF type
          const pdfBlob = new Blob([blob], { type: 'application/pdf' });
          const blobUrl = URL.createObjectURL(pdfBlob);
          
          console.log('Blob URL created:', blobUrl);
          
          // Create invisible download link
          const link = document.createElement('a');
          link.href = blobUrl;
          link.download = 'Muhammad_Omar_Muneer_Resume.pdf'; // Forces download
          link.style.display = 'none';
          
          // Add to DOM and trigger
          document.body.appendChild(link);
          console.log('Triggering download...');
          link.click();
          
          // Cleanup after a delay
          setTimeout(() => {
            document.body.removeChild(link);
            URL.revokeObjectURL(blobUrl);
            console.log('Download triggered, cleanup done');
          }, 100);
          
          return { success: true, message: 'Resume download started' };
        } catch (error) {
          console.error('Error downloading resume:', error);
          return { 
            success: false, 
            message: 'Failed to download resume', 
            error: error as Error 
          };
        }
      },
    }),
    {
      name: 'my-resume-storage',
      partialize: (state) => ({
        theme: state.theme,
        language: state.language,
      }),
    }
  )
);

export default useMyResumeStore;

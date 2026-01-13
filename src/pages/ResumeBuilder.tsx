import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ResumePreview from '../components/ResumePreview';
import useResumeStore from '../store/resumeStore';
import { getServices } from '@/services';

const { resumeService } = getServices();

function ResumeBuilder(): JSX.Element {
  const { resumeId } = useParams<{ resumeId?: string }>();
  const { showPreview, resumeData } = useResumeStore();
  const [loading, setLoading] = useState(false);
  const [currentResumeName, setCurrentResumeName] = useState('Untitled Resume');

  useEffect(() => {
    if (resumeId) {
      loadResume(resumeId);
    }
  }, [resumeId]);

  const loadResume = async (id: string) => {
    setLoading(true);
    try {
      const result = await resumeService.get(id);
      if (result.success && result.data) {
        // Update the Zustand store with the loaded resume data
        useResumeStore.setState({
          resumeData: result.data.data,
          selectedTemplate: (result.data.metadata?.template as any) || 'modern',
        });
        setCurrentResumeName(result.data.name);
      }
    } catch (error) {
      console.error('Failed to load resume:', error);
    } finally {
      setLoading(false);
    }
  };

  // Auto-save functionality
  useEffect(() => {
    if (!resumeId) return;

    const autoSave = async () => {
      try {
        await resumeService.update(resumeId, {
          data: resumeData,
          name: currentResumeName,
        });
      } catch (error) {
        console.error('Auto-save failed:', error);
      }
    };

    // Debounce auto-save
    const timeoutId = setTimeout(autoSave, 2000);
    return () => clearTimeout(timeoutId);
  }, [resumeId, resumeData, currentResumeName]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading resume...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200">
      <Header resumeName={currentResumeName} resumeId={resumeId} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar />
          </div>

          {/* Resume Preview */}
          {showPreview && (
            <div className="lg:col-span-2">
              <ResumePreview />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResumeBuilder;

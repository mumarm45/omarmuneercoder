import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header, { LinkedLanguage } from '../components/Header';
import Sidebar from '../components/Sidebar';
import ResumePreview from '../components/ResumePreview';
import LanguagePicker, { SupportedLanguage } from '../components/LanguagePicker';
import useResumeStore from '../store/resumeStore';
import { getServices } from '@/services';

const { resumeService } = getServices();

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

function ResumeBuilder(): JSX.Element {
  const { resumeId } = useParams<{ resumeId?: string }>();
  const navigate = useNavigate();
  const { showPreview, resumeData, selectedTemplate } = useResumeStore();

  const [loading, setLoading] = useState(false);
  const [currentResumeName, setCurrentResumeName] = useState('Untitled Resume');
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');

  // Language state
  const [resumeLanguage, setResumeLanguage] = useState('en');
  const [linkedLanguages, setLinkedLanguages] = useState<LinkedLanguage[]>([]);
  const [showInitialPicker, setShowInitialPicker] = useState(!resumeId);
  const [showAddLanguagePicker, setShowAddLanguagePicker] = useState(false);

  useEffect(() => {
    if (resumeId) {
      loadResume(resumeId);
    }
  }, [resumeId]);

  const loadLinkedLanguages = useCallback(async (currentId: string, parentId?: string) => {
    const rootId = parentId || currentId;
    const listResult = await resumeService.list();
    if (listResult.success && listResult.data) {
      const linked: LinkedLanguage[] = listResult.data
        .filter(r => r.id === rootId || r.metadata?.parentId === rootId)
        .map(r => ({
          id: r.id,
          language: r.metadata?.language || 'en',
          name: r.name,
        }));
      setLinkedLanguages(linked);
    }
  }, []);

  const loadResume = async (id: string) => {
    setLoading(true);
    try {
      const result = await resumeService.get(id);
      if (result.success && result.data) {
        useResumeStore.setState({
          resumeData: result.data.data,
          selectedTemplate: (result.data.metadata?.template as any) || 'modern',
        });
        setCurrentResumeName(result.data.name);
        setResumeLanguage(result.data.metadata?.language || 'en');
        await loadLinkedLanguages(id, result.data.metadata?.parentId);
      }
    } catch (error) {
      console.error('Failed to load resume:', error);
    } finally {
      setLoading(false);
    }
  };

  // Saves current resume; returns the saved resume ID (existing or newly created)
  const saveAndGetId = useCallback(async (): Promise<string | null> => {
    setSaveStatus('saving');
    try {
      if (resumeId) {
        const result = await resumeService.update(resumeId, {
          data: resumeData,
          name: currentResumeName,
          metadata: { template: selectedTemplate, language: resumeLanguage },
        });
        setSaveStatus(result.success ? 'saved' : 'error');
        return result.success ? resumeId : null;
      } else {
        const result = await resumeService.create(
          currentResumeName,
          resumeData,
          { template: selectedTemplate, language: resumeLanguage }
        );
        if (result.success && result.data) {
          setSaveStatus('saved');
          navigate(`/builder/${result.data.id}`, { replace: true });
          return result.data.id;
        }
        setSaveStatus('error');
        return null;
      }
    } catch {
      setSaveStatus('error');
      return null;
    } finally {
      setTimeout(() => setSaveStatus('idle'), 2500);
    }
  }, [resumeId, resumeData, currentResumeName, selectedTemplate, resumeLanguage, navigate]);

  const handleSave = useCallback(async () => {
    await saveAndGetId();
  }, [saveAndGetId]);

  /** Called when user picks a language on a new (unsaved) resume */
  const handleInitialLanguagePick = useCallback((lang: SupportedLanguage) => {
    setResumeLanguage(lang.code);
    setShowInitialPicker(false);
  }, []);

  /** Called when user picks a language to add a new version */
  const handleAddLanguage = useCallback(async (lang: SupportedLanguage) => {
    setShowAddLanguagePicker(false);

    // Need a saved resumeId first
    const currentId = resumeId ?? await saveAndGetId();
    if (!currentId) return;

    // Root of the language group: if this resume already has a parentId, use that; else it IS the root
    const currentResult = await resumeService.get(currentId);
    const rootId = currentResult.data?.metadata?.parentId || currentId;

    // Create the new language version
    const result = await resumeService.create(
      `${currentResumeName} (${lang.name})`,
      resumeData,
      { template: selectedTemplate, language: lang.code, parentId: rootId }
    );

    if (result.success && result.data) {
      // Also ensure the root resume has parentId pointing to itself so filtering works
      if (!currentResult.data?.metadata?.parentId) {
        await resumeService.update(currentId, {
          metadata: { ...currentResult.data?.metadata, parentId: rootId }
        });
      }
      navigate(`/builder/${result.data.id}`);
    }
  }, [resumeId, saveAndGetId, currentResumeName, resumeData, selectedTemplate, navigate]);

  const handleSwitchLanguage = useCallback((id: string) => {
    navigate(`/builder/${id}`);
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-400 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading resume...</p>
        </div>
      </div>
    );
  }

  // Already-used language codes (to exclude from add-language picker)
  const usedLanguageCodes = linkedLanguages.map(l => l.language);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-900">
      {/* Initial language picker — shown for brand-new resumes */}
      {showInitialPicker && (
        <LanguagePicker
          onSelect={handleInitialLanguagePick}
          title="What language is this resume in?"
          description="You can add more language versions later from the header"
        />
      )}

      {/* Add-language picker */}
      {showAddLanguagePicker && (
        <LanguagePicker
          onSelect={handleAddLanguage}
          excludeCodes={usedLanguageCodes}
          title="Add a language version"
          description="A copy of this resume will be created for the selected language"
        />
      )}

      <Header
        resumeName={currentResumeName}
        resumeId={resumeId}
        onSave={handleSave}
        saveStatus={saveStatus}
        onNameChange={setCurrentResumeName}
        resumeLanguage={resumeLanguage}
        linkedLanguages={linkedLanguages}
        onAddLanguage={() => setShowAddLanguagePicker(true)}
        onSwitchLanguage={handleSwitchLanguage}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* LEFT: dark sidebar */}
        <aside className="w-[360px] shrink-0 bg-slate-900 border-r border-slate-700/60 flex flex-col overflow-hidden">
          <Sidebar />
        </aside>

        {/* RIGHT: light canvas */}
        <main className="flex-1 overflow-y-auto bg-slate-100">
          {showPreview ? (
            <div className="min-h-full flex flex-col items-center py-10 px-6">
              <ResumePreview />
            </div>
          ) : (
            <div className="min-h-full flex flex-col items-center justify-center text-slate-400">
              <p className="text-lg font-medium">Preview hidden</p>
              <p className="text-sm mt-1">Click "Show" in the header to reveal the resume canvas</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default ResumeBuilder;

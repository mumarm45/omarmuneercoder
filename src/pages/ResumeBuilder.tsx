import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ResumePreview from '../components/ResumePreview';
import useResumeStore from '../store/resumeStore';

function ResumeBuilder(): JSX.Element {
  const { showPreview } = useResumeStore();

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, FileText, Sparkles } from 'lucide-react';
import { getServices } from '@/services';
import { ResumeData, TemplateType } from '@/types';

const { resumeService } = getServices();

interface CreateResumeDialogProps {
  onClose: () => void;
  onSuccess: () => void;
}

const TEMPLATES: Array<{ id: TemplateType; name: string; description: string; color: string }> = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and contemporary design',
    color: 'from-slate-600 to-slate-700',
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional and professional',
    color: 'from-slate-700 to-slate-800',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and elegant',
    color: 'from-slate-500 to-slate-600',
  },
];

function CreateResumeDialog({ onClose, onSuccess }: CreateResumeDialogProps): JSX.Element {
  const navigate = useNavigate();
  const [step, setStep] = useState<'name' | 'template' | 'method'>('name');
  const [resumeName, setResumeName] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('modern');
  const [creationMethod, setCreationMethod] = useState<'scratch' | 'sample'>('scratch');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreate = async () => {
    if (!resumeName.trim()) {
      setError('Please enter a resume name');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Create initial resume data based on method
      const initialData: ResumeData = creationMethod === 'scratch'
        ? getEmptyResumeData()
        : getSampleResumeData();

      const result = await resumeService.create(resumeName, initialData, {
        template: selectedTemplate,
      });

      if (result.success && result.data) {
        onSuccess();
        // Navigate to builder with the new resume ID
        navigate(`/builder/${result.data.id}`);
      } else {
        setError(result.message || 'Failed to create resume');
      }
    } catch (err) {
      setError('An error occurred while creating the resume');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getEmptyResumeData = (): ResumeData => ({
    personalInfo: {
      name: '',
      title: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      portfolio: '',
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
  });

  const getSampleResumeData = (): ResumeData => ({
    personalInfo: {
      name: 'John Doe',
      title: 'Software Engineer',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      linkedin: 'linkedin.com/in/johndoe',
      portfolio: 'johndoe.dev',
    },
    summary: 'Experienced software engineer with 5+ years of expertise in full-stack development.',
    experience: [
      {
        id: 1,
        title: 'Senior Software Engineer',
        company: 'Tech Corp',
        location: 'San Francisco, CA',
        startDate: '2021',
        endDate: 'Present',
        description: '• Led development of scalable web applications\n• Mentored junior developers',
      },
    ],
    education: [
      {
        id: 1,
        degree: 'Bachelor of Science in Computer Science',
        school: 'University of Technology',
        location: 'Boston, MA',
        year: '2019',
      },
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS'],
  });

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900">Create New Resume</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Step 1: Resume Name */}
          {step === 'name' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Resume Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={resumeName}
                  onChange={(e) => setResumeName(e.target.value)}
                  placeholder="e.g., Software Engineer Resume"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  autoFocus
                />
                <p className="mt-2 text-sm text-slate-500">
                  Give your resume a name to help you identify it later
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Template Selection */}
          {step === 'template' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Choose a Template
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {TEMPLATES.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id)}
                      className={`p-6 rounded-xl border-2 transition-all ${
                        selectedTemplate === template.id
                          ? 'border-slate-900 bg-slate-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div
                        className={`w-full aspect-[3/4] rounded-lg bg-gradient-to-br ${template.color} mb-4`}
                      />
                      <h4 className="font-semibold text-slate-900 mb-1">
                        {template.name}
                      </h4>
                      <p className="text-sm text-slate-600">{template.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Creation Method */}
          {step === 'method' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  How would you like to start?
                </h3>
                <div className="space-y-4">
                  <button
                    onClick={() => setCreationMethod('scratch')}
                    className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
                      creationMethod === 'scratch'
                        ? 'border-slate-900 bg-slate-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-6 h-6 text-slate-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-900 mb-1">
                          Start from Scratch
                        </h4>
                        <p className="text-sm text-slate-600">
                          Begin with a blank resume and fill in your information
                        </p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setCreationMethod('sample')}
                    className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
                      creationMethod === 'sample'
                        ? 'border-slate-900 bg-slate-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-900 mb-1">
                          Start with Sample Data
                        </h4>
                        <p className="text-sm text-slate-600">
                          Use sample content as a starting point and customize it
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            {['name', 'template', 'method'].map((s, index) => (
              <div
                key={s}
                className={`w-2 h-2 rounded-full transition-colors ${
                  ['name', 'template', 'method'].indexOf(step) >= index
                    ? 'bg-slate-900'
                    : 'bg-slate-300'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-3">
            {step !== 'name' && (
              <button
                onClick={() => {
                  if (step === 'template') setStep('name');
                  if (step === 'method') setStep('template');
                }}
                className="px-6 py-2.5 text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Back
              </button>
            )}
            <button
              onClick={() => {
                if (step === 'name' && resumeName.trim()) {
                  setStep('template');
                  setError('');
                } else if (step === 'template') {
                  setStep('method');
                } else if (step === 'method') {
                  handleCreate();
                } else {
                  setError('Please enter a resume name');
                }
              }}
              disabled={loading || (step === 'name' && !resumeName.trim())}
              className="px-6 py-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating...
                </span>
              ) : step === 'method' ? (
                'Create Resume'
              ) : (
                'Continue'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateResumeDialog;

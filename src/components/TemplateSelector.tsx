import { Check } from 'lucide-react';
import useResumeStore from '@store/resumeStore';
import { TemplateType } from '@/types';

interface Template {
  id: TemplateType;
  name: string;
  description: string;
}

const TEMPLATES: Template[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean gradient header'
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional & professional'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple & elegant'
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Bold & authoritative'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Vibrant & expressive'
  },
];

// Mini template preview component
function TemplatePreview({ template }: { template: TemplateType }) {
  const previewStyles: Record<string, string> = {
    modern: 'bg-gradient-to-r from-slate-700 to-slate-600',
    classic: 'bg-slate-800',
    minimal: 'bg-white border-b-4 border-slate-600',
    professional: 'bg-gradient-to-r from-blue-800 to-blue-700',
    creative: 'bg-gradient-to-r from-pink-500 to-rose-500',
  };

  return (
    <div className="w-full aspect-[3/4] bg-white rounded-lg overflow-hidden border border-slate-600 shadow-sm">
      {/* Header */}
      <div className={`h-8 ${previewStyles[template]}`}>
        {template !== 'minimal' && (
          <div className="h-full flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-white/30"></div>
          </div>
        )}
      </div>

      {/* Content Lines */}
      <div className="p-2 space-y-1.5">
        <div className="h-1 bg-slate-900 rounded w-3/4"></div>
        <div className="h-0.5 bg-slate-300 rounded w-1/2"></div>

        <div className="mt-2 space-y-1">
          <div className="h-0.5 bg-slate-200 rounded w-full"></div>
          <div className="h-0.5 bg-slate-200 rounded w-full"></div>
          <div className="h-0.5 bg-slate-200 rounded w-5/6"></div>
        </div>

        <div className="mt-3 space-y-1">
          <div className="h-1 bg-slate-700 rounded w-1/3"></div>
          <div className="h-0.5 bg-slate-300 rounded w-2/3"></div>
          <div className="h-0.5 bg-slate-200 rounded w-full"></div>
          <div className="h-0.5 bg-slate-200 rounded w-4/5"></div>
        </div>

        <div className="mt-2 flex gap-1">
          <div className="h-3 w-10 bg-slate-100 rounded-full"></div>
          <div className="h-3 w-10 bg-slate-100 rounded-full"></div>
          <div className="h-3 w-10 bg-slate-100 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

function TemplateSelector(): JSX.Element {
  const { selectedTemplate, setTemplate } = useResumeStore();

  return (
    <div className="bg-transparent">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-1">
        Choose Template
      </p>

      <div className="grid grid-cols-2 gap-3">
        {TEMPLATES.map((template) => (
          <button
            key={template.id}
            onClick={() => setTemplate(template.id)}
            className={`relative group rounded-lg border-2 transition-all ${
              selectedTemplate === template.id
                ? 'border-blue-400 shadow-lg shadow-blue-400/20'
                : 'border-slate-700 hover:border-slate-500 hover:shadow-md'
            }`}
          >
            {/* Template Preview */}
            <div className="p-2">
              <TemplatePreview template={template.id} />
            </div>

            {/* Template Info */}
            <div className="px-3 pb-3">
              <h3 className={`font-semibold text-sm mb-0.5 ${
                selectedTemplate === template.id ? 'text-slate-200' : 'text-slate-200'
              }`}>
                {template.name}
              </h3>
              <p className="text-xs text-slate-500">{template.description}</p>
            </div>

            {/* Selected Indicator */}
            {selectedTemplate === template.id && (
              <div className="absolute top-3 right-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TemplateSelector;

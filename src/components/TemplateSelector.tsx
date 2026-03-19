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
    description: 'Clean gradient header',
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional & professional',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple & elegant',
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Bold & authoritative',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Vibrant & expressive',
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
    <div className="aspect-[3/4] w-full overflow-hidden rounded-lg border border-slate-600 bg-white shadow-sm">
      {/* Header */}
      <div className={`h-8 ${previewStyles[template]}`}>
        {template !== 'minimal' && (
          <div className="flex h-full items-center justify-center">
            <div className="h-4 w-4 rounded-full bg-white/30" />
          </div>
        )}
      </div>

      {/* Content Lines */}
      <div className="space-y-1.5 p-2">
        <div className="h-1 w-3/4 rounded bg-slate-900" />
        <div className="h-0.5 w-1/2 rounded bg-slate-300" />

        <div className="mt-2 space-y-1">
          <div className="h-0.5 w-full rounded bg-slate-200" />
          <div className="h-0.5 w-full rounded bg-slate-200" />
          <div className="h-0.5 w-5/6 rounded bg-slate-200" />
        </div>

        <div className="mt-3 space-y-1">
          <div className="h-1 w-1/3 rounded bg-slate-700" />
          <div className="h-0.5 w-2/3 rounded bg-slate-300" />
          <div className="h-0.5 w-full rounded bg-slate-200" />
          <div className="h-0.5 w-4/5 rounded bg-slate-200" />
        </div>

        <div className="mt-2 flex gap-1">
          <div className="h-3 w-10 rounded-full bg-slate-100" />
          <div className="h-3 w-10 rounded-full bg-slate-100" />
          <div className="h-3 w-10 rounded-full bg-slate-100" />
        </div>
      </div>
    </div>
  );
}

function TemplateSelector(): JSX.Element {
  const { selectedTemplate, setTemplate } = useResumeStore();

  return (
    <div className="bg-transparent">
      <p className="mb-3 px-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
        Choose Template
      </p>

      <div className="grid grid-cols-2 gap-3">
        {TEMPLATES.map((template) => (
          <button
            key={template.id}
            onClick={() => setTemplate(template.id)}
            className={`group relative rounded-lg border-2 transition-all ${
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
              <h3
                className={`mb-0.5 text-sm font-semibold ${
                  selectedTemplate === template.id ? 'text-slate-200' : 'text-slate-200'
                }`}
              >
                {template.name}
              </h3>
              <p className="text-xs text-slate-500">{template.description}</p>
            </div>

            {/* Selected Indicator */}
            {selectedTemplate === template.id && (
              <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TemplateSelector;

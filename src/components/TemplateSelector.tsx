import useResumeStore from '@store/resumeStore';
import { TEMPLATES } from '@utils/constants';
import { TemplateType } from '../types';

function TemplateSelector(): JSX.Element {
  const { selectedTemplate, setTemplate } = useResumeStore();

  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-4 text-slate-800">Choose Template</h2>
      <div className="grid grid-cols-2 gap-3">
        {TEMPLATES.map((template) => (
          <button
            key={template.id}
            onClick={() => setTemplate(template.id as TemplateType)}
            className={`p-4 rounded-lg border-2 transition duration-200 ${
              selectedTemplate === template.id
                ? 'border-slate-600 bg-slate-50'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className={`w-full h-16 ${template.color} rounded mb-2`}></div>
            <p className="text-sm font-medium text-slate-700">{template.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default TemplateSelector;

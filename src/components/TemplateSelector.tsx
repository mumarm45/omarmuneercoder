
import useResumeStore from '@store/resumeStore';
import { TEMPLATES } from '@utils/constants';
import { TemplateType } from '../types';

function TemplateSelector(): JSX.Element {
  const { selectedTemplate, setTemplate } = useResumeStore();

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Choose Template</h2>
      <div className="grid grid-cols-2 gap-3">
        {TEMPLATES.map((template) => (
          <button
            key={template.id}
            onClick={() => setTemplate(template.id as TemplateType)}
            className={`p-4 rounded-lg border-2 transition duration-200 ${
              selectedTemplate === template.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className={`w-full h-16 ${template.color} rounded mb-2`}></div>
            <p className="text-sm font-medium text-gray-700">{template.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default TemplateSelector;

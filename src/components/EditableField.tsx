import { useState } from 'react';
import { Edit2, Save } from 'lucide-react';

interface EditableFieldProps {
  value: string;
  onSave: (value: string) => void;
  multiline?: boolean;
  className?: string;
  placeholder?: string;
  inputClassName?: string;
}

function EditableField({ 
  value, 
  onSave, 
  multiline = false, 
  className = '',
  placeholder = '',
  inputClassName = ''
}: EditableFieldProps): JSX.Element {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<string>(value);

  const handleSave = (): void => {
    onSave(editValue);
    setIsEditing(false);
  };

  const handleCancel = (): void => {
    setEditValue(value);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="space-y-2">
        {multiline ? (
          <textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className={`w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputClassName}`}
            placeholder={placeholder}
            rows={4}
            autoFocus
          />
        ) : (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className={`w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputClassName}`}
            placeholder={placeholder}
            autoFocus
          />
        )}
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
          >
            <Save className="w-4 h-4" />
            Save
          </button>
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded transition"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative group ${className}`}>
      <button
        onClick={() => setIsEditing(true)}
        className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 p-2 bg-gray-100 hover:bg-gray-200 rounded transition"
      >
        <Edit2 className="w-4 h-4 text-gray-600" />
      </button>
      {multiline ? (
        <p className="whitespace-pre-line">{value}</p>
      ) : (
        <span>{value}</span>
      )}
    </div>
  );
}

export default EditableField;

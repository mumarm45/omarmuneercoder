import { useState } from 'react';
import { Edit2, Save } from 'lucide-react';
import { theme } from '@/theme/colors';
import { cn } from '@/hooks/useTheme';

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
  inputClassName = '',
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
            className={cn('input-field', inputClassName)}
            placeholder={placeholder}
            rows={4}
            autoFocus
          />
        ) : (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className={cn('input-field', inputClassName)}
            placeholder={placeholder}
            autoFocus
          />
        )}
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className={cn(
              'flex items-center gap-2 rounded px-4 py-2 transition',
              theme.buttons.primary
            )}
          >
            <Save className="h-4 w-4" />
            Save
          </button>
          <button
            onClick={handleCancel}
            className={cn('rounded px-4 py-2 transition', theme.buttons.secondary)}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`group relative ${className}`}>
      <button
        onClick={() => setIsEditing(true)}
        className={cn(
          'absolute right-0 top-0 rounded p-2 opacity-0 transition group-hover:opacity-100',
          theme.buttons.secondary
        )}
      >
        <Edit2 className={cn('h-4 w-4', theme.text.secondary.light)} />
      </button>
      {multiline ? <p className="whitespace-pre-line">{value}</p> : <span>{value}</span>}
    </div>
  );
}

export default EditableField;


import { X } from 'lucide-react';
import { theme } from '@/theme/colors';
import { cn } from '@/hooks/useTheme';

type DialogSize = 'sm' | 'md' | 'lg' | 'xl';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: DialogSize;
}

function Dialog({ isOpen, onClose, title, children, size = 'md' }: DialogProps): JSX.Element | null {
  if (!isOpen) return null;

  const sizeClasses: Record<DialogSize, string> = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div 
          className={cn('relative rounded-lg shadow-xl w-full max-h-[90vh] overflow-y-auto', theme.backgrounds.card.light, sizeClasses[size])}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className={cn('sticky top-0 border-b px-6 py-4 flex items-center justify-between z-10', theme.backgrounds.card.light, theme.borders.light)}>
            <h2 className={cn('text-xl font-semibold', theme.text.heading)}>{title}</h2>
            <button
              onClick={onClose}
              className={cn('p-2 rounded-lg transition', theme.buttons.secondary)}
            >
              <X className={cn('w-5 h-5', theme.text.muted.light)} />
            </button>
          </div>
          
          {/* Content */}
          <div className="px-6 py-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dialog;

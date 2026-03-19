import { useEffect } from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  duration?: number;
  onClose: () => void;
}

function Toast({ message, type, duration = 3000, onClose }: ToastProps): JSX.Element {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const styles = {
    success: `bg-green-50 border-green-200 text-green-800`,
    error: `bg-red-50 border-red-200 text-red-800`,
  };

  const Icon = type === 'success' ? CheckCircle : AlertCircle;

  return (
    <div
      className={`animate-fade-in fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded-lg border 
                  px-4 py-3 shadow-lg ${styles[type]}`}
      role="alert"
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      <p className="font-medium">{message}</p>
      <button
        onClick={onClose}
        className="ml-2 transition-opacity hover:opacity-70"
        aria-label="Close notification"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export default Toast;

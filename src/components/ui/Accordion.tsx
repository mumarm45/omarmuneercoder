import { useState, ReactNode } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface AccordionProps {
  children: ReactNode;
  defaultOpenItems?: string[];
}

interface AccordionItemProps {
  id: string;
  title: string;
  icon?: ReactNode;
  badge?: number;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function Accordion({ children }: AccordionProps) {
  return <div className="space-y-2">{children}</div>;
}

export function AccordionItem({
  title,
  icon,
  badge,
  children,
  defaultOpen = false
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          {icon && <div className="flex-shrink-0">{icon}</div>}
          <span className="font-semibold text-slate-900">{title}</span>
          {badge !== undefined && badge > 0 && (
            <span className="px-2 py-0.5 bg-slate-900 text-white text-xs rounded-full">
              {badge}
            </span>
          )}
        </div>
        
        {isOpen ? (
          <ChevronDown className="w-5 h-5 text-slate-600" />
        ) : (
          <ChevronRight className="w-5 h-5 text-slate-600" />
        )}
      </button>

      {/* Content */}
      {isOpen && (
        <div className="p-4 pt-0 border-t border-slate-100">
          {children}
        </div>
      )}
    </div>
  );
}

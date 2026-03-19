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
  defaultOpen = false,
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-4 transition-colors hover:bg-slate-50"
      >
        <div className="flex items-center gap-3">
          {icon && <div className="flex-shrink-0">{icon}</div>}
          <span className="font-semibold text-slate-900">{title}</span>
          {badge !== undefined && badge > 0 && (
            <span className="rounded-full bg-slate-900 px-2 py-0.5 text-xs text-white">
              {badge}
            </span>
          )}
        </div>

        {isOpen ? (
          <ChevronDown className="h-5 w-5 text-slate-600" />
        ) : (
          <ChevronRight className="h-5 w-5 text-slate-600" />
        )}
      </button>

      {/* Content */}
      {isOpen && <div className="border-t border-slate-100 p-4 pt-0">{children}</div>}
    </div>
  );
}

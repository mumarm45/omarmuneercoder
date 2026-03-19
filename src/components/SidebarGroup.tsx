import { ChevronDown, LucideIcon } from 'lucide-react';
import { ReactNode, useState } from 'react';

interface SidebarGroupProps {
  title: string;
  icon: LucideIcon;
  children: ReactNode;
  defaultExpanded?: boolean;
  badge?: number;
}

function SidebarGroup({
  title,
  icon: Icon,
  children,
  defaultExpanded = true,
  badge
}: SidebarGroupProps): JSX.Element {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700/60 overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-slate-700/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg flex items-center justify-center">
            <Icon className="w-4 h-4 text-white" />
          </div>
          <h3 className="font-semibold text-slate-100">{title}</h3>
          {badge !== undefined && badge > 0 && (
            <span className="px-2 py-0.5 bg-slate-700 text-slate-300 text-xs rounded-full font-medium">
              {badge}
            </span>
          )}
        </div>

        <ChevronDown
          className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Content — CSS grid height animation */}
      <div
        className={`grid transition-all duration-300 ${isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4 space-y-4 border-t border-slate-700/60">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SidebarGroup;

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
  badge,
}: SidebarGroupProps): JSX.Element {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700/60 dark:bg-slate-800">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between p-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-slate-400 to-slate-500 dark:from-slate-600 dark:to-slate-700">
            <Icon className="h-4 w-4 text-white" />
          </div>
          <h3 className="font-semibold text-slate-700 dark:text-slate-100">{title}</h3>
          {badge !== undefined && badge > 0 && (
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300">
              {badge}
            </span>
          )}
        </div>

        <ChevronDown
          className={`h-5 w-5 text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Content — CSS grid height animation */}
      <div
        className={`grid transition-all duration-300 ${isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <div className="space-y-4 border-t border-slate-200 px-4 pb-4 dark:border-slate-700/60">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SidebarGroup;

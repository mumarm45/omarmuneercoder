import { Trophy, Calendar, Pencil, Trash2 } from 'lucide-react';
import { Award } from '@/types';

interface AwardCardProps {
  award: Award;
  onEdit: (award: Award) => void;
  onDelete: (id: number) => void;
}

function AwardCard({ award, onEdit, onDelete }: AwardCardProps): JSX.Element {
  return (
    <div className="group rounded-lg border border-slate-200 bg-white p-4 transition-all hover:shadow-md">
      <div className="mb-2 flex items-start justify-between">
        <div className="flex flex-1 gap-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-500 to-amber-500">
            <Trophy className="h-5 w-5 text-white" />
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="mb-1 font-semibold text-slate-900">{award.title}</h4>
            <p className="text-sm text-slate-600">{award.issuer}</p>
            <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
              <Calendar className="h-3 w-3" />
              <span>{award.date}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={() => onEdit(award)}
            className="rounded p-1.5 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
            title="Edit"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(award.id)}
            className="rounded p-1.5 text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Description */}
      {award.description && (
        <p className="mt-2 line-clamp-2 text-sm text-slate-600">{award.description}</p>
      )}
    </div>
  );
}

export default AwardCard;

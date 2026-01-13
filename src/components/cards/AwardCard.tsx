import { Trophy, Calendar, Pencil, Trash2 } from 'lucide-react';
import { Award } from '@/types';

interface AwardCardProps {
  award: Award;
  onEdit: (award: Award) => void;
  onDelete: (id: number) => void;
}

function AwardCard({ award, onEdit, onDelete }: AwardCardProps): JSX.Element {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-all group">
      <div className="flex items-start justify-between mb-2">
        <div className="flex gap-3 flex-1">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <Trophy className="w-5 h-5 text-white" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-slate-900 mb-1">{award.title}</h4>
            <p className="text-sm text-slate-600">{award.issuer}</p>
            <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
              <Calendar className="w-3 h-3" />
              <span>{award.date}</span>
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(award)}
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
            title="Edit"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(award.id)}
            className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Description */}
      {award.description && (
        <p className="text-sm text-slate-600 mt-2 line-clamp-2">{award.description}</p>
      )}
    </div>
  );
}

export default AwardCard;

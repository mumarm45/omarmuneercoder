import { ExternalLink, Calendar, Pencil, Trash2, Award } from 'lucide-react';
import { Certification } from '@/types';

interface CertificationCardProps {
  certification: Certification;
  onEdit: (certification: Certification) => void;
  onDelete: (id: number) => void;
}

function CertificationCard({ certification, onEdit, onDelete }: CertificationCardProps): JSX.Element {
  const isExpired = certification.expiryDate && new Date(certification.expiryDate) < new Date();

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-all group">
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex gap-3 flex-1">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <Award className="w-5 h-5 text-white" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-slate-900 mb-1 truncate">{certification.name}</h4>
            <p className="text-sm text-slate-600">{certification.issuer}</p>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(certification)}
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
            title="Edit"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(certification.id)}
            className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Date & Expiry */}
      <div className="flex items-center gap-4 text-xs text-slate-500 mb-2">
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          <span>Issued {certification.date}</span>
        </div>
        {certification.expiryDate && (
          <span className={isExpired ? 'text-red-600' : 'text-slate-500'}>
            {isExpired ? 'Expired' : 'Valid until'} {certification.expiryDate}
          </span>
        )}
      </div>

      {/* Credential ID */}
      {certification.credentialId && (
        <div className="text-xs text-slate-500 mb-2">
          <span className="font-medium">ID:</span> {certification.credentialId}
        </div>
      )}

      {/* Verification Link */}
      {certification.link && (
        <a
          href={certification.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 transition-colors"
        >
          <ExternalLink className="w-3 h-3" />
          <span>Verify Credential</span>
        </a>
      )}
    </div>
  );
}

export default CertificationCard;

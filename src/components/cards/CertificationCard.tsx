import { ExternalLink, Calendar, Pencil, Trash2, Award } from 'lucide-react';
import { Certification } from '@/types';

interface CertificationCardProps {
  certification: Certification;
  onEdit: (certification: Certification) => void;
  onDelete: (id: number) => void;
}

function CertificationCard({
  certification,
  onEdit,
  onDelete,
}: CertificationCardProps): JSX.Element {
  const isExpired = certification.expiryDate && new Date(certification.expiryDate) < new Date();

  return (
    <div className="group rounded-lg border border-slate-200 bg-white p-4 transition-all hover:shadow-md">
      {/* Header */}
      <div className="mb-2 flex items-start justify-between">
        <div className="flex flex-1 gap-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-500">
            <Award className="h-5 w-5 text-white" />
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="mb-1 truncate font-semibold text-slate-900">{certification.name}</h4>
            <p className="text-sm text-slate-600">{certification.issuer}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={() => onEdit(certification)}
            className="rounded p-1.5 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
            title="Edit"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(certification.id)}
            className="rounded p-1.5 text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Date & Expiry */}
      <div className="mb-2 flex items-center gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
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
        <div className="mb-2 text-xs text-slate-500">
          <span className="font-medium">ID:</span> {certification.credentialId}
        </div>
      )}

      {/* Verification Link */}
      {certification.link && (
        <a
          href={certification.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-blue-600 transition-colors hover:text-blue-700"
        >
          <ExternalLink className="h-3 w-3" />
          <span>Verify Credential</span>
        </a>
      )}
    </div>
  );
}

export default CertificationCard;

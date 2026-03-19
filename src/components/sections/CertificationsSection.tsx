import { useState } from 'react';
import { Plus, Award } from 'lucide-react';
import useResumeStore from '@/store/resumeStore';
import CertificationCard from '../cards/CertificationCard';
import CertificationDialog from '../Dialogs/CertificationDialog';
import { Certification } from '@/types';

function CertificationsSection(): JSX.Element {
  const { resumeData, deleteCertification } = useResumeStore();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCertification, setEditingCertification] = useState<Certification | undefined>();

  const certifications = resumeData.certifications || [];

  const handleEdit = (certification: Certification) => {
    setEditingCertification(certification);
    setDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this certification?')) {
      deleteCertification(id);
    }
  };

  const handleClose = () => {
    setDialogOpen(false);
    setEditingCertification(undefined);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-amber-500 to-orange-500">
            <Award className="h-3.5 w-3.5 text-white" />
          </div>
          <h4 className="text-sm font-semibold text-slate-900">Certifications</h4>
          {certifications.length > 0 && (
            <span className="text-xs text-slate-500">({certifications.length})</span>
          )}
        </div>

        <button
          onClick={() => setDialogOpen(true)}
          className="inline-flex items-center gap-1 rounded-md bg-slate-900 px-2 py-1 text-xs text-white transition-colors hover:bg-slate-800"
        >
          <Plus className="h-3 w-3" />
          Add
        </button>
      </div>

      {/* Certifications List */}
      <div className="space-y-2">
        {certifications.length === 0 ? (
          <div className="rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-center">
            <Award className="mx-auto mb-2 h-10 w-10 text-slate-300" />
            <p className="mb-2 text-xs text-slate-500">No certifications yet</p>
            <button
              onClick={() => setDialogOpen(true)}
              className="text-xs font-medium text-blue-600 hover:text-blue-700"
            >
              Add your first certification
            </button>
          </div>
        ) : (
          certifications.map((certification) => (
            <CertificationCard
              key={certification.id}
              certification={certification}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

      {/* Dialog */}
      <CertificationDialog
        isOpen={dialogOpen}
        onClose={handleClose}
        certification={editingCertification}
      />
    </div>
  );
}

export default CertificationsSection;

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
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-amber-500 to-orange-500 rounded-md flex items-center justify-center">
            <Award className="w-3.5 h-3.5 text-white" />
          </div>
          <h4 className="text-sm font-semibold text-slate-900">Certifications</h4>
          {certifications.length > 0 && (
            <span className="text-xs text-slate-500">({certifications.length})</span>
          )}
        </div>

        <button
          onClick={() => setDialogOpen(true)}
          className="inline-flex items-center gap-1 px-2 py-1 bg-slate-900 text-white text-xs rounded-md hover:bg-slate-800 transition-colors"
        >
          <Plus className="w-3 h-3" />
          Add
        </button>
      </div>

      {/* Certifications List */}
      <div className="space-y-2">
        {certifications.length === 0 ? (
          <div className="text-center py-6 px-4 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200">
            <Award className="w-10 h-10 mx-auto mb-2 text-slate-300" />
            <p className="text-xs text-slate-500 mb-2">No certifications yet</p>
            <button
              onClick={() => setDialogOpen(true)}
              className="text-xs text-blue-600 hover:text-blue-700 font-medium"
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

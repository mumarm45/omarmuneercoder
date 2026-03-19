import { useState } from 'react';
import { X, Award, ExternalLink, Calendar } from 'lucide-react';
import { Certification } from '@/types';
import useResumeStore from '@/store/resumeStore';

interface CertificationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  certification?: Certification;
}

function CertificationDialog({
  isOpen,
  onClose,
  certification,
}: CertificationDialogProps): JSX.Element | null {
  const { addCertification, updateCertification } = useResumeStore();
  const [formData, setFormData] = useState<Certification>(
    certification || {
      id: Date.now(),
      name: '',
      issuer: '',
      date: '',
      expiryDate: '',
      credentialId: '',
      link: '',
    }
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (certification) {
      updateCertification(formData);
    } else {
      addCertification(formData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-500">
              <Award className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              {certification ? 'Edit Certification' : 'Add Certification'}
            </h2>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 transition-colors hover:bg-slate-100">
            <X className="h-5 w-5 text-slate-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-h-[calc(90vh-140px)] overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Certification Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Certification Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., AWS Certified Solutions Architect"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900"
                required
              />
            </div>

            {/* Issuing Organization */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Issuing Organization <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.issuer}
                onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                placeholder="e.g., Amazon Web Services (AWS)"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900"
                required
              />
            </div>

            {/* Dates */}
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  <Calendar className="mr-1 inline h-4 w-4" />
                  Issue Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  placeholder="e.g., Jan 2023"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Expiry Date</label>
                <input
                  type="text"
                  value={formData.expiryDate || ''}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  placeholder="e.g., Jan 2026 or No Expiration"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>
            </div>

            {/* Credential ID */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Credential ID</label>
              <input
                type="text"
                value={formData.credentialId || ''}
                onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
                placeholder="e.g., ABC123XYZ456"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
              <p className="mt-2 text-sm text-slate-500">
                Enter the unique credential ID if available
              </p>
            </div>

            {/* Credential URL */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                <ExternalLink className="mr-1 inline h-4 w-4" />
                Credential URL
              </label>
              <input
                type="url"
                value={formData.link || ''}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                placeholder="https://credentials.example.com/verify/abc123"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
              <p className="mt-2 text-sm text-slate-500">
                Link to verify or view the certification online
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 flex justify-end gap-3 border-t border-slate-200 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-6 py-2.5 text-slate-700 transition-colors hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-slate-900 px-6 py-2.5 text-white transition-colors hover:bg-slate-800"
            >
              {certification ? 'Update Certification' : 'Add Certification'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CertificationDialog;

import { useState } from 'react';
import { X, Trophy, Calendar } from 'lucide-react';
import { Award } from '@/types';
import useResumeStore from '@/store/resumeStore';

interface AwardDialogProps {
  isOpen: boolean;
  onClose: () => void;
  award?: Award;
}

function AwardDialog({ isOpen, onClose, award }: AwardDialogProps): JSX.Element | null {
  const { addAward, updateAward } = useResumeStore();
  const [formData, setFormData] = useState<Award>(
    award || {
      id: Date.now(),
      title: '',
      issuer: '',
      date: '',
      description: '',
    }
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (award) {
      updateAward(formData);
    } else {
      addAward(formData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-500 to-amber-500">
              <Trophy className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              {award ? 'Edit Award' : 'Add Award'}
            </h2>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 transition-colors hover:bg-slate-100">
            <X className="h-5 w-5 text-slate-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-h-[calc(90vh-140px)] overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Award Title */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Award Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Employee of the Year"
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
                placeholder="e.g., Tech Corp Inc."
                className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900"
                required
              />
            </div>

            {/* Date */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                <Calendar className="mr-1 inline h-4 w-4" />
                Date Received <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                placeholder="e.g., Dec 2023"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Description</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of the award and why you received it..."
                rows={4}
                className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
              <p className="mt-2 text-sm text-slate-500">
                Optional: Add context about the achievement
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
              {award ? 'Update Award' : 'Add Award'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AwardDialog;

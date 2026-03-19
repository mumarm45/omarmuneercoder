import { useState } from 'react';
import { Plus, Trophy } from 'lucide-react';
import useResumeStore from '@/store/resumeStore';
import AwardCard from '../cards/AwardCard';
import AwardDialog from '../Dialogs/AwardDialog';
import { Award } from '@/types';

function AwardsSection(): JSX.Element {
  const { resumeData, deleteAward } = useResumeStore();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAward, setEditingAward] = useState<Award | undefined>();

  const awards = resumeData.awards || [];

  const handleEdit = (award: Award) => {
    setEditingAward(award);
    setDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this award?')) {
      deleteAward(id);
    }
  };

  const handleClose = () => {
    setDialogOpen(false);
    setEditingAward(undefined);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-yellow-500 to-amber-500">
            <Trophy className="h-3.5 w-3.5 text-white" />
          </div>
          <h4 className="text-sm font-semibold text-slate-900">Awards</h4>
          {awards.length > 0 && <span className="text-xs text-slate-500">({awards.length})</span>}
        </div>

        <button
          onClick={() => setDialogOpen(true)}
          className="inline-flex items-center gap-1 rounded-md bg-slate-900 px-2 py-1 text-xs text-white transition-colors hover:bg-slate-800"
        >
          <Plus className="h-3 w-3" />
          Add
        </button>
      </div>

      {/* Awards List */}
      <div className="space-y-2">
        {awards.length === 0 ? (
          <div className="rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-center">
            <Trophy className="mx-auto mb-2 h-10 w-10 text-slate-300" />
            <p className="mb-2 text-xs text-slate-500">No awards yet</p>
            <button
              onClick={() => setDialogOpen(true)}
              className="text-xs font-medium text-blue-600 hover:text-blue-700"
            >
              Add your first award
            </button>
          </div>
        ) : (
          awards.map((award) => (
            <AwardCard key={award.id} award={award} onEdit={handleEdit} onDelete={handleDelete} />
          ))
        )}
      </div>

      {/* Dialog */}
      <AwardDialog isOpen={dialogOpen} onClose={handleClose} award={editingAward} />
    </div>
  );
}

export default AwardsSection;

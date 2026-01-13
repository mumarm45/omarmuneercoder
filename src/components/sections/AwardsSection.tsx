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
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-md flex items-center justify-center">
            <Trophy className="w-3.5 h-3.5 text-white" />
          </div>
          <h4 className="text-sm font-semibold text-slate-900">Awards</h4>
          {awards.length > 0 && (
            <span className="text-xs text-slate-500">({awards.length})</span>
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

      {/* Awards List */}
      <div className="space-y-2">
        {awards.length === 0 ? (
          <div className="text-center py-6 px-4 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200">
            <Trophy className="w-10 h-10 mx-auto mb-2 text-slate-300" />
            <p className="text-xs text-slate-500 mb-2">No awards yet</p>
            <button
              onClick={() => setDialogOpen(true)}
              className="text-xs text-blue-600 hover:text-blue-700 font-medium"
            >
              Add your first award
            </button>
          </div>
        ) : (
          awards.map((award) => (
            <AwardCard
              key={award.id}
              award={award}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

      {/* Dialog */}
      <AwardDialog
        isOpen={dialogOpen}
        onClose={handleClose}
        award={editingAward}
      />
    </div>
  );
}

export default AwardsSection;

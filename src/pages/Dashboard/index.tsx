import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, Plus, Clock, Star, Search, MoreVertical, Pencil, Copy, Trash2, Download } from 'lucide-react';
import { getServices, ResumeListItem } from '@/services';
import { formatDistanceToNow } from '@/utils/dateUtils';
import CreateResumeDialog from './CreateResumeDialog';
import { cn } from '@/hooks/useTheme';

const { resumeService } = getServices();

function Dashboard(): JSX.Element {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<ResumeListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [filterBy, setFilterBy] = useState<'all' | 'favorites'>('all');

  useEffect(() => {
    loadResumes();
  }, []);

  const loadResumes = async () => {
    setLoading(true);
    try {
      const result = filterBy === 'favorites' 
        ? await resumeService.getFavorites()
        : await resumeService.list();
      
      if (result.success && result.data) {
        setResumes(result.data);
      }
    } catch (error) {
      console.error('Failed to load resumes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const result = await resumeService.search(query);
      if (result.success && result.data) {
        setResumes(result.data);
      }
    } else {
      loadResumes();
    }
  };

  const handleDeleteResume = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      const result = await resumeService.delete(id);
      if (result.success) {
        loadResumes();
      }
    }
    setActiveMenu(null);
  };

  const handleDuplicateResume = async (id: string) => {
    const result = await resumeService.duplicate(id);
    if (result.success) {
      loadResumes();
    }
    setActiveMenu(null);
  };

  const handleToggleFavorite = async (id: string) => {
    await resumeService.toggleFavorite(id);
    loadResumes();
    setActiveMenu(null);
  };

  const handleEditResume = (id: string) => {
    navigate(`/builder/${id}`);
  };

  const filteredResumes = resumes.filter(resume =>
    resume.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-stone-50 to-slate-100">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 p-6">
        <Link to="/" className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900">ResumePro</span>
        </Link>

        <nav className="space-y-2">
          <button
            onClick={() => setFilterBy('all')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors",
              filterBy === 'all'
                ? "bg-slate-100 text-slate-900 font-medium"
                : "text-slate-600 hover:bg-slate-50"
            )}
          >
            <FileText className="w-5 h-5" />
            <span>Resume</span>
          </button>

          <button
            onClick={() => setFilterBy('favorites')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors",
              filterBy === 'favorites'
                ? "bg-slate-100 text-slate-900 font-medium"
                : "text-slate-600 hover:bg-slate-50"
            )}
          >
            <Star className="w-5 h-5" />
            <span>Favorites</span>
          </button>

          <Link
            to="/my-resume"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <Clock className="w-5 h-5" />
            <span>View My CV</span>
          </Link>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-gradient-to-br from-slate-100 to-slate-50 rounded-lg p-4 border border-slate-200">
            <p className="text-sm text-slate-600 mb-2">
              Need help? Check out our guide
            </p>
            <Link
              to="/guide"
              className="text-sm font-medium text-slate-900 hover:text-slate-700"
            >
              Learn more →
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">My Resumes</h1>
          <p className="text-slate-600">
            Your first resume is free forever. Need more than one resume?{' '}
            <Link to="/pricing" className="text-slate-900 font-medium hover:underline">
              Upgrade your plan
            </Link>
          </p>

          {/* Search Bar */}
          <div className="mt-6 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search resumes..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full max-w-md pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
            />
          </div>
        </div>

        {/* Resume Grid */}
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Create New Resume Card */}
              <button
                onClick={() => setShowCreateDialog(true)}
                className="group aspect-[3/4] border-2 border-dashed border-slate-300 rounded-xl hover:border-slate-400 transition-all duration-200 flex flex-col items-center justify-center gap-4 bg-white hover:bg-slate-50"
              >
                <div className="w-16 h-16 rounded-full bg-slate-100 group-hover:bg-slate-200 flex items-center justify-center transition-colors">
                  <Plus className="w-8 h-8 text-slate-600" />
                </div>
                <span className="text-lg font-medium text-slate-600 group-hover:text-slate-900">
                  New resume
                </span>
              </button>

              {/* Resume Cards */}
              {filteredResumes.map((resume) => (
                <div
                  key={resume.id}
                  className="group relative aspect-[3/4] bg-white rounded-xl border-2 border-slate-200 hover:border-slate-300 transition-all duration-200 overflow-hidden cursor-pointer hover:shadow-lg"
                  onClick={() => handleEditResume(resume.id)}
                >
                  {/* Resume Preview/Thumbnail */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white p-6">
                    <div className="w-full h-full border border-slate-200 rounded-lg bg-white p-4 overflow-hidden">
                      {/* Mock resume preview */}
                      <div className="space-y-3">
                        <div className="h-3 bg-slate-900 rounded w-3/4"></div>
                        <div className="h-2 bg-slate-300 rounded w-1/2"></div>
                        <div className="h-2 bg-slate-200 rounded w-2/3 mt-4"></div>
                        <div className="h-2 bg-slate-200 rounded w-full"></div>
                        <div className="h-2 bg-slate-200 rounded w-5/6"></div>
                        <div className="space-y-2 mt-6">
                          <div className="h-2 bg-slate-300 rounded w-1/3"></div>
                          <div className="h-2 bg-slate-200 rounded w-full"></div>
                          <div className="h-2 bg-slate-200 rounded w-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Favorite Badge */}
                  {resume.metadata?.favorite && (
                    <div className="absolute top-4 right-4 z-10">
                      <div className="bg-yellow-100 text-yellow-600 p-2 rounded-full">
                        <Star className="w-4 h-4 fill-current" />
                      </div>
                    </div>
                  )}

                  {/* Completeness Score Badge */}
                  {resume.metadata?.completenessScore && (
                    <div className="absolute top-4 left-4 z-10">
                      <div className="bg-white/90 backdrop-blur px-3 py-1 rounded-full border border-slate-200">
                        <span className="text-xs font-medium text-slate-700">
                          {resume.metadata.completenessScore}% complete
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Resume Info Footer */}
                  <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-slate-200 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-900 truncate">
                          {resume.name}
                        </h3>
                        <p className="text-sm text-slate-500">
                          edited {formatDistanceToNow(resume.updatedAt)} • A4
                        </p>
                      </div>

                      {/* Action Menu */}
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveMenu(activeMenu === resume.id ? null : resume.id);
                          }}
                          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-5 h-5 text-slate-600" />
                        </button>

                        {/* Dropdown Menu */}
                        {activeMenu === resume.id && (
                          <>
                            <div
                              className="fixed inset-0 z-20"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveMenu(null);
                              }}
                            />
                            <div className="absolute right-0 bottom-full mb-2 w-48 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-30">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditResume(resume.id);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                              >
                                <Pencil className="w-4 h-4" />
                                Edit
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDuplicateResume(resume.id);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                              >
                                <Copy className="w-4 h-4" />
                                Duplicate
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleToggleFavorite(resume.id);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                              >
                                <Star className={cn(
                                  "w-4 h-4",
                                  resume.metadata?.favorite && "fill-current text-yellow-500"
                                )} />
                                {resume.metadata?.favorite ? 'Remove from favorites' : 'Add to favorites'}
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // TODO: Implement download
                                }}
                                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                              >
                                <Download className="w-4 h-4" />
                                Download PDF
                              </button>
                              <hr className="my-2 border-slate-200" />
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteResume(resume.id);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4" />
                                Delete
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && filteredResumes.length === 0 && (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                <FileText className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">
                {searchQuery ? 'No resumes found' : 'No resumes yet'}
              </h3>
              <p className="text-slate-600 mb-6">
                {searchQuery
                  ? 'Try a different search term'
                  : 'Create your first resume to get started'}
              </p>
              {!searchQuery && (
                <button
                  onClick={() => setShowCreateDialog(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Create New Resume
                </button>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Create Resume Dialog */}
      {showCreateDialog && (
        <CreateResumeDialog
          onClose={() => setShowCreateDialog(false)}
          onSuccess={() => {
            setShowCreateDialog(false);
            loadResumes();
          }}
        />
      )}
    </div>
  );
}

export default Dashboard;

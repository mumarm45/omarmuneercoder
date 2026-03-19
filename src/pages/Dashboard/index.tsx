import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileText,
  Plus,
  Clock,
  Star,
  Search,
  MoreVertical,
  Pencil,
  Copy,
  Trash2,
  Download,
  LogOut,
  Sun,
  Moon,
} from 'lucide-react';
import { getServices, ResumeListItem } from '@/services';
import { formatDistanceToNow } from '@/utils/dateUtils';
import CreateResumeDialog from './CreateResumeDialog';
import { cn } from '@/hooks/useTheme';
import { useAuth } from '@/context/AuthContext';
import { useThemeContext } from '@/context/ThemeContext';

const { resumeService } = getServices();

function Dashboard(): JSX.Element {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const { isDark, toggle } = useThemeContext();
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
      const result =
        filterBy === 'favorites' ? await resumeService.getFavorites() : await resumeService.list();

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

  const filteredResumes = resumes.filter((resume) =>
    resume.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-stone-50 to-slate-100 dark:bg-slate-900 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 border-r border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
        <Link to="/" className="mb-12 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-rose-500">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900 dark:text-white">ResumePro</span>
        </Link>

        <nav className="space-y-2">
          <button
            onClick={() => setFilterBy('all')}
            className={cn(
              'flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors',
              filterBy === 'all'
                ? 'bg-slate-100 font-medium text-slate-900 dark:bg-slate-700 dark:text-white'
                : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700/50'
            )}
          >
            <FileText className="h-5 w-5" />
            <span>Resume</span>
          </button>

          <button
            onClick={() => setFilterBy('favorites')}
            className={cn(
              'flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors',
              filterBy === 'favorites'
                ? 'bg-slate-100 font-medium text-slate-900 dark:bg-slate-700 dark:text-white'
                : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700/50'
            )}
          >
            <Star className="h-5 w-5" />
            <span>Favorites</span>
          </button>

          <Link
            to="/my-resume"
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-slate-600 transition-colors hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700/50"
          >
            <Clock className="h-5 w-5" />
            <span>View My CV</span>
          </Link>
        </nav>

        <div className="absolute bottom-6 left-6 right-6 space-y-3">
          <div className="rounded-lg border border-slate-200 bg-gradient-to-br from-slate-100 to-slate-50 p-4 dark:border-slate-700 dark:from-slate-700/50 dark:to-slate-700/30">
            <p className="mb-2 text-sm text-slate-600 dark:text-slate-400">
              Need help? Check out our guide
            </p>
            <Link
              to="/guide"
              className="text-sm font-medium text-slate-900 hover:text-slate-700 dark:text-white dark:hover:text-slate-300"
            >
              Learn more →
            </Link>
          </div>

          <div className="border-t border-slate-200 pt-3 dark:border-slate-700">
            {user && (
              <p className="mb-2 truncate text-xs text-slate-400 dark:text-slate-500">
                {user.email}
              </p>
            )}
            <div className="flex items-center gap-2">
              <button
                onClick={toggle}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
                aria-label="Toggle dark mode"
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                <span>{isDark ? 'Light mode' : 'Dark mode'}</span>
              </button>
              <button
                onClick={async () => {
                  await signOut();
                  navigate('/login');
                }}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-rose-50 hover:text-rose-600 dark:text-slate-300 dark:hover:bg-rose-900/20 dark:hover:text-rose-400"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {/* Header */}
        <div className="mx-auto mb-8 max-w-7xl">
          <h1 className="mb-2 text-4xl font-bold text-slate-900 dark:text-white">My Resumes</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Your first resume is free forever. Need more than one resume?{' '}
            <Link
              to="/pricing"
              className="font-medium text-slate-900 hover:underline dark:text-white"
            >
              Upgrade your plan
            </Link>
          </p>

          {/* Search Bar */}
          <div className="relative mt-6">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transform text-slate-400" />
            <input
              type="text"
              placeholder="Search resumes..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full max-w-md rounded-lg border border-slate-200 bg-white py-3 pl-12 pr-4 text-slate-900 placeholder-slate-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 dark:focus:ring-slate-400"
            />
          </div>
        </div>

        {/* Resume Grid */}
        <div className="mx-auto max-w-7xl">
          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-slate-900 dark:border-slate-400" />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Create New Resume Card */}
              <button
                onClick={() => setShowCreateDialog(true)}
                className="group flex aspect-[3/4] flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-slate-300 bg-white transition-all duration-200 hover:border-slate-400 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:hover:border-slate-500 dark:hover:bg-slate-700"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 transition-colors group-hover:bg-slate-200 dark:bg-slate-700 dark:group-hover:bg-slate-600">
                  <Plus className="h-8 w-8 text-slate-600 dark:text-slate-300" />
                </div>
                <span className="text-lg font-medium text-slate-600 group-hover:text-slate-900 dark:text-slate-300 dark:group-hover:text-white">
                  New resume
                </span>
              </button>

              {/* Resume Cards */}
              {filteredResumes.map((resume) => (
                <div
                  key={resume.id}
                  className="group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-xl border-2 border-slate-200 bg-white transition-all duration-200 hover:border-slate-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600"
                  onClick={() => handleEditResume(resume.id)}
                >
                  {/* Resume Preview/Thumbnail */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white p-6 dark:from-slate-800 dark:to-slate-800/50">
                    <div className="h-full w-full overflow-hidden rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-600 dark:bg-slate-700">
                      {/* Mock resume preview */}
                      <div className="space-y-3">
                        <div className="h-3 w-3/4 rounded bg-slate-900 dark:bg-slate-200" />
                        <div className="h-2 w-1/2 rounded bg-slate-300 dark:bg-slate-500" />
                        <div className="mt-4 h-2 w-2/3 rounded bg-slate-200 dark:bg-slate-600" />
                        <div className="h-2 w-full rounded bg-slate-200 dark:bg-slate-600" />
                        <div className="h-2 w-5/6 rounded bg-slate-200 dark:bg-slate-600" />
                        <div className="mt-6 space-y-2">
                          <div className="h-2 w-1/3 rounded bg-slate-300 dark:bg-slate-500" />
                          <div className="h-2 w-full rounded bg-slate-200 dark:bg-slate-600" />
                          <div className="h-2 w-full rounded bg-slate-200 dark:bg-slate-600" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Favorite Badge */}
                  {resume.metadata?.favorite && (
                    <div className="absolute right-4 top-4 z-10">
                      <div className="rounded-full bg-yellow-100 p-2 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400">
                        <Star className="h-4 w-4 fill-current" />
                      </div>
                    </div>
                  )}

                  {/* Completeness Score Badge */}
                  {resume.metadata?.completenessScore && (
                    <div className="absolute left-4 top-4 z-10">
                      <div className="rounded-full border border-slate-200 bg-white/90 px-3 py-1 backdrop-blur dark:border-slate-600 dark:bg-slate-800/90">
                        <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                          {resume.metadata.completenessScore}% complete
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Resume Info Footer */}
                  <div className="absolute bottom-0 left-0 right-0 border-t border-slate-200 bg-white/95 p-4 backdrop-blur dark:border-slate-700 dark:bg-slate-800/95">
                    <div className="flex items-center justify-between">
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-semibold text-slate-900 dark:text-white">
                          {resume.name}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
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
                          className="rounded-lg p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700"
                        >
                          <MoreVertical className="h-5 w-5 text-slate-600 dark:text-slate-400" />
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
                            <div className="absolute bottom-full right-0 z-30 mb-2 w-48 rounded-lg border border-slate-200 bg-white py-2 shadow-xl dark:border-slate-700 dark:bg-slate-800">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditResume(resume.id);
                                }}
                                className="flex w-full items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
                              >
                                <Pencil className="h-4 w-4" />
                                Edit
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDuplicateResume(resume.id);
                                }}
                                className="flex w-full items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
                              >
                                <Copy className="h-4 w-4" />
                                Duplicate
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleToggleFavorite(resume.id);
                                }}
                                className="flex w-full items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
                              >
                                <Star
                                  className={cn(
                                    'h-4 w-4',
                                    resume.metadata?.favorite && 'fill-current text-yellow-500'
                                  )}
                                />
                                {resume.metadata?.favorite
                                  ? 'Remove from favorites'
                                  : 'Add to favorites'}
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // TODO: Implement download
                                }}
                                className="flex w-full items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
                              >
                                <Download className="h-4 w-4" />
                                Download PDF
                              </button>
                              <hr className="my-2 border-slate-200 dark:border-slate-700" />
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteResume(resume.id);
                                }}
                                className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                              >
                                <Trash2 className="h-4 w-4" />
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
            <div className="py-16 text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700">
                <FileText className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="mb-2 text-lg font-medium text-slate-900 dark:text-white">
                {searchQuery ? 'No resumes found' : 'No resumes yet'}
              </h3>
              <p className="mb-6 text-slate-600 dark:text-slate-400">
                {searchQuery
                  ? 'Try a different search term'
                  : 'Create your first resume to get started'}
              </p>
              {!searchQuery && (
                <button
                  onClick={() => setShowCreateDialog(true)}
                  className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-6 py-3 text-white transition-colors hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600"
                >
                  <Plus className="h-5 w-5" />
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

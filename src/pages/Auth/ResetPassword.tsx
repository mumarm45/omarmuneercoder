import { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

function ResetPassword(): JSX.Element {
  const { updatePassword } = useAuth();
  const navigate = useNavigate();

  const [ready, setReady] = useState(false); // recovery session active
  const [invalid, setInvalid] = useState(false); // link expired / invalid
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Supabase fires PASSWORD_RECOVERY when the user arrives via the reset link
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setReady(true);
      }
    });

    // Give Supabase 3 s to fire the event; if it doesn't, the link is bad
    const timer = setTimeout(() => {
      setInvalid((prev) => (prev ? prev : !ready));
    }, 3000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timer);
    };
  }, [ready]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    const { error } = await updatePassword(password);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate('/dashboard');
    }
  };

  /* ── Invalid / expired link ── */
  if (invalid && !ready) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-900 px-4">
        <div className="w-full max-w-md rounded-xl border border-slate-700 bg-slate-800 p-8 text-center">
          <h1 className="mb-2 text-2xl font-bold text-white">Link expired</h1>
          <p className="mb-6 text-sm text-slate-400">
            This reset link is invalid or has expired. Please request a new one.
          </p>
          <button
            onClick={() => navigate('/forgot-password')}
            className="rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-2.5 font-medium text-white hover:opacity-90"
          >
            Request new link
          </button>
        </div>
      </div>
    );
  }

  /* ── Loading — waiting for Supabase to fire the event ── */
  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900">
        <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-pink-500" />
      </div>
    );
  }

  /* ── New password form ── */
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-900 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 flex items-center justify-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-rose-500">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-white">ResumePro</span>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-800 p-8">
          <h1 className="mb-2 text-2xl font-bold text-white">Set new password</h1>
          <p className="mb-6 text-sm text-slate-400">Must be at least 6 characters.</p>

          {error && (
            <div className="mb-4 rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-300">New password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 pr-10 text-white placeholder-slate-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-300">
                Confirm password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 py-2.5 font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Updating…' : 'Update password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;

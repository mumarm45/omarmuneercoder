import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowLeft, Mail } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

function ForgotPassword(): JSX.Element {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await resetPassword(email);

    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }
    setLoading(false);
  };

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
          {sent ? (
            /* ── Success state ── */
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10">
                <Mail className="h-7 w-7 text-green-400" />
              </div>
              <h1 className="mb-2 text-2xl font-bold text-white">Check your email</h1>
              <p className="mb-6 text-sm text-slate-400">
                We sent a password reset link to{' '}
                <span className="font-medium text-slate-200">{email}</span>. It expires in 1 hour.
              </p>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-sm font-medium text-pink-400 hover:text-pink-300"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to sign in
              </Link>
            </div>
          ) : (
            /* ── Form state ── */
            <>
              <h1 className="mb-2 text-2xl font-bold text-white">Forgot password?</h1>
              <p className="mb-6 text-sm text-slate-400">
                Enter your email and we&apos;ll send you a reset link.
              </p>

              {error && (
                <div className="mb-4 rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-400">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-300">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="you@example.com"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 py-2.5 font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? 'Sending…' : 'Send reset link'}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-slate-400">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1 font-medium text-pink-400 hover:text-pink-300"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back to sign in
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;

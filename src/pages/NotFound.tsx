import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

function NotFound(): JSX.Element {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-900 px-4 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-rose-500">
        <FileText className="h-9 w-9 text-white" />
      </div>
      <h1 className="mb-2 text-6xl font-bold text-white">404</h1>
      <p className="mb-8 text-lg text-slate-400">Page not found</p>
      <Link
        to="/"
        className="rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-3 font-medium text-white transition-opacity hover:opacity-90"
      >
        Go home
      </Link>
    </div>
  );
}

export default NotFound;

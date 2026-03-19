import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

function NotFound(): JSX.Element {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-center px-4">
      <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mb-6">
        <FileText className="w-9 h-9 text-white" />
      </div>
      <h1 className="text-6xl font-bold text-white mb-2">404</h1>
      <p className="text-slate-400 text-lg mb-8">Page not found</p>
      <Link
        to="/"
        className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
      >
        Go home
      </Link>
    </div>
  );
}

export default NotFound;

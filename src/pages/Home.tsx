import { FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

function HomePage(): JSX.Element {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-12 h-12" />
            <h1 className="text-4xl font-bold">Resume Application</h1>
          </div>
          <p className="text-blue-100 text-lg">
            Create professional resumes or view my personal resume
          </p>
        </div>

        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Resume Builder Card */}
            <Link to="/builder" className="group">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-xl cursor-pointer">
                <div className="flex justify-center mb-4">
                  <div className="bg-blue-600 p-4 rounded-full group-hover:scale-110 transition-transform">
                    <FileText className="w-12 h-12 text-white" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-3 text-center">
                  Resume Builder
                </h2>
                <p className="text-gray-600 text-center mb-4">
                  Create and customize your professional resume with our easy-to-use builder
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    Templates
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                    Drag & Drop
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    Export PDF
                  </span>
                </div>
              </div>
            </Link>

            {/* My Resume Card */}
            <Link to="/my-resume" className="group">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8 border-2 border-indigo-200 hover:border-indigo-400 transition-all duration-300 hover:shadow-xl cursor-pointer">
                <div className="flex justify-center mb-4">
                  <div className="bg-indigo-600 p-4 rounded-full group-hover:scale-110 transition-transform">
                    <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-3 text-center">
                  Muhammad Omar Muneer
                </h2>
                <p className="text-gray-600 text-center mb-4">
                  View my professional resume and experience as a Senior Full-Stack Engineer
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                    11+ Years
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                    Full-Stack
                  </span>
                  <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">
                    Angular & React
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Features Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
              Why Use This Application?
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Easy Customization</h4>
                <p className="text-sm text-gray-600">
                  Drag, drop, and edit to create your perfect resume
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Professional Templates</h4>
                <p className="text-sm text-gray-600">
                  Choose from beautifully designed templates
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Export Options</h4>
                <p className="text-sm text-gray-600">
                  Download as PDF or text format
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
          <p className="text-center text-gray-600 text-sm">
            Built with TypeScript, Zustand, and Tailwind CSS • Fully tested with Jest
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

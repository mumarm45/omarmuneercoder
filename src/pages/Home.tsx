import { memo } from 'react';
import { FileText, User, Edit, Check, FileDown, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeatureCardProps {
  icon: typeof Edit;
  title: string;
  description: string;
}

const FeatureCard = memo(({ icon: Icon, title, description }: FeatureCardProps) => (
  <div className="text-center">
    <div className="bg-slate-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
      <Icon className="w-6 h-6 text-slate-600" />
    </div>
    <h4 className="font-semibold text-slate-800 mb-2">{title}</h4>
    <p className="text-sm text-slate-600">{description}</p>
  </div>
));

FeatureCard.displayName = 'FeatureCard';

interface NavigationCardProps {
  to: string;
  bgGradient: string;
  iconBg: string;
  icon: typeof FileText;
  title: string;
  description: string;
  badges: Array<{ text: string; bgColor: string; textColor: string }>;
}

const NavigationCard = memo(({
  to,
  bgGradient,
  iconBg,
  icon: Icon,
  title,
  description,
  badges,
}: NavigationCardProps) => (
  <Link to={to} className="group">
    <div className={`${bgGradient} rounded-xl p-8 border-2 border-slate-200 
                    hover:border-slate-400 transition-all duration-300 hover:shadow-xl cursor-pointer`}>
      <div className="flex justify-center mb-4">
        <div className={`${iconBg} p-4 rounded-full group-hover:scale-110 transition-transform`}>
          <Icon className="w-12 h-12 text-white" />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-slate-800 mb-3 text-center">
        {title}
      </h2>
      <p className="text-slate-600 text-center mb-4">
        {description}
      </p>
      <p className="text-slate-600 text-center text-sm">
        {badges.map((badge, index) => (
          <span key={index}>
            {badge.text}
            {index < badges.length - 1 && ' • '}
          </span>
        ))}
      </p>
    </div>
  </Link>
));

NavigationCard.displayName = 'NavigationCard';

function HomePage(): JSX.Element {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-200">
      {/* Header - Full Width */}
      <header className="w-full bg-gradient-to-r from-slate-600 to-slate-700 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 text-white shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-3 sm:mb-4">
            <div className="flex items-center gap-3">
              <FileText className="w-10 h-10 sm:w-12 sm:h-12" />
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Resume Application</h1>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href="https://github.com/mumarm45/omarmuneercoder"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-lg shadow-md transition-colors"
              >
                <Github className="w-4 h-4" />
                <span className="hidden sm:inline">View on GitHub</span>
                <span className="sm:hidden">GitHub</span>
              </a>
              <span className="bg-blue-500 text-white text-xs sm:text-sm font-semibold px-3 py-1 rounded-full shadow-md">
                Portfolio Demo
              </span>
            </div>
          </div>
          <p className="text-slate-100 text-base sm:text-lg mb-2">
            Create professional resumes or view my personal resume
          </p>
          <p className="text-slate-300 text-sm italic">
            📌 Sample portfolio project to showcase React application development
          </p>
        </div>
      </header>

      {/* Main Content - Full Width with Centered Container */}
      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Navigation Cards */}
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
            <NavigationCard
              to="/builder"
              bgGradient="bg-gradient-to-br from-white to-slate-50"
              iconBg="bg-slate-600"
              icon={FileText}
              title="Resume Builder"
              description="Create and customize your professional resume with our easy-to-use builder"
              badges={[
                { text: 'Templates', bgColor: 'bg-slate-100', textColor: 'text-slate-700' },
                { text: 'Drag & Drop', bgColor: 'bg-slate-200', textColor: 'text-slate-700' },
                { text: 'Export PDF', bgColor: 'bg-slate-100', textColor: 'text-slate-700' },
              ]}
            />

            <NavigationCard
              to="/my-resume"
              bgGradient="bg-gradient-to-br from-slate-50 to-slate-100"
              iconBg="bg-slate-700"
              icon={User}
              title="Muhammad Omar Muneer"
              description="View my professional resume and experience as a Senior Full-Stack Engineer"
              badges={[
                { text: '11+ Years', bgColor: 'bg-slate-100', textColor: 'text-slate-700' },
                { text: 'Full-Stack', bgColor: 'bg-slate-200', textColor: 'text-slate-700' },
                { text: 'Angular & React', bgColor: 'bg-slate-100', textColor: 'text-slate-700' },
              ]}
            />
          </div>

          {/* Features Section */}
          <div className="pt-8 sm:pt-12 border-t border-slate-300">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6 sm:mb-8 text-center">
              Why Use This Application?
            </h3>
            <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              <FeatureCard
                icon={Edit}
                title="Easy Customization"
                description="Drag, drop, and edit to create your perfect resume"
              />
              <FeatureCard
                icon={Check}
                title="Professional Templates"
                description="Choose from beautifully designed templates"
              />
              <FeatureCard
                icon={FileDown}
                title="Export Options"
                description="Download as PDF or text format"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer - Full Width */}
      <footer className="w-full bg-slate-50 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-t border-slate-200 shadow-inner">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-slate-600 text-xs sm:text-sm">
            Built with TypeScript, Zustand, and Tailwind CSS • Fully tested with Jest
          </p>
        </div>
      </footer>
    </div>
  );
}

export default memo(HomePage);

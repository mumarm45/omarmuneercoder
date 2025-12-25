import { MapPin, Calendar } from 'lucide-react';

interface ExperienceCardProps {
  title: string;
  company: string;
  location: string;
  period: string;
  description?: string;
  responsibilities: string[];
  isDark: boolean;
}

function ExperienceCard({
  title,
  company,
  location,
  period,
  description,
  responsibilities,
  isDark,
}: ExperienceCardProps): JSX.Element {
  return (
    <div
      className={`${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} rounded-xl p-8 border-l-4 border-l-indigo-500 shadow-lg`}
    >
      <h3 className="text-2xl font-bold text-indigo-500 mb-2">{title}</h3>
      <p className="text-xl font-semibold mb-2">{company}</p>
      <div className="flex gap-4 mb-4 text-sm flex-wrap">
        <span className="flex items-center gap-2">
          <MapPin className="w-4 h-4" /> {location}
        </span>
        <span className="flex items-center gap-2">
          <Calendar className="w-4 h-4" /> {period}
        </span>
      </div>
      {description && (
        <p className={`mb-4 ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>{description}</p>
      )}
      <ul className={`space-y-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
        {responsibilities.map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-indigo-500 mt-1">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExperienceCard;

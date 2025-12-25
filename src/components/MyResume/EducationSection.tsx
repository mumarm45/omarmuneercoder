import { MapPin, Calendar } from 'lucide-react';

interface EducationSectionProps {
  isDark: boolean;
  title: string;
  degree: string;
  school: string;
  location: string;
  period: string;
}

function EducationSection({
  isDark,
  title,
  degree,
  school,
  location,
  period,
}: EducationSectionProps): JSX.Element {
  return (
    <section className="py-16 px-6" id="education">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          <span className="text-indigo-500">{title}</span>
        </h2>
        <div
          className={`${isDark ? 'bg-slate-800' : 'bg-white'} rounded-2xl p-8 shadow-lg border ${isDark ? 'border-slate-700' : 'border-gray-200'}`}
        >
          <div className="flex items-start gap-4">
            <div className="text-4xl">🎓</div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-indigo-500 mb-2">{degree}</h3>
              <p className="text-xl font-semibold mb-2">{school}</p>
              <div className="flex gap-4 text-sm flex-wrap">
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> {location}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> {period}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EducationSection;

interface SkillCardProps {
  title: string;
  icon: string;
  skills: string[];
  isDark: boolean;
}

function SkillCard({ title, icon, skills, isDark }: SkillCardProps): JSX.Element {
  return (
    <div
      className={`${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} rounded-xl p-6 border hover:border-indigo-500 transition shadow-lg`}
    >
      <h3 className="text-xl font-bold text-indigo-500 mb-4 flex items-center gap-2">
        <span>{icon}</span> {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className={`px-3 py-1 ${isDark ? 'bg-indigo-900/30' : 'bg-indigo-100'} text-sm rounded-full ${isDark ? 'text-indigo-300' : 'text-indigo-700'}`}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default SkillCard;

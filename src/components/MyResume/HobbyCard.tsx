interface HobbyCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isDark: boolean;
}

function HobbyCard({ icon, title, description, isDark }: HobbyCardProps): JSX.Element {
  return (
    <div
      className={`${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} rounded-xl p-8 border hover:border-indigo-500 transition shadow-lg text-center`}
    >
      <div className="mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-bold text-indigo-500 mb-3">{title}</h3>
      <p className={`${isDark ? 'text-slate-300' : 'text-gray-600'} text-sm leading-relaxed`}>
        {description}
      </p>
    </div>
  );
}

export default HobbyCard;

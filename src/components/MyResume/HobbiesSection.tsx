import HobbyCard from './HobbyCard';

interface Hobby {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface HobbiesSectionProps {
  isDark: boolean;
  title: string;
  intro: string;
  hobbies: Hobby[];
}

function HobbiesSection({ isDark, title, intro, hobbies }: HobbiesSectionProps): JSX.Element {
  return (
    <section className="py-16 px-6" id="hobbies">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">
          <span className="text-indigo-500">{title}</span>
        </h2>
        <p
          className={`text-center ${isDark ? 'text-slate-300' : 'text-gray-600'} max-w-2xl mx-auto mb-12`}
        >
          {intro}
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {hobbies.map((hobby, index) => (
            <HobbyCard
              key={index}
              icon={hobby.icon}
              title={hobby.title}
              description={hobby.description}
              isDark={isDark}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default HobbiesSection;

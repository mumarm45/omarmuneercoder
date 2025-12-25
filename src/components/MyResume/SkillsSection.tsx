import SkillCard from './SkillCard';

interface SkillsSectionProps {
  isDark: boolean;
  title: string;
  categories: {
    title: string;
    icon: string;
    skills: string[];
  }[];
}

function SkillsSection({ isDark, title, categories }: SkillsSectionProps): JSX.Element {
  return (
    <section className="py-16 px-6" id="skills">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          {title.split(' & ')[0]} &{' '}
          <span className="text-indigo-500">{title.split(' & ')[1]}</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <SkillCard
              key={index}
              title={category.title}
              icon={category.icon}
              skills={category.skills}
              isDark={isDark}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;

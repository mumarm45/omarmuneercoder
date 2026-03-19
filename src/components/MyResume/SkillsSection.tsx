import SkillCard from './SkillCard';
import { theme } from '@/theme/colors';

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
    <section className="px-6 py-16" id="skills">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold">
            {title.split(' & ')[0]} &{' '}
            <span className={theme.text.heading}>{title.split(' & ')[1]}</span>
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-pink-500 to-rose-500" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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

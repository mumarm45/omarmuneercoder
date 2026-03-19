import ExperienceCard from './ExperienceCard';
import { theme } from '@/theme/colors';

interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  description?: string;
  responsibilities: string[];
}

interface ExperienceSectionProps {
  isDark: boolean;
  title: string;
  experiences: Experience[];
}

function ExperienceSection({ isDark, title, experiences }: ExperienceSectionProps): JSX.Element {
  return (
    <section className="px-6 py-16" id="experience">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold">
            {title.split(' ')[0]} <span className={theme.text.heading}>{title.split(' ')[1]}</span>
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-pink-500 to-rose-500" />
        </div>
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} {...exp} isDark={isDark} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ExperienceSection;

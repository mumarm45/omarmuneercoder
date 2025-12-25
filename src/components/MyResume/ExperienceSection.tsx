import ExperienceCard from './ExperienceCard';

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
    <section className="py-16 px-6" id="experience">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          {title.split(' ')[0]}{' '}
          <span className="text-indigo-500">{title.split(' ')[1]}</span>
        </h2>
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

import HobbyCard from './HobbyCard';
import { theme } from '@/theme/colors';
import { cn } from '@/hooks/useTheme';

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
    <section className="px-6 py-16" id="hobbies">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 text-center">
          <h2 className="text-3xl font-bold">
            <span className={theme.text.heading}>{title}</span>
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-pink-500 to-rose-500" />
        </div>
        <p
          className={cn(
            'mx-auto mb-12 max-w-2xl text-center',
            isDark ? theme.text.secondary.dark : theme.text.secondary.light
          )}
        >
          {intro}
        </p>
        <div className="grid gap-6 md:grid-cols-3">
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

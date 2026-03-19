import { Mail, Linkedin, Phone, Globe, MapPin } from 'lucide-react';
import ContactCard from './ContactCard';
import { theme } from '@/theme/colors';
import { cn } from '@/hooks/useTheme';

interface ContactSectionProps {
  title: string;
  emailLabel: string;
  linkedinLabel: string;
  phoneLabel: string;
  websiteLabel: string;
  locationLabel: string;
  locationValue: string;
}

function ContactSection({
  title,
  emailLabel,
  linkedinLabel,
  phoneLabel,
  websiteLabel,
  locationLabel,
  locationValue,
}: ContactSectionProps): JSX.Element {
  return (
    <section className={cn('px-6 py-16', theme.backgrounds.header)} id="contact">
      <div className={cn('mx-auto max-w-5xl text-center', theme.text.onDark)}>
        <h2 className="mb-8 text-3xl font-bold">{title}</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          <ContactCard
            icon={<Mail />}
            title={emailLabel}
            value="mumarm45@gmail.com"
            href="mailto:mumarm45@gmail.com"
          />
          <ContactCard
            icon={<Linkedin />}
            title={linkedinLabel}
            value="linkedin.com/in/mumarm45"
            href="https://www.linkedin.com/in/mumarm45/"
          />
          <ContactCard
            icon={<Phone />}
            title={phoneLabel}
            value="+49 162 473 9773"
            href="tel:+491624739773"
          />
          <ContactCard
            icon={<Globe />}
            title={websiteLabel}
            value="omarmuneercoder.de"
            href="https://www.omarmuneercoder.de/"
          />
          <ContactCard icon={<MapPin />} title={locationLabel} value={locationValue} />
        </div>
      </div>
    </section>
  );
}

export default ContactSection;

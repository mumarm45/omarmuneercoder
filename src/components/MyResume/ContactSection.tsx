import { Mail, Linkedin, Phone, Globe, MapPin } from 'lucide-react';
import ContactCard from './ContactCard';

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
    <section
      className="py-16 px-6 bg-gradient-to-r from-indigo-600 to-cyan-500"
      id="contact"
    >
      <div className="max-w-5xl mx-auto text-center text-white">
        <h2 className="text-3xl font-bold mb-8">{title}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
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

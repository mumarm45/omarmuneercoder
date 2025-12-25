import { Mail, Phone, Linkedin, MapPin } from 'lucide-react';
import { theme } from '@/theme/colors';
import { cn } from '@/hooks/useTheme';

interface TopBarProps {
  email: string;
  phone: string;
  location: string;
}

function TopBar({ email, phone, location }: TopBarProps): JSX.Element {
  return (
    <div className={cn('py-3 px-6 flex justify-center gap-8 flex-wrap text-sm', theme.backgrounds.header, theme.text.onDark)}>
      <a
        href={`mailto:${email}`}
        className="flex items-center gap-2 hover:opacity-80 transition"
      >
        <Mail className="w-4 h-4" /> {email}
      </a>
      <a
        href={`tel:${phone.replace(/\s/g, '')}`}
        className="flex items-center gap-2 hover:opacity-80 transition"
      >
        <Phone className="w-4 h-4" /> {phone}
      </a>
      <a
        href="https://www.linkedin.com/in/mumarm45/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 hover:opacity-80 transition"
      >
        <Linkedin className="w-4 h-4" /> LinkedIn
      </a>
      <span className="flex items-center gap-2">
        <MapPin className="w-4 h-4" /> {location}
      </span>
    </div>
  );
}

export default TopBar;

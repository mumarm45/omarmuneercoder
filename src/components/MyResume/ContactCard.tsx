interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  href?: string;
}

function ContactCard({ icon, title, value, href }: ContactCardProps): JSX.Element {
  const content = (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm opacity-90 break-all">{value}</p>
    </div>
  );

  return href ? (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {content}
    </a>
  ) : (
    content
  );
}

export default ContactCard;

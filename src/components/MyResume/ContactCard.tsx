interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  href?: string;
}

function ContactCard({ icon, title, value, href }: ContactCardProps): JSX.Element {
  const content = (
    <div className="rounded-xl bg-white/10 p-6 backdrop-blur-sm transition hover:bg-white/20">
      <div className="mb-3 text-3xl">{icon}</div>
      <h3 className="mb-2 font-semibold">{title}</h3>
      <p className="break-all text-sm opacity-90">{value}</p>
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

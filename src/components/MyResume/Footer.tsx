interface FooterProps {
  isDark: boolean;
}

function Footer({ isDark }: FooterProps): JSX.Element {
  return (
    <footer
      className={`py-8 text-center ${isDark ? 'border-t border-slate-800 bg-slate-900' : 'border-t border-gray-200 bg-gray-50'}`}
    >
      <p className={isDark ? 'text-slate-400' : 'text-gray-600'}>
        © 2025 Muhammad Omar Muneer. Built with passion.
      </p>
    </footer>
  );
}

export default Footer;

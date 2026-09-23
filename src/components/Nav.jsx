import { NAV_LINKS } from '../data/site';
import { useScrollSpy } from '../hooks/useScrollSpy';

const SECTION_IDS = NAV_LINKS.map((link) => link.href.slice(1));

export default function Nav() {
  const activeId = useScrollSpy(SECTION_IDS);

  return (
    <nav>
      {NAV_LINKS.map(({ href, label }) => (
        <a
          key={href}
          href={href}
          className={href.slice(1) === activeId ? 'active' : undefined}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}

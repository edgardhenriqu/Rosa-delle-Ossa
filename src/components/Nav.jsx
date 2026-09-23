import { NAV_LINKS } from '../data/site';
import { useScrollSpy } from '../hooks/useScrollSpy';

const SECTION_IDS = NAV_LINKS.map((link) => link.href.slice(1));

export default function Nav() {
  const activeId = useScrollSpy(SECTION_IDS);

  return (
    <nav aria-label="Seções do site">
      {NAV_LINKS.map(({ href, label }) => (
        <a
          key={href}
          href={href}
          className={href.slice(1) === activeId ? 'active' : undefined}
          aria-current={href.slice(1) === activeId ? 'location' : undefined}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}

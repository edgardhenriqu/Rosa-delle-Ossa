import { useEffect, useState } from 'react';

/**
 * Devolve o id da seção atualmente em foco na viewport,
 * para destacar o link correspondente na navegação.
 *
 * @param {string[]} ids - ids das seções observadas, na ordem da página.
 */
export function useScrollSpy(ids) {
  const [activeId, setActiveId] = useState(ids[0] ?? null);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const targets = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}

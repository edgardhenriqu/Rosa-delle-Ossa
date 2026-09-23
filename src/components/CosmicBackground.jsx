import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const TOTAL_STARS = 180;

/** Sorteia as propriedades visuais de uma estrela (tamanho, posição, brilho). */
function buildStars(total) {
  return Array.from({ length: total }, (_, i) => {
    const size = Math.random() * 2.8 + 0.6;

    return {
      id: i,
      purple: i % 5 === 0,
      style: {
        width: `${size}px`,
        height: `${size}px`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        '--d': `${(Math.random() * 5 + 2).toFixed(1)}s`,
        '--o': (Math.random() * 0.55 + 0.15).toFixed(2),
        animationDelay: `${(Math.random() * 7).toFixed(1)}s`,
      },
    };
  });
}

export default function CosmicBackground() {
  const reducedMotion = usePrefersReducedMotion();

  /* As estrelas são sorteadas só no navegador: o HTML pré-renderizado sai
     sem elas (mais leve) e a hidratação não diverge por causa do sorteio. */
  const [stars, setStars] = useState([]);
  useEffect(() => {
    setStars(reducedMotion ? [] : buildStars(TOTAL_STARS));
  }, [reducedMotion]);

  return (
    <>
      <div className="cosmic-bg" aria-hidden="true" />

      <div className="orb orb-1" aria-hidden="true" />
      <div className="orb orb-2" aria-hidden="true" />
      <div className="orb orb-3" aria-hidden="true" />

      <div className="stars-bg" aria-hidden="true">
        {stars.map((star) => (
          <div
            key={star.id}
            className={star.purple ? 'star purple' : 'star'}
            style={star.style}
          />
        ))}
      </div>
    </>
  );
}

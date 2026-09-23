import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import logo from '../assets/imagens/logo.png';

export default function Hero() {
  const bgRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  /* Parallax suave da imagem de fundo conforme o mouse se move. */
  useEffect(() => {
    if (reducedMotion) return;

    const onMouseMove = (e) => {
      const bg = bgRef.current;
      if (!bg) return;

      const x = (e.clientX / window.innerWidth - 0.5) * 14;
      const y = (e.clientY / window.innerHeight - 0.5) * 14;

      bg.style.transform = `scale(1.08) translate(${x}px, ${y}px)`;
    };

    document.addEventListener('mousemove', onMouseMove);
    return () => document.removeEventListener('mousemove', onMouseMove);
  }, [reducedMotion]);

  return (
    <section id="hero">
      <div className="hero-bg-image" ref={bgRef} aria-hidden="true" />
      <div className="hero-bg-gradient" aria-hidden="true" />

      <div className="logo-emblem">
        <img src={logo} alt="Rosa delle Ossa — Logo" />
      </div>

      <h1 className="brand">Rosa delle Ossa</h1>
      <p className="hero-sub">Tarot · Lenormand · Oráculos</p>
      <p className="hero-tagline">
        Leituras que iluminam caminhos, revelam verdades e guiam a alma.
      </p>

      <div>
        <a href="#precos" className="cta-btn">
          Ver Tiragens
        </a>
        <a href="#solicitar-form" className="cta-btn primary">
          Solicitar Leitura
        </a>
      </div>

      <div className="moon-divider" style={{ marginTop: '3.5rem' }}>
        <span>☽ ✦ ☾</span>
      </div>
    </section>
  );
}

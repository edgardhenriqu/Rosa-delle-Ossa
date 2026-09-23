import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import logo from '../assets/imagens/logo.webp';

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
    <section id="hero" aria-labelledby="hero-titulo">
      <div className="hero-bg-image" ref={bgRef} aria-hidden="true" />
      <div className="hero-bg-gradient" aria-hidden="true" />

      <div className="logo-emblem">
        <img
          src={logo}
          alt="Logo Rosa delle Ossa: rosa sobre ossos cruzados em medalhão azul e dourado"
          width="190"
          height="190"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      {/* O subtítulo faz parte do H1 para dar contexto ao nome da marca. */}
      <h1 id="hero-titulo" className="hero-heading">
        <span className="brand">Rosa delle Ossa</span>
        <span className="hero-sub">Tarot · Lenormand · Oráculos</span>
      </h1>
      <p className="hero-tagline">
        Leituras que iluminam caminhos, revelam verdades e guiam a alma.
      </p>
      <p className="hero-intro">
        Tiragens de Tarot, Lenormand e Oráculos por Maria Luiza Rosabone para
        amor, espiritualidade, autoconhecimento, finanças e decisões. Escolha
        sua tiragem e faça o pedido pelo WhatsApp.
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

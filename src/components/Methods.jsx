import { useEffect, useState } from 'react';
import Reveal from './Reveal';
import { METHODS, methodOptionValue } from '../data/methods';
import { requestTiragem } from '../lib/orderEvents';

const METHOD_IDS = new Set(METHODS.map((m) => m.id));

function MethodCard({ method, open, onToggle, delay }) {
  const bodyId = `method-body-${method.id}`;

  return (
    <Reveal
      as="article"
      id={method.id}
      className={open ? 'method-card open' : 'method-card'}
      delay={delay}
      onClick={onToggle}
    >
      <div className="method-header">
        <h3>
          {/* O clique sobe até o card, que alterna a abertura. */}
          <button
            type="button"
            className="method-toggle"
            aria-expanded={open}
            aria-controls={bodyId}
          >
            {method.name}
            {method.special && <span className="badge-especial">Especial</span>}
          </button>
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="m-tag">R${method.price}</span>
          <span className="toggle-icon" aria-hidden="true">›</span>
        </div>
      </div>

      <div id={bodyId} className={open ? 'method-body open' : 'method-body'}>
        <p className="method-desc">{method.desc}</p>

        <h4>{method.structure}</h4>
        <ol>
          {method.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>

        {method.note && (
          <p
            style={{
              fontSize: '0.82rem',
              opacity: 0.7,
              marginTop: '0.5rem',
              fontStyle: 'italic',
            }}
          >
            {method.note}
          </p>
        )}

        <div className="result-box">{method.result}</div>

        <a
          href="#solicitar-form"
          className="cta-btn primary method-cta"
          onClick={(e) => {
            e.stopPropagation();
            requestTiragem(methodOptionValue(method));
          }}
        >
          Solicitar esta tiragem
        </a>
      </div>
    </Reveal>
  );
}

export default function Methods() {
  const [openId, setOpenId] = useState(null);

  /* Links como #templo-afrodite (menu de preços, dúvidas) abrem o card. */
  useEffect(() => {
    const openFromHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (METHOD_IDS.has(id)) setOpenId(id);
    };

    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    return () => window.removeEventListener('hashchange', openFromHash);
  }, []);

  return (
    <section id="metodos" aria-labelledby="metodos-titulo">
      <div className="section-inner">
        <Reveal as="h2" id="metodos-titulo" className="section-title">
          Métodos em Detalhe
        </Reveal>
        <Reveal as="p" className="section-subtitle">
          Clique em cada método para conhecer sua estrutura
        </Reveal>

        <div className="methods-grid">
          {METHODS.map((method, i) => (
            <MethodCard
              key={method.id}
              method={method}
              delay={`${(i % 4) * 0.1}s`}
              open={openId === method.id}
              onToggle={() =>
                setOpenId((current) =>
                  current === method.id ? null : method.id,
                )
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

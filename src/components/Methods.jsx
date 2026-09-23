import { useState } from 'react';
import Reveal from './Reveal';
import { METHODS } from '../data/methods';

function MethodCard({ method, open, onToggle, delay }) {
  const bodyId = `method-body-${method.id}`;

  function handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle();
    }
  }

  return (
    <Reveal
      className={open ? 'method-card open' : 'method-card'}
      delay={delay}
      onClick={onToggle}
    >
      <div
        className="method-header"
        role="button"
        tabIndex={0}
        aria-expanded={open}
        aria-controls={bodyId}
        onKeyDown={handleKeyDown}
      >
        <h3>
          {method.name}
          {method.special && <span className="badge-especial">Especial</span>}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="m-tag">R${method.price}</span>
          <span className="toggle-icon">›</span>
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
      </div>
    </Reveal>
  );
}

export default function Methods() {
  const [openId, setOpenId] = useState(null);

  return (
    <section id="metodos">
      <div className="section-inner">
        <Reveal as="h2" className="section-title">
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

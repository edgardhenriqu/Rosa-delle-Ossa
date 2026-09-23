import Reveal from './Reveal';
import { QUESTION_AMOUNTS, QUESTION_TIRAGENS } from '../data/site';
import { methodsByGroup } from '../data/methods';

function MethodPriceGrid({ methods }) {
  return (
    <div className="methods-price-grid">
      {methods.map((method) => (
        <div className="method-price-item" key={method.id}>
          <span className="m-name">{method.name}</span>
          <span className="m-price">R${method.price}</span>
        </div>
      ))}
    </div>
  );
}

export default function Pricing() {
  return (
    <section id="precos">
      <div className="section-inner">
        <Reveal as="h2" className="section-title">
          Menu de Tiragens
        </Reveal>
        <Reveal as="p" className="section-subtitle">
          Escolha a leitura ideal para o seu momento
        </Reveal>

        {QUESTION_TIRAGENS.map((tiragem) => (
          <Reveal className="price-category" key={tiragem.key}>
            <h3>{tiragem.title}</h3>
            <div className="price-grid">
              {QUESTION_AMOUNTS.map((n) => (
                <div className="price-card" key={n}>
                  <div className="label">
                    {n} {n === 1 ? 'Pergunta' : 'Perguntas'}
                  </div>
                  <div className="price">R${tiragem.prices[n]}</div>
                </div>
              ))}
            </div>
          </Reveal>
        ))}

        <Reveal className="price-category">
          <h3>Métodos</h3>
          <MethodPriceGrid methods={methodsByGroup('metodos')} />
          <p className="price-note">
            ✦ Alguns métodos utilizam um oráculo especial em conjunto com o
            tarot/lenormand.
          </p>
        </Reveal>

        <Reveal className="price-category">
          <h3>Métodos Especiais</h3>
          <p className="price-note" style={{ marginBottom: '1rem' }}>
            Combino o Baralho Cigano/Lenormand + um Oráculo Especial
          </p>
          <MethodPriceGrid methods={methodsByGroup('especiais')} />
        </Reveal>
      </div>
    </section>
  );
}

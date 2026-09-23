import Reveal from './Reveal';
import { QUESTION_AMOUNTS, QUESTION_TIRAGENS } from '../data/site';
import { methodsByGroup } from '../data/methods';

function MethodPriceGrid({ methods }) {
  return (
    <ul className="methods-price-grid">
      {methods.map((method) => (
        <li key={method.id}>
          <a
            className="method-price-item"
            href={`#${method.id}`}
            aria-label={`${method.name}, R$${method.price} — ver estrutura do método`}
          >
            <span className="m-name">{method.name}</span>
            <span className="m-price">R${method.price}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function Pricing() {
  return (
    <section id="precos" aria-labelledby="precos-titulo">
      <div className="section-inner">
        <Reveal as="h2" id="precos-titulo" className="section-title">
          Menu de Tiragens
        </Reveal>
        <Reveal as="p" className="section-subtitle">
          Escolha a leitura ideal para o seu momento
        </Reveal>
        <Reveal as="p" className="section-lead">
          Você pode fazer suas próprias perguntas — o valor depende da
          quantidade e do baralho — ou escolher um método com estrutura pronta
          para amor, espiritualidade, autoconhecimento, finanças ou decisões.
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

        <Reveal className="section-ctas">
          <a href="#metodos" className="cta-btn">
            Ver métodos em detalhe
          </a>
          <a href="#solicitar-form" className="cta-btn primary">
            Solicitar Leitura
          </a>
        </Reveal>
      </div>
    </section>
  );
}

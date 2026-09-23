import Reveal from './Reveal';
import OrderForm from './OrderForm';
import { CONTACT, STEPS, URGENCY_FEE } from '../data/site';

const GOLD = { color: 'var(--gold-light)' };

/** Corpo específico dos passos que não são só texto. */
function StepBody({ step }) {
  if (step.kind === 'pix') {
    return (
      <p>
        Pagamento via <strong style={GOLD}>PIX</strong>
        <br />
        Chave: {CONTACT.pixKey}
        <br />
        (Chave celular)
      </p>
    );
  }

  if (step.kind === 'whatsapp') {
    return (
      <>
        <p>{step.body}</p>
        <p
          style={{
            ...GOLD,
            fontFamily: "'Cinzel', serif",
            marginTop: '0.5rem',
          }}
        >
          📞 {CONTACT.whatsappDisplay}
        </p>
      </>
    );
  }

  if (step.kind === 'prazo') {
    return (
      <p>
        ⏳ O prazo de envio é de até <strong style={GOLD}>2 dias</strong> após o
        comprovante, mas normalmente sai dentro de 24h!
      </p>
    );
  }

  return (
    <>
      <p>{step.body}</p>
      {step.list && (
        <ul>
          {step.list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default function HowTo() {
  return (
    <section id="como">
      <div className="section-inner">
        <Reveal as="h2" className="section-title">
          Como Solicitar uma Tiragem
        </Reveal>
        <Reveal as="p" className="section-subtitle">
          Passo a Passo
        </Reveal>

        <div className="steps-grid">
          {STEPS.map((step, i) => (
            <Reveal
              key={step.num}
              className="step-card"
              delay={`${(i % 4) * 0.1}s`}
            >
              <div className="step-num">{step.num}</div>
              <h3>{step.title}</h3>
              <StepBody step={step} />
            </Reveal>
          ))}
        </div>

        <Reveal className="urgency-note">
          ✦ Não quer esperar? Atendo com{' '}
          <strong style={GOLD}>taxa de urgência de R${URGENCY_FEE}</strong> — sua
          leitura é enviada o mais rápido possível dentro do meu horário de
          atendimento.
        </Reveal>

        <OrderForm />
      </div>
    </section>
  );
}

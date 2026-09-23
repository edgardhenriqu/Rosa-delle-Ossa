import Reveal from './Reveal';
import { FAQ, answerParts } from '../data/faq';

export default function Faq() {
  return (
    <section id="duvidas" aria-labelledby="duvidas-titulo">
      <div className="section-inner">
        <Reveal as="h2" id="duvidas-titulo" className="section-title">
          Dúvidas Frequentes
        </Reveal>
        <Reveal as="p" className="section-subtitle">
          O que você precisa saber antes de pedir sua leitura
        </Reveal>

        <div className="faq-list">
          {FAQ.map(({ question, answer }, i) => (
            <Reveal
              as="details"
              key={question}
              className="method-card faq-item"
              delay={`${(i % 4) * 0.1}s`}
            >
              <summary className="method-header">
                <h3>{question}</h3>
                <span className="toggle-icon" aria-hidden="true">›</span>
              </summary>
              <p className="faq-answer">
                {answerParts(answer).map((part, j) =>
                  part.href ? (
                    <a key={j} href={part.href}>
                      {part.text}
                    </a>
                  ) : (
                    part.text
                  ),
                )}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

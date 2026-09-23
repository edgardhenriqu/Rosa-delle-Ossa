import Reveal from './Reveal';
import { DECKS } from '../data/site';

export default function Decks() {
  return (
    <section id="baralhos">
      <div className="section-inner" style={{ textAlign: 'center' }}>
        <Reveal as="h2" className="section-title">
          Baralhos Utilizados
        </Reveal>
        <Reveal as="p" className="section-subtitle">
          Uma coleção cuidadosamente escolhida para cada leitura
        </Reveal>

        <Reveal className="deck-grid">
          {DECKS.map((deck) => (
            <span className="deck-pill" key={deck}>
              {deck}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

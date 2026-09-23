import Reveal from './Reveal';
import { DECKS } from '../data/site';

export default function Decks() {
  return (
    <section id="baralhos" aria-labelledby="baralhos-titulo">
      <div className="section-inner" style={{ textAlign: 'center' }}>
        <Reveal as="h2" id="baralhos-titulo" className="section-title">
          Baralhos Utilizados
        </Reveal>
        <Reveal as="p" className="section-subtitle">
          Uma coleção cuidadosamente escolhida para cada leitura
        </Reveal>

        <Reveal as="ul" className="deck-grid">
          {DECKS.map((deck) => (
            <li className="deck-pill" key={deck}>
              {deck}
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

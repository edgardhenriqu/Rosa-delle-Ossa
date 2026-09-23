import { SHOWCASE_PANELS } from '../data/site';

export default function DeckShowcase() {
  return (
    <div className="deck-showcase">
      <div className="deck-showcase-inner">
        {SHOWCASE_PANELS.map((panel) => (
          <figure className="deck-img-panel" key={panel.src}>
            <img
              src={panel.src}
              alt={panel.alt}
              width="1024"
              height="1024"
              loading="lazy"
              decoding="async"
            />
            <figcaption className="panel-overlay">
              <span className="panel-label">{panel.label}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

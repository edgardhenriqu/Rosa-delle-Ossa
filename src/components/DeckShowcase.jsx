import { SHOWCASE_PANELS } from '../data/site';

export default function DeckShowcase() {
  return (
    <div className="deck-showcase">
      <div className="deck-showcase-inner">
        {SHOWCASE_PANELS.map((panel) => (
          <div className="deck-img-panel" key={panel.src}>
            <img src={panel.src} alt={panel.alt} />
            <div className="panel-overlay">
              <span className="panel-label">{panel.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

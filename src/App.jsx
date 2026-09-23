import CosmicBackground from './components/CosmicBackground';
import Nav from './components/Nav';
import Hero from './components/Hero';
import DeckShowcase from './components/DeckShowcase';
import HowTo from './components/HowTo';
import Pricing from './components/Pricing';
import Decks from './components/Decks';
import Methods from './components/Methods';
import Contact from './components/Contact';
import WhatsAppFloat from './components/WhatsAppFloat';

export default function App() {
  return (
    <>
      <CosmicBackground />
      <Nav />

      <Hero />
      <DeckShowcase />
      <HowTo />
      <Pricing />
      <Decks />
      <Methods />
      <Contact />

      <WhatsAppFloat />

      <footer>
        ✦ Rosa delle Ossa · Maria Luiza Rosabone · Tarot · Lenormand · Oráculos ✦
      </footer>
    </>
  );
}

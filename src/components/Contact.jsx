import Reveal from './Reveal';
import { CONTACT } from '../data/site';

export default function Contact() {
  return (
    <section id="contato" aria-labelledby="contato-titulo">
      <div className="section-inner">
        <Reveal as="h2" id="contato-titulo" className="section-title">
          Entre em Contato
        </Reveal>
        <Reveal as="p" className="section-subtitle">
          Sua leitura te espera ✦
        </Reveal>

        <Reveal className="contact-box">
          <div className="contact-symbol" aria-hidden="true">
            🌹
          </div>

          <div className="contact-item">
            <div>
              <p className="contact-label">WhatsApp · Atendimento</p>
              <a href={CONTACT.whatsappLink} target="_blank" rel="noopener noreferrer">
                {CONTACT.whatsappDisplay}
              </a>
            </div>
          </div>

          <div className="contact-item">
            <div>
              <p className="contact-label">TikTok</p>
              <a href={CONTACT.tiktokLink} target="_blank" rel="noopener noreferrer">
                {CONTACT.tiktok}
              </a>
            </div>
          </div>

          <div className="contact-item">
            <div>
              <p className="contact-label">Instagram</p>
              <a href={CONTACT.instagramLink} target="_blank" rel="noopener noreferrer">
                {CONTACT.instagram}
              </a>
            </div>
          </div>

          <div className="pix-block">
            <p className="contact-label">Pagamento via PIX</p>
            <p className="pix-key">{CONTACT.pixKey}</p>
            <p style={{ fontSize: '0.82rem', opacity: 0.65, marginTop: '0.4rem' }}>
              Chave celular · {CONTACT.pixOwner}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

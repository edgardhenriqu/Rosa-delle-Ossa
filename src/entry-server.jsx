/* ══════════════════════════════════════════
   Entrada de pré-renderização (usada só no build,
   por scripts/prerender.mjs). Gera o HTML da página
   e os dados estruturados (JSON-LD) a partir dos
   mesmos dados que alimentam o site.
   ══════════════════════════════════════════ */

import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { CONTACT, QUESTION_AMOUNTS, QUESTION_TIRAGENS, SITE } from './data/site';
import { METHODS } from './data/methods';
import { FAQ, answerText } from './data/faq';

export { SITE };

export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

const ORG_ID = `${SITE.url}#organizacao`;

const offer = (name, description, price) => ({
  '@type': 'Offer',
  price: String(price),
  priceCurrency: 'BRL',
  itemOffered: {
    '@type': 'Service',
    name,
    ...(description && { description }),
    serviceType: 'Leitura de Tarot',
    provider: { '@id': ORG_ID },
  },
});

/** JSON-LD da página: site, marca, catálogo de tiragens e dúvidas frequentes. */
export function structuredData() {
  const graph = [
    {
      '@type': 'WebSite',
      '@id': `${SITE.url}#site`,
      url: SITE.url,
      name: SITE.name,
      description: SITE.description,
      inLanguage: 'pt-BR',
      publisher: { '@id': ORG_ID },
    },
    {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: SITE.name,
      url: SITE.url,
      logo: `${SITE.url}favicon-192.png`,
      image: `${SITE.url}og-image.jpg`,
      description: SITE.description,
      founder: { '@type': 'Person', name: SITE.owner },
      sameAs: [CONTACT.instagramLink, CONTACT.tiktokLink],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        telephone: `+${CONTACT.whatsappNumber}`,
        url: CONTACT.whatsappLink,
        availableLanguage: 'Portuguese',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Catálogo de Tiragens',
        itemListElement: [
          ...QUESTION_TIRAGENS.flatMap((t) =>
            QUESTION_AMOUNTS.map((n) =>
              offer(
                `${t.title} — ${n} ${n === 1 ? 'pergunta' : 'perguntas'}`,
                null,
                t.prices[n],
              ),
            ),
          ),
          ...METHODS.map((m) => offer(m.name, m.desc, m.price)),
        ],
      },
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE.url}#duvidas`,
      mainEntity: FAQ.map(({ question, answer }) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answerText(answer) },
      })),
    },
  ];

  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
  // Evita que algum "</script>" nos dados feche a tag antes da hora.
  return json.replace(/</g, '\\u003c');
}

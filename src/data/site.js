/* ══════════════════════════════════════════
   Rosa delle Ossa — Dados do site
   Contato, navegação, tiragens por pergunta,
   passo a passo e baralhos utilizados.
   ══════════════════════════════════════════ */

import ciganoDeck from '../assets/imagens/cigano_deck.png';
import tarotHero from '../assets/imagens/tarot_hero.png';

export const CONTACT = {
  whatsappNumber: '5511947694358',
  whatsappDisplay: '(11) 94769-4358',
  whatsappLink: 'https://wa.me/5511947694358',
  tiktok: '@rosa.delleossa',
  tiktokLink: 'https://www.tiktok.com/@rosa.delleossa',
  pixKey: '(11) 94769-4358',
  pixOwner: 'Maria Luiza Rosabone',
};

export const URGENCY_FEE = 20;

export const NAV_LINKS = [
  { href: '#hero', label: 'Início' },
  { href: '#como', label: 'Como Solicitar' },
  { href: '#precos', label: 'Preços' },
  { href: '#baralhos', label: 'Baralhos' },
  { href: '#metodos', label: 'Métodos' },
  { href: '#contato', label: 'Contato' },
];

/**
 * Tiragens cobradas por quantidade de perguntas.
 * A chave é o valor usado no <select> do formulário.
 */
export const QUESTION_TIRAGENS = [
  {
    key: 'Baralho Cigano / Tarot',
    title: 'Baralho Cigano · Lenormand · Tarot',
    prices: { 1: 15, 2: 25, 3: 35, 5: 50 },
  },
  {
    key: 'Sibila Italiana',
    title: 'Sibila Italiana',
    prices: { 1: 18, 2: 32, 3: 45, 5: 65 },
  },
];

export const QUESTION_AMOUNTS = [1, 2, 3, 5];

export const STEPS = [
  {
    num: 1,
    title: 'Escolha a Tiragem',
    body: 'Dê uma olhadinha no catálogo e veja qual método ou pergunta combina melhor com o que você deseja saber no momento.',
  },
  {
    num: 2,
    title: 'Anote as Informações',
    body: 'Você vai precisar me enviar:',
    list: [
      'A tiragem escolhida',
      'Seu nome e data de nascimento',
      'Nome(s) e data de nascimento dos envolvidos (se houver)',
      'Seu contexto / situação',
      'Suas perguntas (se tiver)',
    ],
  },
  {
    num: 3,
    title: 'Realize o Pagamento',
    kind: 'pix',
  },
  {
    num: 4,
    title: 'Envie pelo WhatsApp',
    kind: 'whatsapp',
    body: 'Mande a tiragem escolhida + comprovante + contexto para:',
  },
  {
    num: 5,
    title: 'Aguarde sua Leitura',
    kind: 'prazo',
  },
];

export const DECKS = [
  'Romantic Lenormand',
  'Grand Tableau Lenormand',
  'Baralho Cigano Amanhecer',
  'Tarot Waite Clássico',
  'Sibila Italiana',
  'Oráculo Rosebelle',
  'Oráculo de las Vidas Pasadas',
  'Oráculo Who Is It',
];

export const SHOWCASE_PANELS = [
  {
    src: tarotHero,
    alt: 'Cartas de Tarot e Lenormand',
    label: 'Tarot · Lenormand · Oráculos',
  },
  {
    src: ciganoDeck,
    alt: 'Baralho Cigano',
    label: 'Baralho Cigano · Sibila Italiana',
  },
];

/* ══════════════════════════════════════════
   Rosa delle Ossa — Dúvidas frequentes
   Alimenta a seção "Dúvidas Frequentes" e o
   JSON-LD FAQPage. Use apenas informações que
   também aparecem no restante do site.

   Links internos: [texto](#ancora)
   ══════════════════════════════════════════ */

import { CONTACT, QUESTION_TIRAGENS, URGENCY_FEE } from './site';

const [cigano, sibila] = QUESTION_TIRAGENS;

export const FAQ = [
  {
    question: 'Como funciona uma tiragem?',
    answer:
      'Cada tiragem tem uma estrutura própria: as cartas ocupam posições com um tema definido — sentimentos, obstáculos, conselho — e a leitura interpreta o que cada uma revela ali. A estrutura de cada método está em [Métodos em Detalhe](#metodos).',
  },
  {
    question: 'Qual a diferença entre a tiragem por perguntas e os métodos?',
    answer:
      `Na tiragem por perguntas você envia as suas próprias perguntas, e o valor depende da quantidade (1, 2, 3 ou 5) e do baralho: a partir de R$${cigano.prices[1]} no ${cigano.title} e de R$${sibila.prices[1]} na ${sibila.title}. Os métodos têm estrutura pronta para um tema e valor fixo. Veja todos no [Menu de Tiragens](#precos).`,
  },
  {
    question: 'Como escolher a tiragem ideal?',
    answer:
      'Pense no tema da sua dúvida. Para o amor, há métodos como [Templo Afrodite](#templo-afrodite), [RoseHeart](#roseheart) e [Rosebreak](#rosebreak); para a espiritualidade, [Conexão com seu Guia](#conexao-com-seu-guia), [Mediunidade](#mediunidade) e [Guia ou Obsessor](#guia-ou-obsessor); para o autoconhecimento, a [Leitura Amor Próprio](#amor-proprio); para decisões, [Qual Caminho Seguir](#qual-caminho-seguir). Se a sua pergunta for bem específica, a tiragem por perguntas é o caminho.',
  },
  {
    question: 'Como faço para solicitar minha leitura?',
    answer:
      'Escolha a tiragem, preencha o formulário [Monte sua Tiragem](#solicitar-form) com seu nome, data de nascimento, os envolvidos (se houver) e o seu contexto, e envie direto para o WhatsApp. Depois é só realizar o pagamento e mandar o comprovante.',
  },
  {
    question: 'Quais são as formas de pagamento?',
    answer: `O pagamento é feito via PIX, na chave celular ${CONTACT.pixKey}, em nome de ${CONTACT.pixOwner}.`,
  },
  {
    question: 'Em quanto tempo recebo a leitura?',
    answer:
      `O prazo de envio é de até 2 dias após o comprovante, mas normalmente a leitura sai dentro de 24 horas. Com a taxa de urgência (+R$${URGENCY_FEE}), ela é enviada o mais rápido possível dentro do meu horário de atendimento.`,
  },
];

const LINK = /\[([^\]]+)\]\((#[^)]+)\)/g;

/** Divide a resposta em trechos de texto e links internos. */
export function answerParts(answer) {
  const parts = [];
  let last = 0;
  for (const match of answer.matchAll(LINK)) {
    if (match.index > last) parts.push({ text: answer.slice(last, match.index) });
    parts.push({ text: match[1], href: match[2] });
    last = match.index + match[0].length;
  }
  if (last < answer.length) parts.push({ text: answer.slice(last) });
  return parts;
}

/** Resposta sem a marcação de links — para o JSON-LD. */
export const answerText = (answer) => answer.replace(LINK, '$1');

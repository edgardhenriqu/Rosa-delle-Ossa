import { QUESTION_TIRAGENS, URGENCY_FEE } from '../data/site';

/** Tiragens cobradas por quantidade de perguntas, indexadas pelo valor do <select>. */
const BY_QUESTION = new Map(QUESTION_TIRAGENS.map((t) => [t.key, t.prices]));

export const needsQuestionAmount = (tiragem) => BY_QUESTION.has(tiragem);

export const formatPrice = (valor) => `R$${valor}`;

/**
 * Valor base da tiragem. Para as tiragens por pergunta depende da quantidade;
 * para os métodos, o preço vem no próprio rótulo — ex.: "RoseSoul (R$85)".
 * @returns {number} 0 quando o valor ainda não pode ser determinado.
 */
export function basePrice(tiragem, amount) {
  const table = BY_QUESTION.get(tiragem);
  if (table) return table[amount] ?? 0;

  const match = tiragem.match(/R\$(\d+)/);
  return match ? Number(match[1]) : 0;
}

/** Valor base + taxa de urgência, quando aplicável. */
export const totalPrice = (base, urgency) =>
  urgency ? base + URGENCY_FEE : base;

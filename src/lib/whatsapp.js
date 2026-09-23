import { CONTACT, URGENCY_FEE } from '../data/site';
import { basePrice, formatPrice, needsQuestionAmount, totalPrice } from './pricing';

/** "1995-03-15" (valor do input date) → "15/03/1995". */
const formatDate = (iso) => iso.split('-').reverse().join('/');

/** Monta a mensagem do pedido que será aberta no WhatsApp. */
export function buildOrderMessage(order) {
  const {
    tiragem, amount, nome, nascimento, envolvidos, nascimentoEnvolvidos,
    semEnvolvidos, contexto, perguntas, urgencia,
  } = order;

  const base = basePrice(tiragem, amount);
  const total = totalPrice(base, urgencia);
  const valor = base ? formatPrice(total) : 'Consultar';

  const lines = [
    'Olá, Malu! Gostaria de solicitar uma leitura. ✦',
    '',
    `*Tiragem Escolhida:* ${tiragem}`,
  ];

  if (needsQuestionAmount(tiragem)) {
    lines.push(`*Quantidade de Perguntas:* ${amount}`);
  }

  lines.push(
    urgencia && base
      ? `*Valor:* ${formatPrice(base)} + R$${URGENCY_FEE} urgência = ${valor}`
      : `*Valor:* ${valor}`,
  );

  lines.push(`*Meu Nome:* ${nome}`, `*Minha Data de Nascimento:* ${formatDate(nascimento)}`);

  if (semEnvolvidos) {
    lines.push('*Envolvidos:* N/A');
  } else {
    lines.push(
      `*Envolvidos:* ${envolvidos}`,
      `*Nascimento dos Envolvidos:* ${nascimentoEnvolvidos}`,
    );
  }

  lines.push(`*Contexto/Situação:*\n${contexto}`, '');

  if (perguntas.trim()) {
    lines.push(`*Perguntas:*\n${perguntas}`, '');
  }

  if (urgencia) {
    lines.push(`🚨 *Desejo a taxa de urgência (+R$${URGENCY_FEE})*`, '');
  }

  lines.push('Aguardo as instruções para o envio do comprovante PIX!');

  return lines.join('\n');
}

/** URL wa.me já com a mensagem codificada. */
export const orderLink = (order) =>
  `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(
    buildOrderMessage(order),
  )}`;

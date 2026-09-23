import { useEffect, useState } from 'react';
import Reveal from './Reveal';
import { QUESTION_AMOUNTS, QUESTION_TIRAGENS, URGENCY_FEE } from '../data/site';
import { METHODS, methodOptionValue, methodsByGroup } from '../data/methods';
import { onTiragemRequest } from '../lib/orderEvents';
import { basePrice, formatPrice, needsQuestionAmount, totalPrice } from '../lib/pricing';
import { orderLink } from '../lib/whatsapp';

const EMPTY_ORDER = {
  tiragem: '',
  amount: '',
  nome: '',
  nascimento: '',
  envolvidos: '',
  nascimentoEnvolvidos: '',
  semEnvolvidos: false,
  contexto: '',
  perguntas: '',
  urgencia: false,
};

const METHOD_GROUPS = [
  { label: 'Métodos', methods: methodsByGroup('metodos') },
  { label: 'Métodos Especiais', methods: methodsByGroup('especiais') },
];

export default function OrderForm() {
  const [order, setOrder] = useState(EMPTY_ORDER);

  const askAmount = needsQuestionAmount(order.tiragem);
  const base = basePrice(order.tiragem, order.amount);
  const total = totalPrice(base, order.urgencia);

  /** Atualiza um campo; trocar de tiragem limpa a quantidade de perguntas. */
  function update(field, value) {
    setOrder((prev) => ({
      ...prev,
      [field]: value,
      ...(field === 'tiragem' ? { amount: '' } : null),
    }));
  }

  /* "Solicitar esta tiragem" nos métodos já chega com a tiragem escolhida. */
  useEffect(() => onTiragemRequest((value) => update('tiragem', value)), []);

  function handleSubmit(e) {
    e.preventDefault();
    window.open(orderLink(order), '_blank', 'noopener');
  }

  const pricePreview = !base
    ? ''
    : order.urgencia
      ? `Valor: ${formatPrice(base)} + R$${URGENCY_FEE} urgência = ${formatPrice(total)}`
      : `Valor: ${formatPrice(total)}`;

  return (
    <div style={{ marginTop: '5rem' }} id="solicitar-form">
      <Reveal as="h2" className="section-title">
        Monte sua Tiragem
      </Reveal>
      <Reveal as="p" className="section-subtitle" style={{ marginBottom: '2rem' }}>
        Preencha os dados abaixo e envie direto para o WhatsApp
      </Reveal>

      <Reveal className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="f-tiragem">Qual tiragem você deseja?</label>
            <select
              id="f-tiragem"
              value={order.tiragem}
              onChange={(e) => update('tiragem', e.target.value)}
              required
            >
              <option value="">Selecione uma opção...</option>

              <optgroup label="Tiragem por Perguntas">
                {QUESTION_TIRAGENS.map((t) => (
                  <option key={t.key} value={t.key}>
                    {t.key}
                  </option>
                ))}
              </optgroup>

              {METHOD_GROUPS.map(({ label, methods }) => (
                <optgroup label={label} key={label}>
                  {methods.map((method) => {
                    const value = methodOptionValue(method);
                    return (
                      <option key={method.id} value={value}>
                        {value}
                      </option>
                    );
                  })}
                </optgroup>
              ))}
            </select>
          </div>

          {askAmount && (
            <div className="form-group">
              <label htmlFor="f-qtd">Quantidade de Perguntas</label>
              <select
                id="f-qtd"
                value={order.amount}
                onChange={(e) => update('amount', e.target.value)}
                required
              >
                <option value="">Selecione a quantidade...</option>
                {QUESTION_AMOUNTS.map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? 'Pergunta' : 'Perguntas'}
                  </option>
                ))}
              </select>
            </div>
          )}

          <p
            id="preco-preview"
            style={{
              marginTop: '-0.5rem',
              marginBottom: '1.5rem',
              color: 'var(--gold-light)',
              fontFamily: "'Cinzel', serif",
            }}
          >
            {pricePreview}
          </p>

          <div className="form-group">
            <label htmlFor="f-nome">Seu Nome</label>
            <input
              type="text"
              id="f-nome"
              placeholder="Digite seu nome completo"
              value={order.nome}
              onChange={(e) => update('nome', e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="f-nascimento">Sua Data de Nascimento</label>
            <input
              type="date"
              id="f-nascimento"
              value={order.nascimento}
              onChange={(e) => update('nascimento', e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="f-envolvidos">Nome dos Envolvidos</label>
            <input
              type="text"
              id="f-envolvidos"
              placeholder="Ex: João Silva"
              value={order.envolvidos}
              onChange={(e) => update('envolvidos', e.target.value)}
              disabled={order.semEnvolvidos}
              required={!order.semEnvolvidos}
            />
          </div>

          <div className="form-group">
            <label htmlFor="f-nascimento-envolvidos">
              Data de Nascimento dos Envolvidos
            </label>
            <input
              type="text"
              id="f-nascimento-envolvidos"
              placeholder="Ex: 15/03/1995"
              value={order.nascimentoEnvolvidos}
              onChange={(e) => update('nascimentoEnvolvidos', e.target.value)}
              disabled={order.semEnvolvidos}
              required={!order.semEnvolvidos}
            />
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                id="f-sem-envolvidos"
                checked={order.semEnvolvidos}
                onChange={(e) => update('semEnvolvidos', e.target.checked)}
              />
              N/A — não há envolvidos
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="f-contexto">Seu Contexto / Situação</label>
            <textarea
              id="f-contexto"
              rows="3"
              placeholder="Conte um pouco sobre o que está acontecendo..."
              value={order.contexto}
              onChange={(e) => update('contexto', e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="f-perguntas">Suas Perguntas (se houver)</label>
            <textarea
              id="f-perguntas"
              rows="3"
              placeholder="Digite suas perguntas aqui..."
              value={order.perguntas}
              onChange={(e) => update('perguntas', e.target.value)}
            />
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                id="f-urgencia"
                checked={order.urgencia}
                onChange={(e) => update('urgencia', e.target.checked)}
              />
              Desejo Taxa de Urgência (+R${URGENCY_FEE}) para receber o mais
              rápido possível
            </label>
          </div>

          <button type="submit" className="submit-btn">
            Enviar para o WhatsApp ✦
          </button>
        </form>
      </Reveal>
    </div>
  );
}

/* Garante que todo método do catálogo apareça em algum optgroup. */
if (import.meta.env.DEV) {
  const listed = METHOD_GROUPS.flatMap((g) => g.methods).length;
  if (listed !== METHODS.length) {
    console.warn(
      `[OrderForm] ${METHODS.length - listed} método(s) do catálogo sem grupo no formulário.`,
    );
  }
}

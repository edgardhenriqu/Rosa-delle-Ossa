/* Permite que outras seções (ex.: "Solicitar esta tiragem" nos métodos)
   pré-selecionem uma tiragem no formulário de pedido. */

const EVENT = 'rosa:select-tiragem';

/** Pede ao formulário que selecione a tiragem (valor do <select>). */
export function requestTiragem(value) {
  window.dispatchEvent(new CustomEvent(EVENT, { detail: value }));
}

/** Registra o ouvinte; devolve a função de limpeza para o useEffect. */
export function onTiragemRequest(handler) {
  const listener = (e) => handler(e.detail);
  window.addEventListener(EVENT, listener);
  return () => window.removeEventListener(EVENT, listener);
}

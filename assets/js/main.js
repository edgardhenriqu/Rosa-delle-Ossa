/* ══════════════════════════════════════════
   Rosa delle Ossa — Main Script (v2 Mystic)
   ══════════════════════════════════════════ */

/**
 * Generate animated star particles (gold + purple) in the background container.
 */
function initStars() {
  const container = document.getElementById('starsContainer');
  if (!container) return;

  const TOTAL = 180;

  for (let i = 0; i < TOTAL; i++) {
    const star = document.createElement('div');
    star.className = i % 5 === 0 ? 'star purple' : 'star';

    const size = Math.random() * 2.8 + 0.6;

    star.style.cssText = `
      width:${size}px;
      height:${size}px;
      left:${Math.random() * 100}%;
      top:${Math.random() * 100}%;
      --d:${(Math.random() * 5 + 2).toFixed(1)}s;
      --o:${(Math.random() * 0.55 + 0.15).toFixed(2)};
      animation-delay:${(Math.random() * 7).toFixed(1)}s;
    `;

    container.appendChild(star);
  }
}

/**
 * Subtle parallax effect on the hero background image on mouse move.
 */
function initParallax() {
  const heroBg = document.querySelector('.hero-bg-image');
  if (!heroBg) return;

  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 14;
    const y = (e.clientY / window.innerHeight - 0.5) * 14;

    heroBg.style.transform = `scale(1.08) translate(${x}px, ${y}px)`;
  });
}

/**
 * Toggle the open/close state of a method card.
 * @param {HTMLElement} card - The .method-card element clicked.
 */
function toggleMethod(card) {
  const isOpen = card.classList.contains('open');

  document.querySelectorAll('.method-card').forEach((item) => {
    item.classList.remove('open');

    const body = item.querySelector('.method-body');
    if (body) {
      body.classList.remove('open');
    }
  });

  if (!isOpen) {
    const body = card.querySelector('.method-body');

    card.classList.add('open');
    body.classList.add('open');
  }
}

/**
 * Observe elements with .reveal and add .visible when they enter the viewport.
 */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  reveals.forEach((el) => observer.observe(el));
}

/**
 * Add a staggered reveal delay to cards in a grid.
 */
function initStaggeredReveal() {
  document.querySelectorAll('.steps-grid .step-card, .price-grid .price-card, .method-card').forEach((card, i) => {
    card.style.transitionDelay = `${(i % 4) * 0.1}s`;
  });
}

/**
 * Handle Order Form Submission to WhatsApp
 */
function initOrderForm() {
  const orderForm = document.getElementById('orderForm');
  if (!orderForm) return;

  const tiragemSelect = document.getElementById('f-tiragem');
  const qtdGrupo = document.getElementById('grupo-qtd-perguntas');
  const qtdSelect = document.getElementById('f-qtd');
  const precoPreview = document.getElementById('preco-preview');
  const urgenciaCheckbox = document.getElementById('f-urgencia');

  const precos = {
    "Baralho Cigano / Tarot": {
      "1": "R$15",
      "2": "R$25",
      "3": "R$35",
      "5": "R$50"
    },
    "Sibila Italiana": {
      "1": "R$18",
      "2": "R$32",
      "3": "R$45",
      "5": "R$65"
    }
  };

  function precisaQuantidadePerguntas(tiragem) {
    return tiragem === "Baralho Cigano / Tarot" || tiragem === "Sibila Italiana";
  }

  function obterValorBase(tiragem, quantidade) {
    if (precos[tiragem] && precos[tiragem][quantidade]) {
      return Number(precos[tiragem][quantidade].replace("R$", ""));
    }

    const match = tiragem.match(/R\$(\d+)/);
    return match ? Number(match[1]) : 0;
  }

  function formatarValor(valor) {
    return `R$${valor}`;
  }

  function atualizarQuantidadePerguntas() {
    const tiragem = tiragemSelect.value;
    const precisaPerguntas = precisaQuantidadePerguntas(tiragem);

    if (precisaPerguntas) {
      qtdGrupo.style.display = "block";
      qtdSelect.required = true;
    } else {
      qtdGrupo.style.display = "none";
      qtdSelect.required = false;
      qtdSelect.value = "";
    }

    atualizarPreco();
  }

  function atualizarPreco() {
    const tiragem = tiragemSelect.value;
    const quantidade = qtdSelect.value;
    const urgencia = urgenciaCheckbox.checked;

    const valorBase = obterValorBase(tiragem, quantidade);

    if (!valorBase) {
      precoPreview.textContent = "";
      return;
    }

    const valorFinal = urgencia ? valorBase + 20 : valorBase;

    if (urgencia) {
      precoPreview.textContent = `Valor: ${formatarValor(valorBase)} + R$20 urgência = ${formatarValor(valorFinal)}`;
    } else {
      precoPreview.textContent = `Valor: ${formatarValor(valorFinal)}`;
    }
  }

  tiragemSelect.addEventListener('change', atualizarQuantidadePerguntas);
  qtdSelect.addEventListener('change', atualizarPreco);
  urgenciaCheckbox.addEventListener('change', atualizarPreco);

  orderForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const tiragem = document.getElementById('f-tiragem').value;
    const quantidade = document.getElementById('f-qtd').value;
    const nome = document.getElementById('f-nome').value;
    const envolvidos = document.getElementById('f-envolvidos').value;
    const contexto = document.getElementById('f-contexto').value;
    const perguntas = document.getElementById('f-perguntas').value;
    const urgencia = document.getElementById('f-urgencia').checked;

    const precisaPerguntas = precisaQuantidadePerguntas(tiragem);

    if (precisaPerguntas && !quantidade) {
      alert("Escolha a quantidade de perguntas.");
      return;
    }

    const valorBase = obterValorBase(tiragem, quantidade);
    const valorFinal = urgencia ? valorBase + 20 : valorBase;
    const valor = valorBase ? formatarValor(valorFinal) : "Consultar";

    let msg = `Olá, Malu! Gostaria de solicitar uma leitura. ✦\n\n`;
    msg += `*Tiragem Escolhida:* ${tiragem}\n`;

    if (precisaPerguntas) {
      msg += `*Quantidade de Perguntas:* ${quantidade}\n`;
    }

    if (urgencia && valorBase) {
      msg += `*Valor:* ${formatarValor(valorBase)} + R$20 urgência = ${valor}\n`;
    } else {
      msg += `*Valor:* ${valor}\n`;
    }

    msg += `*Meu Nome:* ${nome}\n`;

    if (envolvidos.trim() !== '') {
      msg += `*Envolvidos:* ${envolvidos}\n`;
    }

    msg += `*Contexto/Situação:*\n${contexto}\n\n`;

    if (perguntas.trim() !== '') {
      msg += `*Perguntas:*\n${perguntas}\n\n`;
    }

    if (urgencia) {
      msg += `🚨 *Desejo a taxa de urgência (+R$20)*\n\n`;
    }

    msg += `Aguardo as instruções para o envio do comprovante PIX!`;

    const encodedMsg = encodeURIComponent(msg);

    const whatsappNumber = '5511968528778';

    const url = `https://wa.me/${whatsappNumber}?text=${encodedMsg}`;

    window.open(url, '_blank');
  });

  atualizarQuantidadePerguntas();
}

/* ── Initialise on DOM ready ── */
document.addEventListener('DOMContentLoaded', () => {
  initStars();
  initParallax();
  initScrollReveal();
  initStaggeredReveal();
  initOrderForm();
});
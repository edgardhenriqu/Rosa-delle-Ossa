# Rosa delle Ossa

Catálogo de tiragens de Tarot, Lenormand e Oráculos — site em React + Vite.

## Rodando

```bash
npm install
npm run dev      # servidor de desenvolvimento
npm run build    # gera dist/ (com HTML pré-renderizado) para publicação
npm run preview  # confere o build localmente
```

O site é publicado na raiz de https://www.rosadelleossa.com/ (Vercel), com
`base: '/'`.

### Pré-renderização (SEO)

`npm run build` roda o `vite build` e depois `scripts/prerender.mjs`, que:

- renderiza a página com `src/entry-server.jsx` e injeta o HTML em
  `dist/index.html` — buscadores e prévias de link (WhatsApp, Instagram,
  Facebook) leem o conteúdo sem executar JavaScript; no navegador o React só
  hidrata a página (`src/main.jsx`);
- adiciona o JSON-LD (WebSite, Organization com o catálogo de tiragens e
  FAQPage), gerado a partir dos mesmos dados do site;
- gera `dist/sitemap.xml` com a data do build.

Title, description, canonical e Open Graph ficam em `index.html`;
`public/` guarda `robots.txt`, `404.html`, ícones e `og-image.jpg`.

Qualquer coisa que dependa do navegador (`window`, `Math.random`…) precisa
ficar dentro de `useEffect`, para o HTML pré-renderizado bater com o do
navegador.

### Imagens

Os PNGs em `src/assets/imagens/` são os originais; o site usa as versões
WebP. Depois de trocar uma imagem, gere tudo de novo (WebP, imagem de
compartilhamento e ícones):

```bash
npm i --no-save sharp
node scripts/optimize-images.mjs
```

## Estrutura

```
src/
  data/
    methods.js   ← catálogo de métodos (nome, preço, estrutura, resultado)
    site.js      ← endereço do site, contato, navegação, preços, passos, baralhos
    faq.js       ← dúvidas frequentes (seção + JSON-LD)
  lib/
    pricing.js   ← cálculo de valores e taxa de urgência
    whatsapp.js  ← montagem da mensagem de pedido
    orderEvents.js ← "Solicitar esta tiragem" pré-seleciona o formulário
  components/    ← uma seção da página por arquivo
  hooks/         ← scroll reveal, scrollspy, prefers-reduced-motion
  styles/        ← style.css (tema místico)
  assets/        ← imagens (processadas e versionadas pelo Vite)
  entry-server.jsx ← entrada da pré-renderização
scripts/         ← prerender.mjs, optimize-images.mjs
public/          ← robots.txt, 404.html, ícones, og-image.jpg
```

### Alterando preços e métodos

`src/data/methods.js` é a fonte única: cada método listado ali aparece
automaticamente no menu de preços, na seção "Métodos em Detalhe" e no
`<select>` do formulário. Para as tiragens cobradas por pergunta, edite
`QUESTION_TIRAGENS` em `src/data/site.js`.

Contato, chave PIX e valor da taxa de urgência também ficam em
`src/data/site.js`.

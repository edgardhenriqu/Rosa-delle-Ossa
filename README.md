# Rosa delle Ossa

Catálogo de tiragens de Tarot, Lenormand e Oráculos — site em React + Vite.

## Rodando

```bash
npm install
npm run dev      # servidor de desenvolvimento
npm run build    # gera dist/ para publicação
npm run preview  # confere o build localmente
```

O build usa caminhos relativos (`base: './'`), então `dist/` pode ser publicado
tanto na raiz de um domínio quanto em uma subpasta.

## Estrutura

```
src/
  data/
    methods.js   ← catálogo de métodos (nome, preço, estrutura, resultado)
    site.js      ← contato, navegação, preços por pergunta, passos, baralhos
  lib/
    pricing.js   ← cálculo de valores e taxa de urgência
    whatsapp.js  ← montagem da mensagem de pedido
  components/    ← uma seção da página por arquivo
  hooks/         ← scroll reveal, scrollspy, prefers-reduced-motion
  styles/        ← style.css (tema místico)
  assets/        ← imagens (processadas e versionadas pelo Vite)
```

### Alterando preços e métodos

`src/data/methods.js` é a fonte única: cada método listado ali aparece
automaticamente no menu de preços, na seção "Métodos em Detalhe" e no
`<select>` do formulário. Para as tiragens cobradas por pergunta, edite
`QUESTION_TIRAGENS` em `src/data/site.js`.

Contato, chave PIX e valor da taxa de urgência também ficam em
`src/data/site.js`.

/* ══════════════════════════════════════════
   Pré-renderização (SSG) — roda depois do `vite build`.

   1. Gera um bundle de servidor de src/entry-server.jsx;
   2. Renderiza a página para HTML e injeta em dist/index.html,
      junto com o JSON-LD — assim Google, Bing e as prévias de
      WhatsApp/Instagram leem o conteúdo sem executar JavaScript;
   3. Gera dist/sitemap.xml com a data do build.
   ══════════════════════════════════════════ */

import { build } from 'vite';
import { readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const SSR_OUT = path.join(ROOT, 'dist-ssr');

await build({
  root: ROOT,
  logLevel: 'warn',
  build: {
    ssr: 'src/entry-server.jsx',
    outDir: SSR_OUT,
    emptyOutDir: true,
  },
});

const { render, structuredData, SITE } = await import(
  pathToFileURL(path.join(SSR_OUT, 'entry-server.js')).href
);

const indexPath = path.join(DIST, 'index.html');
let html = await readFile(indexPath, 'utf-8');

const ROOT_TAG = '<div id="root"></div>';
if (!html.includes(ROOT_TAG)) {
  throw new Error('prerender: <div id="root"></div> não encontrado em dist/index.html');
}

html = html
  .replace(ROOT_TAG, () => `<div id="root">${render()}</div>`)
  .replace(
    '</head>',
    () => `  <script type="application/ld+json">${structuredData()}</script>\n</head>`,
  );

await writeFile(indexPath, html);

const today = new Date().toISOString().slice(0, 10);
await writeFile(
  path.join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE.url}</loc>
    <lastmod>${today}</lastmod>
  </url>
</urlset>
`,
);

await rm(SSR_OUT, { recursive: true, force: true });

console.log(`prerender: index.html pré-renderizado e sitemap.xml gerado (${today}).`);

/* ══════════════════════════════════════════
   Gera as versões otimizadas (WebP) das imagens
   do site e a imagem de compartilhamento (Open Graph).

   Os PNGs em src/assets/imagens/ são os originais;
   rode de novo sempre que trocar algum deles:

     npm i --no-save sharp
     node scripts/optimize-images.mjs
   ══════════════════════════════════════════ */

import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'src/assets/imagens');
const PUBLIC = path.join(ROOT, 'public');

/* [original, saída, largura máx., qualidade] — a largura segue o maior
   tamanho em que a imagem aparece na tela (considerando telas retina). */
const JOBS = [
  ['logo.png', 'logo.webp', 400, 85],
  ['tarot_hero.png', 'tarot_hero.webp', 1024, 78],
  ['cigano_deck.png', 'cigano_deck.webp', 1024, 78],
  // Fundos decorativos exibidos com opacidade entre 5% e 55%.
  ['cosmic_bg.png', 'cosmic_bg.webp', 1600, 60],
  ['lenormand_deck.png', 'lenormand_deck.webp', 1024, 55],
  ['crystal_ball.png', 'crystal_ball.webp', 1024, 55],
];

for (const [input, output, width, quality] of JOBS) {
  const info = await sharp(path.join(SRC, input))
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toFile(path.join(SRC, output));
  console.log(`${output}: ${info.width}x${info.height}, ${(info.size / 1024).toFixed(0)} KB`);
}

/* Imagem de compartilhamento 1200x630: foto da mesa de tarot escurecida
   com o logo centralizado — só com elementos que já existem no site. */
await mkdir(PUBLIC, { recursive: true });

const OG_W = 1200;
const OG_H = 630;
const LOGO = 440;

const background = await sharp(path.join(SRC, 'tarot_hero.png'))
  .resize(OG_W, OG_H, { fit: 'cover', position: 'center' })
  .modulate({ brightness: 0.55 })
  .toBuffer();

const logo = await sharp(path.join(SRC, 'logo.png'))
  .resize(LOGO, LOGO, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .toBuffer();

const og = await sharp(background)
  .composite([{ input: logo, left: (OG_W - LOGO) / 2, top: (OG_H - LOGO) / 2 }])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.join(PUBLIC, 'og-image.jpg'));
console.log(`og-image.jpg: ${og.width}x${og.height}, ${(og.size / 1024).toFixed(0)} KB`);

/* Ícones: favicon e apple-touch-icon a partir do logo.
   O Google exige que o favicon seja um múltiplo de 48px quadrado
   (48, 96, 144, 192…) — por isso nada de 16 ou 32px aqui.
   https://developers.google.com/search/docs/appearance/favicon-in-search */
/* O iOS preenche transparência com preto, então o apple-touch-icon
   recebe o fundo azul-marinho do site. */
const NAVY = { r: 8, g: 14, b: 42, alpha: 1 };

for (const [output, size, opaque] of [
  ['favicon-48.png', 48, false],
  ['favicon-96.png', 96, false],
  ['favicon-192.png', 192, false],
  ['apple-touch-icon.png', 180, true],
]) {
  let icon = sharp(path.join(SRC, 'logo.png')).resize(size, size, {
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  });
  if (opaque) icon = icon.flatten({ background: NAVY });
  await icon.png({ compressionLevel: 9 }).toFile(path.join(PUBLIC, output));
  console.log(`${output}: ${size}x${size}`);
}

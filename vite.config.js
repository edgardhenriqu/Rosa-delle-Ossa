import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // O site é publicado na raiz do domínio (Vercel). Caminhos absolutos
  // mantêm as URLs das imagens iguais no HTML pré-renderizado e no navegador.
  base: '/',
});

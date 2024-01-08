// vite.config.ts
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';

export const BASE = '/cyc.ly';

export default defineConfig({
  base: BASE,
  plugins: [
    VitePWA({
      base: '/',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'PWA Router',
        short_name: 'PWA Router',
        theme_color: '#00ff00',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
      registerType: 'autoUpdate',
    }),
    tsconfigPaths(),
    react(),
  ],
});

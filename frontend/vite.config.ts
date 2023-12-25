// vite.config.ts
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export const BASE = './cyc.ly';

export default defineConfig({
  base: BASE,
  plugins: [tsconfigPaths(), react()],
});

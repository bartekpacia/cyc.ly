// vite.config.ts
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  base: '/cycly',
  plugins: [tsconfigPaths(), react()],
});

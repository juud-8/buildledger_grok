import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './'), // Maps @/ to the project root
    },
    extensions: ['.js', '.ts', '.tsx', '.jsx'], // Ensure .tsx is recognized
  },
});
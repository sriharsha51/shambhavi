import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/shambhavi/', // Add this line for GitHub Pages deployment
  plugins: [react()],
  build: {
    outDir: 'dist', // Ensures the build output goes to the 'dist' directory
  },
});

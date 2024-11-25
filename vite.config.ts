import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Dynamically set the `base` for different platforms
export default defineConfig(({ mode }) => {
  const base = mode === 'github-pages' ? '/shambhavi/' : '/'; // Use '/shambhavi/' for GitHub Pages, '/' for others

  return {
    base,
    plugins: [react()],
    build: {
      outDir: 'dist',
    },
  };
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react':  ['react', 'react-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-icons':  ['lucide-react'],
          'vendor-email':  ['@emailjs/browser'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },

  /* Speed up dev server startup */
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'lucide-react'],
  },

  /* Serve PDFs with correct Content-Type in dev */
  server: {
    headers: {
      'Cache-Control': 'no-cache',
    },
  },
});
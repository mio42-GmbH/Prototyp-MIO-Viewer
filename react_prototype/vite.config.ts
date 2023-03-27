import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  server: {
    proxy: {
      '/assets': 'http://127.0.0.1:8080',
      '/data': 'http://127.0.0.1:8080',
    }
  },
  resolve: {
    alias: {
      '~bootstrap': resolve(__dirname, 'node_modules/bootstrap'),
      events: 'rollup-plugin-node-polyfills/polyfills/events',
    }
  }
})

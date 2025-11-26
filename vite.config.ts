import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'






export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  server: {
    port: 3000,
    host: '0.0.0.0',
    proxy: {
      '/backpack': {
        target: 'https://api.backpack.exchange',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/backpack/, ''),
      },
      '/api/v1': {
        target: 'https://api.backpack.exchange',
        changeOrigin: true,
        secure: false,
      },
    },
  }
})

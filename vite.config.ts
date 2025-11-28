import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']]
      }
    }),
    tailwindcss(),
    tsconfigPaths(),
    viteCompression({
      verbose: false,
      disable: false,
      threshold: 1024,
      algorithm: 'gzip',
      ext: '.gz',
      deleteOriginFile: false
    })
  ],
  server: {
    port: 3000,
    host: '0.0.0.0',
    proxy: {
      '/backpack': {
        target: 'https://api.backpack.exchange',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/backpack/, '')
      },
      '/api/v1': {
        target: 'https://api.backpack.exchange',
        changeOrigin: true,
        secure: false
      }
    }
  }
})

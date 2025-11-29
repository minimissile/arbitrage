import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']]
      }
    }),
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
  build: {
    chunkSizeWarningLimit: 1024,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@chakra-ui')) return 'chakra'
            if (id.includes('react')) return 'react-vendor'
            if (id.includes('@tanstack')) return 'tanstack'
            if (id.includes('recharts')) return 'recharts'
            if (id.includes('lucide')) return 'icons'
            if (id.includes('axios')) return 'axios'
            return 'vendor'
          }
        }
      }
    }
  },
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

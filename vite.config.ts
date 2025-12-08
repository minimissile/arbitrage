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
    port: 5566,
    host: '0.0.0.0',
    proxy: {
      '/backpack': {
        target: 'https://api.backpack.exchange',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/backpack/, '')
      },
      '/bybit': {
        target: 'https://api.bybit.com',
        changeOrigin: true,
        secure: true,
        rewrite: p => p.replace(/^\/bybit/, '')
      },
      '/bybit-www': {
        target: 'https://www.bybit.com',
        changeOrigin: true,
        secure: true,
        rewrite: p => p.replace(/^\/bybit-www/, '')
      },
      '/coinglass': {
        target: 'https://open-api-v4.coinglass.com',
        changeOrigin: true,
        secure: true,
        rewrite: p => p.replace(/^\/coinglass/, '')
      },
      '/edgex': {
        target: 'https://pro.edgex.exchange',
        changeOrigin: true,
        secure: true,
        rewrite: p => p.replace(/^\/edgex/, '')
      },
      '/binance': {
        target: 'https://www.binance.com',
        changeOrigin: true,
        secure: true,
        rewrite: p => p.replace(/^\/binance/, '')
      },
      '/bitget': {
        target: 'https://api.bitget.com',
        changeOrigin: true,
        secure: true,
        rewrite: p => p.replace(/^\/bitget/, '')
      },
      '/gate': {
        target: 'https://api.gateio.ws',
        changeOrigin: true,
        secure: true,
        rewrite: p => p.replace(/^\/gate/, '')
      },
      '/okx': {
        target: 'https://www.okx.com',
        changeOrigin: true,
        secure: true,
        rewrite: p => p.replace(/^\/okx/, '')
      },
      '/kucoin': {
        target: 'https://api-futures.kucoin.com',
        changeOrigin: true,
        secure: true,
        rewrite: p => p.replace(/^\/kucoin/, '')
      },
      '/bingx': {
        target: 'https://open-api.bingx.com',
        changeOrigin: true,
        secure: true,
        rewrite: p => p.replace(/^\/bingx/, '')
      },
      '/mexc': {
        target: 'https://contract.mexc.com',
        changeOrigin: true,
        secure: true,
        rewrite: p => p.replace(/^\/mexc/, '')
      },
      '/htx': {
        target: 'https://api.hbdm.com',
        changeOrigin: true,
        secure: true,
        rewrite: p => p.replace(/^\/htx/, '')
      },
      '/lbank': {
        target: 'https://lbkperp.lbank.com',
        changeOrigin: true,
        secure: true,
        rewrite: p => p.replace(/^\/lbank/, '')
      },
      '/hyperliquid': {
        target: 'https://api.hyperliquid.xyz',
        changeOrigin: true,
        secure: true,
        rewrite: p => p.replace(/^\/hyperliquid/, '')
      }
    }
  }
})

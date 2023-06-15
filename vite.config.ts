import { defineConfig } from 'vite'
import monkey from 'vite-plugin-monkey'
import config from './src/config'

export default defineConfig({
  server: {
    host: true,
    port: 5174,
    strictPort: true,
  },
  plugins: [
    monkey({
      entry: 'src/main.ts',
      userscript: {
        // icon: 'https://vitejs.dev/logo.svg',
        namespace: 'memset0/CPAssistant',
        match: config.matches,
      },
      build: {
        externalGlobals: {
        },
      },
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
})
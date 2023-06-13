import { defineConfig } from 'vite'
import monkey from 'vite-plugin-monkey'
import config from './src/config'

export default defineConfig({
  // server: {
  //   host: true,
  //   strictPort: 5174,
  // },
  plugins: [
    monkey({
      entry: 'src/main.ts',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: config.match,
      },
      build: {
        externalGlobals: {
        },
      },
    }),
  ],
})
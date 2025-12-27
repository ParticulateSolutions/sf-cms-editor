import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import dts from 'vite-plugin-dts'
import Components from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    Components({
      resolvers: [PrimeVueResolver()]
    }),
    dts({
      tsconfigPath: './tsconfig.app.json',
      insertTypesEntry: true
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    cssCodeSplit: false,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'CMSEditor',
      formats: ['es'],
      fileName: 'index'
    },
    rollupOptions: {
      // Externalize peer dependencies
      external: [
        'vue',
        /^primevue\/.*/,
        /^@primevue\/.*/,
        /^@primeuix\/.*/,
        'vue3-gettext',
        '@vueuse/integrations',
        'zod',
        'sortablejs'
      ],
      output: {
        globals: {
          vue: 'Vue',
        }
      }
    }
  }
})

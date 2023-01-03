import { fileURLToPath, URL } from 'node:url'
import { dirname, resolve } from 'node:path'
import { defineConfig, type PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { visualizer } from 'rollup-plugin-visualizer'

import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import Pages from 'vite-plugin-pages'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { viteMockServe } from 'vite-plugin-mock'

const IS_PRODUCTION = process.env.NODE_ENV === 'production'

const plugins: PluginOption[] = [
  vue(),
  vueJsx(),
  Components({
    dirs: ['src/components'],
    resolvers: [AntDesignVueResolver()],
    extensions: ['vue'],
    dts: 'src/components.d.ts'
  }),
  Pages({
    dirs: [
      { dir: 'src/views', baseRoute: '' },
      { dir: 'src/views/home', baseRoute: '/' }
    ],
    importMode: 'async',
    exclude: ['**/components/**']
  }),
  VueSetupExtend(),
  VueI18nPlugin({
    include: resolve(dirname(fileURLToPath(import.meta.url)), 'src/i18n/*')
  }),
  viteMockServe({
    mockPath: 'mock',
    supportTs: true
  })
]

if (IS_PRODUCTION) {
  plugins.push(
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true
    }) as PluginOption
  )
}

export default defineConfig({
  plugins,
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  logLevel: IS_PRODUCTION ? 'silent' : 'info',
  server: {
    host: '0.0.0.0'
  },
  build: {
    target: 'es6'
  }
})

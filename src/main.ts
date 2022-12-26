import { createApp } from 'vue'
import App from './App.vue'

import VuePlugin from '@/plugins/vue'
import I18NPlugin from '@/plugins/i18n'
import '@/plugins/antdv'

import './styles/main.less'

const app = createApp(App)
const vuePlugin = new VuePlugin(app)
const i18NPlugin = new I18NPlugin(app)

vuePlugin.load()
i18NPlugin.load()
vuePlugin.mount()

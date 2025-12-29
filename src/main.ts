import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import { createI18n } from 'vue-i18n'
import Lara from '@primeuix/themes/lara'
import { defaultTranslations } from './i18n'

// Bootstrap CSS (for demo - components use Bootstrap classes)
import 'bootstrap/dist/css/bootstrap.min.css'

// FontAwesome icons (for demo)
import '@fortawesome/fontawesome-free/css/all.min.css'

import App from './App.vue'

const app = createApp(App)

// Set up PrimeVue
app.use(PrimeVue, {
  theme: {
    preset: Lara,
    options: {
      darkModeSelector: 'light'
    }
  }
})

// Set up vue-i18n for i18n
const i18n = createI18n({
  legacy: false,
  locale: 'de',
  fallbackLocale: 'de',
  messages: {
    de: defaultTranslations.de,
    en: defaultTranslations.en
  }
})
app.use(i18n)

app.mount('#app')

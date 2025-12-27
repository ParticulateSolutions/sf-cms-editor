import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import { createGettext } from 'vue3-gettext'
import Lara from '@primeuix/themes/lara'

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

// Set up gettext for i18n
const gettext = createGettext({
  availableLanguages: {
    en: 'English',
    de: 'Deutsch'
  },
  defaultLanguage: 'en',
  translations: {}
})
app.use(gettext)

app.mount('#app')

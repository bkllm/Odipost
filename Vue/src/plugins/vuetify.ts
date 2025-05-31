
import 'vuetify/styles/main.css'
import '@mdi/font/css/materialdesignicons.css'

import { createVuetify }  from 'vuetify'
import { aliases, mdi }   from 'vuetify/iconsets/mdi'
import * as components    from 'vuetify/components'
import * as directives    from 'vuetify/directives'

export const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
  theme: {
    defaultTheme: 'odipost',
    themes: {
      odipost: {
        dark: false,
        colors: {
          primary:    '#1B4679',
          secondary:  '#424242',
          success:    '#4CAF50',
          error:      '#F44336',
          warning:    '#FFC107',
          info:       '#2196F3',
          background: '#F5F5F5',
        },
      },
    },
  },
})
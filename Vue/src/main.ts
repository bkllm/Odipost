import { createApp }  from 'vue'
import { vuetify }    from './plugins/vuetify'
import App            from './App.vue'
import router         from './router'

createApp(App)
  .use(vuetify)
  .use(router)
  .mount('#app')
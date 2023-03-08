import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import PlayerVue from './components/Player'
import BackButton from './components/BackButton'
import AppLoader from './components/AppLoader'
import titlePlugin from './plugins/title.plugin'

const app = createApp(App)

app.component('back-button', BackButton)
app.component('loader', AppLoader)
app.component('Player', PlayerVue)

app
  .use(titlePlugin)
  .use(store)
  .use(router)
  .mount('#app')
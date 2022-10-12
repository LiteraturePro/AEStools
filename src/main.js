import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'
import VueClipboards from 'vue-clipboard2'



const app = createApp(App)
app.use(VueClipboards);
app.use(router)

app.mount('#app')

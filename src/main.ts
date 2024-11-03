import './assets/styles/customized-bootstrap/index.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Alert from "./components/ui/Alert.vue"

const app = createApp(App)
app.component('Alert', Alert)
app.use(createPinia())
app.use(router)

app.mount('#app')

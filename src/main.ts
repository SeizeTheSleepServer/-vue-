import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '../src/router/index.ts'
import {createPinia} from 'pinia'
import Head from './components/Head.vue'
import {emitter} from "./tools/emitter.ts"

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.component('Head', Head)
app.mount('#app')

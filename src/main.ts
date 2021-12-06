import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import VueClickAway from "vue3-click-away";
import router from './router'

createApp(App).use(router).use(VueClickAway).mount('#app')

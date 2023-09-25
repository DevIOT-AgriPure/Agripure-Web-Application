import './assets/main.css'
import router from './router/index.js'
import PrimeVue from 'primevue/config';

import { createApp } from 'vue'
import App from './App.vue'

//PrimeVue Styles
import "primevue/resources/themes/arya-green/theme.css"       //theme
import "primevue/resources/primevue.min.css"                //core css
import "primeicons/primeicons.css"

import Button from 'primevue/button';

const app = createApp(App)

app.use(PrimeVue);
app.use(router)
app.component("pv-button",Button)

app.mount('#app')
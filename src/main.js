import router from './router/index.js'
import PrimeVue from 'primevue/config';

import { createApp } from 'vue'
import App from './App.vue'

//PrimeVue Styles
import "primevue/resources/themes/arya-green/theme.css"       //theme
import "primevue/resources/primevue.min.css"                //core css
import "primeicons/primeicons.css"

import Button from 'primevue/button';
import Avatar from 'primevue/avatar';

const app = createApp(App)

app.use(PrimeVue);
app.use(router)
app.component("pv-button",Button)
app.component("pv-avatar",Avatar)

app.mount('#app')
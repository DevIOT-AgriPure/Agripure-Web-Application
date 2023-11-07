import router from './router/index.js'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import { createApp } from 'vue'
import App from './App.vue'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBPfL4bzcymVX-2Sj1puDBEZAMg3h2wiI0",
    authDomain: "agripure-678b4.firebaseapp.com",
    projectId: "agripure-678b4",
    storageBucket: "agripure-678b4.appspot.com",
    messagingSenderId: "231712564171",
    appId: "1:231712564171:web:b0507723031a58eedb8c4e",
    measurementId: "G-CCCV7VB3E0"
};

//PrimeVue Styles
import "primevue/resources/themes/arya-green/theme.css"       //theme
import "primevue/resources/primevue.min.css"                //core css
import "primeicons/primeicons.css"

import Button from 'primevue/button';
import Avatar from 'primevue/avatar';
import AutoComplete from 'primevue/autocomplete';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Dialog from 'primevue/dialog';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional
import Tag from 'primevue/tag';
import Slider from 'primevue/slider';
import ProgressBar from 'primevue/progressbar';
import Checkbox from 'primevue/checkbox';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import InputSwitch from 'primevue/inputswitch';
import Textarea from 'primevue/textarea';
import Calendar from 'primevue/calendar';
import Toast from 'primevue/toast';







const vueApp  = createApp(App)
vueApp.mount('#app')
vueApp.use(PrimeVue);
vueApp.use(router)
vueApp.use(ToastService);
vueApp.component("pv-button",Button)
vueApp.component("pv-avatar",Avatar)
vueApp.component("pv-autoComplete",AutoComplete)
vueApp.component("pv-card",Card)
vueApp.component("pv-input",InputText)
vueApp.component("pv-dropdown",Dropdown)
vueApp.component("pv-dialog",Dialog)
vueApp.component("pv-dataTable",DataTable)
vueApp.component("pv-column",Column)
vueApp.component("pv-columnGroup",ColumnGroup)
vueApp.component("pv-row",Row)
vueApp.component("pv-tag",Tag)
vueApp.component("pv-slider",Slider)
vueApp.component("pv-progressBar",ProgressBar)
vueApp.component("pv-checkbox",Checkbox)
vueApp.component("pv-accordion",Accordion)
vueApp.component("pv-accordionTab",AccordionTab)
vueApp.component("pv-inputSwitch",InputSwitch)
vueApp.component("pv-textArea",Textarea)
vueApp.component("pv-calendar",Calendar)
vueApp.component("pv-toast",Toast)


vueApp.mount('#app')
const firebaseApp = initializeApp(firebaseConfig)
const analytics = getAnalytics(firebaseApp)
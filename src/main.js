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





const app = createApp(App)

app.use(PrimeVue);
app.use(router)
app.component("pv-button",Button)
app.component("pv-avatar",Avatar)
app.component("pv-autoComplete",AutoComplete)
app.component("pv-card",Card)
app.component("pv-input",InputText)
app.component("pv-dropdown",Dropdown)
app.component("pv-dialog",Dialog)
app.component("pv-dataTable",DataTable)
app.component("pv-column",Column)
app.component("pv-columnGroup",ColumnGroup)
app.component("pv-row",Row)
app.component("pv-tag",Tag)
app.component("pv-slider",Slider)
app.component("pv-progressBar",ProgressBar)


app.mount('#app')
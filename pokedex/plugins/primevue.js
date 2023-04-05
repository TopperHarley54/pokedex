import {defineNuxtPlugin} from "#app";
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import DataTable from "primevue/datatable";
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';
import Divider from "primevue/divider";
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';

// optional


export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue, {ripple: true});
    nuxtApp.vueApp.component("Button", Button);
    nuxtApp.vueApp.component("InputText", InputText);
    nuxtApp.vueApp.component("DataTable", DataTable);
    nuxtApp.vueApp.component("Column", Column);
    nuxtApp.vueApp.component("ColumnGroup", ColumnGroup);
    nuxtApp.vueApp.component("Row", Row);
    nuxtApp.vueApp.component("Divider", Divider);
    nuxtApp.vueApp.component("Toast", Toast);
    nuxtApp.vueApp.use(ToastService);
    //other components that you need
});

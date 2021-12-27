import { createApp } from 'vue';
import App from './App.vue'
import VueSignaturePad from "vue-signature-pad";

const app = createApp(App);
app.use(VueSignaturePad)
app.mount('#app')

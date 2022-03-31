import { createApp } from 'vue';
import router from './router';
import store from './store';
import BoostrapVue3 from "bootstrap-vue-3";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import App from './App.vue'
createApp(App)
.component('fa', FontAwesomeIcon)
.use(store)
.use(router)
.use(BoostrapVue3)
.mount('#app')

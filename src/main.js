import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BButton, BFormSelect } from 'bootstrap-vue';

Vue.component('b-button', BButton);
Vue.component('b-form-select', BFormSelect);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

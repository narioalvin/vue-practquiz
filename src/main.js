import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BDropdown, BDropdownItem, BButton } from 'bootstrap-vue';

Vue.component('b-dropdown', BDropdown);
Vue.component('b-dropdown-item', BDropdownItem);
Vue.component('b-button', BButton);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

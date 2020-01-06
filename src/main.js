import Vue from 'vue';
import App from './App.vue';
import '@/assets/css/tailwind.css';
import router from '@/router';
import { dolarFilter, percentFilter } from '@/filters';
import { VueSpinners } from '@saeris/vue-spinners';
import Chart from 'chart.js';
import Chartcick from 'vue-chartkick';

Vue.use(VueSpinners);
Vue.use(Chartcick.use(Chart));
Vue.filter('dollar', dolarFilter);
Vue.filter('percent', percentFilter);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

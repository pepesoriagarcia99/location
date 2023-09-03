import Vue from 'vue';
import VueCookies from 'vue-cookies';

import App from './App.vue';
import router from './router';
import store from './store';
import 'core-js/stable';

import { LMap, LMarker, LTileLayer } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);

Vue.config.productionTip = false;

Vue.use(VueCookies, { expires : '31d' });

new Vue({
  router,
  store,
  render : h => h(App)
}).$mount('#app');

const trackingId = Vue.$cookies.get('trackingId');
if (trackingId) {
  store.commit('user/trackUser', { id : trackingId });
}

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueFire from 'vuefire'

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCsFfYE1rLKHx9aTeauPnG7-gSFB3nT6PY'
  }
})

Vue.use(VueFire)

import RouteCard from './components/RouteCard'
Vue.component('route-card', RouteCard)

import VisitCard from './components/VisitCard'
Vue.component('visit-card', VisitCard)

import RouteMapCard from './components/RouteMapCard'
Vue.component('route-map-card', RouteMapCard)

import Vuetify from 'vuetify'
Vue.use(Vuetify)

import Mdl from 'material-design-lite'
Vue.use(Mdl)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

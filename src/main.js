// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as VueGoogleMaps from 'vue2-google-maps'
import Vuefire from 'vuefire'
import firebase from './service/firebase'

Vue.use(Vuefire)
Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCsFfYE1rLKHx9aTeauPnG7-gSFB3nT6PY'
  }
})

import VueNotifications from 'vue-notifications'
import miniToastr from 'mini-toastr'
const toastTypes = {
  success: 'success',
  error: 'error',
  info: 'info',
  warn: 'warn'
}
miniToastr.init({ types: toastTypes })

function toast({ title, message, type, timeout, cb }) {
  return miniToastr[type](message, title, timeout, cb)
}

const options = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast
}

VueNotifications.config.timeout = 4000
Vue.use(VueNotifications, options)

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
  firebase: {
    users: firebase.database.ref('users'),
    routes: firebase.database.ref('routes'),
    topRoutes: firebase.database.ref('routes').limitToFirst(30)
  },
  router,
  template: '<App/>',
  components: { App }
})


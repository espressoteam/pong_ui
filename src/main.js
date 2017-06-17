// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as VueGoogleMaps from 'vue2-google-maps'
import * as firebase from 'firebase'

var firebaseConfig = {
  apiKey: 'AIzaSyBwdEQvn2bT5jlZ4xG8tdg4r97GHdxutJY',
  projectId: 'lab2-4d0bb',
  authDomain: 'lab2-4d0bb.firebaseapp.com',
  databaseURL: 'https://lab2-4d0bb.firebaseio.com',
  storageBucket: 'lab2-4d0bb.appspot.com',
  messagingSenderId: '623837882946'
}

firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()

messaging.requestPermission()
.then(function () {
  console.log('Notification permission granted.')
  // TODO(developer): Retrieve an Instance ID token for use with FCM.
  // ...
  getToken()
})
.catch(function (err) {
  console.log('Unable to get permission to notify.', err)
})

function getToken () {
  messaging.getToken()
  .then(function (currentToken) {
    if (currentToken) {
      console.log(currentToken)
      sendTokenToServer(currentToken)
      // updateUIForPushEnabled(currentToken)
    } else {
      // Show permission request.
      console.log('No Instance ID token available. Request permission to generate one.')
      // Show permission UI.
      // updateUIForPushPermissionRequired()
      setTokenSentToServer(false)
    }
  })
  .catch(function (err) {
    console.log('An error occurred while retrieving token. ', err)
    // showToken('Error retrieving Instance ID token. ', err)
    setTokenSentToServer(false)
  })
}

  // Callback fired if Instance ID token is updated.
messaging.onTokenRefresh(function () {
  messaging.getToken()
  .then(function (refreshedToken) {
    console.log('Token refreshed.')
    // Indicate that the new Instance ID token has not yet been sent to the
    // app server.
    // setTokenSentToServer(false);
    // Send Instance ID token to app server.
    // sendTokenToServer(refreshedToken);
    // ...
  })
  .catch(function (err) {
    console.log('Unable to retrieve refreshed token ', err)
    // showToken('Unable to retrieve refreshed token ', err)
  })
})

messaging.onMessage(function (payload) {
  console.log('Message received. ', payload)
  // ...
})

// Send the Instance ID token your application server, so that it can:
// - send messages back to this app
// - subscribe/unsubscribe the token from topics
function sendTokenToServer (currentToken) {
  if (!isTokenSentToServer()) {
    console.log('Sending token to server...')
    // TODO(developer): Send the current token to your server.
    setTokenSentToServer(true)
  } else {
    console.log('Token already sent to server so won\'t send it again ' +
        'unless it changes')
  }
}

function isTokenSentToServer () {
  return window.localStorage.getItem('sentToServer') === 1
}

function setTokenSentToServer (sent) {
  window.localStorage.setItem('sentToServer', sent ? 1 : 0)
}

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCsFfYE1rLKHx9aTeauPnG7-gSFB3nT6PY'
  }
})

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


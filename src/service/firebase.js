import * as firebase from 'firebase'
import { EventBus } from '../event-bus.js'

var firebaseConfig = {
  apiKey: 'AIzaSyBP31omSLZoWdK4zH3mqOj-FdEZpglL6ME',
  authDomain: 'travelguide-404b1.firebaseapp.com',
  databaseURL: 'https://travelguide-404b1.firebaseio.com',
  projectId: 'travelguide-404b1',
  storageBucket: 'travelguide-404b1.appspot.com',
  messagingSenderId: '18863869659'
}
firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()
const database = firebase.database()
const auth = firebase.auth()

/**
 * Auth
 */
auth.signInAnonymously().catch(console.error)
auth.onAuthStateChanged(function (user) {
  if (user) {
    console.log('User is signed in.', user)
    database.ref('users/' + user.uid).set({
      token: window.localStorage.getItem('userToken')
    })
  } else {
    console.log('User is signed out.')
    auth.signInAnonymously().catch(console.error)
  }
})

/**
 * Messaging
 */
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

function getToken() {
  messaging.getToken()
    .then(function (currentToken) {
      if (currentToken) {
        console.log('Current token : ' + currentToken)
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
      setTokenSentToServer(false)
      // Send Instance ID token to app server.
      sendTokenToServer(refreshedToken)
    })
    .catch(function (err) {
      console.log('Unable to retrieve refreshed token ', err)
      // showToken('Unable to retrieve refreshed token ', err)
    })
})

messaging.onMessage(function (payload) {
  console.log('Message received. ', payload)
  EventBus.$emit('notification-received', payload)
})

// Send the Instance ID token your application server, so that it can:
// - send messages back to this app
// - subscribe/unsubscribe the token from topics
function sendTokenToServer(currentToken) {
  if (!isTokenSentToServer()) {
    console.log('Sending token to server...')
    window.localStorage.setItem('userToken', currentToken)
    setTokenSentToServer(true)
  } else {
    console.log('Token already sent to server so won\'t send it again ' +
      'unless it changes')
  }
}

function isTokenSentToServer() {
  return window.localStorage.getItem('sentToServer') === 1
}

function setTokenSentToServer(sent) {
  window.localStorage.setItem('sentToServer', sent ? 1 : 0)
}

export default {
  messaging: messaging,
  database: database,
  auth: auth
}

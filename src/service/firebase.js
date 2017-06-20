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
    window.localStorage.setItem('userId', user.uid)
    updateUserToken()
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
    getToken()
  })
  .catch(function (err) {
    console.log('Unable to get permission to notify.', err)
  })

function getToken() {
  messaging.getToken().then(function (currentToken) {
    if (currentToken) {
      console.log('Current token : ' + currentToken)
      window.localStorage.setItem('userToken', currentToken)
      updateUserToken()
    } else {
      console.log('No Instance ID token available. Request permission to generate one.')
    }
  }).catch(function (err) {
    console.log('An error occurred while retrieving token. ', err)
  })
}

// Callback fired if Instance ID token is updated.
messaging.onTokenRefresh(function () {
  messaging.getToken().then(function (refreshedToken) {
    console.log('Token refreshed : ' + refreshedToken)
    window.localStorage.setItem('userToken', refreshedToken)
    updateUserToken()
  }).catch(function (err) {
    console.log('Unable to retrieve refreshed token ', err)
  })
})

messaging.onMessage(function (payload) {
  console.log('Message received. ', payload)
  EventBus.$emit('notification-received', payload)
})

function updateUserToken() {
  var userId = window.localStorage.getItem('userId')
  var userToken = window.localStorage.getItem('userToken')

  window.localStorage.removeItem('displayName')
  if (userId) {
    database.ref('users/' + userId).child('displayName').on('value', function (snapshot) {
      if (snapshot.val()) {
        window.localStorage.setItem('displayName', snapshot.val())
      }
    })
  }

  if (userId && userToken) {
    console.log('Save token to database...')
    database.ref('users/' + userId).child('token').set(userToken)
  } else {
    console.log('Missing user ID or token. Cannot save token to database.')
  }
}

export default {
  messaging: messaging,
  database: database,
  auth: auth
}

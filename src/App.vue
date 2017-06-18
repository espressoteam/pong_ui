<template>
  <div class="layout-transparent mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <header class="mdl-layout__header mdl-layout__header--transparent">
      <div class="mdl-layout__header-row">
        <span class="mdl-layout-title" style="cursor: pointer;" @click="$router.push({name:'home'})">
          <img width="32" height="32" src="/static/img/icons/logo-white.png"/>
          ROUTE64
        </span>
        <div class="mdl-layout-spacer"></div>
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable
                  mdl-textfield--floating-label mdl-textfield--align-right">
        <label class="mdl-button mdl-js-button mdl-button--icon"
               for="fixed-header-drawer-exp">
          <i class="material-icons">search</i>
        </label>
        <div class="mdl-textfield__expandable-holder">
          <input class="mdl-textfield__input" type="text" name="sample"
                 id="fixed-header-drawer-exp">
        </div>
      </div>
      </div>
    </header>
    <div class="mdl-layout__drawer">
      <span class="mdl-layout-title">
        <img width="32" height="32" src="/static/img/icons/logo.png"/>
        ROUTE64
      </span>
      <nav class="mdl-navigation">
        <router-link class="mdl-navigation__link" to="/" @click.native="hideMenu">Home</router-link>
        <router-link class="mdl-navigation__link" to="/post" @click.native="hideMenu">My routes</router-link>
        <router-link class="mdl-navigation__link" to="/post" @click.native="hideMenu">Routes nearby</router-link>
      </nav>
    </div>
    <main class="mdl-layout__content">
      <div class="page-content">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
import Firebase from 'firebase'
const config = {
  apiKey: 'AIzaSyApAt_H0iy3l1NyGX38uwQhidX8_bL6zRw',
  authDomain: 'route64-cecb6.firebaseapp.com',
  databaseURL: 'https://route64-cecb6.firebaseio.com',
  projectId: 'route64-cecb6',
  storageBucket: '',
  messagingSenderId: '359893308707'
}
const app = Firebase.initializeApp(config)
const messaging = app.messaging()
messaging.requestPermission()
.then(function () {
  console.log('Notification permission granted.')
})
.catch(function (err) {
  console.log('Unable to get permission to notify.', err)
})
messaging.onMessage(function (payload) {
  alert('Message received. ' + payload)
  console.log('Message received. ', payload)
})
export default {
  name: 'app',
  methods: {
    hideMenu: function () {
      document.getElementsByClassName('mdl-layout__drawer')[0].classList.remove('is-visible')
      document.getElementsByClassName('mdl-layout__obfuscator')[0].classList.remove('is-visible')
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
@import url('https://code.getmdl.io/1.2.1/material.blue-red.min.css');

.layout-transparent {
  background: url('/static/img/background.jpg') center / cover;
}

.head1 {
    background: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 0;
    margin: 0;
}
</style>

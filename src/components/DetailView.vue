<template>
  <div>
    <div class="mdl-grid">
      <h4 class="head1">{{route.title}}</h4>
      <div class="mdl-layout-spacer"></div>
      <a class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" v-if="route.ownerId==userId" @click.prevent="deleteRoute(route['.key'])">
        <i class="material-icons">delete</i>
      </a>
      <a class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" v-if="route.ownerId==userId" @click.prevent="editRoute(route['.key'])">
        <i class="material-icons">edit</i>
      </a>
      <a class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" @click.prevent="copyRoute(route)">
        <i class="material-icons">content_copy</i>
      </a>
    </div>
    <div class="mdl-grid">
      <b>by {{route.traveller}}</b>
      <div class="mdl-layout-spacer"></div>
      <a class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" v-if="route.ownerId !== userId && !following[route.ownerId]" @click="follow(route)">
        Follow
      </a>
      <a class="mdl-button mdl-js-button mdl-button--raised" v-if="route.ownerId !== userId && following[route.ownerId]" @click="unfollow(route)">
        Unfollow
      </a>
    </div>
    <div class="mdl-grid">
      <route-map-card class="mdl-cell mdl-cell--8-col" :route="route"></route-map-card>
    </div>
    <div class="mdl-grid">
      <visit-card class="mdl-shadow--2dp mdl-cell mdl-cell--4-col" v-for="(visit, index) in route.visits" :key="visit.id" :visit="visit">
      </visit-card>
    </div>
  </div>
</template>
<script>
import { EventBus } from '../event-bus.js'
export default {
  data() {
    return {
      userId: window.localStorage.getItem('userId'),
      route: {},
      following: {}
    }
  },
  methods: {
    follow(route) {
      this.following[route.ownerId] = true
      this.$root.$firebaseRefs.users.child(this.userId).child('following').set(this.following)
      EventBus.$emit('notification-received', { notification: { body: 'Start following ' + route.traveller } })
    },
    unfollow(route) {
      this.following[route.ownerId] = false
      this.$root.$firebaseRefs.users.child(this.userId).child('following').set(this.following)
      EventBus.$emit('notification-received', { notification: { body: 'Unfollowed ' + route.traveller } })
    },
    editRoute(key) {
      this.$router.push({ name: 'editor', id: '', query: { copy: key } })
    },
    deleteRoute(key) {
      this.$root.$firebaseRefs.routes.child(key).remove()
      this.$router.push({ name: 'home' })
      EventBus.$emit('notification-received', { notification: { body: 'Route removed' } })
    },
    copyRoute(route) {
      var self = this
      var copy = Object.assign({}, route)
      delete copy['.key']
      copy.ownerId = window.localStorage.getItem('userId')
      copy.traveller = window.localStorage.getItem('displayName')
      copy.category = 'user'
      this.$root.$firebaseRefs.routes.push(copy).once('value', function (snapshot) {
        self.editRoute(snapshot.key)
        EventBus.$emit('notification-received', { notification: { body: 'Route copied successfully' } })
      })
    }
  },
  created() {
    this.$root.$firebaseRefs.routes.orderByKey().equalTo(this.$route.params.id)
      .once('value', (snapshot) => {
        var data = Object.values(snapshot.toJSON())[0]
        data['.key'] = Object.keys(snapshot.toJSON())[0]
        this.route = data
      })

    this.$root.$firebaseRefs.users.child(this.userId).child('following')
      .on('value', (snapshot) => {
        this.following = {}
        snapshot.forEach((child) => {
          this.following[child.key] = child.val()
        })
      })
  }
}
</script>
<style scoped>
h4 {
  background: rgba(0, 0, 0, 0.5);
  color: white;
}
</style>

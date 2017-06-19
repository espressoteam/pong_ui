<template>
  <div>
    <div v-for="route in this.$root.routes" v-if="route['.key']==$route.params.id">
      <div class="mdl-grid">
        <h4 class="head1">{{route.title}}</h4>
      </div>
      <div class="mdl-grid">
        <b>by {{route.traveller}}</b>
      </div>
      <div class="mdl-grid">
        <route-map-card class="mdl-cell mdl-cell--8-col" :route="route"></route-map-card>
      </div>
      <div class="mdl-grid">
        <visit-card class="mdl-shadow--2dp mdl-cell mdl-cell--4-col" v-for="(visit, index) in route.visits" :key="visit.id" :visit="visit">
        </visit-card>
      </div>
      <button class="copy-button mdl-button mdl-js-button mdl-button--raised mdl-button--accent" @click="copyRoute(route)">Copy this route</button>
      <button class="follow-button mdl-button mdl-js-button mdl-button--raised mdl-button--accent" :disabled="route.ownerId==userId">Follow</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userId: window.localStorage.getItem('userId')
    }
  },
  methods: {
    copyRoute(route) {
      var copy = Object.assign({}, route)
      var router = this.$router
      delete copy['.key']
      copy.ownerId = window.localStorage.getItem('userId')
      copy.traveller = window.localStorage.getItem('displayName')
      copy.category = 'user'
      this.$root.$firebaseRefs.routes.push(copy).on('value', function (snapshot) {
        console.log(snapshot.val())
        router.push({ name: 'editor', id: '', query: { copy: snapshot.key } })
      })
    }
  }
}
</script>
<style scoped>
h4 {
  background: rgba(0, 0, 0, 0.5);
  color: white;
}

.copy-button {
  position: fixed;
  right: 24px;
  top: 60px;
  z-index: 998;
}

.follow-button {
  position: fixed;
  right: 24px;
  top: 100px;
  z-index: 998;
}
</style>

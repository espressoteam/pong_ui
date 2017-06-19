<template>
  <div>
    <div v-for="route in this.$root.routes" v-if="route['.key']==$route.query.copy">
      <div class="mdl-grid">
        <input v-if="edit" class="head1" type="text" v-model="route.title" id="title" @blur="edit=false">
        <span v-if="!edit" class="head1">{{route.title}}
          <i @click="edit=true" class="material-icons button">edit</i>
        </span>
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
      <button class="save-button mdl-button mdl-js-button mdl-button--raised mdl-button--accent" @click="saveRoute(route)">Save</button>
    </div>
  </div>
</template>
<script>
import { EventBus } from '../event-bus.js'
export default {
  data() {
    return {
      edit: false
    }
  },
  methods: {
    saveRoute(route) {
      this.$root.$firebaseRefs.routes.child(route['.key']).child('title').set(route.title)
      this.$router.push('/myroutes')
      EventBus.$emit('notification-received', {notification: {body: 'Route saved successfully'}})
    }
  }
}
</script>
<style scoped>
.head1 {
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 2.12em;
  padding-top: 2px;
  padding-bottom: 8px;
}

.button {
  cursor: pointer;
}

.button:hover {
  color: grey;
}

.save-button {
  position: fixed;
  right: 24px;
  top: 60px;
  z-index: 998;
}
</style>

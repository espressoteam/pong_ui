<template>
<div>
  <div class="mdl-grid">
    <div class="mdl-cell mdl-cell--3-col mdl-cell--2-col-phone">
      <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent filled" @click="$router.push({name:'myroutes'})">My routes</button>
    </div>
    <div class="mdl-cell mdl-cell--3-col mdl-cell--2-col-phone">
      <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent filled">Routes nearby</button>
    </div>
  </div>
  <div class="mdl-grid">
    <h4 class="head1">Recommended</h4>
  </div>
  <div class="mdl-grid">
    <route-card 
    class="mdl-cell mdl-cell--6-col mdl-cell--4-col-phone"
    v-for="route in this.$root.recommendedRoutes" :route="route" :key="route['.key']" @click="displayDetails(route['.key'])"></route-card>
  </div>
  <div class="mdl-grid">
    <h4 class="head1">Popular</h4>
  </div>
  <div class="mdl-grid">
    <route-card 
    class="mdl-cell mdl-cell--6-col mdl-cell--4-col-phone"
    v-for="route in this.$root.popularRoutes" :route="route" :key="route['.key']" @click="displayDetails(route['.key'])"></route-card>
  </div>
  <div class="mdl-grid">
    <h4 class="head1">Latest Routes</h4>
  </div>
  <div class="mdl-grid">
    <route-card 
    class="mdl-cell mdl-cell--6-col mdl-cell--4-col-phone"
    v-for="route in this.$root.userRoutes" :route="route" :key="route['.key']" @click="displayDetails(route['.key'])"></route-card>
  </div>
</div>
</template>
<script>
  export default {
    methods: {
      displayDetails (id) {
        this.$router.push({name: 'detail', params: { id: id }})
      }
    }
  }
</script>
<style scoped>
  .filled {
    width: 100%;
  }
</style>

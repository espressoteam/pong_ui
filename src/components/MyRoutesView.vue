<template>
  <div>
    <div class="mdl-grid">
      <h4 class="head1">My Routes</h4>
    </div>
    <div class="mdl-grid">
      <route-card class="mdl-cell mdl-cell--6-col mdl-cell--4-col-phone" v-for="route in routes" :route="route" :key="route['.key']" @click="displayDetails(route['.key'])"></route-card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userId: window.localStorage.getItem('userId'),
      routes: []
    }
  },
  methods: {
    displayDetails(id) {
      this.$router.push({ name: 'detail', params: { id: id } })
    }
  },
  created() {
    this.$root.$firebaseRefs.routes.orderByChild('ownerId').equalTo(this.userId)
      .once('value', (snapshot) => {
        this.routes = []
        snapshot.forEach((child) => {
          var childData = child.val()
          childData['.key'] = child.key
          this.routes.push(childData)
        })
      })
  }
}
</script>
<style scoped>
.filled {
  width: 100%;
}
</style>

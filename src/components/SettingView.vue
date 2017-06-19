<template>
  <v-layout row wrap>
    <v-flex xs10 offset-xs1 md8 offset-md2>
      <v-card class="grey lighten-4 elevation-0">
        <v-card-text>
          <v-text-field name="UserName" label="User Name" id="userName" v-model="displayName"></v-text-field>
          <v-btn light info @click.native="saveUserName">
            Save
          </v-btn>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { EventBus } from '../event-bus.js'
export default {
  data() {
    return {
      displayName: window.localStorage.getItem('displayName')
    }
  },
  methods: {
    saveUserName() {
      this.$root.$firebaseRefs.users.child(window.localStorage.getItem('userId')).child('displayName').set(this.displayName)
      EventBus.$emit('notification-received', {notification: {body: 'User name saved successfully'}})
    }
  }
}
</script>

<style scoped>
.waiting {
  padding: 10px;
  color: #555;
}
</style>

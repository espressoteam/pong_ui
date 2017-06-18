<template>
  <v-layout row wrap>
    <v-flex xs10 offset-xs1 md8 offset-md2>
      <v-card class="grey lighten-4 elevation-0">
        <v-card-text>
          <v-text-field name="UserName" label="User Name" id="userName"></v-text-field>
          <v-btn light info>
            Save
          </v-btn>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
}
</script>

<style scoped>
.waiting {
  padding: 10px;
  color: #555;
}
</style>

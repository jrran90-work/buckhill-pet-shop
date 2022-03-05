<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="290"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        color="white"
        outlined
        x-large
        v-bind="attrs"
        v-on="on"
      >
        Logout
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="text-h5">
        Confirm
      </v-card-title>
      <v-card-text>Do you wish to end your session?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="red"
          text
          @click="dialog = false"
        >
          cancel
        </v-btn>
        <v-btn
          color="primary"
          :loading="loading"
          :disabled="loading"
          @click="logout"
        >
          Logout
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      loading: false,
    }
  },
  methods: {
    async logout () {
      this.loading = true
      await this.$store.dispatch('auth/logout')
      this.loading = false
    }
  }
}
</script>
<template>
  <v-dialog v-model="modal.login" width="540" @click:outside="showDialog('login', false)">
    <v-card class="px-10 pt-8 pb-4">
      <v-btn absolute top right icon @click="showDialog('login', false)">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-card-title class="mb-5">
        <v-avatar
          color="primary"
          size="92"
          class="white--text mx-auto"
        >
          <div>
            <v-icon color="white" size="52">mdi-paw</v-icon>
            <div class="caption font-weight-light">petson.</div>
          </div>
        </v-avatar>
      </v-card-title>
      <v-card-text class="text-h5 black--text text-center">Log in</v-card-text>
      <v-card-text>
        <v-form>
          <v-text-field label="Email Address*" outlined />
          <v-text-field label="Password*" type="password" outlined />
          <v-checkbox
            label="Remember me"
            class="mb-4"
          ></v-checkbox>
          <v-btn color="primary" block>Log in</v-btn>
        </v-form>
        <v-card-actions class="d-flex justify-space-between mt-6">
          <NuxtLink to="/forgot" class="info--text">Forgot password?</NuxtLink>
          <div class="info--text cursor-pointer" @click="showDialog('register', true)">Don't have an account? Sign Up</div>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      modal: 'auth/modal'
    })
  }, 
  methods: {
    showDialog(dialog, show) {
      this.$store.dispatch('auth/showModal', {
        show,
        property: dialog,
      })
    },
  }
}
</script>
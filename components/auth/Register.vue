<template>
  <v-dialog v-model="modal.register" width="540" @click:outside="showDialog('register', false)">
    <v-card class="px-10 pt-8 pb-4">
      <v-btn absolute top right icon @click="showDialog('register', false)">
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
      <v-card-text class="text-h5 black--text text-center">Sign up</v-card-text>
      <v-card-text>
        <v-form>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field label="Firstname*" outlined />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field label="Lastname*" outlined />
            </v-col>
          </v-row>
          <v-text-field label="Email Address*" outlined />
          <v-text-field label="Password*" type="password" outlined />
          <v-text-field label="Confirm Password*" type="password" outlined />
          <v-checkbox
            label="I want to receive inspiration, marketing promotions and updates via email."
            class="mb-4"
          ></v-checkbox>
          <v-btn color="primary" block>Sign Up</v-btn>
        </v-form>
        <v-card-actions class="mt-6">
          <div class="info--text cursor-pointer mx-auto" @click="showDialog('login', true)">Already have an account? Log in</div>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {}
  },
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
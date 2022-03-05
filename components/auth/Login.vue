<template>
  <v-dialog v-model="modal.login" width="540" :persistent="true">
    <v-card class="px-10 pt-8 pb-4">
      <v-btn absolute top right icon @click="$showAuthDialog('login', false)">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-card-title class="mb-5">
        <v-avatar color="primary" size="92" class="white--text mx-auto">
          <div>
            <v-icon color="white" size="52">mdi-paw</v-icon>
            <div class="caption font-weight-light">petson.</div>
          </div>
        </v-avatar>
      </v-card-title>
      <v-card-text class="text-h5 black--text text-center">Log in</v-card-text>
      <v-card-text>
        <v-form ref="authForm" @submit.prevent="login">
          <v-text-field
            v-model="form.email"
            :rules="rules.email"
            label="Email Address*"
            outlined
          />
          <v-text-field
            v-model="form.password"
            :rules="rules.password"
            label="Password*"
            type="password"
            outlined
          />
          <v-checkbox v-model="form.remember" label="Remember me" class="mb-4"></v-checkbox>
          <v-btn
            type="submit"
            color="primary"
            :loading="form.loading"
            :disabled="form.loading"
            block
            >Log in</v-btn
          >
        </v-form>
        <v-card-actions class="d-flex justify-space-between mt-6">
          <NuxtLink to="/forgot" class="info--text">Forgot password?</NuxtLink>
          <div
            class="info--text cursor-pointer"
            @click="$showAuthDialog('register', true)"
          >
            Don't have an account? Sign Up
          </div>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { API } from '~/utils/api'
import { rules } from '~/validations/auth'

export default {
  data() {
    return {
      rules,
      form: {
        email: '',
        password: '',
        remember: false,
        loading: false,
      },
    }
  },
  computed: {
    ...mapGetters({
      modal: 'auth/modal',
    }),
  },
  methods: {
    async login() {
      if (!this.$refs.authForm.validate()) {
        return
      }

      this.form.loading = true
      try {
        const { data } = await this.$axios.post(this.$api(API.USER_LOGIN), this.form)
        this.$store.dispatch('auth/saveToken', {
          token: data.data.token,
          remember: this.form.remember
        });
        await this.$store.dispatch('auth/fetchUser')
        this.$showAuthDialog('login', false)
      } catch (e) {
        this.$notify({
          show: true,
          text: e.response.data.error,
          color: 'red',
          timeout: 3000
        })
      } finally {
        this.form.loading = false
      }
    },
  },
}
</script>
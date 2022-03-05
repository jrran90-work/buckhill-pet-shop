<template>
  <v-dialog v-model="modal.register" width="540" :persistent="true">
    <v-card class="px-10 pt-8 pb-4">
      <v-btn
        absolute
        top
        right
        icon
        @click="$showAuthDialog('register', false)"
      >
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
      <v-card-text class="text-h5 black--text text-center">Sign up</v-card-text>
      <v-card-text>
        <v-form ref="authForm" @submit.prevent="register">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.first_name"
                label="Firstname*"
                outlined
                :rules="rules.first_name"
                :error="form.errors.has('first_name')"
                :error-messages="form.errors.get('first_name')"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.last_name"
                label="Lastname*"
                outlined
                :rules="rules.last_name"
                :error="form.errors.has('last_name')"
                :error-messages="form.errors.get('last_name')"
              />
            </v-col>
          </v-row>
          <v-text-field
            v-model="form.email"
            label="Email Address*"
            outlined
            :rules="rules.email"
            :error="form.errors.has('email')"
            :error-messages="form.errors.get('email')"
          />
          <v-text-field
            v-model="form.password"
            label="Password*"
            type="password"
            outlined
            :rules="rules.password"
            :error="form.errors.has('password')"
            :error-messages="form.errors.get('password')"
          />
          <v-text-field
            v-model="form.password_confirmation"
            label="Confirm Password*"
            type="password"
            outlined
            :rules="rules.password_confirmation"
            :error="form.errors.has('password_confirmation')"
            :error-messages="form.errors.get('password_confirmation')"
          />
          <v-checkbox
          v-model="form.is_marketing"
            label="I want to receive inspiration, marketing promotions and updates via email."
            class="mb-4"
          ></v-checkbox>
          <v-btn
            type="submit"
            color="primary"
            :loading="form.loading"
            :disabled="form.loading"
            block
            >Sign Up</v-btn
          >
        </v-form>
        <v-card-actions class="mt-6">
          <div
            class="info--text cursor-pointer mx-auto"
            @click="$showAuthDialog('login', true)"
          >
            Already have an account? Log in
          </div>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { Form } from 'vform'
import { API } from '~/utils/api'
import { rules } from '~/validations/auth'

export default {
  data() {
    return {
      rules,
      form: new Form ({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        address: 'Sample Address',
        phone_number: '112233445',
        is_marketing: false,
        loading: false,
      }),
    }
  },
  computed: {
    ...mapGetters({
      modal: 'auth/modal',
    }),
  },
  methods: {
    async register() {
      if (!this.$refs.authForm.validate()) {
        return
      }

      this.form.loading = true
      try {
        const { data } = await this.form.post(this.$api(API.USER_CREATE))
        this.$store.dispatch("auth/saveToken", {token: data.data.token})
        await this.$store.dispatch("auth/fetchUser")
        this.$showAuthDialog('register', false)
        this.$refs.authForm.reset()
      } catch (e) {} finally {
        this.form.loading = false
      }
    },
  },
}
</script>

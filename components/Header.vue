<template>
  <v-app-bar id="primary-nav" color="primary" height="80" elevation="0" dark fixed app>
    <v-toolbar-title>
      <NuxtLink to="/">
        <v-icon size="38">mdi-paw</v-icon> petson.
      </NuxtLink>
    </v-toolbar-title>
    <v-spacer />
    <v-toolbar-items>
      <v-menu offset-y rounded="0">
        <template #activator="{ on, attrs }">
          <v-btn
            text
            v-bind="attrs"
            v-on="on"
          >
            Products <v-icon small right>mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-list tile>
          <v-list-item>
            <v-list-item-title>Category A</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Category B</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Category C</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn to="/promotions" text>Promotions</v-btn>
      <v-btn to="/blogs" text>Blog</v-btn>
    </v-toolbar-items>
    <v-spacer />
    <v-btn to="/products" class="mr-5" outlined x-large>
      <v-icon left>mdi-cart</v-icon> Cart (0)
    </v-btn>
    <v-btn outlined x-large @click="showLoginDialog">Login</v-btn>
    <auth-login />
    <auth-register />
  </v-app-bar>
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
    showLoginDialog () {
      this.$store.dispatch('auth/showModal', {
        show: true,
        property: 'login',
      })
    }
  }
}
</script>
<template>
  <v-app-bar
    id="primary-nav"
    color="primary"
    height="80"
    elevation="0"
    fixed
    app
  >
    <v-toolbar-title>
      <NuxtLink to="/"> <v-icon size="38" color="white">mdi-paw</v-icon> petson. </NuxtLink>
    </v-toolbar-title>
    <v-spacer />
    <v-toolbar-items>
      <v-menu offset-y rounded="0">
        <template #activator="{ on, attrs }">
          <v-btn color="white" text v-bind="attrs" v-on="on">
            Products <v-icon small right>mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-list tile>
          <v-list-item
            v-for="(category, index) in categories.data"
            :key="index"
            :to="{
              name: 'products-type-uuid',
              params: {
                type: 'category',
                uuid: category.uuid
              }
            }"
          >
            <v-list-item-title>{{ category.title | capitalize }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn to="/promotions" color="white" text>Promotions</v-btn>
      <v-btn to="/blogs" color="white" text>Blog</v-btn>
    </v-toolbar-items>
    <v-spacer />
    <v-btn to="/" class="mr-5" color="white" outlined x-large>
      <v-icon left>mdi-cart</v-icon> Cart (0)
    </v-btn>
    <div v-if="!isLogged">
      <v-btn outlined x-large color="white" @click="$showAuthDialog('login', true)"
        >Login</v-btn
      >
    </div>
    <div v-else>
      <auth-logout />
      <v-avatar
        color="primary darken-1"
        size="56"
        class="ml-4 white--text"
      >
        {{ fullname | initials }}
      </v-avatar>
    </div>
    <auth-login />
    <auth-register />
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      isLogged: 'auth/check',
      user: 'auth/user',
      categories: 'category/list'
    }),
    fullname () {
      return `${this.user.first_name} ${this.user.last_name} `
    }
  }
}
</script>
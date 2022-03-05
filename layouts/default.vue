<template>
  <v-app>
    <Header />
    <v-main>
      <Nuxt />
    </v-main>
    <Footer />

    <Notification />
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  mounted () {
    this.$store.dispatch('category/getCategories', {
      sortBy: 'title',
      desc: true
    })
    this.$store.dispatch('brand/getBrands', {
      sortBy: 'title',
      desc: false
    })
  }
}
</script>

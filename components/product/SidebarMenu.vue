<template>
  <v-expansion-panels v-model="panels" class="product-side-panel" multiple accordion flat>
    <v-expansion-panel>
      <v-expansion-panel-header class="font-weight-medium">
        BRAND
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-list flat>
          <v-list-item
            v-for="(brand, i) in brands.data"
            :key="i"
            exact
            :to="{
              name: 'products-type-uuid',
              params: {
                type: 'brand',
                uuid: brand.uuid
              }
            }"
          >
            <v-list-item-content>
              <v-list-item-title>{{ brand.title | capitalize }}</v-list-item-title>
            </v-list-item-content>
            <!-- <v-list-item-action>
              ({{ 7 }})
            </v-list-item-action> -->
          </v-list-item>
        </v-list>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header class="font-weight-medium">
        CATEGORY
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-list flat>
          <v-list-item
            v-for="(category, i) in categories.data"
            :key="i"
            exact
            :to="{
              name: 'products-type-uuid',
              params: {
                type: 'category',
                uuid: category.uuid
              }
            }"
          >
            <v-list-item-content>
              <v-list-item-title>{{ category.title | capitalize }}</v-list-item-title>
            </v-list-item-content>
            <!-- <v-list-item-action>
              ({{ 7 }})
            </v-list-item-action> -->
          </v-list-item>
        </v-list>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      panels: [0, 1]
    }
  },
  computed: {
    ...mapGetters({
      brands: 'brand/list',
      categories: 'category/list',
    }),
  },
}
</script>

<style lang="scss">
@import "~/assets/scss/components/product-lists";
</style>
<template>
  <v-container fluid>
    <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
    <v-row class="mt-6">
      <v-col cols="12" md="4" offset-md="4">
        <v-text-field
          v-model="search.keyword"
          outlined
          color="primary"
          class="search-input primary--text"
          @input="onSearch"
        >
          <template #label>
            <span class="primary--text">Search products</span>
          </template>
          <template #prepend-inner>
            <v-icon color="primary">mdi-magnify</v-icon>
          </template>
        </v-text-field>
      </v-col>
    </v-row>
    <v-row class="mt-16">
      <v-col cols="6" offset-md="3">
        <h2 class="text-h2 primary--text mb-9">Products</h2>
        <v-sheet>
          <v-row>
            <v-col cols="12" md="9">
              <v-breadcrumbs class="breadcrumb-wrapper px-2 black--text" :items="setPageCrumbs()"></v-breadcrumbs>
            </v-col>
            <v-col cols="12" md="3">
              <v-select 
                v-model="pagination.desc"
                color="black"
                label="Sort by"
                :items="sortOptions"
                @change="sortResult"
              />
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2" offset-md="1">
        <v-expansion-panels v-model="panels" class="product-side-panel" multiple accordion flat>
          <v-expansion-panel>
            <v-expansion-panel-header class="font-weight-medium">
              PRICE
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-slider
                v-model="pagination.price"
                class="custom-slider mb-2"
                tick-size="10"
                thumb-color="white"
                track-color="gray"
                track-fill-color="info"
                max="5000"
                min="0"
                hide-details
                @input="onSearch"
              ></v-slider>
              
              <v-text-field
                v-model="priceSliderValue"
                class="price-display ml-auto"
                outlined
                readonly
                dense
              />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

        <!-- Brand & Category Panels -->
        <keep-alive>
          <product-sidebar-menu />
        </keep-alive>
      </v-col>
      <v-col cols="6" class="mb-16 pb-16">
        <v-row align-content="center">
          <v-col
            v-for="(product, index) in products.data"
            :key="index"
            cols="12"
            md="4"
          >
            <v-hover v-slot="{ hover }">
              <v-sheet
                rounded="lg"
                min-height="500px"
                :elevation="hover ? 2 : 0"
                :title="product.title"
                :class="`
                  px-8
                  py-12
                  cursor-pointer
                  ${ hover ? 'on-hover': '' }
                `"
              >
                <v-img
                  :lazy-src="require('~/assets/img/pixel-11-10x6.jpg')"
                  :src="$api( `${api.FILE}/${product.metadata.image}` )"
                  height="220"
                  contain
                ></v-img>

                <div class="product--wrap mt-6">
                  <div class="text-h6 mb-2 ellipsis-2">{{ product.title | capitalize }}</div>
                  <div class="text-subtitle-1 text--primary">{{ product.category.title | capitalize }}</div>
                  <div class="text-h6">{{ product.price }} kn</div>
                  <v-btn
                    color="primary"
                    small
                    dark
                    elevation="0"
                    class="mt-3"
                  >
                    <v-icon left>mdi-cart</v-icon> add to card
                  </v-btn>
                </div>
              </v-sheet>
            </v-hover>
          </v-col>
        </v-row>
        <v-row v-if="products.total > 0" class="mt-14">
          <v-col cols="12">
            <div class="text-center">
              <v-pagination
                v-model="pagination.page"
                :length="Math.ceil(products.total / pagination.limit)"
                circle
                class="custom-pagination"
                @input="onPaginate"
              ></v-pagination>

              <div class="paginate--option-wrap d-flex justify-center mt-6">
                <div class="text--secondary d-flex align-center">
                  Items per page:

                  <v-menu offset-y>
                    <template #activator="{ on, attrs }">
                      <v-btn
                        text
                        class="px-0"
                        v-bind="attrs"
                        v-on="on"
                      >
                        {{ pagination.limit }} <v-icon small>mdi-menu-down</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item
                        v-for="(limit, index) in [15, 25, 50]"
                        :key="index"
                        class="cursor-pointer"
                        @click="setLimit(limit)"
                      >
                        <v-list-item-title>{{ limit }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </div>
                <div class="text--secondary d-flex align-center">
                  {{ `${products.from}-${products.to} of ${products.total}` }}
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col cols="12">
            <div class="text--disabled">No product available.</div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { API } from '~/utils/api'

export default {
  data() {
    return {
      api: API,
      overlay: false,
      sortOptions: [
        { text: 'Lowest price first', value: false },
        { text: 'Highest price first', value: true },
      ],
      pagination: {
        page: 1,
        price: 5000,
        limit: 15,
        sortBy: 'price',
        desc: false,
        title: null,
        category: null,
        brand: null,
      },
      typeParams: {},
      panels: [0, 1, 2],
      search: {
        keyword: null,
        timeout: null,
        duration: 500,
      }
    }
  },
  computed: {
    ...mapGetters({
      products: 'product/list',
    }), 
    priceSliderValue() {
      return `${this.pagination.price} kn`
    },
  },
  mounted () {
    this.loadProducts()
  },
  beforeDestroy() {
    this.$store.commit("product/SET_PRODUCTS", {
      data: [],
      total: 0
    });
  },
  methods: {
    setPageCrumbs () {
      const crumbs = ([
        { exact: true, text: 'Homepage', to: '/' },
        {
          exact: true,
          text: 'Products',
          disabled: true
        },
      ])

      return crumbs
    },
    onSearch () {
      clearTimeout(this.search.timeout)

      this.search.timeout = setTimeout(() => {
        this.loadProducts()
      }, this.search.duration)
    },
    onPaginate () {
      this.loadProducts()
    },
    sortResult () {
      this.loadProducts()
    },
    setLimit (limit) {
      this.pagination.page = 1
      this.pagination.limit = limit
      this.loadProducts()
    },
    async loadProducts () {
      this.overlay = true
      await this.$store.dispatch('product/getProducts', {
        ...this.pagination,
        ...this.typeParams,
        ...{ title: this.search.keyword }
      })
      this.overlay = false
    }
  },
}
</script>

<style lang="scss">
@import "~/assets/scss/components/product-lists";
</style>
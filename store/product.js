import { API } from '~/utils/api'

export const state = () => ({
  product: {},
  list: {
    data: [],
    total: 0,
    to: 0,
    from: 0
  },
})

export const getters = {
  product: (state) => state.product,
  list: (state) => state.list,
}

export const mutations = {
  SET_PRODUCT(state, slug) {
    state.category = slug
  },
  SET_PRODUCTS(state, list) {
    state.list = list;
  },
}

export const actions = {
  async getProduct({ commit, }, uuid) {
    try {
      const { data } = await this.$axios.get(this.$api(`${API.PRODUCT}/${uuid}`))
      commit('SET_PRODUCT', data.data)
    } catch (e) {}
  },
  async getProducts({ commit }, pagination) {
    try {
      const { data } = await this.$axios.get(this.$api(API.PRODUCTS), {
        params: pagination
      });
      commit("SET_PRODUCTS", data);
    } catch (e) {}
  },
}

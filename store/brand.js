import { API } from '~/utils/api'

export const state = () => ({
  brand: {},
  list: {
    data: []
  },
})

export const getters = {
  brand: (state) => state.brand,
  list: (state) => state.list,
}

export const mutations = {
  SET_BRAND(state, brand) {
    state.brand = brand
  },
  SET_BRANDS(state, list) {
    state.list = list
  },
}

export const actions = {
  async getBrand({ commit }, uuid) {
    try {
      const { data } = await this.$axios.get(this.$api(`${API.BRAND}/${uuid}`))
      commit('SET_BRAND', data.data)
    } catch (e) {}
  },
  async getBrands({ commit }, pagination) {
    try {
      const { data } = await this.$axios.get(this.$api(API.BRANDS), {
        params: pagination
      })
      commit('SET_BRANDS', data)
    } catch (e) {}
  },
}

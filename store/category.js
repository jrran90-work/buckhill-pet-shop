import { API } from '~/utils/api'

export const state = () => ({
  category: {},
  list: {
    data: []
  },
})

export const getters = {
  category: (state) => state.category,
  list: (state) => state.list,
}

export const mutations = {
  SET_CATEGORY(state, slug) {
    state.category = slug
  },
  SET_CATEGORIES(state, list) {
    state.list = list;
  },
}

export const actions = {
  async getCategory({ commit, }, uuid) {
    try {
      const { data } = await this.$axios.get(this.$api(`${API.CATEGORY}/${uuid}`))
      commit('SET_CATEGORY', data.data)
    } catch (e) {}
  },
  async getCategories({ commit }, pagination) {
    try {
      const { data } = await this.$axios.get(this.$api(API.CATEGORIES), {
        params: pagination
      });
      commit("SET_CATEGORIES", data);
    } catch (e) {}
  },
}

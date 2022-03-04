import { API } from '~/utils/api'

export const state = () => ({
  list: {
    data: []
  },
})

export const getters = {
  list: (state) => state.list,
}

export const mutations = {
  SET_CATEGORIES(state, list) {
    state.list = list;
  },
}

export const actions = {
  async getCategories({ commit }, pagination) {
    try {
      const { data } = await this.$axios.get(this.$api(API.CATEGORIES), {
        params: pagination
      });
      commit("SET_CATEGORIES", data);
    } catch (e) {}
  },
}

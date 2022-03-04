import Cookies from "js-cookie";
import { API } from '~/utils/api'

export const state = () => ({
  modal: {
    login: false,
    register: false,
  },
  token: null,
  user: null,
  check: false,
})

export const getters = {
  modal: (state) => state.modal,
  token: (state) => state.token,
  user: (state) => state.user,
  check: (state) => state.user !== null,
}

export const mutations = {
  SET_MODAL(state, obj) {
    Object.keys(state.modal).forEach((i) => {
      state.modal[i] = false
    })
    state.modal[obj.property] = obj.show
  },
  SET_TOKEN(state, token) {
    state.token = token;
  },
  SET_USER(state, user) {
    state.user = user;
  },
}

export const actions = {
  showModal({ commit }, modal) {
    commit('SET_MODAL', modal)
  },
  saveToken({ commit }, { token, remember }) {
    commit("SET_TOKEN", token);

    Cookies.set("token", token, {
      expires: remember ? 365 : null,
    });
  },
  async fetchUser({ commit }) {
    try {
      const { data } = await this.$axios.get(this.$api(API.USER));
      commit("SET_USER", data);
    } catch (e) {
      commit("SET_TOKEN", null);
      Cookies.remove("token");
    }
  },
  async logout({ commit }) {
    await this.$axios.get(this.$api(API.USER_LOGOUT));
    commit("SET_TOKEN", null);
    commit("SET_USER", null);
    Cookies.remove("token");
  },
}

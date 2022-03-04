import Cookies from "js-cookie";
import { cookieFromRequest } from "~/utils";

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    const token = cookieFromRequest(req, "token");
    if (token) {
      commit("auth/SET_TOKEN", token);
    }
  },

  nuxtClientInit({ commit, getters }) {
    const token = Cookies.get("token");
    if (token && !getters["auth/token"]) {
      commit("auth/SET_TOKEN", token);
    }
  },
};

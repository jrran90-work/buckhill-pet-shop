export const state = () => ({
  list: [],
})

export const getters = {
  list: (state) => state.list,
}

export const mutations = {
  SET_STACK(state, notification) {
    state.list.push(notification)
  },
  REMOVE_STACK(state, notification) {
    state.list = state.list.filter(function( obj ) {
      return obj.id !== notification.id;
    });
  },
}

export const actions = {
  set({ commit }, notification) {
    notification.id = Date.now() + Math.random()

    commit("SET_STACK", notification)

    setTimeout(() => {
      commit("REMOVE_STACK", notification)
    }, notification.timeout)
  },
  remove({ commit }, notification) {
    commit("REMOVE_STACK", notification)
  },
}

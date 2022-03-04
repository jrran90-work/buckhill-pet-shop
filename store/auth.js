export const state = () => ({
  modal: {
    login: false,
    register: false,
  },
});

export const getters = {
  modal: (state) => state.modal,
};

export const mutations = {
  SET_MODAL(state, obj) {
    Object.keys(state.modal).forEach((i) => {
      state.modal[i] = false
    });
    state.modal[obj.property] = obj.show;
  },
};

export const actions = {
  showModal({ commit }, modal) {

    commit('SET_MODAL', modal);
  },
};
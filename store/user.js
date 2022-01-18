export const state = () => ({
  isAuthorized: false,
  name: '',
  password: '',
  token: '',
});

export const actions = {
  setIsAuthorized({ commit }, value) {
    commit('setIsAuthorized', value);
  },

  setName({ commit }, name) {
    commit('setName', name);
  },

  setPassword({ commit }, password) {
    commit('setPassword', password);
  },

  setToken({ commit }, token) {
    commit('setToken', token);
  },
};

export const mutations = {
  setName(state, name) {
    state.name = name;
  },

  setPassword(state, password) {
    state.password = password;
  },

  setIsAuthorized(state, value) {
    state.isAuthorized = value;
  },

  setToken(state, value) {
    state.token = value;
  },
};

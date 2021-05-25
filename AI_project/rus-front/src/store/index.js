import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    email: '',
    name: '',
    profileImage: null,
    token: '',
  },
  getters: {
    isLogin: state => {
      return state.isLogin
    },
    email: state => {
      return state.email
    },
    name: state => {
      return state.name
    },
    profileImage: state => {
      return state.profileImage
    },
    token: state => {
      return state.token
    },
  },
  mutations: {
    LOGIN: function (state, user) {
      state.isLogin = true
      state.email = user.email
      state.name = user.name
      state.profileImage = user.profileImage
      state.token = user.token
    },
    LOGOUT: function (state) {
      state.isLogin = false
      state.email = ''
      state.name = ''
      state.profileImage = null
      state.token = ''
    }
  },
  actions: {
    login: function ({ commit }, user) {
      commit('LOGIN', user)
    },
    logout: function ({ commit }) {
      commit('LOGOUT')
    }
  },
  modules: {}
});

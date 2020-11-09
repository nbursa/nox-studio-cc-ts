import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    isAdmin: false
  },
  mutations: {
    setLoggedIn (state, payload) {
      state.isLoggedIn = payload
    },
    setIsAdmin (state, payload) {
      state.isAdmin = payload
    }
  },
  actions: {
    setLoggedIn (store, payload) {
      store.commit('setLoggedIn', payload)
    },
    setIsAdmin (store, payload) {
      store.commit('setIsAdmin', payload)
    }
  },
  modules: {
  }
})

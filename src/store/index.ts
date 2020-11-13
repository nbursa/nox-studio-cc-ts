import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    isAdmin: false,
    files: {
      audio: [],
      video: [],
      photo: []
    }
  },
  mutations: {
    setLoggedIn (state, payload) {
      state.isLoggedIn = payload
    },
    setIsAdmin (state, payload) {
      state.isAdmin = payload
    },
    saveFile (state, payload) {
      state.files[payload.type].push(payload.file)
    }
  },
  actions: {
    setLoggedIn (store, payload) {
      store.commit('setLoggedIn', payload)
    },
    setIsAdmin (store, payload) {
      store.commit('setIsAdmin', payload)
    },
    saveFile (store, payload) {
      const type: string = payload[0].toLowerCase()
      const file: File = payload[1]
      const formated = {
        type, file
      }
      store.commit('saveFile', formated)
    }
  },
  getters: {},
  modules: {}
})

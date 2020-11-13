import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    isAdmin: false,
    files: {
      audio: [],
      video: [],
      photo: []
    },
    modals: {
      contact: false
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
    },
    toggleModal (state, payload) {
      state.modals[payload] = !state.modals[payload]
      // console.log('mut contact modal: ', state.modals[payload])
    },
    fetchFiles (state, payload) {
      firebase.database().ref(payload).on('value', (snapshot) => {
        state.files[payload] = []
        Object.values(snapshot.val()).forEach((item, i) => {
          const id = Object.keys(snapshot.val())[i]
          const fileItem = {
            id,
            name: item.name,
            url: item.url
          }
          state.files[payload].push(fileItem)
        })
      })
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
    },
    toggleModal (store, payload) {
      store.commit('toggleModal', payload)
    },
    fetchData (store, payload) {
      store.commit('fetchFiles', payload)
    }
  },
  getters: {},
  modules: {}
})

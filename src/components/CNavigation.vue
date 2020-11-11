<template lang="pug">
  v-app-bar.navigation(
    app,
    color="primary",
    dark
  )
    .d-flex.align-center.navigation-logo
      v-btn(to="/")
        h1 NOX UNDERGROUND STUDIO

    v-spacer

    .navigation-menu
      v-btn.navigation-menu_link(v-if="navToggle || !smallScreen" v-for="item in navItems" :key="item.id" :to="item.path" @click.native="toggleNav") {{ item.name }}
      v-btn.navigation-menu_link(v-if="isAdmin" to="/admin") ADMIN
      v-btn.navigation-menu_link(v-if="!isLoggedIn" to="/login") LOGIN
      v-btn.navigation-menu_link(v-if="isLoggedIn" @click.native="logOut" to="") LOGOUT

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import firebase from 'firebase/app'

@Component({})
export default class CNavigation extends Vue {
  navItems = [
    { id: 0, path: '/about', name: 'O Nama' },
    { id: 1, path: '/reservations', name: 'Rezervacije' },
    { id: 2, path: '/dashboard', name: 'Dashboard' },
    { id: 3, path: '/music', name: 'Music' },
    { id: 4, path: '/galerija', name: 'Galerija' }
  ]

  navToggle = false

  get isLoggedIn () { return this.$store.state.isLoggedIn }

  get isAdmin () { return this.$store.state.isAdmin }

  get smallScreen () {
    return window.innerWidth < 550
  }

  logOut () {
    firebase.auth().signOut().then(() => {
      localStorage.removeItem('nox_user')
      localStorage.removeItem('nox_jwt')
      this.$store.dispatch('setLoggedIn', false)
      this.$store.dispatch('setIsAdmin', false)
      this.$router.push('/')
    }).catch(function (error) {
      console.log('firebase logout error: ', error)
    })
  }

  toggleNav () {
    this.navToggle = !this.navToggle
  }
}
</script>

<style scoped lang="stylus">
</style>

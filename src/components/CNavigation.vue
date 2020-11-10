<template lang="pug">
  .navigation
    v-app-bar(
      app,
      color="primary",
      dark
    )
      .d-flex.align-center
        router-link(to="/")
          h1 NOX UNDERGROUND STUDIO

      v-spacer

      router-link(v-if="navToggle || !smallScreen" v-for="item in navItems" :key="item.id" :to="item.path" @click.native="toggleNav") {{ item.name }}
      router-link(v-if="isAdmin" to="/admin") ADMIN
      router-link(v-if="!isLoggedIn" to="/login") LOGIN
      router-link(v-if="isLoggedIn" @click.native="logOut" to="") LOGOUT

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import firebase from 'firebase/app'

@Component({})
export default class CNavigation extends Vue {
  navItems = [
    { id: 0, path: '/about', name: 'O Nama' },
    { id: 1, path: '/reservations', name: 'Rezervacije' },
    { id: 2, path: '/dashboard', name: 'Dashboard' }
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
.navigation
  transition all .25s ease-in-out
  a
    color #ffffff
    padding 10px
    text-transform uppercase
    text-decoration none
    transition color, font-size .25s ease-in-out
    &:hover
      color darken(#ffffff, 10%)

</style>

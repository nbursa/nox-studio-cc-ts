<template lang="pug">
  .navigation
    nav
      .top
        router-link.logo(to="/")
          h1 NOX UNDERGROUND STUDIO
        a.mail(href="mailto:nox_studio@noxstudio.com")
          span nox_studio
          br
          span @noxstudio.com
      .list
        router-link.nav-link(v-for="item in navItems" :key="item.id" :to="item.path" @click.native="toggleNav") {{ item.name }}
        router-link.nav-link(v-if="isAdmin" to="/admin") ADMIN
        router-link.nav-link(v-if="!isLoggedIn" to="/login") LOGIN
        router-link.nav-link(v-if="isLoggedIn" to="" @click.native="logOut") LOGOUT

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import firebase from 'firebase/app'

@Component({})
export default class CNavigation extends Vue {
  navItems = [
    { id: 0, path: '/about', name: 'O Nama' },
    // { id: 1, path: '/reservations', name: 'Rezervacije' },
    { id: 2, path: '/music', name: 'Music' },
    { id: 3, path: '/galerija', name: 'Galerija' },
    { id: 4, path: '/dashboard', name: 'Dashboard' }
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
  position absolute
  top 0
  left -200px
  width 200px
  height 100%
  background-color #1e1e1e
  transition left .25s ease-in-out
  border-right 5px solid #121212
  // border-right 5px solid white
  box-sizing content-box
  z-index 2
  &:hover
    left 0
    border-right 5px solid transparent
  nav
    display flex
    flex-direction column
    padding 20px
    .top
      padding 0 0 20px
      .logo
        color #ffffff
        text-decoration none
      .mail
        text-transform none
        font-size .75rem
        line-height .75rem
    .list
      display flex
      flex-direction column
      border-top 1px solid black
      padding 20px 0 0
      .nav-link
        text-transform uppercase
        text-decoration none
        color #ffffff
        &:hover
          color darken(#ffffff, 40%)

</style>

<template lang="pug">
  .navigation
    .logo
      h1 NOX UNDERGROUND STUDIO
    nav
      div.arrow(v-if="!navToggle" @click="toggleNav")
      router-link.nav-link(v-if="navToggle || !smallScreen" v-for="item in navItems" :key="item.id" :to="item.path" @click.native="toggleNav") {{ item.name }}
      router-link.nav-link.admin(v-if="isAdmin" to="/admin") ADMIN
      router-link.nav-link.login(v-if="!isLoggedIn" to="/login") LOGIN
      router-link.nav-link.logout(v-if="isLoggedIn" @click.native="logOut" to="") LOGOUT

    div.result
      div isLoggedIn: {{ isLoggedIn }}
      div isAdmin: {{ isAdmin }}

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import firebase from 'firebase/app'

@Component({})
export default class CNavigation extends Vue {
  navItems = [
    { id: 0, path: '/', name: 'Pocetna' },
    { id: 1, path: '/about', name: 'O Nama' },
    { id: 2, path: '/reservations', name: 'Rezervacije' },
    { id: 3, path: '/dashboard', name: 'Dashboard' }
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
  display flex
  align-items center
  justify-content space-between
  padding 0 20px
  position fixed
  top 0
  left 0
  right 0
  background #000
  color #ffffff
  .result
    position absolute
    top 300px
    left 0
    width 100%
    color red
  .logo
    @media screen and (max-width: 550px)
      margin-bottom 20px
  nav
    display flex
    align-items center
    justify-content space-between
    .arrow
      position relative
      background-color pink
      margin 10px auto
      transform translateX(10px)
      display none
      &:before,
      &:after
        content ''
        display block
        position absolute
        top 0
        width 30px
        height 5px
        background-color #ffffff
        border-radius 2px
      &:before
        right -4px
        transform rotate(45deg)
      &:after
        left -4px
        transform rotate(-45deg)
      @media screen and (max-width: 550px)
        display block
    .nav-link
      padding 10px
      color #ffffff
      text-decoration none
      text-transform uppercase
      &:hover
        color yellow
      &:last-child
        padding-right 0
      &.router-link-active
        color pink
    @media screen and (max-width: 550px)
      flex-direction column
      width 100%
      .nav-link
        width 100%
  @media screen and (max-width: 550px)
    flex-direction column
    padding 20px

</style>

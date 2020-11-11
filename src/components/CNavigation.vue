<template lang="pug">
  v-navigation-drawer.navigation(permanent, expand-on-hover)
    v-list
      //- v-list-item.px-2
      //-   v-list-item-avatar
      //-   h1 NOX studio
      v-list-item(link)
        v-list-item-content
          v-list-item-title.title
            router-link.logo(to="/")
              h1 NOX UNDERGROUND STUDIO
              br
              v-list-item-subtitle
                a.logo(href="mailto:nox_studio@noxstudio.com") nox_studio@noxstudio.com
    v-divider
    v-list(nav, dense)
      v-list-item(link, v-for="item in navItems" :key="item.id" )
        router-link.navigation-menu_link(:to="item.path" @click.native="toggleNav") {{ item.name }}
      v-list-item(link, v-if="isAdmin")
        router-link.navigation-menu_link(to="/admin") ADMIN
      v-list-item(link, v-if="!isLoggedIn")
        router-link.navigation-menu_link(to="/login") LOGIN
      v-list-item(link, v-if="isLoggedIn")
        router-link.navigation-menu_link(to="" @click.native="logOut") LOGOUT

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import firebase from 'firebase/app'

@Component({})
export default class CNavigation extends Vue {
  navItems = [
    { id: 0, path: '/about', name: 'O Nama' },
    { id: 1, path: '/reservations', name: 'Rezervacije' },
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
.v-navigation-drawer.navigation
  position absolute
  background-color #1e1e1e
    >>> .logo
      color #ffffff !important
  //     text-decoration none
  //     transition color .25s ease-in-out
  //     &:hover
  //       color darken(#ffffff, 25%)
  //   &-menu
  //     &_link
  //       color #ffffff
  //       padding .5rem
  //       text-transform uppercase
  //       text-decoration none
  //       transition color .25s ease-in-out
  //       &:hover
  //         color darken(#ffffff, 25%)

</style>

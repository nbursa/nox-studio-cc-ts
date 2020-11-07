<template lang="pug">
.navigation
  .logo
    h1 NOX UNDERGROUND STUDIO
  nav
    router-link(v-for="item in navItems" :key="item.id" :to="item.path") {{ item.name }}

</template>

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
  nav
    display flex
    align-items center
    justify-content space-between
    a
      padding 10px
      color #ffffff
      text-decoration none
      text-transform uppercase
      &:hover
        color yellow
      &:last-child
        padding-right 0

</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class CNavigation extends Vue {
  private navItems = [
    { id: 0, path: '/', name: 'Home' },
    { id: 1, path: '/about', name: 'About' },
    { id: 2, path: '/reservations', name: 'Reservations' }
  ]

  mounted () {
    console.log('nav mounted ', this.navItems)
  }
}
</script>

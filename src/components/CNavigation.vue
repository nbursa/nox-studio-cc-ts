<template lang="pug">
  .navigation
    .logo
      h1 NOX UNDERGROUND STUDIO
    nav
      div.arrow(v-if="!navToggle" @click="toggleNav")
      router-link.nav-link(v-if="navToggle || !smallScreen" v-for="item in navItems" :key="item.id" :to="item.path" @click.native="toggleNav") {{ item.name }}

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class CNavigation extends Vue {
  private navItems = [
    { id: 0, path: '/', name: 'Home' },
    { id: 1, path: '/about', name: 'About' },
    { id: 2, path: '/reservations', name: 'Reservations' }
  ]

  private navToggle = false

  get smallScreen () {
    return window.innerWidth < 550
  }

  mounted () {
    console.log('nav mounted ', this.navItems)
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

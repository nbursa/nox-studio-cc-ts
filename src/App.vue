<template lang="pug">
  #app
    CNavigation
    router-view
    //- CNavigation(:isLoggedIn="logged")
    //- router-view(@login-status="loggedIn" :isLoggedIn="logged")

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CNavigation from '@/components/CNavigation.vue'
// import { User } from '@/models/user.model'

@Component<App>({
  components: {
    CNavigation
  }
})
export default class App extends Vue {
  // isLoggedIn = false
  // isAdmin = false

  mounted () {
    // console.log('app mounted store: ', this.$store.state)
  }

  // get user () { return JSON.parse(localStorage.getItem('nox_user') || 'null') }

  // @Watch('user', { immediate: true, deep: true })
  // userChanged (val: User, oldVal: User) {
  //   console.log('app user changed: ', val, oldVal)
  //   if (val) {
  //     this.isLoggedIn = true
  //     if (val.isAdmin && val.isAdmin === 1) {
  //       this.isAdmin = true
  //     }
  //   }
  // }
}
</script>

<style lang="stylus">
  @import 'style'
  #app
    position relative
    font-family Avenir, Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    text-align center
    color #2c3e50
    padding-top 60px
    @media screen and (max-width: 550px)
      padding-top 100px

</style>

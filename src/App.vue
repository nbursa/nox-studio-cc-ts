<template lang="pug">
  #app
    CNavigation
    router-view

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CNavigation from '@/components/CNavigation.vue'

@Component({
  components: {
    CNavigation
  }
})

export default class Home extends Vue {
  mounted () {
    console.log('app mounted')
  }
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

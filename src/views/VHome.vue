<template lang="pug">
  .home
    h1 POCETNA

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class VHome extends Vue {
  mounted () {
    // console.log('home mounted')
  }
}
</script>

<style lang="stylus">
  .home
    padding 20px
    text-align initial
</style>

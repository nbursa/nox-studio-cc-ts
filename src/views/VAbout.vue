<template lang="pug">
  .about
    h1 O NAMA

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class VAbout extends Vue {
  mounted () {
    console.log('about mounted')
  }
}
</script>

<style lang="stylus">
  .about
    padding 20px
    text-align initial
</style>

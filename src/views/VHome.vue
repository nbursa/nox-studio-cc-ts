<template lang="pug">
  .home
    h1 POCETNA

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class VHome extends Vue {
}
</script>

<style lang="stylus">
  .home
    padding 20px
    h1
      text-align center
      margin-bottom 20px
</style>

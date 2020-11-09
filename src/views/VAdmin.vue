<template lang="pug">
  .admin
    h1 ADMIN PANEL

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class VAdmin extends Vue {
  mounted () {
    // console.log('admin mounted')
  }
}
</script>

<style lang="stylus">
  .admin
    padding 20px
    text-align initial
</style>

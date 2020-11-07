<template lang="pug">
  .reservations
    h1 RESERVATIONS

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class VReservations extends Vue {
  mounted () {
    console.log('reservations mounted')
  }
}
</script>

<style lang="stylus">
  .reservations
    padding 20px
    text-align initial
</style>

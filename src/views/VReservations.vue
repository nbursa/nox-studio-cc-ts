<template lang="pug">
  .reservations
    h1 RESERVATIONS
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class VReservations extends Vue {
  mounted () {
    console.log('reservations mounted')
  }
}
</script>

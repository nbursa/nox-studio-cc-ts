<template lang="pug">
  .reservations
    h1.page-title REZERVACIJE
    .date-pickers
      h2 Datum
      nox-date-picker.date-picker(
        v-model="date",
        mode="date",
        :model-config="dateConfig",
        is-expanded
      )
    .time-pickers
      .time-start-picker
        h2 Pocetak
        nox-date-picker(
          v-model="timeStart",
          mode="time",
          :model-config="timeConfig",
          is24hr,
          :minute-increment="15"
        )
      .time-end-picker
        h2 Kraj
        nox-date-picker(
          v-model="timeEnd",
          mode="time",
          :model-config="timeConfig",
          is24hr,
          :minute-increment="15"
        )
    br
    div Datum: {{ date }}
    div Pocetak: {{ timeStart }}
    div Kraj: {{ timeEnd }}
    button(@click="") Rezervisi

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class VReservations extends Vue {
  private date = new Date()
  private timeStart = new Date()
  private timeEnd = new Date()

  private dateConfig = {
    type: 'string',
    mask: 'DD-MM-YYYY' // Uses 'iso' if missing
  }

  private timeConfig = {
    type: 'string',
    mask: 'HH:mm',
    timeAdjust: '12:00'
  }

  // mounted () {
  //   console.log('reservations mounted')
  // }
}
</script>

<style lang="stylus">
  .reservations
    padding 20px
    text-align initial
    .page-title
      font-weight bold
    .date-pickers
      h2
        margin 10px
    .time-pickers
      display flex
      .time-start-picker
        margin-right 20px
      .time-start-picker,
      .time-end-picker
        flex 1
        h2
          margin 10px
        .vc-container
          width 100%
        .vc-time-picker
          .vc-time-icon
            display none
          .vc-date-time
            width 100%
            .vc-date
              display none
            .vc-time
              .vc-select
                width 50%
                select
                  width 100%

</style>

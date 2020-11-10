<template lang="pug">
  .reservations
    h1.page-title REZERVACIJE
    template
      v-row.fill-height
        v-col
          v-sheet(height='64')
            v-toolbar(flat='')
              v-btn.mr-4(outlined='' color='grey darken-2' @click='setToday')
                | Today
              v-btn(fab='' text='' small='' color='grey darken-2' @click='prev')
                v-icon(small='')
                  | mdi-chevron-left
              v-btn(fab='' text='' small='' color='grey darken-2' @click='next')
                v-icon(small='')
                  | mdi-chevron-right
              v-toolbar-title(v-if='$refs.calendar')
                | {{ $refs.calendar.title }}
              v-spacer
              v-menu(bottom='' right='')
                template(v-slot:activator='{ on, attrs }')
                  v-btn(outlined='' color='grey darken-2' v-bind='attrs' v-on='on')
                    span {{ typeToLabel[type] }}
                    v-icon(right='')
                      | mdi-menu-down
                v-list
                  v-list-item(@click="type = 'day'")
                    v-list-item-title Day
                  v-list-item(@click="type = 'week'")
                    v-list-item-title Week
                  v-list-item(@click="type = 'month'")
                    v-list-item-title Month
                  v-list-item(@click="type = '4day'")
                    v-list-item-title 4 days
          v-sheet(height='600')
            v-calendar(ref='calendar' v-model='focus' color='primary' :events='events' :event-color='getEventColor' :type='type' @click:event='showEvent' @click:more='viewDay' @click:date='viewDay' @change='updateRange')
            v-menu(v-model='selectedOpen' :close-on-content-click='false' :activator='selectedElement' offset-x='')
              v-card(color='grey lighten-4' min-width='350px' flat='')
                v-toolbar(:color='selectedEvent.color' dark='')
                  v-btn(icon='')
                    v-icon mdi-pencil
                  v-toolbar-title(v-html='selectedEvent.name')
                  v-spacer
                  v-btn(icon='')
                    v-icon mdi-heart
                  v-btn(icon='')
                    v-icon mdi-dots-vertical
                v-card-text
                  span(v-html='selectedEvent.details')
                v-card-actions
                  v-btn(text='' color='secondary' @click='selectedOpen = false')
                    | Cancel

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class VReservations extends Vue {
  private focus = ''
  private type = 'month'
  private typeToLabel = {
    month: 'Month',
    week: 'Week',
    day: 'Day',
    '4day': '4 Days'
  }

  private selectedEvent = {}
  private selectedElement = null
  private selectedOpen = false
  private events = []
  private colors = ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1']
  private names = ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party']

  mounted () {
    this.$refs.calendar.checkChange()
  }

  viewDay ({ date }: {date: string}) {
    this.focus = date
    this.type = 'day'
  }

  getEventColor (event: { color: string }) {
    return event.color
  }

  setToday () {
    this.focus = ''
  }

  prev () {
    this.$refs.calendar.prev()
  }

  next () {
    this.$refs.calendar.next()
  }

  showEvent ({ nativeEvent, event }: { nativeEvent: MouseEvent; event: object}) {
    console.log('show event: ', nativeEvent, event)
    const open = () => {
      this.selectedEvent = event
      this.selectedElement = nativeEvent.target
      setTimeout(() => {
        this.selectedOpen = true
      }, 10)
    }

    if (this.selectedOpen) {
      this.selectedOpen = false
      setTimeout(open, 10)
    } else {
      open()
    }

    nativeEvent.stopPropagation()
  }

  updateRange ({ start, end }: { start: { date: Date }; end: { date: Date } }) {
    const events = []

    const min = new Date(`${start.date}T00:00:00`)
    const max = new Date(`${end.date}T23:59:59`)
    const days = (max.getTime() - min.getTime()) / 86400000
    const eventCount = this.rnd(days, days + 20)

    for (let i = 0; i < eventCount; i++) {
      const allDay = this.rnd(0, 3) === 0
      const firstTimestamp = this.rnd(min.getTime(), max.getTime())
      const first = new Date(firstTimestamp - (firstTimestamp % 900000))
      const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
      const second = new Date(first.getTime() + secondTimestamp)

      events.push({
        name: this.names[this.rnd(0, this.names.length - 1)],
        start: first,
        end: second,
        color: this.colors[this.rnd(0, this.colors.length - 1)],
        timed: !allDay
      })

      // this.events = events
    }

    this.events = events
  }

  rnd (a: number, b: number) {
    return Math.floor((b - a + 1) * Math.random()) + a
  }

  // private today = new Date()
  // private timeStart = new Date()
  // private timeEnd = new Date()

  // private dateConfig = {
  //   type: 'string',
  //   mask: 'DD-MM-YYYY'
  // }

  // private timeConfig = {
  //   type: 'string',
  //   mask: 'HH:mm',
  //   timeAdjust: '12:00'
  // }

  // tracked = {
  //   '2019-01-09': [23, 45, 10],
  //   '2019-01-08': [10],
  //   '2019-01-07': [0, 78, 5],
  //   '2019-01-06': [0, 0, 50],
  //   '2019-01-05': [0, 10, 23],
  //   '2019-01-04': [2, 90],
  //   '2019-01-03': [10, 32],
  //   '2019-01-02': [80, 10, 10],
  //   '2019-01-01': [20, 25, 10]
  // }

  // colors = ['#1867c0', '#fb8c00', '#000000']
  // category = ['Development', 'Meetings', 'Slacking']
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

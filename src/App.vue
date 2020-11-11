<template lang="pug">
  v-app.app
    v-main
      c-navigation
      c-reservations
      .router-view
        router-view

</template>

<script lang="ts">
import CNavigation from '@/components/CNavigation.vue'
import CReservations from '@/components/CReservations.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'App',
  components: {
    CNavigation,
    CReservations
  }
})
export default class App extends Vue {
}
</script>

<style lang="stylus">
.router-view
  .app
    max-height 100vh
    overflow-y auto
</style>

<template lang="pug">
  v-app.app
    v-main
      c-navigation
      c-reservations
      contact-modal(v-if="contactModal")
      .router-view
        router-view

</template>

<script lang="ts">
import CNavigation from '@/components/CNavigation.vue'
import CReservations from '@/components/CReservations.vue'
import ContactModal from '@/components/modals/CContactModal.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'App',
  components: {
    CNavigation,
    CReservations,
    ContactModal
  }
})
export default class App extends Vue {
  contactModal = true
}
</script>

<style lang="stylus">
.app
  max-height 100vh
  overflow hidden
  overflow-y auto
</style>

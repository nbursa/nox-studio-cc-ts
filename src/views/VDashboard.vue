<template lang="pug">
  .dashboard
    h1 DASHBOARD

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class VDashboard extends Vue {
  mounted () {
    // console.log('VDashboard mounted')
  }
}
</script>

<style lang="stylus">
  .dashboard
    padding 20px
    text-align initial
</style>

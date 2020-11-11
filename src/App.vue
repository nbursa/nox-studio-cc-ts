<template lang="pug">
  v-app
    v-main
      CNavigation
      .router-view
        router-view

</template>

<script lang="ts">
import CNavigation from '@/components/CNavigation.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'App',
  components: {
    CNavigation
  }
})
export default class App extends Vue {
}
</script>

<style lang="stylus">
.router-view
  padding-left 76px !important
</style>

<template lang="pug">
  v-app
    CNavigation
    v-main
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

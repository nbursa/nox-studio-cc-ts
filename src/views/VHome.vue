<template lang="pug">
  .home
    h1 HOME VIEW

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class VHome extends Vue {
  mounted () {
    console.log('home mounted')
  }
}
</script>

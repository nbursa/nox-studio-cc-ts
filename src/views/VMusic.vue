<template lang="pug">
  .home
    h1 MUZIKA
    div(v-for="item in files" :key="item.id") {{ item }}

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class VMusic extends Vue {
  files = {}
  mounted () {
    console.log('state: ', this.$store.state.files.audio)
    this.files = this.$store.state.files.audio
  }
}
</script>

<style lang="stylus">
  .home
    padding 20px
    h1
      text-align center
</style>

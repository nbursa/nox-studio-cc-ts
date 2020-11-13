<template lang="pug">
  .home
    h1 MUZIKA

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
// import { mapState } from 'vuex'

@Component({})
export default class VMusic extends Vue {
  mounted () {
    console.log('state: ', this.$store.state)
  }
}
</script>

<style lang="stylus">
  .home
    padding 20px
    text-align initial
</style>

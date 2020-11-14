<template lang="pug">
  .galery
    h1 FOTO
    section.section
      //- h1.section-title FOTOGRAFIJE
      .photos
        .cards
          .image-card(v-for="(item, i) in photos" :key="i")
            v-img.image(:aspect-ratio='16/9' :src='item.url')
            p.text {{ item.name }}

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class VGalery extends Vue {
  width = 400
  get photos () {
    return this.$store.state.files.photo
  }

  mounted () {
    this.fetchData('image')
  }

  fetchData (ref: string) {
    this.$store.dispatch('fetchData', ref)
  }
}
</script>

<style lang="stylus">
  .galery
    padding 20px
    text-align center
    h1
    .section
      .photos
        padding-top 60px
        .cards
          display flex
          flex-wrap wrap
          justify-content center
          .image-card
            display flex
            justify-content center
            align-items center
            width 400px
            height auto
            position relative
            margin-right 20px
            margin-bottom 20px
            border 1px solid #1e1e1e
            border-radius 5px
            box-shadow 0 10px 10px rgba(0,0,0,.25)
            background-color #1e1e1e
            cursor pointer
            &:hover
              .text
                opacity 1
            .image
            .text
              margin-bottom 0
              padding 20px
              position absolute
              top 0
              left 0
              pointer-events none
              background-color rgba(0,0,0,.35)
              opacity 0

</style>

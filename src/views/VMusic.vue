<template lang="pug">
  .home
    h1 MUZIKA

    section.section
      h1.section-title VIDEO
      .videos
        .cards
          .video-card(v-for="(item, i) in videos" :key="i")
            video.player(controls='')
              source(:src="item.url" type='video/mp4')
              p
                | Your browser doesn&apos;t support HTML5 video. Here is a
                a(:href='item.url') link to the video
                |  instead.

            p.title {{ item.name }}

    section.section
      h1.section-title AUDIO
      .audio
        .cards
          v-card.audio-card(v-for="(item, i) in audio" :key="i")
            p.title {{ item.name }}
            audio.audio-player(controls='')
              source(:src='item.url' type='audio/mpeg')
              | Your browser does not support the audio element.

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class VMusic extends Vue {
  get files () {
    return this.$store.state.files
  }

  get videos () {
    return this.$store.state.files.video
  }

  get audio () {
    return this.$store.state.files.audio
  }

  mounted () {
    this.fetchData('video')
    this.fetchData('audio')
  }

  fetchData (ref: string) {
    this.$store.dispatch('fetchData', ref)
  }
}
</script>

<style lang="stylus">
  .home
    padding 20px
    h1
      text-align center
    .section
      &-title
        text-align left
      .videos
        &:hover:after
          display flex
        &:after
          content 'scroll'
          display none
          justify-content center
          align-items center
          position absolute
          top 0
          right 0
          height 100%
          width 25%
          background-image linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,.75))
          font-size 20px
      .videos,
      .audio
        margin-bottom 20px
        overflow hidden
        position relative
        .cards
          display flex
          width 100%
          overflow-x auto
          // &::-webkit-scrollbar
            // display none
          .video-card
            display inline-flex
            position relative
            width 400px
            height 225px
            margin-right 20px
            cursor pointer
            &:hover
              .title
                opacity 1
            .title
              opacity 0
              position absolute
              top 0
              left 0
              width 100%
              height auto
              font-size .5rem !important
              font-weight 400
              line-height 1.5rem
              margin-bottom 0
              padding 0 20px
              pointer-events none
              transition opacity .15s ease-in-out
              background-color rgba(0,0,0,.5)
            .player
              min-width 100%
              height auto
              max-height 225px
          .audio-card
            display inline-flex
            flex-direction column
            position relative
            margin-right 20px
            overflow hidden
            word-break break-all
            padding 20px
            .title
              font-size .5rem
            .audio-player
              width 400px
</style>

<template lang="pug">
.admin
  h1 ADMIN PANEL
  v-card.upload
    h2 Upload
    form(enctype='multipart/form-data' novalidate v-if='isInitial || isSaving || isSuccess')
      v-select.select(v-model="uploadName" :items='uploadItems' label='Choose upload type' outlined)
      .dropbox
        input.input-file(type='file' multiple :name='uploadName' :disabled='isSaving' @change='filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length' :accept='uploadAccept')
        p(v-if='isInitial || isSuccess')
          | Drag your file(s) here to begin
          br
          |  or click to browse
        p(v-if='isSaving')
          | Uploading {{ fileCount }} files...
        p(v-if="isFailed")
          v-btn(@click="reset") check and try again
          | {{ uploadError }}

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
// import { mapActions } from 'vuex'

enum Status { STATUS_INITIAL, STATUS_SAVING, STATUS_SUCCESS, STATUS_FAILED }

@Component({})
export default class VAdmin extends Vue {
  uploadedFiles = []
  uploadError = ''
  currentStatus: Status = Status.STATUS_INITIAL
  uploadFieldName = 'photos'
  formData = new FormData()
  uploadItems = ['Audio', 'Video', 'Image']
  uploadName = 'Audio'

  get uploadAccept () {
    return `${this.uploadName.toLowerCase}/*`
  }

  get isInitial () {
    return this.currentStatus === Status.STATUS_INITIAL
  }

  get isSaving () {
    return this.currentStatus === Status.STATUS_SAVING
  }

  get isSuccess () {
    return this.currentStatus === Status.STATUS_SUCCESS
  }

  get isFailed () {
    return this.currentStatus === Status.STATUS_FAILED
  }

  mounted () {
    this.reset()
  }

  reset () {
    // reset form to initial state
    this.currentStatus = Status.STATUS_INITIAL
    this.uploadedFiles = []
    this.uploadError = ''
  }

  save (formData: FormData) {
    // upload data to the server
    this.currentStatus = Status.STATUS_SAVING

    // console.log('b: ', ...formData)
    // interface FormPayload {
    //   fileType: string;
    //   file: File;
    // }
    // const form = formData.values
    // console.log('ffff; ', form)
    // const formPayload = {
    //   fileType: form[0],
    //   file: form[1]
    // }

    const p = formData.entries()
    console.log('en: ', p)
    // const type: string = p[0].toLowerCase()
    // const file: File = p[1]
    // store.commit('saveFile', { type, file })
    this.$store.dispatch('saveFile', ...formData)
      .then((res: ConcatArray<never>) => {
        this.uploadedFiles = [].concat(res)
        this.currentStatus = Status.STATUS_SUCCESS
      })
      .catch((err: { response: string }) => {
        this.uploadError = err.response
        this.currentStatus = Status.STATUS_FAILED
      })
    // this.upload(formData)
    // .then(x => {
    //   this.uploadedFiles = [].concat(x)
    //   this.currentStatus = Status.STATUS_SUCCESS
    // })
    // .catch((err: { response: string }) => {
    //   this.uploadError = err.response
    //   this.currentStatus = Status.STATUS_FAILED
    // })
  }

  // upload (form: FormData) {
  //   console.log('upload: ', form)
  //   this.store.dispatch('saveFile', form)
  // }

  filesChange (fieldName: string, fileList: File[]) {
    if (!fileList.length) return
    Array
      .from(Array(fileList.length).keys())
      .map((x: number) => {
        this.formData.append(fieldName, fileList[x], fileList[x].name)
      })
    const e = this.formData.entries()
    console.log('filesChange formData: ', e)
    this.save(this.formData)
  }
}
</script>

<style lang="stylus">
.admin
  padding 20px
  text-align initial
  h1
    text-align center
    margin-bottom 20px
  .upload
    max-width 400px
    padding 20px
    margin 40px 20px 20px
    h2
      text-transform uppercase
      text-align left
      margin-bottom 20px
    form
      .dropbox
        outline 2px dashed grey
        outline-offset -10px
        background lightcyan
        color dimgray
        padding 10px 10px
        min-height 200px
        position relative
        cursor pointer

      .input-file
        opacity 0
        width 100%
        height 200px
        position absolute
        cursor pointer

      .dropbox:hover
        background lightblue

      .dropbox p
        font-size 1.2em
        text-align center
        padding 50px 0

</style>

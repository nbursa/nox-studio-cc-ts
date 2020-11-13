<template lang="pug">
.admin
  .admin-header
    h1 ADMIN PANEL
    v-btn.logout(rounded @click="logOut")
      v-icon(medium color='gray darken-2')
        | mdi-power

  v-card.upload
    h2 Upload files
    form(enctype='multipart/form-data' novalidate v-if='isInitial || isSaving || isSuccess')
      v-select.select(v-model="uploadName" :items='uploadItems' label='Sacuvaj fajl(ove) u folder:' outlined)
      .dropbox
        input.input-file(type='file' multiple :name='uploadName' :disabled='isSaving' @change='filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length' :accept='uploadAccept')
        p(v-if='isInitial')
          | Drag your file(s) here to begin
          br
          |  or click to browse
        p(v-if='isSaving')
          | Uploading {{ fileCount }} files...
        p(v-if="isFailed")
          v-btn(@click="reset") check and try again
          | {{ uploadError }}
        p(v-if="isSuccess")
          | File(s) uploaded succesfully!
          br
          | Click or drag file(s) to upload again

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import firebase from 'firebase/app'

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
    this.currentStatus = Status.STATUS_INITIAL
    this.uploadedFiles = []
    this.uploadError = ''
  }

  save (formData: FormData) {
    this.currentStatus = Status.STATUS_SAVING
    console.log('save: ', ...formData)
    this.upload(formData)
  }

  upload (formData: FormData) {
    try {
      this.uploadData(formData)
    } catch (e) {
      this.uploadError = e.response
      this.currentStatus = Status.STATUS_FAILED
    } finally {
      this.currentStatus = Status.STATUS_SUCCESS
    }
  }

  uploadData (formData: FormData) {
    const storageRef = firebase.storage().ref()
    try {
      formData.forEach((formItem, type) => {
        console.log('formItem: ', type)
        const fileRef = storageRef.child(type.toLowerCase() + '/' + formItem.name)
        fileRef.put(formItem)
      })
    } catch (e) {
      this.uploadError = e
      this.currentStatus = Status.STATUS_FAILED
    }
  }

  filesChange (fieldName: string, fileList: File[]) {
    if (!fileList.length) return
    Array
      .from(Array(fileList.length).keys())
      .map((x: number) => {
        this.formData.append(fieldName, fileList[x], fileList[x].name)
      })
    console.log('filesChange formData: ', this.formData)
    this.save(this.formData)
  }

  logOut () {
    firebase.auth().signOut().then(() => {
      localStorage.removeItem('nox_user')
      localStorage.removeItem('nox_jwt')
      this.$store.dispatch('setLoggedIn', false)
      this.$store.dispatch('setIsAdmin', false)
      this.$router.push('/')
    }).catch(function (error: {}) {
      console.log('firebase logout error: ', error)
    })
  }
}
</script>

<style lang="stylus">
.admin
  padding 20px
  text-align initial
  &-header
    display flex
    justify-content center
    align-items center
    margin-bottom 20px
  h1
    text-align center
    margin-right 20px
  .logout
    padding 0 !important
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

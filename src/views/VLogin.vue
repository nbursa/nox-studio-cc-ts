<template lang="pug">
  .login
    h1 LOGIN
    validation-observer(ref='observer' v-slot='{ invalid }')
      form(@submit.prevent='submit')
        validation-provider(v-slot='{ errors }' name='Name' rules='required|max:10')
          v-text-field(v-model='name' :counter='10' :error-messages='errors' label='Name' required='')
        validation-provider(v-slot='{ errors }' name='email' rules='required|email')
          v-text-field(v-model='email' :error-messages='errors' label='E-mail' required='')
        validation-provider(v-slot='{ errors }' name='select' rules='required')
          v-select(v-model='select' :items='items' :error-messages='errors' label='Select' data-vv-name='select' required='')
        validation-provider(v-slot='{ errors }' rules='required' name='checkbox')
          v-checkbox(v-model='checkbox' :error-messages='errors' value='1' label='Option' type='checkbox' required='')
        v-btn.mr-4(type='submit' :disabled='invalid')
          | submit
        v-btn(@click='clear')
          | clear
    //- v-form.login-form
    //-   .login-form__input
    //-     input(
    //-       type="text",
    //-       placeholder="email",
    //-       v-model="form.email"
    //-     )
    //-   .login-form__input
    //-     input(
    //-       type="text",
    //-       placeholder="password",
    //-       v-model="form.password"
    //-     )
    //-   .login-form__input
    //-     button(
    //-       type="submit"
    //-       @click="submitForm"
    //-     ) Submit
    //- .error(v-if="loginErrorMessage") {{ loginErrorMessage }}

</template>

<script lang="ts">
// import firebase from 'firebase/app'
import { Component, Vue } from 'vue-property-decorator'
import { required, email, max } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} can not be empty'
})

extend('max', {
  ...max,
  message: '{_field_} may not be greater than {length} characters'
})

extend('email', {
  ...email,
  message: 'Email must be valid'
})

@Component({
  name: 'Login',
  components: {
    ValidationProvider,
    ValidationObserver
  }
})
export default class VLogin extends Vue {
  private name = ''
  private email = ''
  private select = null
  private items = [
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4'
  ]

  private checkbox = null

  private submit () {
    this.$refs.observer.validate()
  }

  private clear () {
    this.name = ''
    this.email = ''
    this.select = null
    this.checkbox = null
    this.$refs.observer.reset()
  }

  // private form = {
  //   email: '',
  //   password: ''
  // }

  // private loginErrorCode = ''
  // private loginErrorMessage = ''

  // submitForm () {
  //   this.login(this.form.email, this.form.password)
  // }

  // login (email: string, password: string) {
  //   firebase.auth().signInWithEmailAndPassword(email, password)
  //     .then((res) => {
  //       if (res.user) {
  //         const user = {
  //           email: email,
  //           uid: res.user.uid,
  //           isAdmin: process.env.VUE_APP_FIREBASE_adminIds.includes(res.user.uid) ? 1 : 0
  //         }
  //         localStorage.setItem('nox_user', JSON.stringify(user))
  //         localStorage.setItem('nox_jwt', res.user.refreshToken)
  //         this.$store.dispatch('setLoggedIn', true)
  //         if (user.isAdmin === 1) {
  //           this.$store.dispatch('setIsAdmin', true)
  //           return this.$router.push({ path: '/admin' })
  //         }
  //         this.$router.push({ path: '/dashboard' })
  //       }
  //     })
  //     .catch((error) => {
  //       if (error.code) {
  //         this.loginErrorCode = error.code
  //         if (this.loginErrorCode === 'auth/user-not-found') this.loginErrorMessage = 'Korisnik ne postoji'
  //         if (error.message && !this.loginErrorMessage) this.loginErrorMessage = error.message
  //       }
  //     })
  // }
}
</script>

<style lang="stylus">
  .login
    padding 20px
    // text-align initial
</style>

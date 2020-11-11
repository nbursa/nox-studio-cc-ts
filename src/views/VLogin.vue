<template lang="pug">
  .login
    h1 LOGIN
    validation-observer(ref='observer' v-slot='{ invalid }')
      form.form(@submit.prevent='submit')
        validation-provider(v-slot='{ errors }' name='email' rules='required|email')
          v-text-field(v-model='email' :error-messages='errors' label='Email' required='')
        validation-provider(v-slot='{ errors }' name='password' rules='required|min:6')
          v-text-field(v-model='password' :error-messages='errors' label='Password' required='')
        v-btn.mr-4(type='submit' :disabled='invalid')
          | submit
        v-btn(@click='clear')
          | clear

    .errors(v-if="loginErrorMessage") {{ loginErrorMessage }}

</template>

<script lang="ts">
import firebase from 'firebase/app'
import { Component, Vue } from 'vue-property-decorator'
import { required, email, min } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} can not be empty'
})

extend('min', {
  ...min,
  message: '{_field_} must be greater than {length} characters'
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
  private email = ''
  private password = ''
  private loginErrorMessage = ''

  private submit () {
    this.$refs.observer.validate()
    this.login(this.email, this.password)
  }

  private clear () {
    this.email = ''
    this.password = ''
  }

  login (email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((res) => {
        if (res.user) {
          const user = {
            email: email,
            uid: res.user.uid,
            isAdmin: process.env.VUE_APP_FIREBASE_adminIds.includes(res.user.uid) ? 1 : 0
          }
          localStorage.setItem('nox_user', JSON.stringify(user))
          localStorage.setItem('nox_jwt', res.user.refreshToken)
          this.$store.dispatch('setLoggedIn', true)
          if (user.isAdmin === 1) {
            this.$store.dispatch('setIsAdmin', true)
            return this.$router.push({ path: '/admin' })
          }
          this.$router.push({ path: '/dashboard' })
        }
      })
      .catch((error) => {
        if (error.code) {
          this.loginErrorCode = error.code
          if (this.loginErrorCode === 'auth/user-not-found') this.loginErrorMessage = 'Korisnik ne postoji'
          if (error.message && !this.loginErrorMessage) this.loginErrorMessage = error.message
        }
      })
  }
}
</script>

<style lang="stylus">
  .login
    padding 20px
    .form
      max-width 400px
      margin 0 auto

</style>

<template lang="pug">
  .login
    h1 LOGIN
    .login-form
      .login-form__input
        input(
          type="text",
          placeholder="email",
          v-model="form.email"
        )
      .login-form__input
        input(
          type="text",
          placeholder="password",
          v-model="form.password"
        )
      .login-form__input
        button(
          type="submit"
          @click="submitForm"
        ) Submit
    .error(v-if="loginErrorMessage") {{ loginErrorMessage }}

</template>

<script lang="ts">
import firebase from 'firebase/app'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class VLogin extends Vue {
  private form = {
    email: '',
    password: ''
  }

  private loginErrorCode = ''
  private loginErrorMessage = ''

  submitForm () {
    this.login(this.form.email, this.form.password)
  }

  login (email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((res) => {
        // console.log('res: ', res)
        if (res.user) {
          const user = {
            email: email,
            uid: res.user.uid,
            isAdmin: process.env.VUE_APP_FIREBASE_adminIds.includes(res.user.uid) ? 1 : 0
          }
          console.log('storrrr: ', this.$store)
          // console.log('user1: ', user, this.$route)
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
  .home
    padding 20px
    text-align initial
</style>

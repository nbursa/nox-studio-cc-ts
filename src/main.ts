import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Calendar from 'v-calendar'
// import Calendar from 'v-calendar'
// import DatePicker from 'v-calendar'

Vue.config.productionTip = false

Vue.use(Calendar, { componentPrefix: 'nox' })
// Vue.component('calendar', Calendar)
// Vue.component('date-picker', DatePicker)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

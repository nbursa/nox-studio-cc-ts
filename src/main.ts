import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Calendar from 'v-calendar'

Vue.config.productionTip = false

Vue.use(Calendar, { componentPrefix: 'nox' })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

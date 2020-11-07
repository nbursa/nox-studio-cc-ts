import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import VHome from '../views/VHome.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: VHome
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/VAbout.vue')
  },
  {
    path: '/reservations',
    name: 'Reservations',
    component: () => import('../views/VReservations.vue')
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

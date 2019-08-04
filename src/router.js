import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/',
      component: () => import('@/views/tabbar'),
      children: [{ path: '/', component: () => import('@/views/home'), name: 'index' }] },
    { path: '/login', component: () => import('@/views/login'), name: 'login' }
  ]
})

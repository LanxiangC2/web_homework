import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Login from '@/components/login'
import Register from '@/components/register'
import KnowUser from '@/components/knowUser'
import HeatMap from '@/components/map'
import Articles from '@/components/articles'
import Paper from '@/components/paper'
import Lab from '@/components/lab'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/knowUser',
      name: 'knowUser',
      component: KnowUser
    },
    {
      path: '/articles',
      name: 'articles',
      component: Articles
    },
    {
      path: '/heatMap',
      name: 'heatMap',
      component: HeatMap
    },
    {
      path: '/lab',
      name: 'lab',
      component: Lab
    },
    {
      path: '/paper',
      name: 'paper',
      component: Paper
    }
  ]
})

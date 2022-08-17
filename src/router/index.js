import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Home from '../views/Home'
import Test1View from '../views/Test1View'
import Test2View from '../views/Test2View'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    hidden: true
  },
  {
    path: '/home',
    name: '芒果导航',
    component: Home,
    children: [
      {
        path: '/test1',
        name: '导航1',
        component: Test1View
      },
      {
        path: '/test2',
        name: '导航2',
        component: Test2View
      }
    ]
  }

]
const router = new VueRouter({
  routes
})
export default router

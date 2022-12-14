import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'

import { postRequest, putRequest, getRequest, deleteRequest } from './utils/api'
import { initMenu } from './utils/menus'

import 'font-awesome/css/font-awesome.css'

Vue.config.productionTip = false

Vue.use(ElementUI, { size: 'small' })

Vue.prototype.postRequest = postRequest
Vue.prototype.putRequest = putRequest
Vue.prototype.getRequest = getRequest
Vue.prototype.deleteRequest = deleteRequest

// 路由守卫
router.beforeEach((to, from, next) => {
  // 看用户是否登录了
  if (window.sessionStorage.getItem('tokenStr')) {
    initMenu(router, store)
    if (!window.sessionStorage.getItem('user')) {
      return getRequest('/admin/info').then(resp => {
        if (resp) {
          window.sessionStorage.setItem('user', JSON.stringify(resp))
          next()
        }
      })
    }
    next()
  } else {
    if (to.path === '/') {
      next()
    } else {
      next('/?redirect=' + to.path)
    }
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

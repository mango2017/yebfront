import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'

import { postRequest, putRequest, getRequest, deleteRequest } from './utils/api'
import { initMenu } from './utils/menus'

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.prototype.postRequest = postRequest
Vue.prototype.putRequest = putRequest
Vue.prototype.getRequest = getRequest
Vue.prototype.deleteRequest = deleteRequest

// 路由守卫
router.beforeEach((to, from, next) => {
  // 看用户是否登录了
  if (window.sessionStorage.getItem('tokenStr')) {
    initMenu(router, store)
    next()
  } else {
    if (to.path === '/') {
      next()
    }
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

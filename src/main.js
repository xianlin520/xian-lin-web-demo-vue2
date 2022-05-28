import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
// 导入axios配置文件
import './axios'
// 注册全局组件
Vue.use(ElementUI)
// 将提醒关掉
Vue.config.productionTip = false

new Vue({
  // 挂载路由对象(相当于 router:router)
  router,
  render: h => h(App)
}).$mount('#app')


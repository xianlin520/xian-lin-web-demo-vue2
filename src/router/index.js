import Vue from 'vue'
import VueRouter from 'vue-router'
import MyUserHome from '@/components/MyUserHome/MyUserHome'
// 注册路由插件
Vue.use(VueRouter)

const routes = [
  // 路由主页重定向
  {
    path: '/',
    name: 'userhome',
    component: MyUserHome
  },
  // 只有用户访问到, 才会被加载渲染(惰性加载)
  {
    path: '/userhome',
    name: 'userhome',
    component: () => import('@/components/MyUserHome/MyUserHome')
  },
  {
    path: '/error',
    name: 'error',
    component: () => import('@/components/Error')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/components/MyLogin')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/components/MyRegister')
  },
  {
    path: '/music',
    name: 'music',
    component: () => import('@/components/MyMusicPlayer')
  },
]

const router = new VueRouter({
  // 此模式下, 不会有 # 在 URL 中
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 路由前置守卫
router.beforeEach((to, from, next) => {
  // 读取token
  const token = localStorage.getItem('token')
  if (to.path === '/login' || to.path === '/register' || token !== null) {
    next()
  } else {
    next('/login')
  }
})
// 将路由对象暴露出去
export default router

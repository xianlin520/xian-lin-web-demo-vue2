import Vue from 'vue'
import axios from 'axios'

// 设置axios请求的基础路径
axios.defaults.baseURL = 'http://42.193.107.152:8888/'

// 设置axios别名
Vue.prototype.$axios = axios
// 设置axios携带的Token
// axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  const url = config.url
  // 判断url前四位是否是"http"
  if (url.substr(0, 4) !== 'http') {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
  }
  return config
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  console.log(response)
  delete axios.defaults.headers.common.Authorization
  return response
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})

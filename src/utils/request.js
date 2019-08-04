// 引入axios
import axios from 'axios'
import store from '@/store.js'
// 实例化axios
const request = axios.create({
  // 设置基准路径
  baseURL: 'http://ttapi.research.itcast.cn'
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // if (config.url !== '/app/v1_0/authorizations') {
  //   const { user } = store.state
  //   user && (config.headers.Authorization = 'Bearer ' + user.token)
  // }

  // if的另一种写法
  const { user } = store.state
  config.url !== '/app/v1_0/authorizations' && user && (config.headers.Authorization = 'Bearer ' + user.token)
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data.data || response.data
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

// 导出
export default request

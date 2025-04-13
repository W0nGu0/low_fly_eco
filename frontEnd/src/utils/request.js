import axios from 'axios'
import { ElMessage } from 'element-plus'

// 创建axios实例
const service = axios.create({
  baseURL: '/api', // 使用代理解决跨域问题
  timeout: 15000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做一些处理
    const token = localStorage.getItem('token')
    if (token) {
      // 让每个请求携带token
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    // 处理请求错误
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    
    // 如果响应的状态码不是200，则判断为错误
    if (response.status !== 200) {
      ElMessage({
        message: res.message || '请求失败',
        type: 'error',
        duration: 5 * 1000
      })
      
      // 判断token是否失效
      if (response.status === 401) {
        // 提示用户重新登录
        ElMessage({
          message: '登录已过期，请重新登录',
          type: 'error',
          duration: 5 * 1000
        })
        
        // 清除本地token和用户信息
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')
        
        // 跳转到登录页 - 使用前端路由路径
        setTimeout(() => {
          window.location.href = '/#/auth/login'
        }, 1500)
      }
      
      return Promise.reject(new Error(res.message || '请求失败'))
    } else {
      return res
    }
  },
  error => {
    console.error('Response error:', error)
    
    // 处理网络错误
    let message = '请求失败'
    if (error.response) {
      const statusMap = {
        400: '请求错误',
        401: '未授权，请重新登录',
        403: '拒绝访问',
        404: '请求地址不存在',
        408: '请求超时',
        500: '服务器内部错误',
        501: '服务未实现',
        502: '网关错误',
        503: '服务不可用',
        504: '网关超时',
        505: 'HTTP版本不受支持'
      }
      
      message = statusMap[error.response.status] || `请求失败(${error.response.status})`
      
      // 登录过期处理
      if (error.response.status === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')
        
        setTimeout(() => {
          window.location.href = '/#/auth/login'
        }, 1500)
      }
    } else if (error.request) {
      message = '服务器未响应'
    } else {
      message = error.message
    }
    
    ElMessage({
      message,
      type: 'error',
      duration: 5 * 1000
    })
    
    return Promise.reject(error)
  }
)

export default service 
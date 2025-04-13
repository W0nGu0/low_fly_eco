import { defineStore } from 'pinia'
import { login, register, getUserInfo, updateUserInfo } from '../api/user'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    userInfo: JSON.parse(localStorage.getItem('userInfo') || '{}'),
    loading: false
  }),
  
  getters: {
    isLoggedIn: (state) => !!state.token,
    isAdmin: (state) => state.userInfo.role === 'admin'
  },
  
  actions: {
    // 登录
    async login(credentials) {
      this.loading = true
      try {
        const { data } = await login(credentials)
        this.setToken(data.token)
        this.setUserInfo(data.user)
        return data
      } catch (error) {
        throw error
      } finally {
        this.loading = false
      }
    },
    
    // 注册
    async register(userInfo) {
      this.loading = true
      try {
        const { data } = await register(userInfo)
        return data
      } catch (error) {
        throw error
      } finally {
        this.loading = false
      }
    },
    
    // 获取用户信息
    async getUserInfo() {
      this.loading = true
      try {
        const { data } = await getUserInfo()
        this.setUserInfo(data)
        return data
      } catch (error) {
        throw error
      } finally {
        this.loading = false
      }
    },
    
    // 更新用户信息
    async updateUserInfo(userInfo) {
      this.loading = true
      try {
        const { data } = await updateUserInfo(userInfo)
        this.setUserInfo(data)
        return data
      } catch (error) {
        throw error
      } finally {
        this.loading = false
      }
    },
    
    // 退出登录
    logout() {
      this.token = ''
      this.userInfo = {}
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
    },
    
    // 设置Token
    setToken(token) {
      this.token = token
      localStorage.setItem('token', token)
    },
    
    // 设置用户信息
    setUserInfo(userInfo) {
      this.userInfo = userInfo
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
    }
  }
}) 
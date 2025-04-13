import { defineStore } from 'pinia'
import { createOrder, getOrderById, getUserOrders, updateOrder, cancelOrder, payOrder } from '../api/order'

export const useOrderStore = defineStore('order', {
  state: () => ({
    orders: [],
    currentOrder: null,
    loading: false,
    error: null
  }),
  
  getters: {
    // 获取不同状态的订单
    pendingOrders: (state) => state.orders.filter(order => order.status === 'pending'),
    paidOrders: (state) => state.orders.filter(order => order.status === 'paid'),
    completedOrders: (state) => state.orders.filter(order => order.status === 'completed'),
    cancelledOrders: (state) => state.orders.filter(order => order.status === 'cancelled'),
    
    // 计算订单总数
    totalOrders: (state) => state.orders.length
  },
  
  actions: {
    // 创建预约订单
    async createOrder(orderData) {
      this.loading = true
      this.error = null
      try {
        const { data } = await createOrder(orderData)
        this.currentOrder = data
        return data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },
    
    // 根据ID获取订单
    async fetchOrderById(id) {
      this.loading = true
      this.error = null
      try {
        const { data } = await getOrderById(id)
        this.currentOrder = data
        return data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },
    
    // 获取用户所有订单
    async fetchUserOrders() {
      this.loading = true
      this.error = null
      try {
        const { data } = await getUserOrders()
        this.orders = data
        return data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },
    
    // 更新订单信息
    async updateOrder(orderData) {
      this.loading = true
      this.error = null
      try {
        const { data } = await updateOrder(orderData)
        // 更新本地订单数据
        const index = this.orders.findIndex(order => order.id === data.id)
        if (index > -1) {
          this.orders[index] = data
        }
        if (this.currentOrder && this.currentOrder.id === data.id) {
          this.currentOrder = data
        }
        return data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },
    
    // 取消订单
    async cancelOrder(id) {
      this.loading = true
      this.error = null
      try {
        const { data } = await cancelOrder(id)
        // 更新本地订单数据
        const index = this.orders.findIndex(order => order.id === id)
        if (index > -1) {
          this.orders[index] = data
        }
        if (this.currentOrder && this.currentOrder.id === id) {
          this.currentOrder = data
        }
        return data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },
    
    // 支付订单
    async payOrder(orderData) {
      this.loading = true
      this.error = null
      try {
        const { data } = await payOrder(orderData)
        // 更新本地订单数据
        const index = this.orders.findIndex(order => order.id === orderData.id)
        if (index > -1) {
          this.orders[index] = data
        }
        if (this.currentOrder && this.currentOrder.id === orderData.id) {
          this.currentOrder = data
        }
        return data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },
    
    // 重置当前订单
    resetCurrentOrder() {
      this.currentOrder = null
    }
  }
}) 
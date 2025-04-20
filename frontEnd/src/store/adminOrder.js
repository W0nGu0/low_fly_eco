import { defineStore } from 'pinia'
import { 
  getAllOrders, 
  getOrderById, 
  updateOrder, 
  confirmOrder, 
  rejectOrder, 
  refundOrder 
} from '../api/order'

export const useAdminOrderStore = defineStore('adminOrder', {
  state: () => ({
    orders: [],
    currentOrder: null,
    loading: false,
    error: null,
    totalOrders: 0,
    filterOptions: {
      status: '',
      dateRange: [],
      keyword: '',
      page: 1,
      pageSize: 10
    }
  }),
  
  getters: {
    // 获取不同状态的订单
    pendingOrders: (state) => state.orders.filter(order => order.status === 'pending'),
    bookedOrders: (state) => state.orders.filter(order => order.status === 'booked'),
    completedOrders: (state) => state.orders.filter(order => order.status === 'completed'),
    cancelledOrders: (state) => state.orders.filter(order => order.status === 'cancelled'),
    refundingOrders: (state) => state.orders.filter(order => order.status === 'refunding'),
    refundedOrders: (state) => state.orders.filter(order => order.status === 'refunded'),
  },
  
  actions: {
    // 获取所有订单（管理员）
    async fetchAllOrders(query = {}) {
      this.loading = true
      this.error = null
      try {
        // 合并查询参数
        const params = { ...this.filterOptions, ...query }
        
        const { data } = await getAllOrders(params)
        this.orders = data.items || data
        this.totalOrders = data.total || data.length
        return data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },
    
    // 根据ID获取订单详情
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
    
    // 更新订单信息
    async updateOrder(orderData) {
      this.loading = true
      this.error = null
      try {
        const { data } = await updateOrder(orderData)
        // 更新本地订单数据
        this.updateLocalOrder(data)
        return data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },
    
    // 确认订单
    async confirmOrder(id) {
      this.loading = true
      this.error = null
      try {
        const { data } = await confirmOrder(id)
        // 更新本地订单数据
        this.updateLocalOrder(data)
        return data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },
    
    // 拒绝订单
    async rejectOrder(id, reason) {
      this.loading = true
      this.error = null
      try {
        const { data } = await rejectOrder(id, { reason })
        // 更新本地订单数据
        this.updateLocalOrder(data)
        return data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },
    
    // 处理退款
    async handleRefund(id, refundData) {
      this.loading = true
      this.error = null
      try {
        const { data } = await refundOrder({ id, ...refundData })
        // 更新本地订单数据
        this.updateLocalOrder(data)
        return data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },
    
    // 更新本地订单数据
    updateLocalOrder(updatedOrder) {
      const index = this.orders.findIndex(order => order.id === updatedOrder.id)
      if (index > -1) {
        this.orders[index] = updatedOrder
      }
      if (this.currentOrder && this.currentOrder.id === updatedOrder.id) {
        this.currentOrder = updatedOrder
      }
    },
    
    // 更新筛选选项
    updateFilterOptions(options) {
      this.filterOptions = { ...this.filterOptions, ...options }
    },
    
    // 重置筛选选项
    resetFilterOptions() {
      this.filterOptions = {
        status: '',
        dateRange: [],
        keyword: '',
        page: 1,
        pageSize: 10
      }
    },
    
    // 重置当前订单
    resetCurrentOrder() {
      this.currentOrder = null
    }
  }
})

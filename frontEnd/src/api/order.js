import request from '@/utils/request'

// 创建订单
export function createOrder(data) {
  return request({
    url: '/orders',
    method: 'post',
    data
  })
}

// 根据ID获取订单详情
export function getOrderById(id) {
  return request({
    url: `/orders/${id}`,
    method: 'get'
  })
}

// 获取用户所有订单
export function getUserOrders() {
  return request({
    url: '/orders/user',
    method: 'get'
  })
}

// 更新订单
export function updateOrder(data) {
  return request({
    url: `/orders/${data.id}`,
    method: 'put',
    data
  })
}

// 取消订单
export function cancelOrder(id) {
  return request({
    url: `/orders/${id}/cancel`,
    method: 'put'
  })
}

// 支付订单
export function payOrder(data) {
  return request({
    url: `/orders/${data.id}/pay`,
    method: 'post',
    data
  })
}

// 获取支付状态
export function getPaymentStatus(orderId) {
  return request({
    url: `/orders/${orderId}/payment-status`,
    method: 'get'
  })
}

// 获取订单电子凭证
export function getOrderVoucher(orderId) {
  return request({
    url: `/orders/${orderId}/voucher`,
    method: 'get'
  })
}

// 退款申请
export function refundOrder(data) {
  return request({
    url: `/orders/${data.id}/refund`,
    method: 'post',
    data
  })
}

// 获取退款状态
export function getRefundStatus(orderId) {
  return request({
    url: `/orders/${orderId}/refund-status`,
    method: 'get'
  })
}

// 管理员确认订单
export function confirmOrder(id) {
  return request({
    url: `/admin/orders/${id}/confirm`,
    method: 'put'
  })
}

// 管理员拒绝订单
export function rejectOrder(id, data) {
  return request({
    url: `/admin/orders/${id}/reject`,
    method: 'put',
    data
  })
}

// 管理员获取所有订单
export function getAllOrders(query) {
  return request({
    url: '/admin/orders',
    method: 'get',
    params: query
  })
} 
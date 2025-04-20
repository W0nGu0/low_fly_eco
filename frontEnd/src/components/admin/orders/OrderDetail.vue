<template>
  <div class="order-detail">
    <el-descriptions
      title="订单详情"
      :column="2"
      border
      class="mb-4"
    >
      <el-descriptions-item label="订单编号">{{ order.orderNumber }}</el-descriptions-item>
      <el-descriptions-item label="订单状态">
        <el-tag :type="getStatusType(order.status)">{{ getStatusText(order.status) }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="项目名称">{{ order.projectName }}</el-descriptions-item>
      <el-descriptions-item label="预约时间">{{ order.bookingTime }}</el-descriptions-item>
      <el-descriptions-item label="联系人">{{ order.contactName }}</el-descriptions-item>
      <el-descriptions-item label="联系电话">{{ order.contactPhone }}</el-descriptions-item>
      <el-descriptions-item label="人数">{{ order.peopleCount }} 人</el-descriptions-item>
      <el-descriptions-item label="订单金额">¥{{ order.amount }}</el-descriptions-item>
      <el-descriptions-item label="下单时间">{{ order.createTime }}</el-descriptions-item>
      <el-descriptions-item label="支付时间" v-if="order.payTime">{{ order.payTime }}</el-descriptions-item>
      <el-descriptions-item label="备注" :span="2">{{ order.remark || '无' }}</el-descriptions-item>
    </el-descriptions>

    <!-- 订单处理区域 -->
    <div class="order-actions mb-4">
      <el-divider content-position="left">订单处理</el-divider>
      <el-tabs v-model="activeTab" class="order-tabs">
        <!-- 状态处理 -->
        <el-tab-pane label="状态处理" name="status">
          <div class="tab-content">
            <p class="mb-4">当前状态: <el-tag :type="getStatusType(order.status)">{{ getStatusText(order.status) }}</el-tag></p>
            
            <div class="action-buttons">
              <el-button 
                type="primary" 
                @click="handleConfirmOrder" 
                :disabled="!canConfirm"
                :loading="processing">
                确认预约
              </el-button>
              
              <el-button 
                type="success" 
                @click="handleCompleteOrder" 
                :disabled="!canComplete"
                :loading="processing">
                完成订单
              </el-button>
              
              <el-button 
                type="danger" 
                @click="showCancelDialog = true" 
                :disabled="!canCancel"
                :loading="processing">
                取消订单
              </el-button>
            </div>
          </div>
        </el-tab-pane>
        
        <!-- 特殊处理 -->
        <el-tab-pane label="特殊处理" name="special">
          <div class="tab-content">
            <p class="mb-4">特殊处理可以修改订单的预约时间、人数等信息</p>
            
            <el-form :model="specialForm" label-width="100px" class="special-form">
              <el-form-item label="预约时间">
                <el-date-picker
                  v-model="specialForm.bookingDate"
                  type="date"
                  placeholder="选择日期"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                  class="w-full"
                ></el-date-picker>
              </el-form-item>
              
              <el-form-item label="时间段">
                <el-select v-model="specialForm.timeSlot" placeholder="选择时间段" class="w-full">
                  <el-option label="上午 (9:00-12:00)" value="morning"></el-option>
                  <el-option label="下午 (13:00-17:00)" value="afternoon"></el-option>
                  <el-option label="全天 (9:00-17:00)" value="fullday"></el-option>
                </el-select>
              </el-form-item>
              
              <el-form-item label="人数">
                <el-input-number v-model="specialForm.peopleCount" :min="1" :max="20" class="w-full"></el-input-number>
              </el-form-item>
              
              <el-form-item label="修改原因">
                <el-input 
                  type="textarea" 
                  v-model="specialForm.reason" 
                  placeholder="请输入修改原因"
                  :rows="3"
                ></el-input>
              </el-form-item>
              
              <el-form-item>
                <el-button type="primary" @click="handleSpecialProcess" :loading="processing">提交修改</el-button>
                <el-button @click="resetSpecialForm">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        
        <!-- 退款处理 -->
        <el-tab-pane label="退款处理" name="refund">
          <div class="tab-content">
            <template v-if="order.status === 'refunding'">
              <el-alert
                title="该订单正在申请退款，请进行处理"
                type="warning"
                :closable="false"
                class="mb-4"
              ></el-alert>
              
              <el-descriptions title="退款申请信息" :column="1" border class="mb-4">
                <el-descriptions-item label="申请时间">{{ order.refundApplyTime || '未知' }}</el-descriptions-item>
                <el-descriptions-item label="退款原因">{{ order.refundReason || '未提供' }}</el-descriptions-item>
                <el-descriptions-item label="退款金额">¥{{ order.refundAmount || order.amount }}</el-descriptions-item>
                <el-descriptions-item label="申请说明">{{ order.refundDescription || '无' }}</el-descriptions-item>
              </el-descriptions>
              
              <div class="action-buttons">
                <el-button 
                  type="primary" 
                  @click="handleApproveRefund" 
                  :loading="processing">
                  同意退款
                </el-button>
                
                <el-button 
                  type="danger" 
                  @click="showRefundRejectDialog = true" 
                  :loading="processing">
                  拒绝退款
                </el-button>
              </div>
            </template>
            
            <template v-else>
              <p class="mb-4">管理员可以为客户发起退款</p>
              
              <el-form :model="refundForm" label-width="100px" class="refund-form">
                <el-form-item label="退款金额">
                  <el-input-number 
                    v-model="refundForm.amount" 
                    :min="0" 
                    :max="order.amount" 
                    :precision="2"
                    :step="10"
                    class="w-full"
                  ></el-input-number>
                  <div class="text-gray-500 text-sm mt-1">
                    最大可退金额: ¥{{ order.amount }}
                  </div>
                </el-form-item>
                
                <el-form-item label="退款原因">
                  <el-select v-model="refundForm.reason" placeholder="选择退款原因" class="w-full">
                    <el-option label="客户申请退款" value="customer_request"></el-option>
                    <el-option label="服务无法提供" value="service_unavailable"></el-option>
                    <el-option label="订单信息有误" value="wrong_info"></el-option>
                    <el-option label="其他原因" value="other"></el-option>
                  </el-select>
                </el-form-item>
                
                <el-form-item label="退款说明">
                  <el-input 
                    type="textarea" 
                    v-model="refundForm.description" 
                    placeholder="请输入退款说明"
                    :rows="3"
                  ></el-input>
                </el-form-item>
                
                <el-form-item>
                  <el-button 
                    type="primary" 
                    @click="handleRefundProcess" 
                    :disabled="!canRefund"
                    :loading="processing">
                    提交退款
                  </el-button>
                  <el-button @click="resetRefundForm">重置</el-button>
                </el-form-item>
              </el-form>
            </template>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 操作记录 -->
    <div class="order-logs">
      <el-divider content-position="left">操作记录</el-divider>
      <el-timeline>
        <el-timeline-item
          v-for="(log, index) in orderLogs"
          :key="index"
          :timestamp="log.time"
          :type="getLogType(log.action)"
        >
          {{ log.description }}
        </el-timeline-item>
      </el-timeline>
    </div>

    <!-- 取消订单对话框 -->
    <el-dialog
      v-model="showCancelDialog"
      title="取消订单"
      width="500px"
    >
      <el-form :model="cancelForm" label-width="100px">
        <el-form-item label="取消原因" prop="reason">
          <el-select v-model="cancelForm.reason" placeholder="选择取消原因" class="w-full">
            <el-option label="客户申请取消" value="customer_request"></el-option>
            <el-option label="服务无法提供" value="service_unavailable"></el-option>
            <el-option label="订单信息有误" value="wrong_info"></el-option>
            <el-option label="其他原因" value="other"></el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item label="详细说明">
          <el-input 
            type="textarea" 
            v-model="cancelForm.description" 
            placeholder="请输入详细说明"
            :rows="3"
          ></el-input>
        </el-form-item>
      </el-form>
      
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showCancelDialog = false">取消</el-button>
          <el-button type="primary" @click="handleCancelOrder" :loading="processing">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 拒绝退款对话框 -->
    <el-dialog
      v-model="showRefundRejectDialog"
      title="拒绝退款"
      width="500px"
    >
      <el-form :model="refundRejectForm" label-width="100px">
        <el-form-item label="拒绝原因" prop="reason" required>
          <el-input 
            type="textarea" 
            v-model="refundRejectForm.reason" 
            placeholder="请输入拒绝退款的原因"
            :rows="3"
          ></el-input>
        </el-form-item>
      </el-form>
      
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showRefundRejectDialog = false">取消</el-button>
          <el-button type="primary" @click="handleRejectRefund" :loading="processing">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, reactive, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const props = defineProps({
  order: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update', 'refresh'])

// 状态
const activeTab = ref('status')
const processing = ref(false)
const showCancelDialog = ref(false)
const showRefundRejectDialog = ref(false)

// 特殊处理表单
const specialForm = reactive({
  bookingDate: '',
  timeSlot: '',
  peopleCount: 1,
  reason: ''
})

// 退款表单
const refundForm = reactive({
  amount: 0,
  reason: '',
  description: ''
})

// 取消订单表单
const cancelForm = reactive({
  reason: '',
  description: ''
})

// 拒绝退款表单
const refundRejectForm = reactive({
  reason: ''
})

// 订单操作记录
const orderLogs = ref([
  {
    time: props.order.createTime,
    action: 'create',
    description: '订单创建成功'
  }
])

// 如果有支付时间，添加支付记录
if (props.order.payTime) {
  orderLogs.value.push({
    time: props.order.payTime,
    action: 'pay',
    description: '订单支付成功'
  })
}

// 根据订单状态添加相应的记录
if (props.order.status === 'booked') {
  orderLogs.value.push({
    time: props.order.confirmTime || '未知',
    action: 'confirm',
    description: '管理员确认预约'
  })
} else if (props.order.status === 'completed') {
  orderLogs.value.push({
    time: props.order.completeTime || '未知',
    action: 'complete',
    description: '订单已完成'
  })
} else if (props.order.status === 'cancelled') {
  orderLogs.value.push({
    time: props.order.cancelTime || '未知',
    action: 'cancel',
    description: `订单已取消，原因：${props.order.cancelReason || '未提供'}`
  })
} else if (props.order.status === 'refunding') {
  orderLogs.value.push({
    time: props.order.refundApplyTime || '未知',
    action: 'refund_apply',
    description: '客户申请退款'
  })
} else if (props.order.status === 'refunded') {
  orderLogs.value.push({
    time: props.order.refundTime || '未知',
    action: 'refund',
    description: '退款已完成'
  })
}

// 计算属性：是否可以确认订单
const canConfirm = computed(() => {
  return props.order.status === 'pending' || props.order.status === 'paid'
})

// 计算属性：是否可以完成订单
const canComplete = computed(() => {
  return props.order.status === 'booked'
})

// 计算属性：是否可以取消订单
const canCancel = computed(() => {
  return ['pending', 'paid', 'booked'].includes(props.order.status)
})

// 计算属性：是否可以退款
const canRefund = computed(() => {
  return ['paid', 'booked'].includes(props.order.status)
})

// 监听订单变化，初始化表单
watch(() => props.order, (newOrder) => {
  // 初始化特殊处理表单
  if (newOrder.bookingTime) {
    const [date, time] = newOrder.bookingTime.split(' ')
    specialForm.bookingDate = date
    
    // 根据时间段设置timeSlot
    if (time.includes('9:00') && time.includes('12:00')) {
      specialForm.timeSlot = 'morning'
    } else if (time.includes('13:00') && time.includes('17:00')) {
      specialForm.timeSlot = 'afternoon'
    } else if (time.includes('9:00') && time.includes('17:00')) {
      specialForm.timeSlot = 'fullday'
    }
  }
  
  specialForm.peopleCount = newOrder.peopleCount || 1
  
  // 初始化退款表单
  refundForm.amount = newOrder.amount
}, { immediate: true })

// 获取状态类型
const getStatusType = (status) => {
  const statusMap = {
    'pending': 'info',
    'paid': 'warning',
    'booked': 'primary',
    'completed': 'success',
    'cancelled': 'danger',
    'refunding': 'warning',
    'refunded': 'info'
  }
  return statusMap[status] || 'info'
}

// 获取状态文本
const getStatusText = (status) => {
  const statusMap = {
    'pending': '待支付',
    'paid': '已支付',
    'booked': '已预约',
    'completed': '已完成',
    'cancelled': '已取消',
    'refunding': '退款中',
    'refunded': '已退款'
  }
  return statusMap[status] || '未知状态'
}

// 获取日志类型
const getLogType = (action) => {
  const actionMap = {
    'create': 'primary',
    'pay': 'success',
    'confirm': 'success',
    'complete': 'success',
    'cancel': 'danger',
    'refund_apply': 'warning',
    'refund': 'info'
  }
  return actionMap[action] || 'info'
}

// 确认预约
const handleConfirmOrder = async () => {
  try {
    processing.value = true
    
    // 这里应该调用API确认订单
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 模拟成功响应
    const updatedOrder = {
      ...props.order,
      status: 'booked',
      confirmTime: new Date().toISOString().replace('T', ' ').substring(0, 19)
    }
    
    // 添加操作记录
    orderLogs.value.push({
      time: updatedOrder.confirmTime,
      action: 'confirm',
      description: '管理员确认预约'
    })
    
    ElMessage.success('订单已确认')
    emit('update', updatedOrder)
  } catch (error) {
    ElMessage.error(error.message || '操作失败')
  } finally {
    processing.value = false
  }
}

// 完成订单
const handleCompleteOrder = async () => {
  try {
    processing.value = true
    
    // 这里应该调用API完成订单
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 模拟成功响应
    const updatedOrder = {
      ...props.order,
      status: 'completed',
      completeTime: new Date().toISOString().replace('T', ' ').substring(0, 19)
    }
    
    // 添加操作记录
    orderLogs.value.push({
      time: updatedOrder.completeTime,
      action: 'complete',
      description: '订单已完成'
    })
    
    ElMessage.success('订单已完成')
    emit('update', updatedOrder)
  } catch (error) {
    ElMessage.error(error.message || '操作失败')
  } finally {
    processing.value = false
  }
}

// 取消订单
const handleCancelOrder = async () => {
  if (!cancelForm.reason) {
    ElMessage.warning('请选择取消原因')
    return
  }
  
  try {
    processing.value = true
    
    // 这里应该调用API取消订单
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 模拟成功响应
    const updatedOrder = {
      ...props.order,
      status: 'cancelled',
      cancelTime: new Date().toISOString().replace('T', ' ').substring(0, 19),
      cancelReason: cancelForm.reason,
      cancelDescription: cancelForm.description
    }
    
    // 添加操作记录
    orderLogs.value.push({
      time: updatedOrder.cancelTime,
      action: 'cancel',
      description: `订单已取消，原因：${cancelForm.reason}`
    })
    
    ElMessage.success('订单已取消')
    showCancelDialog.value = false
    emit('update', updatedOrder)
  } catch (error) {
    ElMessage.error(error.message || '操作失败')
  } finally {
    processing.value = false
  }
}

// 特殊处理
const handleSpecialProcess = async () => {
  if (!specialForm.bookingDate || !specialForm.timeSlot) {
    ElMessage.warning('请选择预约时间和时间段')
    return
  }
  
  if (!specialForm.reason) {
    ElMessage.warning('请输入修改原因')
    return
  }
  
  try {
    processing.value = true
    
    // 根据时间段生成预约时间
    let bookingTime = specialForm.bookingDate
    if (specialForm.timeSlot === 'morning') {
      bookingTime += ' 9:00-12:00'
    } else if (specialForm.timeSlot === 'afternoon') {
      bookingTime += ' 13:00-17:00'
    } else if (specialForm.timeSlot === 'fullday') {
      bookingTime += ' 9:00-17:00'
    }
    
    // 这里应该调用API修改订单
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 模拟成功响应
    const updatedOrder = {
      ...props.order,
      bookingTime,
      peopleCount: specialForm.peopleCount,
      modifyTime: new Date().toISOString().replace('T', ' ').substring(0, 19),
      modifyReason: specialForm.reason
    }
    
    // 添加操作记录
    orderLogs.value.push({
      time: updatedOrder.modifyTime,
      action: 'modify',
      description: `订单信息已修改，原因：${specialForm.reason}`
    })
    
    ElMessage.success('订单信息已修改')
    emit('update', updatedOrder)
  } catch (error) {
    ElMessage.error(error.message || '操作失败')
  } finally {
    processing.value = false
  }
}

// 退款处理
const handleRefundProcess = async () => {
  if (refundForm.amount <= 0) {
    ElMessage.warning('退款金额必须大于0')
    return
  }
  
  if (!refundForm.reason) {
    ElMessage.warning('请选择退款原因')
    return
  }
  
  try {
    processing.value = true
    
    // 这里应该调用API处理退款
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 模拟成功响应
    const updatedOrder = {
      ...props.order,
      status: 'refunded',
      refundTime: new Date().toISOString().replace('T', ' ').substring(0, 19),
      refundAmount: refundForm.amount,
      refundReason: refundForm.reason,
      refundDescription: refundForm.description
    }
    
    // 添加操作记录
    orderLogs.value.push({
      time: updatedOrder.refundTime,
      action: 'refund',
      description: `退款已完成，金额：¥${refundForm.amount}`
    })
    
    ElMessage.success('退款已处理')
    emit('update', updatedOrder)
  } catch (error) {
    ElMessage.error(error.message || '操作失败')
  } finally {
    processing.value = false
  }
}

// 同意退款
const handleApproveRefund = async () => {
  try {
    processing.value = true
    
    // 这里应该调用API同意退款
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 模拟成功响应
    const updatedOrder = {
      ...props.order,
      status: 'refunded',
      refundTime: new Date().toISOString().replace('T', ' ').substring(0, 19)
    }
    
    // 添加操作记录
    orderLogs.value.push({
      time: updatedOrder.refundTime,
      action: 'refund',
      description: `退款已完成，金额：¥${updatedOrder.refundAmount || updatedOrder.amount}`
    })
    
    ElMessage.success('已同意退款申请')
    emit('update', updatedOrder)
  } catch (error) {
    ElMessage.error(error.message || '操作失败')
  } finally {
    processing.value = false
  }
}

// 拒绝退款
const handleRejectRefund = async () => {
  if (!refundRejectForm.reason) {
    ElMessage.warning('请输入拒绝原因')
    return
  }
  
  try {
    processing.value = true
    
    // 这里应该调用API拒绝退款
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 模拟成功响应
    const updatedOrder = {
      ...props.order,
      status: 'booked', // 恢复到预约状态
      refundRejectTime: new Date().toISOString().replace('T', ' ').substring(0, 19),
      refundRejectReason: refundRejectForm.reason
    }
    
    // 添加操作记录
    orderLogs.value.push({
      time: updatedOrder.refundRejectTime,
      action: 'refund_reject',
      description: `退款申请被拒绝，原因：${refundRejectForm.reason}`
    })
    
    ElMessage.success('已拒绝退款申请')
    showRefundRejectDialog.value = false
    emit('update', updatedOrder)
  } catch (error) {
    ElMessage.error(error.message || '操作失败')
  } finally {
    processing.value = false
  }
}

// 重置特殊处理表单
const resetSpecialForm = () => {
  const [date, time] = props.order.bookingTime.split(' ')
  specialForm.bookingDate = date
  
  // 根据时间段设置timeSlot
  if (time.includes('9:00') && time.includes('12:00')) {
    specialForm.timeSlot = 'morning'
  } else if (time.includes('13:00') && time.includes('17:00')) {
    specialForm.timeSlot = 'afternoon'
  } else if (time.includes('9:00') && time.includes('17:00')) {
    specialForm.timeSlot = 'fullday'
  }
  
  specialForm.peopleCount = props.order.peopleCount || 1
  specialForm.reason = ''
}

// 重置退款表单
const resetRefundForm = () => {
  refundForm.amount = props.order.amount
  refundForm.reason = ''
  refundForm.description = ''
}
</script>

<style scoped>
.order-detail {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
}

.tab-content {
  padding: 20px 0;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.special-form,
.refund-form {
  max-width: 500px;
}

.order-logs {
  margin-top: 20px;
}

.mb-4 {
  margin-bottom: 16px;
}

.w-full {
  width: 100%;
}

.text-gray-500 {
  color: #6b7280;
}

.text-sm {
  font-size: 0.875rem;
}

.mt-1 {
  margin-top: 4px;
}
</style>

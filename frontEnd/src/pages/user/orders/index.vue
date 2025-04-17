<template>
  <div class="orders-page bg-gray-50 min-h-screen">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8 text-gray-800 animate__animated animate__fadeInDown">我的订单</h1>
      
      <!-- 订单筛选 -->
      <div class="filters mb-8 flex flex-wrap gap-4 bg-white p-6 rounded-xl shadow-sm animate__animated animate__fadeInUp">
        <el-select v-model="statusFilter" placeholder="订单状态" class="w-36">
          <el-option label="全部订单" value=""></el-option>
          <el-option label="待支付" value="pending"></el-option>
          <el-option label="待体验" value="booked"></el-option>
          <el-option label="已完成" value="completed"></el-option>
          <el-option label="已取消" value="cancelled"></el-option>
          <el-option label="退款中" value="refunding"></el-option>
          <el-option label="已退款" value="refunded"></el-option>
        </el-select>
        
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          class="w-72">
        </el-date-picker>
        
        <el-input
          v-model="searchKeyword"
          placeholder="搜索订单号/项目名称"
          class="w-64"
          clearable>
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
        
        <el-button type="primary" @click="searchOrders" class="bg-blue-500 hover:bg-blue-600 transition-colors">搜索</el-button>
        <el-button @click="resetFilters" class="hover:bg-gray-100 transition-colors">重置</el-button>
      </div>
      
      <!-- 订单列表 -->
      <div class="orders-list mb-8">
        <el-empty v-if="filteredOrders.length === 0" description="暂无订单" class="py-12">
          <el-button type="primary" @click="goToProjects">去体验</el-button>
        </el-empty>
        
        <div v-else class="grid gap-6">
          <el-card v-for="(order, index) in filteredOrders" :key="order.id" 
            class="order-card hover:shadow-lg transition-shadow duration-300 animate__animated animate__fadeIn"
            :style="{ animationDelay: `${index * 0.1}s` }">
            <div class="order-item">
              <div class="order-header flex justify-between items-center mb-4 pb-3 border-b">
                <div class="order-basic">
                  <span class="order-id text-gray-500 mr-3">订单号: {{ order.orderNumber }}</span>
                  <span class="order-date text-gray-500">下单时间: {{ order.createTime }}</span>
                </div>
                <div class="order-status">
                  <el-tag :type="getStatusTagType(order.status)" class="px-3 py-1">{{ getStatusText(order.status) }}</el-tag>
                </div>
              </div>
              
              <div class="order-content flex mb-4">
                <div class="order-project-image mr-4 hidden sm:block">
                  <img :src="order.projectImage" alt="项目图片" class="w-24 h-24 object-cover rounded-md shadow-sm">
                </div>
                
                <div class="order-details flex-1">
                  <h3 class="text-lg font-medium mb-2 text-gray-800">{{ order.projectName }}</h3>
                  <div class="order-info text-sm text-gray-500 grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div class="info-item flex items-center">
                      <i class="el-icon-time mr-1"></i>
                      <span>预约时间: {{ order.bookingTime }}</span>
                    </div>
                    <div class="info-item flex items-center">
                      <i class="el-icon-user mr-1"></i>
                      <span>参与人数: {{ order.peopleCount }}人</span>
                    </div>
                    <div class="info-item flex items-center">
                      <i class="el-icon-user mr-1"></i>
                      <span>联系人: {{ order.contactName }}</span>
                    </div>
                    <div class="info-item flex items-center">
                      <i class="el-icon-phone mr-1"></i>
                      <span>联系电话: {{ order.contactPhone }}</span>
                    </div>
                  </div>
                </div>
                
                <div class="order-price text-right">
                  <div class="price-amount">
                    <span class="currency">¥</span>
                    <span class="amount">{{ order.amount }}</span>
                    <span class="unit">{{ order.amount > 1 ? '元' : '元' }}</span>
                  </div>
                  <div class="order-actions">
                    <el-button 
                      type="primary" 
                      size="small" 
                      @click="viewOrderDetail(order.id)"
                      class="mb-2 w-full bg-blue-500 hover:bg-blue-600 transition-colors">
                      查看详情
                    </el-button>
                    
                    <!-- 待支付状态显示去支付按钮 -->
                    <el-button 
                      v-if="order.status === 'pending'" 
                      type="success" 
                      size="small" 
                      @click="goToPay(order.id)"
                      class="mb-2 w-full bg-green-500 hover:bg-green-600 transition-colors">
                      去支付
                    </el-button>
                    
                    <!-- 待体验状态显示取消订单按钮 -->
                    <el-button 
                      v-if="order.status === 'booked'" 
                      type="danger" 
                      size="small" 
                      @click="cancelOrder(order.id)"
                      class="mb-2 w-full bg-red-500 hover:bg-red-600 transition-colors">
                      取消订单
                    </el-button>
                    
                    <!-- 已完成状态显示评价按钮 -->
                    <el-button 
                      v-if="order.status === 'completed' && !order.hasReview" 
                      type="warning" 
                      size="small" 
                      @click="goToReview(order.id)"
                      class="mb-2 w-full bg-yellow-500 hover:bg-yellow-600 transition-colors">
                      评价
                    </el-button>
                    
                    <!-- 退款中状态显示查看退款进度按钮 -->
                    <el-button 
                      v-if="order.status === 'refunding'" 
                      type="info" 
                      size="small" 
                      @click="viewRefundProgress(order.id)"
                      class="mb-2 w-full bg-gray-500 hover:bg-gray-600 transition-colors">
                      退款进度
                    </el-button>
                  </div>
                </div>
              </div>
            </div>
          </el-card>
        </div>
      </div>
      
      <!-- 分页 -->
      <div class="pagination-container flex justify-center mt-8">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalOrders"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          class="animate__animated animate__fadeInUp"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { useOrderStore } from '@/store/order'

const router = useRouter()
const orderStore = useOrderStore()

// 订单列表状态
const orders = ref([])
const total = ref(0)
const pageSize = ref(10)
const currentPage = ref(1)
const loading = ref(false)
const submitting = ref(false)

// 筛选条件
const statusFilter = ref('')
const dateRange = ref([])
const searchKeyword = ref('')

// 当前订单详情
const currentOrder = ref(null)
const showOrderDetail = ref(false)

// 电子凭证
const showVoucher = ref(false)
const voucherInfo = ref({})
const voucherQrCode = ref('/src/assets/images/voucher/voucher-qrcode.png')

// 退款申请
const showRefundDialog = ref(false)
const refundFormRef = ref(null)
const refundForm = reactive({
  orderId: '',
  reason: '',
  description: '',
  amount: 0,
  percentage: 80 // 默认退款比例
})

// 退款表单验证规则
const refundRules = {
  reason: [
    { required: true, message: '请选择退款原因', trigger: 'change' }
  ]
}

// 筛选后的订单列表
const filteredOrders = computed(() => {
  return orders.value
})

// 获取订单状态对应的Tag类型
function getStatusTagType(status) {
  const statusMap = {
    'pending': 'warning',
    'booked': 'success',
    'completed': '',
    'cancelled': 'info',
    'refunding': 'warning',
    'refunded': 'info'
  }
  return statusMap[status] || ''
}

// 获取订单状态对应的文本
function getStatusText(status) {
  const statusMap = {
    'pending': '待支付',
    'booked': '待体验',
    'completed': '已完成',
    'cancelled': '已取消',
    'refunding': '退款中',
    'refunded': '已退款'
  }
  return statusMap[status] || '未知状态'
}

// 获取支付方式对应的文本
function getPaymentMethodText(method) {
  const methodMap = {
    'wechat': '微信支付',
    'alipay': '支付宝',
    'credit': '银行卡支付'
  }
  return methodMap[method] || '未知方式'
}

// 获取退款状态对应的Tag类型
function getRefundStatusTagType(status) {
  const statusMap = {
    'pending': 'warning',
    'approved': 'success',
    'rejected': 'danger',
    'completed': 'info'
  }
  return statusMap[status] || ''
}

// 获取退款状态对应的文本
function getRefundStatusText(status) {
  const statusMap = {
    'pending': '处理中',
    'approved': '已通过',
    'rejected': '已拒绝',
    'completed': '已退款'
  }
  return statusMap[status] || '未知状态'
}

// 加载订单列表
async function loadOrders() {
  loading.value = true
  try {
    // 实际项目中应调用API获取订单列表
    // const params = {
    //   page: currentPage.value,
    //   pageSize: pageSize.value,
    //   status: statusFilter.value,
    //   startDate: dateRange.value?.[0],
    //   endDate: dateRange.value?.[1],
    //   keyword: searchKeyword.value
    // }
    // const result = await orderStore.getUserOrders(params)
    // orders.value = result.data
    // total.value = result.total
    
    // 模拟数据
    await new Promise(resolve => setTimeout(resolve, 500))
    
    orders.value = [
      {
        id: 1,
        orderNumber: 'ORD20230815001',
        projectName: '城市热气球观光之旅',
        projectImage: '/src/assets/images/projects/hot-air-balloon.jpg',
        bookingTime: '2023-08-15 10:00-11:00',
        createTime: '2023-08-10 14:32:45',
        peopleCount: 2,
        contactName: '张三',
        contactPhone: '13812345678',
        status: 'completed',
        amount: 1376,
        hasReview: true
      },
      {
        id: 2,
        orderNumber: 'ORD20230820002',
        projectName: '直升机空中游览',
        projectImage: '/src/assets/images/projects/helicopter.jpg',
        bookingTime: '2023-08-20 14:00-15:00',
        createTime: '2023-08-12 09:15:22',
        peopleCount: 1,
        contactName: '张三',
        contactPhone: '13812345678',
        status: 'booked',
        amount: 1280
      },
      {
        id: 3,
        orderNumber: 'ORD20230825003',
        projectName: '专业无人机操控体验',
        projectImage: '/src/assets/images/projects/drone.jpg',
        bookingTime: '2023-08-25 15:00-17:00',
        createTime: '2023-08-15 16:45:10',
        peopleCount: 3,
        contactName: '张三',
        contactPhone: '13812345678',
        status: 'pending',
        amount: 1197
      }
    ]
    
    total.value = 3
  } catch (error) {
    ElMessage.error(error.message || '加载订单失败')
  } finally {
    loading.value = false
  }
}

// 搜索订单
function searchOrders() {
  currentPage.value = 1
  loadOrders()
}

// 重置筛选条件
function resetFilters() {
  statusFilter.value = ''
  dateRange.value = []
  searchKeyword.value = ''
  currentPage.value = 1
  loadOrders()
}

// 处理页码变化
function handlePageChange(page) {
  currentPage.value = page
  loadOrders()
}

// 查看订单详情
async function viewOrderDetail(orderId) {
  try {
    // 实际项目中应调用API获取订单详情
    // const result = await orderStore.getOrderById(orderId)
    // currentOrder.value = result.data
    
    // 模拟数据
    const order = orders.value.find(o => o.id === orderId)
    
    currentOrder.value = {
      ...order,
      payTime: order.status !== 'pending' ? '2023-08-10 14:45:22' : null,
      payMethod: order.status !== 'pending' ? 'wechat' : null,
      location: '北京市朝阳区奥林匹克公园南园区',
      emergencyContact: '李四',
      emergencyPhone: '13987654321',
      participants: [
        {
          name: '张三',
          idCard: '110101199001011234',
          age: 33,
          specialNeeds: ''
        },
        {
          name: '王五',
          idCard: '110101199203033456',
          age: 31,
          specialNeeds: '有轻微恐高'
        }
      ],
      refundInfo: order.status === 'refunded' || order.status === 'refunding' ? {
        status: order.status === 'refunded' ? 'completed' : 'pending',
        applyTime: '2023-08-13 10:25:36',
        amount: order.amount * 0.8,
        reason: '行程变更',
        result: order.status === 'refunded' ? '退款已完成' : null
      } : null
    }
    
    showOrderDetail.value = true
  } catch (error) {
    ElMessage.error(error.message || '获取订单详情失败')
  }
}

// 去支付
function goToPay(orderId) {
  router.push(`/user/payment?orderId=${orderId}`)
}

// 取消订单
function cancelOrder(orderId) {
  ElMessageBox.confirm(
    '确定要取消此订单吗？',
    '取消订单',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(async () => {
    try {
      // 实际项目中应调用API取消订单
      // await orderStore.cancelOrder(orderId)
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 500))
      
      ElMessage.success('订单已取消')
      
      // 刷新订单列表
      loadOrders()
    } catch (error) {
      ElMessage.error(error.message || '取消订单失败')
    }
  }).catch(() => {})
}

// 申请退款
function applyRefund(orderId) {
  const order = orders.value.find(o => o.id === orderId)
  if (!order) return
  
  refundForm.orderId = orderId
  refundForm.amount = order.amount * (refundForm.percentage / 100)
  
  showRefundDialog.value = true
}

// 提交退款申请
async function submitRefund() {
  refundFormRef.value.validate(async (valid) => {
    if (valid) {
      submitting.value = true
      try {
        // 实际项目中应调用API提交退款申请
        // await orderStore.refundOrder({
        //   id: refundForm.orderId,
        //   reason: refundForm.reason,
        //   description: refundForm.description,
        //   amount: refundForm.amount
        // })
        
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 800))
        
        ElMessage.success('退款申请已提交，请等待处理')
        showRefundDialog.value = false
        
        // 重置表单
        refundForm.reason = ''
        refundForm.description = ''
        
        // 刷新订单列表
        loadOrders()
      } catch (error) {
        ElMessage.error(error.message || '提交退款申请失败')
      } finally {
        submitting.value = false
      }
    }
  })
}

// 去评价
function goToReview(orderId) {
  router.push(`/user/feedback?orderId=${orderId}`)
}

// 查看凭证
function viewVoucher(orderId) {
  const order = orders.value.find(o => o.id === orderId)
  if (!order) return
  
  voucherInfo.value = {
    projectName: order.projectName,
    bookingTime: order.bookingTime,
    peopleCount: order.peopleCount,
    contactName: order.contactName,
    orderNumber: order.orderNumber
  }
  
  showVoucher.value = true
}

// 下载凭证
function downloadVoucher() {
  ElMessage.success('凭证已下载')
  // 实际项目中应实现凭证下载功能
}

// 打印订单
function printOrderDetail() {
  ElMessage.success('订单打印中')
  // 实际项目中应实现订单打印功能
}

// 生命周期钩子
onMounted(() => {
  loadOrders()
})
</script>

<style scoped>
.orders-page {
  background-color: #f0fdf4;
  min-height: calc(100vh - 64px);
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

h1 {
  color: #15803d;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
  animation: fadeInDown 0.5s ease-out;
}

.filters {
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  animation: fadeInUp 0.5s ease-out;
  transition: all 0.3s ease;
  border: 1px solid #86efac;
}

.filters:hover {
  box-shadow: 0 4px 20px rgba(22, 163, 74, 0.2);
  border-color: #4ade80;
}

.order-card {
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
  animation: fadeIn 0.5s ease-out;
  border: 1px solid #86efac;
}

.order-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 20px rgba(22, 163, 74, 0.2);
  border-color: #4ade80;
}

.order-header {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #86efac;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.order-basic {
  color: #1f2937;
  font-size: 0.9rem;
}

.order-status .el-tag {
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-weight: 500;
}

.order-content {
  padding: 1.5rem;
  display: flex;
  gap: 1.5rem;
}

.order-project-image img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  border: 2px solid #86efac;
}

.order-project-image img:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(22, 163, 74, 0.25);
  border-color: #4ade80;
}

.order-details {
  flex: 1;
}

.order-details h3 {
  color: #15803d;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.order-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  color: #1f2937;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.info-item i {
  color: #15803d;
}

.order-price {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-width: 120px;
}

.price-amount {
  color: #15803d;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
}

.price-amount .currency {
  color: #15803d;
  font-size: 1rem;
}

.price-amount .amount {
  color: #15803d;
  font-size: 1.5rem;
  font-weight: 600;
}

.price-amount .unit {
  color: #4b5563;
  font-size: 0.875rem;
  margin-left: 0.25rem;
}

.order-price .order-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 120px;
}

.order-actions .el-button {
  width: 120px !important;  /* 统一按钮宽度 */
  height: 32px !important;  /* 统一按钮高度 */
  padding: 0 12px !important;  /* 统一内边距 */
  font-size: 14px !important;  /* 统一字体大小 */
  border-radius: 4px !important;  /* 统一圆角 */
  margin: 0 !important;  /* 移除默认边距 */
}

.el-button--primary {
  background-color: #15803d;
  border-color: #15803d;
}

.el-button--primary:hover {
  background-color: #166534;
  border-color: #166534;
}

.el-button--success {
  background-color: #15803d;
  border-color: #15803d;
}

.el-button--success:hover {
  background-color: #166534;
  border-color: #166534;
}

.el-button--danger {
  background-color: #b91c1c;
  border-color: #b91c1c;
}

.el-button--danger:hover {
  background-color: #991b1b;
  border-color: #991b1b;
}

.el-button--warning {
  background-color: #d97706;
  border-color: #d97706;
}

.el-button--warning:hover {
  background-color: #b45309;
  border-color: #b45309;
}

.el-button--info {
  background-color: #4b5563;
  border-color: #4b5563;
}

.el-button--info:hover {
  background-color: #374151;
  border-color: #374151;
}

.pagination-container {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}

.el-pagination {
  --el-pagination-button-bg-color: white;
  --el-pagination-hover-color: #15803d;
  --el-pagination-button-color: #1f2937;
  --el-pagination-button-disabled-bg-color: white;
  --el-pagination-button-disabled-color: #6b7280;
}

.el-pagination .el-pager li:not(.is-disabled).is-active {
  background-color: #15803d;
  color: white;
}

.el-pagination .el-pager li:not(.is-disabled):hover {
  color: #15803d;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
  
  .filters {
    flex-direction: column;
    padding: 1rem;
  }
  
  .order-content {
    flex-direction: column;
  }
  
  .order-project-image {
    display: none;
  }
  
  .order-info {
    grid-template-columns: 1fr;
  }
  
  .order-price {
    text-align: left;
    margin-top: 1rem;
  }
}
</style>

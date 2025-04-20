<template>
  <div class="order-detail-page w-full h-full flex flex-col">
    <!-- 权限检查 -->
    <permission-check required-permission="order_manage">
      <div class="page-header">
        <div class="title-section">
          <h2 class="page-title">订单详情</h2>
          <span class="page-subtitle">订单号: {{ orderId }}</span>
        </div>
        <div class="action-section">
          <el-button @click="goBack">返回列表</el-button>
          <el-button type="primary" @click="printOrder" icon="Printer">打印订单</el-button>
        </div>
      </div>

      <!-- 加载状态 -->
      <div v-if="loading" class="loading-container">
        <el-skeleton :rows="10" animated />
      </div>

      <!-- 订单详情 -->
      <template v-else-if="order">
        <order-detail 
          :order="order" 
          @update="handleOrderUpdate" 
          @refresh="fetchOrderDetail"
          class="flex-1"
        ></order-detail>
      </template>

      <!-- 订单不存在 -->
      <template v-else>
        <el-result
          icon="error"
          title="订单不存在"
          sub-title="未找到该订单信息，请检查订单号是否正确"
        >
          <template #extra>
            <el-button type="primary" @click="goBack">返回列表</el-button>
          </template>
        </el-result>
      </template>
    </permission-check>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Printer } from '@element-plus/icons-vue'
import { useAdminOrderStore } from '@/store/adminOrder'
import PermissionCheck from '@/components/admin/common/PermissionCheck.vue'
import OrderDetail from '@/components/admin/orders/OrderDetail.vue'

const route = useRoute()
const router = useRouter()
const adminOrderStore = useAdminOrderStore()

// 状态
const loading = ref(false)
const order = ref(null)
const orderId = ref(route.params.id)

// 获取订单详情
const fetchOrderDetail = async () => {
  loading.value = true
  try {
    // 这里应该调用API获取订单详情
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // 模拟数据
    const mockOrders = [
      {
        id: 1,
        orderNumber: 'ORD20230825001',
        projectName: '城市热气球观光之旅',
        projectImage: '/src/assets/images/projects/hot-air-balloon.jpg',
        bookingTime: '2023-08-25 9:00-12:00',
        createTime: '2023-08-15 10:25:36',
        peopleCount: 2,
        contactName: '张三',
        contactPhone: '13812345678',
        status: 'completed',
        amount: 1376,
        payTime: '2023-08-15 10:30:12',
        confirmTime: '2023-08-15 11:05:23',
        completeTime: '2023-08-25 13:15:45'
      },
      {
        id: 2,
        orderNumber: 'ORD20230825002',
        projectName: '直升机空中游览',
        projectImage: '/src/assets/images/projects/helicopter.jpg',
        bookingTime: '2023-08-26 13:00-17:00',
        createTime: '2023-08-15 14:30:22',
        peopleCount: 1,
        contactName: '李四',
        contactPhone: '13987654321',
        status: 'booked',
        amount: 1288,
        payTime: '2023-08-15 14:35:18',
        confirmTime: '2023-08-15 15:20:45'
      },
      {
        id: 3,
        orderNumber: 'ORD20230825003',
        projectName: '专业无人机操控体验',
        projectImage: '/src/assets/images/projects/drone.jpg',
        bookingTime: '2023-08-25 15:00-17:00',
        createTime: '2023-08-15 16:45:10',
        peopleCount: 3,
        contactName: '王五',
        contactPhone: '13712345678',
        status: 'pending',
        amount: 1197
      }
    ]
    
    // 查找订单
    const foundOrder = mockOrders.find(o => o.id === parseInt(orderId.value))
    
    if (foundOrder) {
      order.value = foundOrder
    } else {
      order.value = null
      ElMessage.warning('未找到该订单信息')
    }
  } catch (error) {
    ElMessage.error(error.message || '获取订单详情失败')
    order.value = null
  } finally {
    loading.value = false
  }
}

// 处理订单更新
const handleOrderUpdate = (updatedOrder) => {
  order.value = updatedOrder
}

// 返回列表
const goBack = () => {
  router.push('/admin/orders')
}

// 打印订单
const printOrder = () => {
  ElMessage.info('打印功能暂未实现')
}

// 组件挂载时获取订单详情
onMounted(() => {
  fetchOrderDetail()
})
</script>

<style scoped>
.order-detail-page {
  padding: 20px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  max-width: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.title-section {
  display: flex;
  align-items: baseline;
}

.page-title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}

.page-subtitle {
  margin-left: 12px;
  color: #909399;
  font-size: 14px;
}

.loading-container {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  flex: 1;
}
</style>

<template>
  <div class="order-list">
    <!-- 搜索和筛选区域 -->
    <el-card class="filter-card" shadow="hover">
      <el-form :model="filterForm" ref="filterFormRef" :inline="true" class="filter-form">
        <el-form-item label="订单号">
          <el-input v-model="filterForm.keyword" placeholder="订单号/联系人" clearable></el-input>
        </el-form-item>

        <el-form-item label="订单状态">
          <el-select v-model="filterForm.status" placeholder="全部状态" clearable style="width: 160px">
            <el-option label="待支付" value="pending"></el-option>
            <el-option label="已支付" value="paid"></el-option>
            <el-option label="已预约" value="booked"></el-option>
            <el-option label="已完成" value="completed"></el-option>
            <el-option label="已取消" value="cancelled"></el-option>
            <el-option label="退款中" value="refunding"></el-option>
            <el-option label="已退款" value="refunded"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="下单时间">
          <el-date-picker
            v-model="filterForm.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
          ></el-date-picker>
        </el-form-item>

        <el-form-item class="filter-actions">
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="resetFilter">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 订单表格 -->
    <el-card class="table-card" shadow="hover" v-loading="loading">
      <template #header>
        <div class="card-header">
          <span class="header-title">订单列表</span>
          <el-button type="primary" @click="refreshList" icon="Refresh">刷新</el-button>
        </div>
      </template>

      <el-table
        :data="orderList"
        style="width: 100%"
        border
        stripe
        highlight-current-row
        @row-click="handleRowClick"
      >
        <el-table-column type="index" width="50" align="center" label="#"></el-table-column>
        <el-table-column prop="orderNumber" label="订单号" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="projectName" label="项目名称" min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="contactName" label="联系人" width="100"></el-table-column>
        <el-table-column prop="contactPhone" label="联系电话" width="120"></el-table-column>
        <el-table-column prop="bookingTime" label="预约时间" width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="peopleCount" label="人数" width="80" align="center"></el-table-column>
        <el-table-column prop="amount" label="金额" width="100">
          <template #default="{ row }">
            ¥{{ row.amount }}
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="下单时间" width="180"></el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">{{ getStatusText(row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click.stop="viewOrderDetail(row)">
              <el-icon><View /></el-icon>
              详情
            </el-button>

            <el-button type="info" link @click.stop="goToOrderDetail(row)">
              <el-icon><Document /></el-icon>
              单独查看
            </el-button>

            <el-dropdown @command="(command) => handleCommand(command, row)" trigger="click">
              <el-button type="primary" link @click.stop>
                更多<el-icon class="el-icon--right"><ArrowDown /></el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item v-if="canConfirm(row)" command="confirm">确认预约</el-dropdown-item>
                  <el-dropdown-item v-if="canComplete(row)" command="complete">完成订单</el-dropdown-item>
                  <el-dropdown-item v-if="canCancel(row)" command="cancel">取消订单</el-dropdown-item>
                  <el-dropdown-item v-if="canRefund(row)" command="refund">退款处理</el-dropdown-item>
                  <el-dropdown-item divided command="print">打印订单</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          v-model:currentPage="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalOrders"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
        ></el-pagination>
      </div>
    </el-card>

    <!-- 订单详情抽屉 -->
    <el-drawer
      v-model="showOrderDetail"
      title="订单详情"
      direction="rtl"
      size="50%"
    >
      <order-detail
        v-if="currentOrder"
        :order="currentOrder"
        @update="handleOrderUpdate"
        @refresh="refreshList"
      ></order-detail>
    </el-drawer>

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
          <el-button type="primary" @click="confirmCancelOrder" :loading="processing">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { View, ArrowDown, Refresh, Document } from '@element-plus/icons-vue'
import OrderDetail from './OrderDetail.vue'

// 状态
const loading = ref(false)
const processing = ref(false)
const showOrderDetail = ref(false)
const showCancelDialog = ref(false)
const currentOrder = ref(null)
const orderToCancel = ref(null)
const currentPage = ref(1)
const pageSize = ref(10)
const totalOrders = ref(0)
const orderList = ref([])

// 筛选表单
const filterFormRef = ref(null)
const filterForm = reactive({
  keyword: '',
  status: '',
  dateRange: []
})

// 取消订单表单
const cancelForm = reactive({
  reason: '',
  description: ''
})

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
  },
  {
    id: 4,
    orderNumber: 'ORD20230825004',
    projectName: '滑翔伞体验',
    projectImage: '/src/assets/images/projects/paragliding.jpg',
    bookingTime: '2023-08-27 9:00-12:00',
    createTime: '2023-08-16 09:15:30',
    peopleCount: 2,
    contactName: '赵六',
    contactPhone: '13612345678',
    status: 'cancelled',
    amount: 1040,
    payTime: '2023-08-16 09:20:15',
    cancelTime: '2023-08-16 15:30:45',
    cancelReason: 'customer_request',
    cancelDescription: '客户临时有事无法参加'
  },
  {
    id: 5,
    orderNumber: 'ORD20230825005',
    projectName: '动力伞飞行体验',
    projectImage: '/src/assets/images/projects/powered-paragliding.jpg',
    bookingTime: '2023-08-28 13:00-17:00',
    createTime: '2023-08-16 11:25:40',
    peopleCount: 1,
    contactName: '钱七',
    contactPhone: '13512345678',
    status: 'refunding',
    amount: 880,
    payTime: '2023-08-16 11:30:22',
    confirmTime: '2023-08-16 13:15:30',
    refundApplyTime: '2023-08-17 10:20:15',
    refundReason: '天气原因',
    refundAmount: 880,
    refundDescription: '因天气原因无法进行活动，申请全额退款'
  },
  {
    id: 6,
    orderNumber: 'ORD20230825006',
    projectName: '城市热气球观光之旅',
    projectImage: '/src/assets/images/projects/hot-air-balloon.jpg',
    bookingTime: '2023-08-29 9:00-12:00',
    createTime: '2023-08-17 14:35:20',
    peopleCount: 4,
    contactName: '孙八',
    contactPhone: '13412345678',
    status: 'refunded',
    amount: 2752,
    payTime: '2023-08-17 14:40:12',
    confirmTime: '2023-08-17 15:30:45',
    refundApplyTime: '2023-08-18 09:15:30',
    refundTime: '2023-08-18 11:25:40',
    refundReason: '个人原因',
    refundAmount: 2752,
    refundDescription: '因个人原因无法参加，申请全额退款'
  },
  {
    id: 7,
    orderNumber: 'ORD20230825007',
    projectName: '直升机空中游览',
    projectImage: '/src/assets/images/projects/helicopter.jpg',
    bookingTime: '2023-08-30 13:00-17:00',
    createTime: '2023-08-18 10:15:30',
    peopleCount: 2,
    contactName: '周九',
    contactPhone: '13312345678',
    status: 'paid',
    amount: 2576,
    payTime: '2023-08-18 10:20:15'
  }
]

// 获取订单列表
const getOrderList = async () => {
  loading.value = true
  try {
    // 这里应该调用API获取订单列表
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 800))

    // 筛选数据
    let filteredOrders = [...mockOrders]

    // 关键词筛选
    if (filterForm.keyword) {
      const keyword = filterForm.keyword.toLowerCase()
      filteredOrders = filteredOrders.filter(order =>
        order.orderNumber.toLowerCase().includes(keyword) ||
        order.contactName.toLowerCase().includes(keyword) ||
        order.contactPhone.includes(keyword)
      )
    }

    // 状态筛选
    if (filterForm.status) {
      filteredOrders = filteredOrders.filter(order => order.status === filterForm.status)
    }

    // 日期筛选
    if (filterForm.dateRange && filterForm.dateRange.length === 2) {
      const startDate = new Date(filterForm.dateRange[0])
      const endDate = new Date(filterForm.dateRange[1])
      endDate.setHours(23, 59, 59, 999) // 设置为当天结束时间

      filteredOrders = filteredOrders.filter(order => {
        const orderDate = new Date(order.createTime)
        return orderDate >= startDate && orderDate <= endDate
      })
    }

    // 计算分页
    totalOrders.value = filteredOrders.length

    // 分页处理
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    orderList.value = filteredOrders.slice(start, end)

  } catch (error) {
    ElMessage.error(error.message || '获取订单列表失败')
  } finally {
    loading.value = false
  }
}

// 搜索处理
const handleSearch = () => {
  currentPage.value = 1 // 重置到第一页
  getOrderList()
}

// 重置筛选
const resetFilter = () => {
  filterFormRef.value.resetFields()
  currentPage.value = 1
  getOrderList()
}

// 分页处理
const handleSizeChange = (newSize) => {
  pageSize.value = newSize
  getOrderList()
}

const handleCurrentChange = (newPage) => {
  currentPage.value = newPage
  getOrderList()
}

// 刷新列表
const refreshList = () => {
  getOrderList()
}

const router = useRouter()

// 查看订单详情
const viewOrderDetail = (order) => {
  // 弹出抽屉显示详情
  currentOrder.value = order
  showOrderDetail.value = true
}

// 跳转到订单详情页面
const goToOrderDetail = (order) => {
  router.push(`/admin/orders/detail/${order.id}`)
}

// 处理行点击
const handleRowClick = (row) => {
  viewOrderDetail(row)
}

// 处理下拉菜单命令
const handleCommand = (command, row) => {
  switch (command) {
    case 'confirm':
      confirmOrder(row)
      break
    case 'complete':
      completeOrder(row)
      break
    case 'cancel':
      showCancelDialog.value = true
      orderToCancel.value = row
      break
    case 'refund':
      viewOrderDetail(row)
      // 在详情页面中切换到退款处理选项卡
      break
    case 'print':
      printOrder(row)
      break
  }
}

// 确认订单
const confirmOrder = async (order) => {
  try {
    processing.value = true

    // 这里应该调用API确认订单
    await new Promise(resolve => setTimeout(resolve, 1000))

    // 模拟成功响应
    const updatedOrder = {
      ...order,
      status: 'booked',
      confirmTime: new Date().toISOString().replace('T', ' ').substring(0, 19)
    }

    // 更新本地数据
    updateOrderInList(updatedOrder)

    ElMessage.success('订单已确认')
  } catch (error) {
    ElMessage.error(error.message || '操作失败')
  } finally {
    processing.value = false
  }
}

// 完成订单
const completeOrder = async (order) => {
  try {
    processing.value = true

    // 这里应该调用API完成订单
    await new Promise(resolve => setTimeout(resolve, 1000))

    // 模拟成功响应
    const updatedOrder = {
      ...order,
      status: 'completed',
      completeTime: new Date().toISOString().replace('T', ' ').substring(0, 19)
    }

    // 更新本地数据
    updateOrderInList(updatedOrder)

    ElMessage.success('订单已完成')
  } catch (error) {
    ElMessage.error(error.message || '操作失败')
  } finally {
    processing.value = false
  }
}

// 确认取消订单
const confirmCancelOrder = async () => {
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
      ...orderToCancel.value,
      status: 'cancelled',
      cancelTime: new Date().toISOString().replace('T', ' ').substring(0, 19),
      cancelReason: cancelForm.reason,
      cancelDescription: cancelForm.description
    }

    // 更新本地数据
    updateOrderInList(updatedOrder)

    ElMessage.success('订单已取消')
    showCancelDialog.value = false

    // 如果当前正在查看该订单的详情，也更新详情中的数据
    if (currentOrder.value && currentOrder.value.id === updatedOrder.id) {
      currentOrder.value = updatedOrder
    }
  } catch (error) {
    ElMessage.error(error.message || '操作失败')
  } finally {
    processing.value = false
  }
}

// 打印订单
const printOrder = (order) => {
  ElMessage.info('打印功能暂未实现')
}

// 更新列表中的订单数据
const updateOrderInList = (updatedOrder) => {
  const index = orderList.value.findIndex(order => order.id === updatedOrder.id)
  if (index > -1) {
    orderList.value[index] = updatedOrder
  }
}

// 处理订单更新
const handleOrderUpdate = (updatedOrder) => {
  updateOrderInList(updatedOrder)
}

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

// 是否可以确认订单
const canConfirm = (order) => {
  return order.status === 'pending' || order.status === 'paid'
}

// 是否可以完成订单
const canComplete = (order) => {
  return order.status === 'booked'
}

// 是否可以取消订单
const canCancel = (order) => {
  return ['pending', 'paid', 'booked'].includes(order.status)
}

// 是否可以退款
const canRefund = (order) => {
  return ['paid', 'booked'].includes(order.status)
}

// 组件挂载时获取订单列表
onMounted(() => {
  getOrderList()
})
</script>

<style scoped>
.order-list {
  width: 100%;
}

.filter-card {
  margin-bottom: 20px;
}

.filter-form {
  display: flex;
  flex-wrap: wrap;
}

.filter-actions {
  margin-left: auto;
}

.table-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-title {
  font-size: 16px;
  font-weight: bold;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.w-full {
  width: 100%;
}
</style>

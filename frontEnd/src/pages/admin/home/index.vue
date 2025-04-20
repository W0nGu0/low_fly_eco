<template>
  <div class="admin-home-container">
    <div class="welcome-section">
      <h2>欢迎使用低空飞行体验管理系统</h2>
      <p>今天是 {{ currentDate }}，{{ greeting }}</p>
    </div>

    <el-row :gutter="20" class="stat-cards">
      <el-col :span="6" v-for="(card, index) in statCards" :key="index">
        <el-card shadow="hover" class="stat-card">
          <div class="card-content">
            <div class="card-icon" :style="{ backgroundColor: card.color }">
              <i :class="card.icon"></i>
            </div>
            <div class="card-info">
              <div class="card-value">{{ card.value }}</div>
              <div class="card-title">{{ card.title }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="chart-section">
      <el-col :span="12">
        <el-card shadow="hover" class="chart-card">
          <template #header>
            <div class="card-header">
              <span>订单统计</span>
              <el-radio-group v-model="orderChartTimeRange" size="small">
                <el-radio-button label="week">本周</el-radio-button>
                <el-radio-button label="month">本月</el-radio-button>
                <el-radio-button label="year">本年</el-radio-button>
              </el-radio-group>
            </div>
          </template>
          <div class="chart-placeholder">订单数据图表占位</div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover" class="chart-card">
          <template #header>
            <div class="card-header">
              <span>项目分类统计</span>
            </div>
          </template>
          <div class="chart-placeholder">项目分类饼图占位</div>
        </el-card>
      </el-col>
    </el-row>

    <el-card shadow="hover" class="recent-orders-card">
      <template #header>
        <div class="card-header">
          <span>最近订单</span>
          <el-button type="text" @click="viewAllOrders">查看全部</el-button>
        </div>
      </template>
      <el-table :data="recentOrders" style="width: 100%" stripe>
        <el-table-column prop="orderNumber" label="订单号" width="180"></el-table-column>
        <el-table-column prop="projectName" label="项目名称"></el-table-column>
        <el-table-column prop="contactName" label="联系人" width="120"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180"></el-table-column>
        <el-table-column prop="amount" label="金额" width="120">
          <template #default="scope">
            <span>¥{{ scope.row.amount }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="120">
          <template #default="scope">
            <el-tag :type="getStatusType(scope.row.status)">
              {{ getStatusText(scope.row.status) }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const orderChartTimeRange = ref('week')

// 当前日期和问候语
const currentDate = computed(() => {
  const date = new Date()
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
})

const greeting = computed(() => {
  const hour = new Date().getHours()
  if (hour < 6) return '凌晨好'
  if (hour < 9) return '早上好'
  if (hour < 12) return '上午好'
  if (hour < 14) return '中午好'
  if (hour < 17) return '下午好'
  if (hour < 19) return '傍晚好'
  if (hour < 22) return '晚上好'
  return '夜深了，注意休息'
})

// 统计卡片数据
const statCards = [
  {
    title: '今日订单',
    value: 12,
    icon: 'el-icon-s-order',
    color: '#409EFF'
  },
  {
    title: '本月收入',
    value: '¥15,680',
    icon: 'el-icon-money',
    color: '#67C23A'
  },
  {
    title: '活跃项目',
    value: 6,
    icon: 'el-icon-s-goods',
    color: '#E6A23C'
  },
  {
    title: '总用户数',
    value: 258,
    icon: 'el-icon-user',
    color: '#F56C6C'
  }
]

// 最近订单数据
const recentOrders = [
  {
    orderNumber: 'ORD20230815001',
    projectName: '城市热气球观光之旅',
    contactName: '张三',
    createTime: '2023-08-10 14:32:45',
    amount: 1376,
    status: 'completed'
  },
  {
    orderNumber: 'ORD20230820002',
    projectName: '直升机空中游览',
    contactName: '张三',
    createTime: '2023-08-12 09:15:22',
    amount: 1280,
    status: 'booked'
  },
  {
    orderNumber: 'ORD20230825003',
    projectName: '专业无人机操控体验',
    contactName: '张三',
    createTime: '2023-08-15 16:45:10',
    amount: 1197,
    status: 'pending'
  },
  {
    orderNumber: 'ORD20230826004',
    projectName: '海岸线滑翔伞体验',
    contactName: '李四',
    createTime: '2023-08-16 10:22:33',
    amount: 1760,
    status: 'cancelled'
  },
  {
    orderNumber: 'ORD20230826005',
    projectName: '山地动力伞飞行',
    contactName: '王五',
    createTime: '2023-08-17 14:05:18',
    amount: 2200,
    status: 'booked'
  }
]

// 订单状态处理函数
const getStatusType = (status) => {
  const statusMap = {
    pending: 'warning',
    booked: 'primary',
    completed: 'success',
    cancelled: 'info'
  }
  return statusMap[status] || 'info'
}

const getStatusText = (status) => {
  const statusMap = {
    pending: '待支付',
    booked: '已预约',
    completed: '已完成',
    cancelled: '已取消'
  }
  return statusMap[status] || '未知'
}

// 查看所有订单
const viewAllOrders = () => {
  router.push('/admin/orders')
}
</script>

<style scoped>
.admin-home-container {
  padding: 20px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  max-width: 100%;
}

.welcome-section {
  margin-bottom: 24px;
}

.welcome-section h2 {
  margin: 0 0 8px 0;
  font-size: 24px;
  color: #303133;
}

.welcome-section p {
  margin: 0;
  color: #606266;
  font-size: 14px;
}

.stat-cards {
  margin-bottom: 24px;
}

.stat-card {
  height: 100%;
}

.card-content {
  display: flex;
  align-items: center;
}

.card-icon {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
}

.card-icon i {
  font-size: 24px;
  color: #fff;
}

.card-info {
  flex: 1;
}

.card-value {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 4px;
}

.card-title {
  font-size: 14px;
  color: #909399;
}

.chart-section {
  margin-bottom: 24px;
}

.chart-card {
  height: 350px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chart-placeholder {
  height: 280px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #909399;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.recent-orders-card {
  margin-bottom: 24px;
}
</style>
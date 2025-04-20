<template>
  <div class="order-statistics-page w-full h-full flex flex-col">
    <!-- 权限检查 -->
    <permission-check required-permission="order_manage">
      <div class="page-header">
        <div class="title-section">
          <h2 class="page-title">订单统计</h2>
          <span class="page-subtitle">查看订单数据统计和分析</span>
        </div>
        <div class="action-section">
          <el-radio-group v-model="timeRange" size="default">
            <el-radio-button label="week">本周</el-radio-button>
            <el-radio-button label="month">本月</el-radio-button>
            <el-radio-button label="year">全年</el-radio-button>
          </el-radio-group>
          <el-button type="primary" @click="exportStatistics" icon="Download" class="ml-4">导出统计</el-button>
        </div>
      </div>

      <!-- 统计卡片 -->
      <el-row :gutter="20" class="stat-cards">
        <el-col :xs="24" :sm="12" :md="6" v-for="(card, index) in statCards" :key="index">
          <el-card shadow="hover" class="stat-card">
            <div class="card-content">
              <div class="card-icon" :style="{ backgroundColor: card.color }">
                <i :class="card.icon"></i>
              </div>
              <div class="card-info">
                <div class="card-value">{{ card.value }}</div>
                <div class="card-title">{{ card.title }}</div>
                <div class="card-change" v-if="card.change">
                  <span :class="card.trend === 'up' ? 'text-success' : card.trend === 'down' ? 'text-danger' : ''">
                    <i :class="card.trend === 'up' ? 'el-icon-top' : card.trend === 'down' ? 'el-icon-bottom' : ''"></i>
                    {{ card.change }}%
                  </span>
                  <span class="text-muted">较上期</span>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <!-- 图表区域 -->
      <el-row :gutter="20" class="chart-row">
        <!-- 订单趋势图 -->
        <el-col :xs="24" :lg="16">
          <el-card class="chart-card" shadow="hover">
            <template #header>
              <div class="chart-header">
                <span>订单趋势</span>
                <el-select v-model="orderTrendType" size="small" style="width: 120px">
                  <el-option label="订单数量" value="count"></el-option>
                  <el-option label="订单金额" value="amount"></el-option>
                </el-select>
              </div>
            </template>
            <div class="chart-container">
              <!-- 这里放置订单趋势图表，实际项目中可以使用 ECharts 等库 -->
              <div class="placeholder-chart">
                <div class="chart-line" v-for="i in 8" :key="i"
                     :style="{ '--height': Math.random() * 60 + 20 + 'px', animationDelay: i * 0.1 + 's' }"></div>
              </div>
            </div>
          </el-card>
        </el-col>

        <!-- 项目占比图 -->
        <el-col :xs="24" :lg="8">
          <el-card class="chart-card" shadow="hover">
            <template #header>
              <div class="chart-header">
                <span>项目占比</span>
                <el-select v-model="projectChartType" size="small" style="width: 120px">
                  <el-option label="按订单量" value="count"></el-option>
                  <el-option label="按收入" value="amount"></el-option>
                </el-select>
              </div>
            </template>
            <div class="chart-container">
              <!-- 这里放置项目占比图表，实际项目中可以使用 ECharts 等库 -->
              <div class="placeholder-pie">
                <div class="pie-segment" v-for="(item, i) in pieData" :key="i"
                     :style="{
                       backgroundColor: item.color,
                       width: item.value + '%',
                       height: item.value + '%',
                       animationDelay: i * 0.1 + 's'
                     }"></div>
                <div class="pie-center">100%</div>
              </div>
              <div class="pie-legend">
                <div v-for="(item, i) in pieData" :key="i" class="legend-item">
                  <span class="legend-color" :style="{ backgroundColor: item.color }"></span>
                  <span class="legend-name">{{ item.name }}</span>
                  <span class="legend-value">{{ item.value }}%</span>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <!-- 订单状态分布 -->
      <el-row :gutter="20" class="chart-row">
        <el-col :span="24">
          <el-card class="chart-card" shadow="hover">
            <template #header>
              <div class="chart-header">
                <span>订单状态分布</span>
              </div>
            </template>
            <div class="status-distribution">
              <div v-for="(item, index) in statusDistribution" :key="index" class="status-item">
                <div class="status-name">
                  <el-tag :type="getStatusType(item.status)">{{ item.name }}</el-tag>
                </div>
                <div class="status-bar-container">
                  <div class="status-bar" :style="{ width: item.percentage + '%', backgroundColor: getStatusColor(item.status) }"></div>
                </div>
                <div class="status-value">{{ item.count }} ({{ item.percentage }}%)</div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <!-- 热门项目排行 -->
      <el-row :gutter="20" class="chart-row">
        <el-col :span="24">
          <el-card class="chart-card" shadow="hover">
            <template #header>
              <div class="chart-header">
                <span>热门项目排行</span>
                <el-select v-model="popularProjectType" size="small" style="width: 120px">
                  <el-option label="按订单量" value="count"></el-option>
                  <el-option label="按收入" value="amount"></el-option>
                </el-select>
              </div>
            </template>
            <el-table :data="popularProjects" style="width: 100%" :header-cell-style="{ background: '#f5f7fa' }">
              <el-table-column type="index" width="50" align="center" label="排名"></el-table-column>
              <el-table-column prop="name" label="项目名称" min-width="200"></el-table-column>
              <el-table-column prop="category" label="分类" width="120"></el-table-column>
              <el-table-column prop="orderCount" label="订单数" width="100" sortable></el-table-column>
              <el-table-column prop="totalAmount" label="总收入" width="120" sortable>
                <template #default="{ row }">
                  ¥{{ row.totalAmount }}
                </template>
              </el-table-column>
              <el-table-column label="占比" width="200">
                <template #default="{ row }">
                  <el-progress
                    :percentage="row.percentage"
                    :color="row.color"
                    :stroke-width="10"
                    :show-text="false">
                  </el-progress>
                  <span class="percentage-text">{{ row.percentage }}%</span>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
    </permission-check>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { Download } from '@element-plus/icons-vue'
import { useAdminOrderStore } from '@/store/adminOrder'
import PermissionCheck from '@/components/admin/common/PermissionCheck.vue'

// 状态
const timeRange = ref('month')
const orderTrendType = ref('count')
const projectChartType = ref('amount')
const popularProjectType = ref('amount')

// 统计卡片数据
const statCards = ref([
  {
    title: '总订单数',
    value: '265',
    change: '12.5',
    trend: 'up',
    icon: 'el-icon-s-order',
    color: '#409EFF'
  },
  {
    title: '总收入',
    value: '¥158,345',
    change: '8.2',
    trend: 'up',
    icon: 'el-icon-money',
    color: '#67C23A'
  },
  {
    title: '完成率',
    value: '85.3%',
    change: '3.1',
    trend: 'up',
    icon: 'el-icon-check',
    color: '#E6A23C'
  },
  {
    title: '退款率',
    value: '2.5%',
    change: '0.8',
    trend: 'down',
    icon: 'el-icon-back',
    color: '#F56C6C'
  }
])

// 饼图数据
const pieData = ref([
  {
    name: '热气球',
    value: 45,
    color: '#409EFF'
  },
  {
    name: '直升机',
    value: 25,
    color: '#67C23A'
  },
  {
    name: '无人机',
    value: 15,
    color: '#E6A23C'
  },
  {
    name: '其他',
    value: 15,
    color: '#F56C6C'
  }
])

// 订单状态分布
const statusDistribution = ref([
  {
    status: 'completed',
    name: '已完成',
    count: 156,
    percentage: 58.9
  },
  {
    status: 'booked',
    name: '已预约',
    count: 68,
    percentage: 25.7
  },
  {
    status: 'pending',
    name: '待支付',
    count: 22,
    percentage: 8.3
  },
  {
    status: 'cancelled',
    name: '已取消',
    count: 12,
    percentage: 4.5
  },
  {
    status: 'refunded',
    name: '已退款',
    count: 7,
    percentage: 2.6
  }
])

// 热门项目排行
const popularProjects = ref([
  {
    name: '城市热气球观光之旅',
    category: '热气球观光',
    orderCount: 78,
    totalAmount: 53664,
    percentage: 33.9,
    color: '#409EFF'
  },
  {
    name: '直升机空中游览',
    category: '直升机游览',
    orderCount: 56,
    totalAmount: 72128,
    percentage: 45.5,
    color: '#67C23A'
  },
  {
    name: '专业无人机操控体验',
    category: '无人机体验',
    orderCount: 45,
    totalAmount: 17460,
    percentage: 11.0,
    color: '#E6A23C'
  },
  {
    name: '滑翔伞体验',
    category: '滑翔伞',
    orderCount: 32,
    totalAmount: 9984,
    percentage: 6.3,
    color: '#F56C6C'
  },
  {
    name: '动力伞飞行体验',
    category: '动力伞',
    orderCount: 28,
    totalAmount: 5109,
    percentage: 3.2,
    color: '#909399'
  }
])

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

// 获取状态颜色
const getStatusColor = (status) => {
  const colorMap = {
    'pending': '#909399',
    'paid': '#E6A23C',
    'booked': '#409EFF',
    'completed': '#67C23A',
    'cancelled': '#F56C6C',
    'refunding': '#E6A23C',
    'refunded': '#909399'
  }
  return colorMap[status] || '#909399'
}

// 导出统计
const exportStatistics = () => {
  ElMessage.info('导出功能暂未实现')
}

// 组件挂载时获取统计数据
onMounted(() => {
  // 这里应该调用API获取统计数据
})
</script>

<style scoped>
.order-statistics-page {
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

.ml-4 {
  margin-left: 16px;
}

.stat-cards {
  margin-bottom: 20px;
}

.stat-card {
  margin-bottom: 20px;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.card-content {
  display: flex;
  align-items: center;
  padding: 10px;
}

.card-icon {
  width: 64px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin-right: 15px;
}

.card-icon i {
  font-size: 32px;
  color: white;
}

.card-info {
  flex: 1;
}

.card-title {
  font-size: 14px;
  color: #909399;
  margin-bottom: 5px;
}

.card-value {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
}

.card-change {
  font-size: 12px;
}

.text-success {
  color: #67C23A;
}

.text-danger {
  color: #F56C6C;
}

.text-muted {
  color: #909399;
  margin-left: 5px;
}

.chart-row {
  margin-bottom: 20px;
}

.chart-card {
  height: 350px;
  margin-bottom: 20px;
  border-radius: 8px;
  overflow: hidden;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chart-container {
  padding: 15px;
  height: calc(100% - 30px);
  width: 100%;
}

.placeholder-chart {
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  padding: 0 10px;
}

.chart-line {
  width: 40px;
  background: linear-gradient(to top, #409EFF, #a0cfff);
  border-radius: 4px 4px 0 0;
  animation: growUp 1s ease-out forwards;
}

.placeholder-pie {
  width: 160px;
  height: 160px;
  position: relative;
  border-radius: 50%;
  margin: 0 auto 30px;
  overflow: hidden;
  background-color: #f5f7fa;
}

.pie-segment {
  position: absolute;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: scaleIn 0.8s ease-out forwards;
}

.pie-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  color: #409EFF;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.pie-legend {
  display: flex;
  flex-direction: column;
  padding-left: 20px;
}

.legend-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  margin-right: 8px;
}

.legend-name {
  flex: 1;
  font-size: 14px;
}

.legend-value {
  font-weight: bold;
  font-size: 14px;
}

.status-distribution {
  padding: 20px;
}

.status-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.status-name {
  width: 100px;
  margin-right: 15px;
}

.status-bar-container {
  flex: 1;
  height: 20px;
  background-color: #f5f7fa;
  border-radius: 10px;
  overflow: hidden;
  margin-right: 15px;
}

.status-bar {
  height: 100%;
  border-radius: 10px;
  transition: width 1s ease-out;
}

.status-value {
  width: 120px;
  text-align: right;
  font-weight: bold;
}

.percentage-text {
  margin-left: 8px;
  font-size: 12px;
  color: #606266;
}

/* 动画效果 */
@keyframes growUp {
  from {
    height: 0;
  }
  to {
    height: var(--height);
  }
}

@keyframes scaleIn {
  from {
    transform: translate(-50%, -50%) scale(0);
  }
  to {
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>

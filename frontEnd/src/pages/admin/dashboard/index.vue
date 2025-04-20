<template>
  <div class="dashboard-container w-full h-full flex flex-col">
    <el-row :gutter="20" class="animate__animated animate__fadeIn w-full">
      <el-col :xs="24" :sm="12" :md="6" v-for="(card, index) in cardData" :key="index">
        <el-card class="dashboard-card" shadow="hover"
                 :style="{ 'animation-delay': index * 0.1 + 's' }">
          <div class="dashboard-card-content">
            <div class="card-icon" :style="{ backgroundColor: card.color }">
              <i :class="card.icon"></i>
            </div>
            <div class="card-info">
              <div class="card-title">{{ card.title }}</div>
              <div class="card-value">{{ card.value }}</div>
              <div class="card-change">
                <span :class="card.trend === 'up' ? 'text-success' : card.trend === 'down' ? 'text-danger' : ''">
                  <i :class="card.trend === 'up' ? 'el-icon-top' : card.trend === 'down' ? 'el-icon-bottom' : ''"></i>
                  {{ card.change }}%
                </span>
                <span class="text-muted">较上周</span>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="chart-row animate__animated animate__fadeIn w-full">
      <!-- 订单趋势图 -->
      <el-col :xs="24" :lg="16">
        <el-card class="chart-card" shadow="hover">
          <template #header>
            <div class="chart-header">
              <span>订单趋势</span>
              <el-radio-group v-model="timeRange" size="small">
                <el-radio-button label="week">本周</el-radio-button>
                <el-radio-button label="month">本月</el-radio-button>
                <el-radio-button label="year">全年</el-radio-button>
              </el-radio-group>
            </div>
          </template>
          <div class="chart-container">
            <!-- 这里放置订单趋势图表，实际项目中可以使用 ECharts 等库 -->
            <div class="placeholder-chart">
              <div class="chart-line" v-for="i in 8" :key="i"
                   :style="{ height: Math.random() * 60 + 20 + 'px', animationDelay: i * 0.1 + 's' }"></div>
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
              <el-dropdown>
                <span class="el-dropdown-link">
                  按收入<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>按收入</el-dropdown-item>
                    <el-dropdown-item>按订单量</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
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
              <div class="pie-center">{{ totalValue }}%</div>
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

    <el-row :gutter="20" class="animate__animated animate__fadeIn w-full" style="animation-delay: 0.3s">
      <!-- 最新订单 -->
      <el-col :xs="24" :lg="12">
        <el-card class="list-card" shadow="hover">
          <template #header>
            <div class="chart-header">
              <span>最新订单</span>
              <el-button type="text" size="small">查看全部</el-button>
            </div>
          </template>
          <div class="list-container">
            <el-table :data="latestOrders" style="width: 100%" :header-cell-style="{ background: '#f5f7fa' }" fit>
              <el-table-column prop="id" label="订单ID" width="80"></el-table-column>
              <el-table-column prop="customerName" label="客户"></el-table-column>
              <el-table-column prop="projectName" label="项目"></el-table-column>
              <el-table-column prop="amount" label="金额" width="90">
                <template #default="scope">
                  <span class="text-primary">¥{{ scope.row.amount }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="status" label="状态" width="90">
                <template #default="scope">
                  <el-tag :type="getStatusType(scope.row.status)" size="small">
                    {{ scope.row.status }}
                  </el-tag>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>

      <!-- 最新评价 -->
      <el-col :xs="24" :lg="12">
        <el-card class="list-card" shadow="hover">
          <template #header>
            <div class="chart-header">
              <span>最新评价</span>
              <el-button type="text" size="small">查看全部</el-button>
            </div>
          </template>
          <div class="list-container">
            <div v-for="(review, index) in latestReviews" :key="index" class="review-item">
              <div class="review-header">
                <div class="user-info">
                  <el-avatar :size="32" :src="review.avatar"></el-avatar>
                  <span class="username">{{ review.username }}</span>
                </div>
                <div class="review-rating">
                  <el-rate v-model="review.rating" disabled text-color="#ff9900"></el-rate>
                </div>
              </div>
              <div class="review-content">{{ review.content }}</div>
              <div class="review-footer">
                <span class="project-name">{{ review.projectName }}</span>
                <span class="review-time">{{ review.time }}</span>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getImageUrl } from '@/utils/imageHelper';

// 卡片数据
const cardData = ref([
  {
    title: '总收入',
    value: '¥158,345',
    change: '12.5',
    trend: 'up',
    icon: 'el-icon-money',
    color: '#409EFF'
  },
  {
    title: '订单数',
    value: '265',
    change: '8.2',
    trend: 'up',
    icon: 'el-icon-s-order',
    color: '#67C23A'
  },
  {
    title: '用户数',
    value: '3,421',
    change: '3.1',
    trend: 'up',
    icon: 'el-icon-user',
    color: '#E6A23C'
  },
  {
    title: '项目数',
    value: '16',
    change: '0',
    trend: 'flat',
    icon: 'el-icon-s-goods',
    color: '#F56C6C'
  }
]);

// 图表数据
const timeRange = ref('month');
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
]);

const totalValue = ref(100);

// 最新订单
const latestOrders = ref([
  {
    id: 'OR2305',
    customerName: '张先生',
    projectName: '热气球观光之旅',
    amount: 688,
    status: '已支付'
  },
  {
    id: 'OR2304',
    customerName: '李女士',
    projectName: '直升机空中游览',
    amount: 1280,
    status: '已完成'
  },
  {
    id: 'OR2303',
    customerName: '王先生',
    projectName: '无人机操控体验',
    amount: 399,
    status: '已取消'
  },
  {
    id: 'OR2302',
    customerName: '赵女士',
    projectName: '热气球观光之旅',
    amount: 688,
    status: '待支付'
  },
  {
    id: 'OR2301',
    customerName: '刘先生',
    projectName: '直升机空中游览',
    amount: 1280,
    status: '已支付'
  }
]);

// 最新评价
const latestReviews = ref([
  {
    username: '张先生',
    avatar: getImageUrl('@/assets/images/users/user1.jpg'),
    rating: 5,
    content: '体验非常棒！风景优美，服务周到，值得推荐。',
    projectName: '热气球观光之旅',
    time: '2小时前'
  },
  {
    username: '李女士',
    avatar: getImageUrl('@/assets/images/users/user2.jpg'),
    rating: 4,
    content: '整体不错，就是时间有点短，希望能延长一点。',
    projectName: '直升机空中游览',
    time: '5小时前'
  },
  {
    username: '王先生',
    avatar: getImageUrl('@/assets/images/users/user1.jpg'),
    rating: 5,
    content: '教练很专业，无人机操作很有趣，学到了很多东西。',
    projectName: '无人机操控体验',
    time: '1天前'
  }
]);

// 获取状态类型
function getStatusType(status) {
  const map = {
    '已支付': 'warning',
    '已完成': 'success',
    '已取消': 'danger',
    '待支付': 'info'
  };
  return map[status] || 'info';
}
</script>

<style scoped>
.dashboard-container {
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

.dashboard-card {
  margin-bottom: 20px;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s;
  animation: fadeInUp 0.5s;
}

.dashboard-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.dashboard-card-content {
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
  animation: fadeInUp 0.5s;
  animation-delay: 0.2s;
}

.chart-card {
  height: 350px;
  margin-bottom: 20px;
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
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

.list-card {
  height: 350px;
  margin-bottom: 20px;
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
}

.list-container {
  height: calc(100% - 30px);
  overflow-y: auto;
}

.review-item {
  padding: 15px 0;
  border-bottom: 1px solid #EBEEF5;
}

.review-item:last-child {
  border-bottom: none;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.user-info {
  display: flex;
  align-items: center;
}

.username {
  margin-left: 10px;
  font-weight: bold;
}

.review-content {
  font-size: 14px;
  color: #606266;
  margin-bottom: 10px;
  line-height: 1.5;
}

.review-footer {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #909399;
}

.project-name {
  color: #409EFF;
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

/* 响应式调整 */
@media (max-width: 768px) {
  .pie-legend {
    padding-left: 0;
    margin-top: 20px;
  }

  .placeholder-pie {
    width: 120px;
    height: 120px;
  }

  .pie-center {
    width: 60px;
    height: 60px;
    font-size: 14px;
  }
}
</style>

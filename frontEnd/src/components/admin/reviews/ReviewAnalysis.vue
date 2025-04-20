<template>
  <div class="review-analysis-container">
    <!-- 筛选条件 -->
    <div class="filter-container">
      <el-form :inline="true" :model="filterForm" class="filter-form">
        <el-form-item label="时间范围">
          <el-date-picker
            v-model="filterForm.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="YYYY-MM-DD"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="项目">
          <el-select v-model="filterForm.projectId" placeholder="全部项目" clearable>
            <el-option
              v-for="item in projectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">分析</el-button>
          <el-button @click="resetFilter">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 数据分析卡片 -->
    <el-row :gutter="20" class="stat-cards">
      <el-col :span="6" v-for="(card, index) in statCards" :key="index">
        <el-card shadow="hover" class="stat-card">
          <div class="card-content">
            <div class="card-icon" :style="{ backgroundColor: card.color }">
              <el-icon><component :is="card.icon" /></el-icon>
            </div>
            <div class="card-info">
              <div class="card-value">{{ card.value }}</div>
              <div class="card-title">{{ card.title }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 评分分布和趋势图表 -->
    <el-row :gutter="20" class="chart-row">
      <el-col :span="12">
        <el-card shadow="hover" class="chart-card">
          <template #header>
            <div class="chart-header">
              <span>评分分布</span>
            </div>
          </template>
          <div class="chart-container">
            <div class="rating-distribution">
              <div v-for="i in 5" :key="i" class="rating-level">
                <span class="star-label">{{ 6-i }}星</span>
                <div class="progress-container">
                  <el-progress 
                    :percentage="ratingDistribution[5-i]" 
                    :stroke-width="20" 
                    :color="getRatingColor(6-i)"
                  >
                    <span class="progress-label">{{ ratingDistribution[5-i] }}%</span>
                  </el-progress>
                </div>
                <span class="count-label">{{ ratingCounts[5-i] }}条</span>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover" class="chart-card">
          <template #header>
            <div class="chart-header">
              <span>评分趋势</span>
              <el-radio-group v-model="trendTimeRange" size="small">
                <el-radio-button label="week">周</el-radio-button>
                <el-radio-button label="month">月</el-radio-button>
                <el-radio-button label="year">年</el-radio-button>
              </el-radio-group>
            </div>
          </template>
          <div class="chart-container">
            <div class="line-chart-container">
              <!-- 纵轴 -->
              <div class="y-axis">
                <div class="y-axis-label" v-for="(value, index) in 6" :key="'y-'+index">
                  {{ 5 - index }}
                </div>
              </div>
              
              <!-- 图表主体 -->
              <div class="chart-body">
                <!-- 网格线 -->
                <div class="grid-lines">
                  <div class="grid-line" v-for="i in 5" :key="'grid-'+i"></div>
                </div>
                
                <!-- 折线图 -->
                <div class="line-chart">
                  <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <!-- 填充区域 -->
                    <path :d="getChartPathArea()" fill="rgba(64, 158, 255, 0.1)" />
                    <!-- 折线 -->
                    <path :d="getChartPath()" stroke="#409EFF" stroke-width="2" fill="none" />
                    <!-- 数据点 -->
                    <g>
                      <circle v-for="(point, index) in getDataPoints()" :key="'point-'+index"
                        :cx="point.x" :cy="point.y" r="4" fill="#409EFF" stroke="#fff" stroke-width="2"
                        @mouseenter="hoveredPoint = index" @mouseleave="hoveredPoint = -1" />
                    </g>
                  </svg>
                </div>
                
                <!-- 数据点提示 -->
                <div class="data-point-tooltips">
                  <div class="tooltip-container" v-for="(point, index) in getDataPoints()" :key="'tooltip-'+index"
                    :style="{ left: point.x + '%', top: point.y + '%' }">
                    <div class="tooltip" :class="{ 'visible': hoveredPoint === index }">
                      {{ getCurrentLabels()[index] }}: {{ getCurrentData()[index] }}星
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- 横轴 -->
              <div class="x-axis">
                <div class="x-axis-label" v-for="(label, index) in getCurrentLabels()" :key="'x-'+index"
                  :style="{ width: (100 / getCurrentLabels().length) + '%' }">
                  {{ label }}
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 问题分类和标签云 -->
    <el-row :gutter="20" class="chart-row">
      <el-col :span="12">
        <el-card shadow="hover" class="chart-card">
          <template #header>
            <div class="chart-header">
              <span>问题分类</span>
            </div>
          </template>
          <div class="chart-container">
            <div class="issue-categories">
              <div v-for="(item, index) in issueCategories" :key="index" class="issue-category">
                <div class="category-header">
                  <span class="category-name">{{ item.name }}</span>
                  <span class="category-count">{{ item.count }}条</span>
                </div>
                <el-progress 
                  :percentage="item.percentage" 
                  :color="item.color"
                  :stroke-width="15"
                ></el-progress>
                <div class="category-description">{{ item.description }}</div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover" class="chart-card">
          <template #header>
            <div class="chart-header">
              <span>评价标签云</span>
            </div>
          </template>
          <div class="chart-container">
            <div class="tag-cloud">
              <el-tag
                v-for="(tag, index) in tagCloud"
                :key="index"
                :type="getTagType(tag)"
                :effect="tag.count > 10 ? 'dark' : 'plain'"
                :size="getTagSize(tag)"
                class="tag-item"
              >
                {{ tag.name }} ({{ tag.count }})
              </el-tag>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Star, ChatLineRound, View, Warning } from '@element-plus/icons-vue'

// 筛选表单
const filterForm = reactive({
  dateRange: [],
  projectId: null
})

// 项目选项
const projectOptions = ref([
  { value: 1, label: '热气球观光之旅' },
  { value: 2, label: '直升机空中游览' },
  { value: 3, label: '专业无人机操控体验' },
  { value: 4, label: '滑翔伞飞行体验' },
  { value: 5, label: '动力滑翔伞体验' },
  { value: 6, label: '高空跳伞体验' }
])

// 统计卡片数据
const statCards = ref([
  {
    title: '总评价数',
    value: '1,286',
    icon: 'ChatLineRound',
    color: '#409EFF'
  },
  {
    title: '平均评分',
    value: '4.7',
    icon: 'Star',
    color: '#67C23A'
  },
  {
    title: '好评率',
    value: '92%',
    icon: 'View',
    color: '#E6A23C'
  },
  {
    title: '问题数',
    value: '43',
    icon: 'Warning',
    color: '#F56C6C'
  }
])

// 评分分布数据
const ratingDistribution = ref([5, 12, 18, 25, 40])
const ratingCounts = ref([64, 154, 231, 321, 516])

// 评分趋势数据
const trendTimeRange = ref('month')
const hoveredPoint = ref(-1)

const trendData = ref({
  week: {
    labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    ratings: [4.5, 4.7, 4.6, 4.8, 4.9, 4.7, 4.8]
  },
  month: {
    labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    ratings: [4.5, 4.6, 4.7, 4.6, 4.8, 4.9, 4.7, 4.8, 4.7, 4.6, 4.7, 4.8]
  },
  year: {
    labels: ['2020', '2021', '2022', '2023', '2024'],
    ratings: [4.3, 4.5, 4.6, 4.7, 4.8]
  }
})

// 问题分类数据
const issueCategories = ref([
  {
    name: '服务态度',
    count: 15,
    percentage: 35,
    color: '#F56C6C',
    description: '主要涉及工作人员服务不周、态度冷淡等问题'
  },
  {
    name: '安全问题',
    count: 10,
    percentage: 23,
    color: '#E6A23C',
    description: '涉及安全措施不足、设备老旧等安全隐患'
  },
  {
    name: '价格问题',
    count: 8,
    percentage: 19,
    color: '#409EFF',
    description: '主要反映价格偏高、性价比不高等问题'
  },
  {
    name: '体验时长',
    count: 6,
    percentage: 14,
    color: '#67C23A',
    description: '反映体验时间过短、不符合预期等问题'
  },
  {
    name: '其他问题',
    count: 4,
    percentage: 9,
    color: '#909399',
    description: '包括天气因素、交通不便等其他问题'
  }
])

// 标签云数据
const tagCloud = ref([
  { name: '服务热情', count: 156, type: 'success' },
  { name: '体验好', count: 142, type: 'success' },
  { name: '风景美', count: 128, type: 'success' },
  { name: '安全有保障', count: 115, type: 'success' },
  { name: '专业细致', count: 98, type: 'success' },
  { name: '价格合理', count: 87, type: 'success' },
  { name: '值得推荐', count: 76, type: 'success' },
  { name: '时间短', count: 32, type: 'warning' },
  { name: '价格高', count: 28, type: 'danger' },
  { name: '服务一般', count: 24, type: 'warning' },
  { name: '等待时间长', count: 18, type: 'danger' },
  { name: '设备老旧', count: 15, type: 'danger' },
  { name: '交通不便', count: 12, type: 'warning' },
  { name: '天气影响', count: 10, type: 'info' },
  { name: '讲解详细', count: 65, type: 'success' },
  { name: '准时出行', count: 58, type: 'success' },
  { name: '拍照好看', count: 52, type: 'success' },
  { name: '服务差', count: 8, type: 'danger' },
  { name: '预约困难', count: 7, type: 'warning' },
  { name: '环境好', count: 45, type: 'success' }
])

// 获取评分颜色
const getRatingColor = (rating) => {
  const colors = {
    1: '#F56C6C',
    2: '#E6A23C',
    3: '#909399',
    4: '#67C23A',
    5: '#409EFF'
  }
  return colors[rating] || '#409EFF'
}

// 获取标签类型
const getTagType = (tag) => {
  return tag.type || ''
}

// 获取标签大小
const getTagSize = (tag) => {
  if (tag.count > 100) return 'large'
  if (tag.count > 50) return 'default'
  return 'small'
}

// 获取当前标签
const getCurrentLabels = () => {
  return trendData.value[trendTimeRange.value].labels
}

// 获取当前数据
const getCurrentData = () => {
  return trendData.value[trendTimeRange.value].ratings
}

// 获取折线图路径
const getChartPath = () => {
  const data = getCurrentData()
  if (!data || data.length === 0) return ''
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100
    const y = 100 - (value / 5) * 100
    return `${x},${y}`
  })
  
  // 确保至少有两个点才能生成折线
  if (points.length < 2) return ''
  
  return `M${points[0]} L${points.slice(1).join(' L')}`
}

// 获取填充区域路径
const getChartPathArea = () => {
  const data = getCurrentData()
  if (!data || data.length === 0) return ''
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100
    const y = 100 - (value / 5) * 100
    return `${x},${y}`
  })
  
  // 确保至少有两个点才能生成填充区域
  if (points.length < 2) return ''
  
  return `M0,100 L${points.join(' L')} L100,100 Z`
}

// 获取数据点坐标
const getDataPoints = () => {
  const data = getCurrentData()
  if (!data || data.length === 0) return []
  
  // 如果只有一个数据点，将其放在中间
  if (data.length === 1) {
    const y = 100 - (data[0] / 5) * 100
    return [{ x: 50, y }]
  }
  
  return data.map((value, index) => {
    // 确保 x 坐标在 0-100 之间
    const x = data.length > 1 ? (index / (data.length - 1)) * 100 : 50
    // 确保 y 坐标在 0-100 之间
    const y = 100 - (value / 5) * 100
    return { x, y }
  })
}

// 搜索
const handleSearch = () => {
  // 模拟数据加载
  ElMessage.success('数据分析已更新')
}

// 重置筛选
const resetFilter = () => {
  filterForm.dateRange = []
  filterForm.projectId = null
  handleSearch()
}

// 组件挂载时初始化
onMounted(() => {
  // 初始化数据
})
</script>

<style scoped>
.review-analysis-container {
  padding: 10px;
}

.filter-container {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.stat-cards {
  margin-bottom: 20px;
}

.stat-card {
  margin-bottom: 20px;
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
  margin-right: 15px;
  color: white;
  font-size: 24px;
}

.card-info {
  flex: 1;
}

.card-value {
  font-size: 24px;
  font-weight: 600;
  line-height: 1.2;
}

.card-title {
  font-size: 14px;
  color: #909399;
  margin-top: 4px;
}

.chart-row {
  margin-bottom: 20px;
}

.chart-card {
  height: 400px;
  margin-bottom: 20px;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chart-container {
  height: 320px;
  display: flex;
  flex-direction: column;
}

/* 评分分布样式 */
.rating-distribution {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 20px 0;
}

.rating-level {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.star-label {
  width: 40px;
  text-align: right;
  margin-right: 10px;
  font-weight: 500;
}

.progress-container {
  flex: 1;
  margin: 0 10px;
}

.progress-label {
  font-size: 12px;
}

.count-label {
  width: 60px;
  text-align: left;
  margin-left: 10px;
  color: #909399;
  font-size: 12px;
}

/* 问题分类样式 */
.issue-categories {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px 0;
}

.issue-category {
  margin-bottom: 15px;
}

.category-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.category-name {
  font-weight: 500;
}

.category-count {
  color: #909399;
  font-size: 12px;
}

.category-description {
  font-size: 12px;
  color: #909399;
  margin-top: 5px;
}

/* 标签云样式 */
.tag-cloud {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  padding: 10px;
}

.tag-item {
  margin: 5px;
  cursor: default;
}

/* 折线图样式 */
.line-chart-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.y-axis {
  position: absolute;
  left: 0;
  top: 0;
  height: calc(100% - 30px);
  width: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 0;
  z-index: 1;
}

.y-axis-label {
  font-size: 12px;
  color: #909399;
  text-align: right;
  padding-right: 10px;
}

.x-axis {
  height: 30px;
  display: flex;
  margin-left: 30px;
  border-top: 1px solid #EBEEF5;
}

.x-axis-label {
  font-size: 12px;
  color: #909399;
  text-align: center;
  padding-top: 5px;
}

.chart-body {
  flex: 1;
  margin-left: 30px;
  position: relative;
  overflow: hidden;
}

.grid-lines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.grid-line {
  width: 100%;
  height: 1px;
  background-color: rgba(235, 238, 245, 0.5);
}

.line-chart {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 10px 0;
  z-index: 2;
}

.line-chart svg {
  display: block;
  width: 100%;
  height: 100%;
}

.line-chart svg circle {
  cursor: pointer;
  transition: r 0.2s;
}

.line-chart svg circle:hover {
  r: 6;
}

.data-point-tooltips {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.tooltip-container {
  position: absolute;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.tooltip {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.2s;
  pointer-events: none;
}

.tooltip.visible {
  opacity: 1;
}

.tooltip:after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid rgba(0, 0, 0, 0.7);
}
</style>

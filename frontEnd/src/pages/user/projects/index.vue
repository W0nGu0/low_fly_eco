<template>
  <div class="projects-page">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">飞行体验项目</h1>
      
      <!-- 搜索和筛选区域 -->
      <div class="search-filter-container card mb-8 p-6">
        <el-row :gutter="20">
          <el-col :xs="24" :md="6">
            <el-input
              v-model="searchQuery"
              placeholder="搜索项目名称"
              prefix-icon="el-icon-search"
              clearable
              @input="handleSearch"
            />
          </el-col>
          <el-col :xs="24" :md="6">
            <el-select
              v-model="categoryFilter"
              placeholder="项目分类"
              style="width: 100%"
              clearable
              @change="handleFilter"
            >
              <el-option
                v-for="category in categories"
                :key="category.id"
                :label="category.name"
                :value="category.id"
              />
            </el-select>
          </el-col>
          <el-col :xs="24" :md="6">
            <el-select
              v-model="priceFilter"
              placeholder="价格区间"
              style="width: 100%"
              clearable
              @change="handleFilter"
            >
              <el-option label="0-500元" value="0-500" />
              <el-option label="500-1000元" value="500-1000" />
              <el-option label="1000-2000元" value="1000-2000" />
              <el-option label="2000元以上" value="2000+" />
            </el-select>
          </el-col>
          <el-col :xs="24" :md="6">
            <el-select
              v-model="sortOption"
              placeholder="排序方式"
              style="width: 100%"
              @change="handleSort"
            >
              <el-option label="推荐排序" value="recommended" />
              <el-option label="价格从低到高" value="price-asc" />
              <el-option label="价格从高到低" value="price-desc" />
              <el-option label="评分从高到低" value="rating-desc" />
              <el-option label="预约人数最多" value="booking-desc" />
            </el-select>
          </el-col>
        </el-row>
      </div>
      
      <!-- 项目列表 -->
      <div class="projects-list">
        <el-row :gutter="30">
          <el-col :xs="24" :sm="12" :lg="8" v-for="(project, index) in filteredProjects" :key="project.id">
            <div class="project-card card mb-6 cursor-pointer" @click="goToDetail(project.id)">
              <div class="project-image">
                <img :src="project.coverImage" :alt="project.name" class="w-full h-full object-cover">
                <div class="project-category-tag">{{ getCategoryName(project.categoryId) }}</div>
              </div>
              <div class="project-info p-5">
                <h3 class="project-name text-xl font-bold mb-2">{{ project.name }}</h3>
                <p class="project-brief text-gray-600 mb-3 line-clamp-2">{{ project.brief }}</p>
                <div class="project-meta flex flex-wrap gap-4 mb-3">
                  <div class="meta-item flex items-center">
                    <i class="el-icon-location"></i>
                    <span class="ml-1">{{ project.location }}</span>
                  </div>
                  <div class="meta-item flex items-center">
                    <i class="el-icon-time"></i>
                    <span class="ml-1">{{ project.duration }}分钟</span>
                  </div>
                </div>
                <div class="project-footer flex justify-between items-center">
                  <div class="project-price">
                    <span class="text-gray-500">¥</span>
                    <span class="text-2xl font-bold text-primary">{{ project.price }}</span>
                    <span class="text-gray-500 text-sm">起</span>
                  </div>
                  <div class="project-rating flex items-center">
                    <span class="mr-1 text-warning">{{ project.rating }}</span>
                    <el-rate
                      v-model="project.rating"
                      disabled
                      :colors="rateColors"
                      text-color="#ff9900"
                      :score-template="project.rating"
                    >
                    </el-rate>
                    <span class="ml-1 text-gray-500 text-sm">({{ project.reviewCount }})</span>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
        
        <!-- 空状态 -->
        <div v-if="filteredProjects.length === 0" class="empty-state text-center py-12">
          <el-empty description="暂无符合条件的项目"></el-empty>
        </div>
      </div>
      
      <!-- 分页 -->
      <div class="pagination flex justify-center mt-8">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="totalProjects"
          :page-size="pageSize"
          :current-page="currentPage"
          @current-change="handlePageChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useProjectStore } from '@/store/project'

const router = useRouter()
const route = useRoute()
const projectStore = useProjectStore()

// 分类数据
const categories = ref([
  { id: 1, name: '热气球观光' },
  { id: 2, name: '直升机游览' },
  { id: 3, name: '无人机体验' },
  { id: 4, name: '滑翔伞' },
  { id: 5, name: '动力伞' }
])

// 搜索和筛选状态
const searchQuery = ref('')
const categoryFilter = ref('')
const priceFilter = ref('')
const sortOption = ref('recommended')
const currentPage = ref(1)
const pageSize = ref(9)

// 项目数据
const allProjects = ref([
  {
    id: 1,
    name: '城市热气球观光之旅',
    brief: '乘坐热气球，俯瞰整座城市的美景，体验自由飞翔的感觉',
    coverImage: '@/assets/images/projects/hot-air-balloon.jpg',
    categoryId: 1,
    location: '北京市朝阳区',
    duration: 60,
    price: 688,
    weekendPrice: 888,
    holidayPrice: 1088,
    maxBookingsPerDay: 30,
    bookingCount: 128,
    status: 'active',
    rating: 4.8,
    reviewCount: 128,
    isPopular: true
  },
  {
    id: 2,
    name: '直升机空中游览',
    brief: '乘坐专业直升机，从空中欣赏城市风光，拍摄绝美照片',
    coverImage: '@/assets/images/projects/helicopter.jpg',
    categoryId: 2,
    location: '上海市浦东新区',
    duration: 30,
    price: 1280,
    weekendPrice: 1580,
    holidayPrice: 1880,
    maxBookingsPerDay: 20,
    bookingCount: 92,
    status: 'active',
    rating: 4.6,
    reviewCount: 92,
    isPopular: true
  },
  {
    id: 3,
    name: '专业无人机飞行体验',
    brief: '在专业教练指导下，学习操控高端无人机，体验科技带来的乐趣',
    coverImage: '@/assets/images/projects/drone.jpg',
    categoryId: 3,
    location: '广州市天河区',
    duration: 120,
    price: 399,
    weekendPrice: 499,
    holidayPrice: 599,
    maxBookingsPerDay: 15,
    bookingCount: 75,
    status: 'active',
    rating: 4.5,
    reviewCount: 65,
    isPopular: true
  },
  {
    id: 4,
    name: '海岸线滑翔伞体验',
    brief: '从高处起飞，在专业教练陪同下体验滑翔伞飞行，欣赏壮丽的海岸线风光',
    coverImage: '@/assets/images/projects/paragliding.jpg',
    categoryId: 4,
    location: '厦门市思明区',
    duration: 90,
    price: 880,
    weekendPrice: 1080,
    holidayPrice: 1280,
    maxBookingsPerDay: 10,
    bookingCount: 58,
    status: 'active',
    rating: 4.9,
    reviewCount: 47,
    isPopular: true
  },
  {
    id: 5,
    name: '山地动力伞飞行',
    brief: '配备专业动力伞设备，在山区上空翱翔，体验极限运动的刺激',
    coverImage: '@/assets/images/projects/powered-paragliding.jpg',
    categoryId: 5,
    location: '杭州市临安区',
    duration: 60,
    price: 1100,
    weekendPrice: 1300,
    holidayPrice: 1500,
    maxBookingsPerDay: 8,
    bookingCount: 42,
    status: 'active',
    rating: 4.7,
    reviewCount: 36,
    isPopular: false
  },
  {
    id: 6,
    name: '高空跳伞极限体验',
    brief: '从3000米高空跳下，体验自由落体的极限挑战，专业教练全程陪伴',
    coverImage: '@/assets/images/projects/skydiving.jpg',
    categoryId: 4,
    location: '海南省三亚市',
    duration: 180,
    price: 2980,
    weekendPrice: 3280,
    holidayPrice: 3580,
    maxBookingsPerDay: 5,
    bookingCount: 39,
    status: 'active',
    rating: 4.9,
    reviewCount: 29,
    isPopular: false
  }
])

// 评分颜色
const rateColors = ['#F7BA2A', '#F7BA2A', '#F7BA2A']

// 计算属性：筛选后的项目
const filteredProjects = computed(() => {
  let results = [...allProjects.value]
  
  // 搜索过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    results = results.filter(project => 
      project.name.toLowerCase().includes(query) || 
      project.brief.toLowerCase().includes(query)
    )
  }
  
  // 分类过滤
  if (categoryFilter.value) {
    results = results.filter(project => project.categoryId === categoryFilter.value)
  }
  
  // 价格过滤
  if (priceFilter.value) {
    const [min, max] = priceFilter.value.split('-')
    if (max) {
      results = results.filter(project => project.price >= Number(min) && project.price <= Number(max))
    } else {
      // 处理 "2000+" 的情况
      results = results.filter(project => project.price >= Number(min.replace('+', '')))
    }
  }
  
  // 排序
  switch (sortOption.value) {
    case 'price-asc':
      results.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      results.sort((a, b) => b.price - a.price)
      break
    case 'rating-desc':
      results.sort((a, b) => b.rating - a.rating)
      break
    case 'booking-desc':
      results.sort((a, b) => b.bookingCount - a.bookingCount)
      break
    case 'recommended':
    default:
      // 推荐排序：优先显示热门项目，然后按评分排序
      results.sort((a, b) => {
        if (a.isPopular && !b.isPopular) return -1
        if (!a.isPopular && b.isPopular) return 1
        return b.rating - a.rating
      })
  }
  
  return results
})

// 计算总项目数
const totalProjects = computed(() => filteredProjects.value.length)

// 获取分类名称
function getCategoryName(categoryId) {
  const category = categories.value.find(item => item.id === categoryId)
  return category ? category.name : ''
}

// 搜索、筛选和排序方法
function handleSearch() {
  currentPage.value = 1
  filterProjects()
}

function handleFilter() {
  currentPage.value = 1
  filterProjects()
}

function handleSort() {
  currentPage.value = 1
  filterProjects()
}

function handlePageChange(page) {
  currentPage.value = page
}

// 导航方法
function goToDetail(projectId) {
  router.push(`/user/projects/detail/${projectId}`)
}

// 从URL参数中获取分类过滤器
function initFromUrlParams() {
  if (route.query.category) {
    categoryFilter.value = Number(route.query.category)
  }
  
  if (route.query.search) {
    searchQuery.value = route.query.search
  }
}

// 生命周期钩子
onMounted(() => {
  // 从URL参数初始化筛选
  initFromUrlParams()
  
  // 这里应该调用API获取项目列表
  // projectStore.fetchProjects().then(() => {
  //   allProjects.value = projectStore.projects
  // })
})

// 监听路由变化，更新过滤器
watch(
  () => route.query,
  () => {
    initFromUrlParams()
  }
)
</script>

<style scoped>
.project-image {
  height: 200px;
  position: relative;
  overflow: hidden;
}

.project-category-tag {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
}

.project-card:hover .project-image img {
  transform: scale(1.05);
  transition: transform 0.3s ease;
}

.meta-item {
  font-size: 14px;
  color: #666;
}

.meta-item i {
  margin-right: 4px;
}

/* 多行文本省略 */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.text-primary {
  color: #409EFF;
}

.text-warning {
  color: #E6A23C;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .search-filter-container .el-col {
    margin-bottom: 10px;
  }
}
</style>

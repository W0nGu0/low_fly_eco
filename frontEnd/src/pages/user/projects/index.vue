<template>
  <div class="projects-page min-h-screen">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8 text-emerald-800 animate__animated animate__fadeInDown">飞行体验项目</h1>

      <!-- 搜索和筛选区域 -->
      <div class="search-filter-container mb-12 p-6 rounded-xl shadow-sm bg-white bg-opacity-80 animate__animated animate__fadeInUp">
        <el-row :gutter="20">
          <el-col :xs="24" :md="6">
            <el-input
              v-model="searchQuery"
              placeholder="搜索项目名称"
              prefix-icon="el-icon-search"
              clearable
              @input="handleSearch"
              class="rounded-lg"
            />
          </el-col>
          <el-col :xs="24" :md="6">
            <el-select
              v-model="categoryFilter"
              placeholder="项目分类"
              style="width: 100%"
              clearable
              @change="handleFilter"
              class="rounded-lg"
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
              class="rounded-lg"
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
              class="rounded-lg"
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
        <el-empty v-if="filteredProjects.length === 0" description="暂无符合条件的项目" class="py-12 animate__animated animate__fadeIn">
          <el-button type="primary" @click="resetFilters">重置筛选条件</el-button>
        </el-empty>

        <el-row :gutter="30" v-else>
          <el-col :xs="24" :sm="12" :lg="8" v-for="(project, index) in filteredProjects" :key="project.id">
            <div class="project-card"
                 :style="{ animationDelay: `${index * 0.1}s` }"
                 @click="goToDetail(project.id)">
              <div class="project-image">
                <img :src="getImageUrl(project.coverImage)" :alt="project.name">
                <div class="project-category-tag">
                  {{ getCategoryName(project.categoryId) }}
                </div>
                <div class="project-rating">
                  <i class="el-icon-star-on text-yellow-500"></i>
                  <span>{{ project.rating }}</span>
                </div>
              </div>
              <div class="project-info">
                <h3 class="project-name">{{ project.name }}</h3>
                <p class="project-brief">{{ project.brief }}</p>
                <div class="project-meta">
                  <div class="meta-item">
                    <i class="el-icon-location"></i>
                    <span>{{ project.location }}</span>
                  </div>
                  <div class="meta-item">
                    <i class="el-icon-time"></i>
                    <span>{{ project.duration }}分钟</span>
                  </div>
                </div>
                <div class="project-footer">
                  <div class="project-price">
                    <span class="currency">¥</span>
                    <span class="amount">{{ project.price }}</span>
                    <span class="unit">起</span>
                  </div>
                  <el-button
                    type="primary"
                    size="small"
                    @click.stop="goToDetail(project.id)"
                  >
                    查看详情
                  </el-button>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>

      <!-- 分页 -->
      <div class="pagination-container flex justify-center mt-8 animate__animated animate__fadeInUp">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[9, 18, 36, 72]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalProjects"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useProjectStore } from '@/store/project'
import { getImageUrl, processArrayImageUrls } from '@/utils/imageHelper'

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
    brief: '专业飞行员驾驶直升机，搭载游客从空中欣赏城市风光，拍摄绝美照片',
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
  // 使用计算属性自动过滤，无需调用额外函数
}

function handleFilter() {
  currentPage.value = 1
  // 使用计算属性自动过滤，无需调用额外函数
}

function handleSort() {
  currentPage.value = 1
  // 使用计算属性自动过滤，无需调用额外函数
}

function handlePageChange(page) {
  currentPage.value = page
}

// 导航方法
function goToDetail(projectId) {
  // 根据项目ID映射到对应的详情页路由
  switch(projectId) {
    case 1:
      router.push('/user/projects/detail/hot-air-balloon');
      break;
    case 2:
      router.push('/user/projects/detail/helicopter');
      break;
    case 3:
      router.push('/user/projects/detail/drone');
      break;
    case 4:
      router.push('/user/projects/detail/paragliding');
      break;
    case 5:
      router.push('/user/projects/detail/powered-paragliding');
      break;
    case 6:
      router.push('/user/projects/detail/skydiving');
      break;
    default:
      router.push(`/user/projects/detail/${projectId}`);
  }
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

  // 处理项目列表中的图片路径
  allProjects.value = processArrayImageUrls(allProjects.value, ['coverImage']);

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
.projects-page {
  /* 背景色已在布局文件中设置为 #d1faba */
  min-height: calc(100vh - 64px);
}

.project-image {
  height: 200px; /* 固定图片高度 */
  position: relative;
  overflow: hidden;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.project-category-tag {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background-color: rgba(22, 163, 74, 0.9);
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 500;
  backdrop-filter: blur(4px);
  z-index: 1;
}

.project-rating {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: rgba(255, 255, 255, 0.95);
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  backdrop-filter: blur(4px);
  z-index: 1;
  color: #16a34a;
}

.project-info {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.project-name {
  color: #166534;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
  line-height: 1.4;
}

.project-brief {
  color: #374151;
  font-size: 0.875rem;
  margin: 0;
  line-height: 1.5;
}

.project-meta {
  display: flex;
  gap: 12px;
  margin: 4px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4b5563;
  font-size: 0.875rem;
  padding: 0.25rem 0;
}

.meta-item i {
  color: #16a34a;
  font-size: 1rem;
}

.project-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}

.project-price {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
}

.project-price .currency {
  color: #4b5563;
  font-size: 0.875rem;
}

.project-price .amount {
  color: #16a34a;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1;
}

.project-price .unit {
  color: #4b5563;
  font-size: 0.875rem;
}

.el-button--primary {
  background-color: #16a34a;
  border-color: #16a34a;
  height: 2.5rem;
  padding: 0 1.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

.el-button--primary:hover {
  background-color: #15803d;
  border-color: #15803d;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(22, 163, 74, 0.2);
}

.search-filter-container {
  margin-bottom: 2rem;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 1rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid #dcfce7;
  padding: 1.5rem;
  backdrop-filter: blur(5px);
}

.search-filter-container:hover {
  box-shadow: 0 4px 20px rgba(22, 163, 74, 0.1);
  border-color: #86efac;
}

.search-filter-container .el-row {
  margin: -0.5rem;
}

.search-filter-container .el-col {
  padding: 0.5rem;
}

.search-filter-container .el-input__inner,
.search-filter-container .el-select .el-input__inner {
  height: 2.75rem;
  border-radius: 0.75rem;
  border: 1px solid #dcfce7;
  transition: all 0.3s ease;
  font-size: 0.875rem;
  padding: 0 1rem;
}

.search-filter-container .el-input__inner:hover,
.search-filter-container .el-select .el-input__inner:hover {
  border-color: #16a34a;
}

.search-filter-container .el-input__inner:focus,
.search-filter-container .el-select .el-input__inner:focus {
  border-color: #16a34a;
  box-shadow: 0 0 0 2px rgba(22, 163, 74, 0.1);
}

.search-filter-container .el-input__prefix {
  left: 12px;
}

.search-filter-container .el-input__inner::-webkit-input-placeholder {
  color: #9ca3af;
}

.pagination-container {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #dcfce7;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 0.75rem;
  padding: 1rem;
  backdrop-filter: blur(5px);
}

.el-pagination {
  --el-pagination-button-bg-color: white;
  --el-pagination-hover-color: #16a34a;
  --el-pagination-button-color: #374151;
  --el-pagination-button-disabled-bg-color: white;
  --el-pagination-button-disabled-color: #9ca3af;
}

.el-pagination .el-pager li:not(.is-disabled).is-active {
  background-color: #16a34a;
  color: white;
}

.el-pagination .el-pager li:not(.is-disabled):hover {
  color: #16a34a;
}

.project-card {
  transition: all 0.3s ease;
  margin-bottom: 20px !important;
  border-radius: 1rem;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.85);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  cursor: pointer;
  animation: fadeInUp 0.5s ease-out;
  border: 1px solid #dcfce7;
  height: auto !important;
  backdrop-filter: blur(5px);
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 24px rgba(22, 163, 74, 0.15);
  border-color: #86efac;
  background-color: rgba(255, 255, 255, 0.95);
}

.project-card:hover .project-image img {
  transform: scale(1.1);
}

.projects-list {
  margin-bottom: 3rem;
}

.el-row {
  margin-bottom: -20px !important; /* 与卡片的margin-bottom保持一致 */
}

@media (max-width: 768px) {
  .search-filter-container {
    margin-bottom: 1.5rem;
    padding: 1rem;
  }

  .search-filter-container .el-col {
    padding: 0.375rem;
  }

  .project-card {
    margin-bottom: 15px !important;
  }

  .project-info {
    padding: 0.875rem;
    gap: 0.375rem;
  }

  .project-meta {
    padding-bottom: 0.375rem;
    gap: 0.5rem;
  }

  .project-footer {
    margin-top: 0.25rem;
  }

  .pagination-container {
    margin-top: 0.75rem;
  }

  .el-row {
    margin-bottom: -15px !important;
  }

  .project-image {
    height: 180px;
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
</style>

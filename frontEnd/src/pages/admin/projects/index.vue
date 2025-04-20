<template>
  <div class="project-list-container animate__animated animate__fadeIn w-full h-full flex flex-col">
    <div class="page-header">
      <div class="title-section">
        <h2 class="page-title">项目管理</h2>
        <span class="page-subtitle">共 {{ totalProjects }} 个项目</span>
      </div>
      <div class="action-section">
        <el-button type="primary" @click="goToCreateProject" icon="Plus">新增项目</el-button>
        <el-button plain @click="refresh" icon="Refresh">刷新</el-button>
      </div>
    </div>

    <!-- 搜索和筛选区域 -->
    <el-card class="search-card" shadow="hover">
      <el-form :model="searchForm" ref="searchFormRef" :inline="true" class="search-form">
        <el-form-item label="项目名称">
          <el-input v-model="searchForm.name" placeholder="项目名称关键词" clearable></el-input>
        </el-form-item>
        <el-form-item label="项目分类">
          <el-select v-model="searchForm.categoryId" placeholder="全部分类" clearable style="width: 160px">
            <el-option v-for="item in categoryOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="全部状态" clearable style="width: 160px">
            <el-option label="开放预约" value="active"></el-option>
            <el-option label="维护中" value="maintenance"></el-option>
            <el-option label="已下架" value="inactive"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="价格区间">
          <el-input-number v-model="searchForm.minPrice" :min="0" controls-position="right" placeholder="最低价格" style="width: 120px"></el-input-number>
          <span class="separator">至</span>
          <el-input-number v-model="searchForm.maxPrice" :min="0" controls-position="right" placeholder="最高价格" style="width: 120px"></el-input-number>
        </el-form-item>
        <el-form-item class="search-actions">
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 项目表格 -->
    <el-card class="table-card flex-1" shadow="hover" v-loading="loading">
      <el-table :data="projectList" style="width: 100%" border stripe highlight-current-row :max-height="tableHeight">
        <el-table-column type="index" width="60" align="center" label="#"></el-table-column>
        <el-table-column label="项目信息" min-width="300">
          <template #default="{ row }">
            <div class="project-info">
              <div class="project-image" v-if="row.coverImage">
                <el-image :src="getImageUrl(row.coverImage)" fit="cover" :preview-src-list="[getImageUrl(row.coverImage)]"></el-image>
              </div>
              <div class="project-details">
                <div class="project-name">{{ row.name }}</div>
                <div class="project-category">分类: {{ getCategoryName(row.categoryId) }}</div>
                <div class="project-location">地点: {{ row.location }}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="brief" label="简介" min-width="200" show-overflow-tooltip></el-table-column>
        <el-table-column label="价格" width="120">
          <template #default="{ row }">
            <div class="price-info">
              <div>标准: {{ formatPrice(row.price) }}</div>
              <div v-if="row.weekendPrice">周末: {{ formatPrice(row.weekendPrice) }}</div>
              <div v-if="row.holidayPrice">节假日: {{ formatPrice(row.holidayPrice) }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="时长" width="90">
          <template #default="{ row }">
            {{ row.duration }} 分钟
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-tag v-if="row.status === 'active'" type="success">开放预约</el-tag>
            <el-tag v-else-if="row.status === 'maintenance'" type="warning">维护中</el-tag>
            <el-tag v-else-if="row.status === 'inactive'" type="info">已下架</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="180">
          <template #default="{ row }">
            {{ formatDate(row.createdAt) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button-group>
              <el-button type="primary" link @click="viewProject(row.id)">
                <el-icon><View /></el-icon>
                查看
              </el-button>
              <el-button type="primary" link @click="editProject(row.id)">
                <el-icon><Edit /></el-icon>
                编辑
              </el-button>
              <el-button type="danger" link @click="deleteProject(row.id)">
                <el-icon><Delete /></el-icon>
                删除
              </el-button>
            </el-button-group>
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
          :total="totalProjects"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { View, Edit, Delete, Plus, Refresh } from '@element-plus/icons-vue'
import { getImageUrl, processArrayImageUrls } from '@/utils/imageHelper'

const router = useRouter()
const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const totalProjects = ref(0)
const projectList = ref([])
const tableHeight = ref('calc(100vh - 280px)') // 动态计算表格高度

// 分类选项
const categoryOptions = [
  { id: 1, name: '热气球观光' },
  { id: 2, name: '直升机游览' },
  { id: 3, name: '无人机体验' },
  { id: 4, name: '滑翔伞' },
  { id: 5, name: '动力伞' }
]

// 搜索表单
const searchFormRef = ref(null)
const searchForm = reactive({
  name: '',
  categoryId: '',
  status: '',
  minPrice: '',
  maxPrice: ''
})

// 获取分类名称
const getCategoryName = (categoryId) => {
  const category = categoryOptions.find(category => category.id === categoryId)
  return category ? category.name : '未分类'
}

// 格式化价格
const formatPrice = (price) => {
  return `¥${price.toFixed(2)}`
}

// 格式化日期
const formatDate = (dateStr) => {
  if (!dateStr) return '-'
  const date = new Date(dateStr)
  return date.toISOString().split('T')[0]
}

// 获取项目列表
const getProjectList = async () => {
  loading.value = true
  try {
    // 这里应该是实际的API调用
    // 现在使用模拟数据
    await new Promise(resolve => setTimeout(resolve, 800)) // 模拟网络延迟

    // 模拟数据
    const mockProjects = [
      {
        id: 1,
        name: '北京朝阳热气球观光体验',
        categoryId: 1,
        brief: '在北京朝阳公园体验热气球升空，俯瞰整个城市美景，享受宁静与壮观并存的飞行体验。',
        coverImage: '@/assets/images/projects/hot-air-balloon.jpg',
        price: 688,
        weekendPrice: 788,
        holidayPrice: 888,
        duration: 45,
        location: '北京市朝阳区',
        status: 'active',
        createdAt: '2023-07-15'
      },
      {
        id: 2,
        name: '杭州西湖直升机观光',
        categoryId: 2,
        brief: '乘坐直升机俯瞰西湖美景，领略杭州的自然风光和城市发展，独特的视角体验难忘旅程。',
        coverImage: '@/assets/images/projects/helicopter.jpg',
        price: 1288,
        weekendPrice: 1588,
        holidayPrice: 1888,
        duration: 30,
        location: '浙江省杭州市',
        status: 'active',
        createdAt: '2023-08-20'
      },
      {
        id: 3,
        name: '深圳湾无人机摄影体验',
        categoryId: 3,
        brief: '专业摄影无人机航拍体验，拍摄深圳湾海岸线和城市天际线，记录壮观城市景观。',
        coverImage: '@/assets/images/projects/drone.jpg',
        price: 388,
        weekendPrice: 488,
        holidayPrice: 588,
        duration: 60,
        location: '广东省深圳市',
        status: 'maintenance',
        createdAt: '2023-09-05'
      },
      {
        id: 4,
        name: '云南大理滑翔伞体验',
        categoryId: 4,
        brief: '在洱海边起飞，感受在空中翱翔的自由，俯瞰大理古城和洱海美景，体验与自然融为一体的奇妙感受。',
        coverImage: '@/assets/images/projects/paragliding.jpg',
        price: 520,
        weekendPrice: 620,
        holidayPrice: 720,
        duration: 40,
        location: '云南省大理市',
        status: 'inactive',
        createdAt: '2023-06-10'
      }
    ]

    // 处理图片路径
    projectList.value = processArrayImageUrls(mockProjects, ['coverImage'])
    totalProjects.value = mockProjects.length

  } catch (error) {
    ElMessage.error(`获取项目列表失败: ${error.message || '未知错误'}`)
  } finally {
    loading.value = false
  }
}

// 搜索处理
const handleSearch = () => {
  currentPage.value = 1 // 重置到第一页
  getProjectList() // 刷新列表
}

// 重置搜索
const resetSearch = () => {
  searchFormRef.value.resetFields()
  currentPage.value = 1
  getProjectList()
}

// 分页处理
const handleSizeChange = (newSize) => {
  pageSize.value = newSize
  getProjectList()
}

const handleCurrentChange = (newPage) => {
  currentPage.value = newPage
  getProjectList()
}

// 查看项目详情
const viewProject = (id) => {
  router.push(`/admin/projects/${id}`)
}

// 编辑项目
const editProject = (id) => {
  router.push(`/admin/projects/edit/${id}`)
}

// 删除项目
const deleteProject = (id) => {
  ElMessageBox.confirm(
    '确定要删除该项目吗？删除后将无法恢复。',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      // 模拟删除操作
      ElMessage.success('删除成功')
      getProjectList() // 刷新列表
    })
    .catch(() => {
      // 用户取消删除
    })
}

// 刷新列表
const refresh = () => {
  getProjectList()
}

// 跳转到创建项目页面
const goToCreateProject = () => {
  router.push('/admin/projects/create')
}

// 在组件挂载时获取项目列表
onMounted(() => {
  getProjectList()
})
</script>

<style scoped>
.project-list-container {
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

.search-card {
  margin-bottom: 20px;
}

.search-form {
  display: flex;
  flex-wrap: wrap;
}

.separator {
  margin: 0 8px;
}

.search-actions {
  margin-left: auto;
}

.table-card {
  margin-bottom: 20px;
  width: 100%;
  flex: 1;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.project-info {
  display: flex;
  align-items: center;
}

.project-image {
  width: 80px;
  height: 60px;
  margin-right: 12px;
  overflow: hidden;
  border-radius: 4px;
}

.project-image :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-details {
  display: flex;
  flex-direction: column;
}

.project-name {
  font-weight: 600;
  margin-bottom: 4px;
}

.project-category, .project-location {
  font-size: 12px;
  color: #606266;
}

.price-info {
  font-size: 13px;
}

.price-info div {
  margin-bottom: 2px;
}
</style>

<template>
  <div class="review-list-container">
    <!-- 搜索和筛选 -->
    <div class="filter-container">
      <el-form :inline="true" :model="filterForm" class="filter-form">
        <el-form-item label="关键词">
          <el-input
            v-model="filterForm.keyword"
            placeholder="搜索用户名/评价内容"
            clearable
            @keyup.enter="handleSearch"
          ></el-input>
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
        <el-form-item label="评分">
          <el-select v-model="filterForm.rating" placeholder="全部评分" clearable>
            <el-option
              v-for="i in 5"
              :key="i"
              :label="`${i}星`"
              :value="i"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker
            v-model="filterForm.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="YYYY-MM-DD"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="回复状态">
          <el-select v-model="filterForm.replyStatus" placeholder="全部状态" clearable>
            <el-option label="已回复" value="replied"></el-option>
            <el-option label="未回复" value="unreplied"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="resetFilter">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 评价列表 -->
    <el-table
      v-loading="loading"
      :data="reviewList"
      style="width: 100%"
      border
      row-key="id"
      @row-click="handleRowClick"
    >
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column label="用户信息" width="180">
        <template #default="scope">
          <div class="user-info">
            <el-avatar :size="32" :src="scope.row.avatar"></el-avatar>
            <div class="user-details">
              <div class="username">{{ scope.row.username }}</div>
              <div class="user-id text-gray-500 text-xs">ID: {{ scope.row.userId }}</div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="项目" prop="projectName" width="180" />
      <el-table-column label="评分" width="120">
        <template #default="scope">
          <el-rate v-model="scope.row.rating" disabled text-color="#ff9900"></el-rate>
        </template>
      </el-table-column>
      <el-table-column label="评价内容" min-width="300">
        <template #default="scope">
          <div class="review-content-preview">
            {{ scope.row.content }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="评价时间" prop="createTime" width="180" />
      <el-table-column label="回复状态" width="100">
        <template #default="scope">
          <el-tag :type="scope.row.replied ? 'success' : 'info'">
            {{ scope.row.replied ? '已回复' : '未回复' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" fixed="right">
        <template #default="scope">
          <el-button
            type="primary"
            size="small"
            plain
            @click.stop="handleViewDetail(scope.row)"
          >
            查看
          </el-button>
          <el-button
            type="danger"
            size="small"
            plain
            @click.stop="handleDelete(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <!-- 评价详情对话框 -->
    <el-dialog
      v-model="detailDialogVisible"
      title="评价详情"
      width="700px"
      destroy-on-close
    >
      <div v-if="currentReview" class="review-detail">
        <div class="review-header">
          <div class="user-info">
            <el-avatar :size="40" :src="currentReview.avatar"></el-avatar>
            <div class="user-details">
              <div class="username">{{ currentReview.username }}</div>
              <div class="review-time">{{ currentReview.createTime }}</div>
            </div>
          </div>
          <div class="review-rating">
            <el-rate v-model="currentReview.rating" disabled text-color="#ff9900"></el-rate>
          </div>
        </div>

        <div class="review-project">
          <span class="label">项目：</span>
          <span class="value">{{ currentReview.projectName }}</span>
        </div>

        <div class="review-content">
          <div class="content-text">{{ currentReview.content }}</div>
          <div v-if="currentReview.images && currentReview.images.length" class="review-images">
            <el-image
              v-for="(img, index) in currentReview.images"
              :key="index"
              :src="img"
              :preview-src-list="currentReview.images"
              fit="cover"
              class="review-image"
            ></el-image>
          </div>
        </div>

        <el-divider content-position="left">商家回复</el-divider>

        <div class="merchant-reply">
          <el-form :model="replyForm" ref="replyFormRef">
            <el-form-item prop="content" :rules="[{ required: true, message: '请输入回复内容', trigger: 'blur' }]">
              <el-input
                v-model="replyForm.content"
                type="textarea"
                :rows="4"
                placeholder="请输入回复内容"
                :disabled="submitting"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitReply" :loading="submitting">
                {{ currentReview.replied ? '更新回复' : '提交回复' }}
              </el-button>
            </el-form-item>
          </el-form>
          <div v-if="currentReview.merchantReply" class="existing-reply">
            <div class="reply-header">
              <span class="reply-title">当前回复</span>
              <span class="reply-time">{{ currentReview.replyTime || '未知时间' }}</span>
            </div>
            <div class="reply-content">{{ currentReview.merchantReply }}</div>
          </div>
        </div>
      </div>
    </el-dialog>

    <!-- 删除确认对话框 -->
    <el-dialog
      v-model="deleteDialogVisible"
      title="删除评价"
      width="400px"
    >
      <div class="delete-confirm">
        <p>确定要删除该评价吗？此操作不可恢复。</p>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="deleteDialogVisible = false">取消</el-button>
          <el-button type="danger" @click="confirmDelete" :loading="deleting">确定删除</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'

const router = useRouter()

// 筛选表单
const filterForm = reactive({
  keyword: '',
  projectId: null,
  rating: null,
  dateRange: [],
  replyStatus: null
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

// 评价列表数据
const loading = ref(false)
const reviewList = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 详情对话框
const detailDialogVisible = ref(false)
const currentReview = ref(null)
const replyFormRef = ref(null)
const replyForm = reactive({
  content: ''
})
const submitting = ref(false)

// 删除对话框
const deleteDialogVisible = ref(false)
const reviewToDelete = ref(null)
const deleting = ref(false)

// 获取评价列表
const fetchReviewList = async () => {
  loading.value = true

  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 500))

    // 模拟数据
    reviewList.value = [
      {
        id: 1,
        userId: 101,
        username: '张先生',
        avatar: '/src/assets/images/users/user1.jpg',
        projectId: 1,
        projectName: '热气球观光之旅',
        rating: 5,
        content: '体验非常棒！热气球飞行让人惊叹，视野非常开阔，看到了整个城市的美景。服务人员专业又热情，全程感觉很安全。强烈推荐给想要尝试新鲜事物的朋友们！',
        createTime: '2023-08-16 09:23:45',
        images: [
          '/src/assets/images/reviews/review1-1.jpg',
          '/src/assets/images/reviews/review1-2.jpg'
        ],
        replied: true,
        merchantReply: '感谢您的好评！很高兴您喜欢我们的热气球体验，期待您下次再来参与我们的其他空中项目！',
        replyTime: '2023-08-16 15:30:22'
      },
      {
        id: 2,
        userId: 102,
        username: '李女士',
        avatar: '/src/assets/images/users/user2.jpg',
        projectId: 2,
        projectName: '直升机空中游览',
        rating: 4,
        content: '直升机体验很刺激，看到了平时看不到的城市风景，非常震撼！唯一遗憾的是时间有点短，希望下次能有更长的飞行时间。',
        createTime: '2023-07-28 16:45:22',
        images: [
          '/src/assets/images/reviews/review2-1.jpg'
        ],
        replied: false,
        merchantReply: '',
        replyTime: null
      },
      {
        id: 3,
        userId: 103,
        username: '王先生',
        avatar: '/src/assets/images/users/user3.jpg',
        projectId: 3,
        projectName: '专业无人机操控体验',
        rating: 5,
        content: '教练很专业，讲解很详细，让我这个零基础的人也能快速上手。无人机拍摄的视频效果太棒了，朋友们都很羡慕。下次还会再来！',
        createTime: '2023-08-05 10:12:33',
        images: [],
        replied: true,
        merchantReply: '感谢您的评价！我们的教练都经过专业培训，很高兴能够帮助您快速掌握无人机操控技巧。期待您的再次光临！',
        replyTime: '2023-08-05 14:25:10'
      },
      {
        id: 4,
        userId: 104,
        username: '赵女士',
        avatar: '/src/assets/images/users/user4.jpg',
        projectId: 4,
        projectName: '滑翔伞飞行体验',
        rating: 3,
        content: '体验还可以，但是天气不太好，视野受限。教练很专业，但是沟通有点困难。希望能有更好的天气预报和更清晰的活动指引。',
        createTime: '2023-08-10 09:30:15',
        images: [],
        replied: true,
        merchantReply: '非常抱歉您的体验不够完美。我们会加强天气预报的准确性，并改进沟通流程。感谢您的宝贵建议，希望有机会为您提供更好的服务。',
        replyTime: '2023-08-10 11:45:33'
      },
      {
        id: 5,
        userId: 105,
        username: '陈先生',
        avatar: '/src/assets/images/users/user5.jpg',
        projectId: 5,
        projectName: '动力滑翔伞体验',
        rating: 5,
        content: '太刺激了！飞行过程中的感觉无法用语言形容，俯瞰大地的视角太震撼了。教练技术一流，全程感觉很安全。绝对是我尝试过的最棒的体验之一！',
        createTime: '2023-08-12 15:20:45',
        images: [
          '/src/assets/images/reviews/review5-1.jpg',
          '/src/assets/images/reviews/review5-2.jpg',
          '/src/assets/images/reviews/review5-3.jpg'
        ],
        replied: false,
        merchantReply: '',
        replyTime: null
      }
    ]

    total.value = 28 // 模拟总数
  } catch (error) {
    ElMessage.error('获取评价列表失败：' + (error.message || '未知错误'))
  } finally {
    loading.value = false
  }
}

// 搜索
const handleSearch = () => {
  currentPage.value = 1
  fetchReviewList()
}

// 重置筛选
const resetFilter = () => {
  filterForm.keyword = ''
  filterForm.projectId = null
  filterForm.rating = null
  filterForm.dateRange = []
  filterForm.replyStatus = null
  handleSearch()
}

// 分页大小变化
const handleSizeChange = (val) => {
  pageSize.value = val
  fetchReviewList()
}

// 页码变化
const handleCurrentChange = (val) => {
  currentPage.value = val
  fetchReviewList()
}

// 行点击
const handleRowClick = (row) => {
  handleViewDetail(row)
}

// 查看详情
const handleViewDetail = (row) => {
  // 跳转到详情页面
  router.push(`/admin/reviews/detail/${row.id}`)
}

// 提交回复
const submitReply = async () => {
  if (!replyForm.content.trim()) {
    ElMessage.warning('请输入回复内容')
    return
  }

  submitting.value = true

  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 800))

    // 更新本地数据
    const index = reviewList.value.findIndex(item => item.id === currentReview.value.id)
    if (index !== -1) {
      reviewList.value[index].merchantReply = replyForm.content
      reviewList.value[index].replied = true
      reviewList.value[index].replyTime = new Date().toLocaleString()
    }

    ElMessage.success('回复成功')
    detailDialogVisible.value = false
  } catch (error) {
    ElMessage.error('提交回复失败：' + (error.message || '未知错误'))
  } finally {
    submitting.value = false
  }
}

// 删除评价
const handleDelete = (row) => {
  reviewToDelete.value = row
  deleteDialogVisible.value = true
}

// 确认删除
const confirmDelete = async () => {
  if (!reviewToDelete.value) return

  deleting.value = true

  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 800))

    // 更新本地数据
    const index = reviewList.value.findIndex(item => item.id === reviewToDelete.value.id)
    if (index !== -1) {
      reviewList.value.splice(index, 1)
      total.value--
    }

    ElMessage.success('删除成功')
    deleteDialogVisible.value = false
  } catch (error) {
    ElMessage.error('删除失败：' + (error.message || '未知错误'))
  } finally {
    deleting.value = false
  }
}

// 组件挂载时获取数据
onMounted(() => {
  fetchReviewList()
})

// 暴露方法给父组件
defineExpose({
  fetchReviewList,
  handleSearch,
  resetFilter
})
</script>

<style scoped>
.review-list-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.filter-container {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.filter-form {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-details {
  margin-left: 10px;
}

.username {
  font-weight: 500;
}

.review-content-preview {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

/* 详情对话框样式 */
.review-detail {
  padding: 10px;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.review-time {
  font-size: 12px;
  color: #909399;
  margin-top: 4px;
}

.review-project {
  margin-bottom: 15px;
}

.label {
  font-weight: 500;
  color: #606266;
}

.review-content {
  margin-bottom: 20px;
}

.content-text {
  line-height: 1.6;
  margin-bottom: 15px;
}

.review-images {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.review-image {
  width: 100px;
  height: 100px;
  border-radius: 4px;
  object-fit: cover;
}

.existing-reply {
  margin-top: 15px;
  padding: 15px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.reply-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.reply-title {
  font-weight: 500;
  color: #606266;
}

.reply-time {
  font-size: 12px;
  color: #909399;
}

.reply-content {
  line-height: 1.6;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}
</style>

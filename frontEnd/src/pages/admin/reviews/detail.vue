<template>
  <div class="review-detail-page w-full h-full flex flex-col">
    <!-- 权限检查 -->
    <permission-check required-permission="review_manage">
      <div class="page-header">
        <div class="title-section">
          <h2 class="page-title">评价详情</h2>
          <span class="page-subtitle">评价ID: {{ reviewId }}</span>
        </div>
        <div class="action-section">
          <el-button @click="goBack">返回列表</el-button>
          <el-button type="primary" @click="handleReply" v-if="!review?.replied">回复评价</el-button>
        </div>
      </div>

      <!-- 加载状态 -->
      <div v-if="loading" class="loading-container">
        <el-skeleton :rows="10" animated />
      </div>

      <!-- 评价详情 -->
      <template v-else-if="review">
        <div class="review-detail-container">
          <el-card class="review-card">
            <div class="review-header">
              <div class="user-info">
                <el-avatar :size="50" :src="review.avatar"></el-avatar>
                <div class="user-details">
                  <div class="username">{{ review.username }}</div>
                  <div class="user-id">用户ID: {{ review.userId }}</div>
                </div>
              </div>
              <div class="review-meta">
                <div class="review-time">{{ review.createTime }}</div>
                <div class="review-rating">
                  <span class="rating-label">评分：</span>
                  <el-rate v-model="review.rating" disabled text-color="#ff9900"></el-rate>
                </div>
              </div>
            </div>

            <el-divider />

            <div class="review-project">
              <div class="project-info">
                <span class="label">项目：</span>
                <el-link type="primary" @click="viewProject(review.projectId)">
                  {{ review.projectName }}
                </el-link>
              </div>
              <div class="order-info" v-if="review.orderId">
                <span class="label">订单：</span>
                <el-link type="primary" @click="viewOrder(review.orderId)">
                  查看订单详情
                </el-link>
              </div>
            </div>

            <div class="review-content">
              <div class="content-text">{{ review.content }}</div>
              <div v-if="review.images && review.images.length" class="review-images">
                <el-image
                  v-for="(img, index) in review.images"
                  :key="index"
                  :src="img"
                  :preview-src-list="review.images"
                  fit="cover"
                  class="review-image"
                ></el-image>
              </div>
            </div>

            <div v-if="review.tags && review.tags.length" class="review-tags">
              <span class="label">标签：</span>
              <el-tag
                v-for="(tag, index) in review.tags"
                :key="index"
                class="tag-item"
                size="small"
              >
                {{ tag }}
              </el-tag>
            </div>

            <el-divider content-position="left">商家回复</el-divider>

            <div class="merchant-reply">
              <div v-if="review.replied" class="reply-content">
                <div class="reply-header">
                  <span class="reply-time">回复时间：{{ review.replyTime }}</span>
                  <el-button type="primary" size="small" plain @click="handleEditReply">
                    编辑回复
                  </el-button>
                </div>
                <div class="reply-text">{{ review.merchantReply }}</div>
              </div>
              <div v-else class="no-reply">
                <el-empty description="暂无回复">
                  <el-button type="primary" @click="handleReply">回复评价</el-button>
                </el-empty>
              </div>
            </div>
          </el-card>

          <el-card class="related-info-card">
            <template #header>
              <div class="card-header">
                <span>相关信息</span>
              </div>
            </template>
            <div class="related-info">
              <div class="info-item">
                <span class="label">用户注册时间：</span>
                <span class="value">2023-01-15</span>
              </div>
              <div class="info-item">
                <span class="label">用户评价数：</span>
                <span class="value">8条</span>
              </div>
              <div class="info-item">
                <span class="label">用户平均评分：</span>
                <span class="value">4.6星</span>
              </div>
              <div class="info-item">
                <span class="label">项目平均评分：</span>
                <span class="value">4.8星</span>
              </div>
              <div class="info-item">
                <span class="label">项目总评价数：</span>
                <span class="value">156条</span>
              </div>
            </div>
          </el-card>
        </div>
      </template>

      <!-- 回复对话框 -->
      <el-dialog
        v-model="replyDialogVisible"
        :title="review?.replied ? '编辑回复' : '回复评价'"
        width="600px"
      >
        <el-form :model="replyForm" ref="replyFormRef">
          <el-form-item prop="content" :rules="[{ required: true, message: '请输入回复内容', trigger: 'blur' }]">
            <el-input
              v-model="replyForm.content"
              type="textarea"
              :rows="6"
              placeholder="请输入回复内容"
              :disabled="submitting"
            ></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="replyDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="submitReply" :loading="submitting">
              {{ review?.replied ? '更新回复' : '提交回复' }}
            </el-button>
          </span>
        </template>
      </el-dialog>
    </permission-check>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import PermissionCheck from '@/components/admin/common/PermissionCheck.vue'

const route = useRoute()
const router = useRouter()
const reviewId = ref(route.params.id)

// 评价数据
const loading = ref(true)
const review = ref(null)

// 回复对话框
const replyDialogVisible = ref(false)
const replyFormRef = ref(null)
const replyForm = reactive({
  content: ''
})
const submitting = ref(false)

// 获取评价详情
const fetchReviewDetail = async () => {
  loading.value = true
  
  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // 模拟数据
    review.value = {
      id: reviewId.value,
      userId: 101,
      username: '张先生',
      avatar: '/src/assets/images/users/user1.jpg',
      projectId: 1,
      projectName: '热气球观光之旅',
      orderId: 1001,
      rating: 5,
      content: '体验非常棒！热气球飞行让人惊叹，视野非常开阔，看到了整个城市的美景。服务人员专业又热情，全程感觉很安全。强烈推荐给想要尝试新鲜事物的朋友们！',
      createTime: '2023-08-16 09:23:45',
      images: [
        '/src/assets/images/reviews/review1-1.jpg',
        '/src/assets/images/reviews/review1-2.jpg'
      ],
      tags: ['服务热情', '体验好', '风景美', '安全有保障', '值得推荐'],
      replied: true,
      merchantReply: '感谢您的好评！很高兴您喜欢我们的热气球体验，期待您下次再来参与我们的其他空中项目！',
      replyTime: '2023-08-16 15:30:22'
    }
    
    // 初始化回复表单
    replyForm.content = review.value.merchantReply || ''
  } catch (error) {
    ElMessage.error('获取评价详情失败：' + (error.message || '未知错误'))
  } finally {
    loading.value = false
  }
}

// 返回列表
const goBack = () => {
  router.push('/admin/reviews')
}

// 查看项目
const viewProject = (projectId) => {
  router.push(`/admin/projects/detail/${projectId}`)
}

// 查看订单
const viewOrder = (orderId) => {
  router.push(`/admin/orders/detail/${orderId}`)
}

// 处理回复
const handleReply = () => {
  replyDialogVisible.value = true
}

// 编辑回复
const handleEditReply = () => {
  replyForm.content = review.value.merchantReply || ''
  replyDialogVisible.value = true
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
    review.value.merchantReply = replyForm.content
    review.value.replied = true
    review.value.replyTime = new Date().toLocaleString()
    
    ElMessage.success('回复成功')
    replyDialogVisible.value = false
  } catch (error) {
    ElMessage.error('提交回复失败：' + (error.message || '未知错误'))
  } finally {
    submitting.value = false
  }
}

// 组件挂载时获取数据
onMounted(() => {
  fetchReviewDetail()
})
</script>

<style scoped>
.review-detail-page {
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
  flex-direction: column;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  line-height: 1.2;
}

.page-subtitle {
  font-size: 14px;
  color: #909399;
  margin-top: 4px;
}

.loading-container {
  padding: 20px;
}

.review-detail-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.review-card {
  margin-bottom: 20px;
}

.review-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-details {
  margin-left: 15px;
}

.username {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 5px;
}

.user-id {
  font-size: 14px;
  color: #909399;
}

.review-meta {
  text-align: right;
}

.review-time {
  font-size: 14px;
  color: #909399;
  margin-bottom: 5px;
}

.review-rating {
  display: flex;
  align-items: center;
}

.rating-label {
  margin-right: 5px;
}

.review-project {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.label {
  font-weight: 500;
  color: #606266;
  margin-right: 5px;
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
  margin-bottom: 15px;
}

.review-image {
  width: 120px;
  height: 120px;
  border-radius: 4px;
  object-fit: cover;
}

.review-tags {
  margin-bottom: 20px;
}

.tag-item {
  margin-right: 8px;
  margin-bottom: 8px;
}

.merchant-reply {
  padding: 10px 0;
}

.reply-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.reply-time {
  font-size: 14px;
  color: #909399;
}

.reply-text {
  line-height: 1.6;
  padding: 10px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.related-info-card {
  margin-bottom: 20px;
}

.info-item {
  margin-bottom: 10px;
  display: flex;
}

.info-item .label {
  width: 120px;
}

.info-item .value {
  font-weight: 500;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}
</style>

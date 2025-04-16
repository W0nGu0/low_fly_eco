<template>
  <div class="feedback-page">
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-3xl mx-auto">
        <h1 class="text-2xl font-bold mb-6">评价与反馈</h1>
        
        <!-- 订单信息 -->
        <el-card class="mb-6" v-if="order">
          <div class="order-info">
            <div class="order-header flex justify-between items-center mb-4">
              <h3 class="text-lg font-semibold">{{ order.projectName }}</h3>
              <div class="order-number text-gray-500">订单号：{{ order.orderNumber }}</div>
            </div>
            <div class="order-detail flex">
              <div class="order-image mr-4 hidden sm:block">
                <img :src="order.projectImage" alt="项目图片" class="w-24 h-24 object-cover rounded-md">
              </div>
              <div class="order-info flex-1">
                <div class="info-item mb-2">
                  <span class="label text-gray-500">体验时间：</span>
                  <span>{{ order.bookingTime }}</span>
                </div>
                <div class="info-item mb-2">
                  <span class="label text-gray-500">人数：</span>
                  <span>{{ order.peopleCount }}人</span>
                </div>
                <div class="info-item mb-2">
                  <span class="label text-gray-500">订单金额：</span>
                  <span class="text-primary font-bold">¥{{ order.amount }}</span>
                </div>
              </div>
            </div>
          </div>
        </el-card>
        
        <!-- 评价表单 -->
        <el-form 
          ref="reviewFormRef" 
          :model="reviewForm" 
          :rules="reviewRules" 
          label-position="top"
          class="review-form p-6 bg-white rounded-lg shadow-sm">
          
          <!-- 整体评分 -->
          <el-form-item label="整体评分" prop="rating" class="mb-6">
            <div class="flex items-center">
              <el-rate
                v-model="reviewForm.rating"
                :colors="rateColors"
                :texts="rateTexts"
                show-text
                @change="handleRatingChange">
              </el-rate>
            </div>
          </el-form-item>
          
          <!-- 项目体验评分 -->
          <div class="detailed-rating mb-6">
            <h3 class="text-lg font-semibold mb-3">细项评分</h3>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="项目体验" prop="experienceRating">
                  <el-rate v-model="reviewForm.experienceRating" :colors="rateColors"></el-rate>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="服务态度" prop="serviceRating">
                  <el-rate v-model="reviewForm.serviceRating" :colors="rateColors"></el-rate>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="性价比" prop="valueRating">
                  <el-rate v-model="reviewForm.valueRating" :colors="rateColors"></el-rate>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          
          <!-- 评价内容 -->
          <el-form-item label="评价内容" prop="content" class="mb-6">
            <el-input
              v-model="reviewForm.content"
              type="textarea"
              :rows="5"
              placeholder="请分享您的体验感受，您的评价对其他用户很有帮助"
              maxlength="500"
              show-word-limit>
            </el-input>
          </el-form-item>
          
          <!-- 快速评价标签 -->
          <div class="quick-tags mb-6">
            <div class="text-sm text-gray-500 mb-2">快速评价（点击添加）</div>
            <div class="tags-container flex flex-wrap gap-2">
              <el-tag
                v-for="tag in quickTags"
                :key="tag"
                :effect="reviewForm.tags.includes(tag) ? 'dark' : 'plain'"
                @click="toggleTag(tag)"
                class="cursor-pointer">
                {{ tag }}
              </el-tag>
            </div>
          </div>
          
          <!-- 上传照片 -->
          <el-form-item label="上传照片（可选）" class="mb-6">
            <el-upload
              action="#"
              list-type="picture-card"
              :auto-upload="false"
              :limit="6"
              :on-change="handleImageChange"
              :on-remove="handleImageRemove"
              :file-list="reviewForm.images"
              :multiple="true"
              accept="image/*">
              <template #default>
                <el-icon><Plus /></el-icon>
              </template>
              <template #file="{ file }">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                <span class="el-upload-list__item-actions">
                  <span class="el-upload-list__item-preview" @click="previewImage(file)">
                    <el-icon><ZoomIn /></el-icon>
                  </span>
                  <span class="el-upload-list__item-delete" @click="handleImageRemove(file)">
                    <el-icon><Delete /></el-icon>
                  </span>
                </span>
              </template>
            </el-upload>
            <div class="text-xs text-gray-500 mt-1">
              支持jpg、png、gif格式，单张不超过5MB，最多可上传6张
            </div>
          </el-form-item>
          
          <!-- 是否匿名评价 -->
          <el-form-item class="mb-6">
            <el-checkbox v-model="reviewForm.isAnonymous">匿名评价</el-checkbox>
          </el-form-item>
          
          <!-- 提交按钮 -->
          <el-form-item>
            <el-button type="primary" @click="submitReview" :loading="submitting" class="w-full">提交评价</el-button>
          </el-form-item>
        </el-form>
        
        <!-- 我的评价列表 -->
        <div class="my-reviews mt-10">
          <h2 class="text-xl font-bold mb-4">我的评价</h2>
          
          <el-tabs v-model="reviewsActiveTab">
            <el-tab-pane label="全部评价" name="all">
              <div class="reviews-list">
                <el-empty v-if="myReviews.length === 0" description="暂无评价"></el-empty>
                
                <div v-for="(review, index) in myReviews" :key="index" class="review-item card p-4 mb-4">
                  <div class="review-header flex justify-between items-center mb-3">
                    <div class="project-info">
                      <h3 class="text-lg font-medium">{{ review.projectName }}</h3>
                      <div class="text-sm text-gray-500">{{ review.date }}</div>
                    </div>
                    <div class="review-rating">
                      <el-rate v-model="review.rating" disabled></el-rate>
                    </div>
                  </div>
                  
                  <div class="review-content mb-3">
                    <div class="review-text mb-3">{{ review.content }}</div>
                    
                    <div class="review-tags flex flex-wrap gap-1 mb-3" v-if="review.tags.length > 0">
                      <el-tag v-for="tag in review.tags" :key="tag" size="small" effect="plain">{{ tag }}</el-tag>
                    </div>
                    
                    <div class="review-images flex flex-wrap gap-2" v-if="review.images.length > 0">
                      <div v-for="(img, imgIndex) in review.images" :key="imgIndex" class="review-image-item">
                        <el-image
                          style="width: 80px; height: 80px"
                          :src="img.url"
                          :preview-src-list="review.images.map(item => item.url)">
                        </el-image>
                      </div>
                    </div>
                  </div>
                  
                  <div class="merchant-reply bg-gray-50 p-3 rounded-lg" v-if="review.merchantReply">
                    <div class="reply-header text-sm font-medium mb-1">商家回复：</div>
                    <div class="reply-content text-sm">{{ review.merchantReply }}</div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            
            <el-tab-pane label="待评价" name="pending">
              <div class="pending-reviews-list">
                <el-empty v-if="pendingReviews.length === 0" description="暂无待评价订单"></el-empty>
                
                <div v-for="(order, index) in pendingReviews" :key="index" class="pending-review-item card p-4 mb-4">
                  <div class="flex justify-between items-center">
                    <div class="order-info">
                      <h3 class="text-lg font-medium">{{ order.projectName }}</h3>
                      <div class="text-sm text-gray-500">订单号：{{ order.orderNumber }}</div>
                      <div class="text-sm text-gray-500">体验时间：{{ order.bookingTime }}</div>
                    </div>
                    <div class="order-action">
                      <el-button type="primary" size="small" @click="goToReview(order.id)">去评价</el-button>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    
    <!-- 图片预览 -->
    <el-dialog v-model="showImagePreview" title="图片预览" width="50%">
      <img :src="previewUrl" alt="Preview" style="width: 100%;">
    </el-dialog>
    
    <!-- 评价成功对话框 -->
    <el-dialog
      v-model="showSuccessDialog"
      title="评价成功"
      width="400px"
      center>
      <div class="success-content text-center">
        <el-icon class="success-icon text-green-500 text-6xl mb-4"><CircleCheck /></el-icon>
        <h3 class="text-xl font-bold mb-3">评价提交成功</h3>
        <p class="text-gray-500 mb-4">感谢您的评价，您的反馈对我们非常重要！</p>
      </div>
      <template #footer>
        <div class="dialog-footer flex justify-center gap-4">
          <el-button @click="goToOrders">查看我的订单</el-button>
          <el-button type="primary" @click="goToProjects">浏览更多项目</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Plus, ZoomIn, Delete, CircleCheck } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()

// 评价选项卡
const reviewsActiveTab = ref('all')
const previewUrl = ref('')
const showImagePreview = ref(false)
const showSuccessDialog = ref(false)
const submitting = ref(false)

// 评分颜色和文本
const rateColors = ['#F56C6C', '#E6A23C', '#909399', '#67C23A', '#409EFF']
const rateTexts = ['非常差', '较差', '一般', '不错', '很棒']

// 快速评价标签
const quickTags = [
  '服务热情', '体验好', '风景美', '安全有保障', '专业细致', 
  '价格合理', '交通便利', '氛围好', '设备完善', '适合拍照',
  '值得推荐', '性价比高', '干净整洁', '讲解详细', '准时出行'
]

// 当前订单信息
const order = ref(null)

// 评价表单
const reviewFormRef = ref(null)
const reviewForm = reactive({
  rating: 5,
  experienceRating: 5,
  serviceRating: 5,
  valueRating: 5,
  content: '',
  tags: [],
  images: [],
  isAnonymous: false
})

// 表单验证规则
const reviewRules = {
  rating: [
    { required: true, message: '请给予整体评分', trigger: 'change' }
  ],
  experienceRating: [
    { required: true, message: '请评价项目体验', trigger: 'change' }
  ],
  serviceRating: [
    { required: true, message: '请评价服务态度', trigger: 'change' }
  ],
  valueRating: [
    { required: true, message: '请评价性价比', trigger: 'change' }
  ],
  content: [
    { required: true, message: '请填写评价内容', trigger: 'blur' },
    { min: 5, message: '评价内容不能少于5个字符', trigger: 'blur' }
  ]
}

// 我的评价列表
const myReviews = ref([
  {
    id: 1,
    projectName: '城市热气球观光之旅',
    date: '2023-07-15',
    rating: 5,
    content: '热气球观光太棒了！第一次体验，非常震撼，服务人员专业又细心，全程感觉非常安全，拍出来的照片也很美，值得推荐！',
    tags: ['体验好', '服务热情', '安全有保障', '值得推荐'],
    images: [
      { url: '/src/assets/images/projects/review1-1.jpg' },
      { url: '/src/assets/images/projects/review1-2.jpg' }
    ],
    merchantReply: '感谢您的评价！我们非常高兴您喜欢我们的热气球观光服务。期待您下次再来体验其他项目！'
  }
])

// 待评价列表
const pendingReviews = ref([
  {
    id: 2,
    orderNumber: 'ORD20230820002',
    projectName: '直升机空中游览',
    bookingTime: '2023-08-20 14:00-15:00'
  }
])

// 处理评分变化
function handleRatingChange(value) {
  reviewForm.rating = value
}

// 切换标签
function toggleTag(tag) {
  const index = reviewForm.tags.indexOf(tag)
  if (index > -1) {
    reviewForm.tags.splice(index, 1)
  } else {
    reviewForm.tags.push(tag)
  }
}

// 处理图片变化
function handleImageChange(file, fileList) {
  // 检查文件大小
  if (file.size / 1024 / 1024 > 5) {
    ElMessage.error('图片大小不能超过5MB')
    const index = fileList.indexOf(file)
    if (index > -1) {
      fileList.splice(index, 1)
    }
    return
  }
  
  // 检查文件类型
  const acceptTypes = ['image/jpeg', 'image/png', 'image/gif']
  if (!acceptTypes.includes(file.type)) {
    ElMessage.error('只支持jpg、png、gif格式的图片')
    const index = fileList.indexOf(file)
    if (index > -1) {
      fileList.splice(index, 1)
    }
    return
  }
  
  reviewForm.images = fileList
}

// 删除图片
function handleImageRemove(file) {
  const index = reviewForm.images.findIndex(img => img.uid === file.uid)
  if (index > -1) {
    reviewForm.images.splice(index, 1)
  }
}

// 预览图片
function previewImage(file) {
  previewUrl.value = file.url
  showImagePreview.value = true
}

// 提交评价
async function submitReview() {
  reviewFormRef.value.validate(async (valid) => {
    if (valid) {
      submitting.value = true
      
      try {
        // 实际项目中应调用API提交评价
        // 准备评价数据
        const reviewData = {
          orderId: order.value.id,
          rating: reviewForm.rating,
          experienceRating: reviewForm.experienceRating,
          serviceRating: reviewForm.serviceRating,
          valueRating: reviewForm.valueRating,
          content: reviewForm.content,
          tags: reviewForm.tags,
          isAnonymous: reviewForm.isAnonymous,
          images: reviewForm.images.map(img => img.raw) // 实际上传应该使用FormData
        }
        
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // 显示成功对话框
        showSuccessDialog.value = true
        
        // 重置表单
        resetForm()
      } catch (error) {
        ElMessage.error(error.message || '提交评价失败，请稍后再试')
      } finally {
        submitting.value = false
      }
    }
  })
}

// 重置表单
function resetForm() {
  reviewForm.rating = 5
  reviewForm.experienceRating = 5
  reviewForm.serviceRating = 5
  reviewForm.valueRating = 5
  reviewForm.content = ''
  reviewForm.tags = []
  reviewForm.images = []
  reviewForm.isAnonymous = false
}

// 前往评价
function goToReview(orderId) {
  // 重置当前页面状态
  resetForm()
  
  // 模拟加载订单数据
  loadOrderData(orderId)
  
  // 滚动到页面顶部
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// 加载订单数据
function loadOrderData(orderId) {
  const pendingOrder = pendingReviews.value.find(o => o.id === orderId)
  
  if (pendingOrder) {
    order.value = {
      id: pendingOrder.id,
      orderNumber: pendingOrder.orderNumber,
      projectName: pendingOrder.projectName,
      bookingTime: pendingOrder.bookingTime,
      projectImage: orderId === 2 ? '/src/assets/images/projects/helicopter.jpg' : '/src/assets/images/projects/drone.jpg',
      peopleCount: 2,
      amount: 1280
    }
  }
}

// 前往订单页面
function goToOrders() {
  showSuccessDialog.value = false
  router.push('/user/orders')
}

// 前往项目列表
function goToProjects() {
  showSuccessDialog.value = false
  router.push('/user/projects')
}

// 生命周期钩子
onMounted(() => {
  // 从URL参数获取订单ID
  const orderId = route.query.orderId
  
  if (orderId) {
    // 加载订单数据
    loadOrderData(Number(orderId))
  }
})
</script>

<style scoped>
.feedback-page {
  background-color: #f8f9fa;
  min-height: 100vh;
}

.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
}

.text-primary {
  color: #409EFF;
}

.review-form {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
}

.success-icon {
  font-size: 64px;
  color: #67C23A;
}
</style>

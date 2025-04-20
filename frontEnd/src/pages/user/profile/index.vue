<template>
  <div class="profile-container min-h-screen">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8 text-emerald-800 animate__animated animate__fadeInDown">个人中心</h1>

      <el-row :gutter="30">
        <!-- 左侧个人信息卡片 -->
        <el-col :md="8" :sm="24">
          <div class="profile-card card p-6 mb-6 rounded-xl shadow-sm bg-white animate__animated animate__fadeInLeft hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div class="user-avatar-container text-center mb-6">
              <el-avatar
                :size="120"
                :src="userInfo.avatar"
                @error="handleAvatarError"
                class="border-4 border-emerald-100 shadow-md hover:border-emerald-200 transition-all duration-300">
              </el-avatar>
              <div class="mt-4">
                <el-button type="success" size="small" plain @click="changeAvatar" class="text-sm hover:bg-emerald-50">
                  <i class="el-icon-camera mr-1"></i>更换头像
                </el-button>
              </div>
            </div>
            <h2 class="text-xl font-bold text-center mb-6 text-emerald-700">{{ userInfo.nickname }}</h2>
            <div class="user-info">
              <p class="mb-4 flex items-center p-3 rounded-lg hover:bg-emerald-50 transition-colors animate__animated animate__fadeIn" style="animation-delay: 0.1s">
                <i class="el-icon-user mr-2 text-emerald-500"></i>
                <span class="label text-gray-500">用户名:</span>
                <span class="value ml-auto font-medium text-emerald-700">{{ userInfo.username }}</span>
              </p>
              <p class="mb-4 flex items-center p-3 rounded-lg hover:bg-emerald-50 transition-colors animate__animated animate__fadeIn" style="animation-delay: 0.2s">
                <i class="el-icon-phone mr-2 text-emerald-500"></i>
                <span class="label text-gray-500">手机号:</span>
                <span class="value ml-auto font-medium text-emerald-700">{{ userInfo.phone }}</span>
              </p>
              <p class="mb-4 flex items-center p-3 rounded-lg hover:bg-emerald-50 transition-colors animate__animated animate__fadeIn" style="animation-delay: 0.3s">
                <i class="el-icon-message mr-2 text-emerald-500"></i>
                <span class="label text-gray-500">邮箱:</span>
                <span class="value ml-auto font-medium text-emerald-700">{{ userInfo.email }}</span>
              </p>
              <p class="mb-4 flex items-center p-3 rounded-lg hover:bg-emerald-50 transition-colors animate__animated animate__fadeIn" style="animation-delay: 0.4s">
                <i class="el-icon-trophy mr-2 text-emerald-500"></i>
                <span class="label text-gray-500">会员等级:</span>
                <span class="value ml-auto font-medium text-emerald-700">{{ userInfo.level }}</span>
              </p>
              <p class="mb-4 flex items-center p-3 rounded-lg hover:bg-emerald-50 transition-colors animate__animated animate__fadeIn" style="animation-delay: 0.5s">
                <i class="el-icon-date mr-2 text-emerald-500"></i>
                <span class="label text-gray-500">注册时间:</span>
                <span class="value ml-auto font-medium text-emerald-700">{{ userInfo.registerDate }}</span>
              </p>
            </div>
            <div class="user-actions mt-6 flex flex-col gap-3">
              <el-button
                type="success"
                @click="showEditProfileDialog = true"
                class="w-full py-3 bg-emerald-500 hover:bg-emerald-600 transition-colors">
                <i class="el-icon-edit mr-1"></i>编辑个人信息
              </el-button>
              <el-button
                type="warning"
                @click="showChangePasswordDialog = true"
                class="w-full py-3 bg-amber-500 hover:bg-amber-600 transition-colors">
                <i class="el-icon-lock mr-1"></i>修改密码
              </el-button>
            </div>
          </div>
        </el-col>

        <!-- 右侧内容 -->
        <el-col :md="16" :sm="24">
          <!-- 统计卡片 -->
          <div class="stats-cards animate__animated animate__fadeInRight">
            <el-row :gutter="20">
              <el-col :sm="8" :xs="24">
                <div class="stats-card card p-5 text-center mb-4 sm:mb-0 rounded-xl shadow-sm bg-gradient-to-br from-emerald-500 to-emerald-600 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div class="stats-icon mb-3 text-white text-3xl animate__animated animate__bounceIn">
                    <i class="el-icon-shopping-cart-full"></i>
                  </div>
                  <h3 class="text-lg font-medium mb-2 text-white">预订次数</h3>
                  <p class="text-3xl font-bold text-white">{{ stats.orderCount }}</p>
                </div>
              </el-col>
              <el-col :sm="8" :xs="24">
                <div class="stats-card card p-5 text-center mb-4 sm:mb-0 rounded-xl shadow-sm bg-gradient-to-br from-blue-500 to-blue-600 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1" style="animation-delay: 0.2s">
                  <div class="stats-icon mb-3 text-white text-3xl animate__animated animate__bounceIn" style="animation-delay: 0.2s">
                    <i class="el-icon-money"></i>
                  </div>
                  <h3 class="text-lg font-medium mb-2 text-white">累计消费</h3>
                  <p class="text-3xl font-bold text-white">¥{{ stats.totalSpent }}</p>
                </div>
              </el-col>
              <el-col :sm="8" :xs="24">
                <div class="stats-card card p-5 text-center rounded-xl shadow-sm bg-gradient-to-br from-amber-500 to-amber-600 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1" style="animation-delay: 0.4s">
                  <div class="stats-icon mb-3 text-white text-3xl animate__animated animate__bounceIn" style="animation-delay: 0.4s">
                    <i class="el-icon-star-on"></i>
                  </div>
                  <h3 class="text-lg font-medium mb-2 text-white">评价数量</h3>
                  <p class="text-3xl font-bold text-white">{{ stats.reviewCount }}</p>
                </div>
              </el-col>
            </el-row>
          </div>

          <!-- 间距 div -->
          <div style="height: 2.5rem;"></div>

          <!-- 最近预订 -->
          <div class="recent-orders card p-6 rounded-xl shadow-sm bg-white animate__animated animate__fadeInUp hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div class="section-header flex justify-between items-center mb-4">
              <h2 class="text-xl font-bold text-emerald-800 flex items-center">
                <i class="el-icon-document mr-2 text-emerald-500"></i>
                最近预订
              </h2>
              <router-link to="/user/orders" class="view-all-btn">
                查看全部 <i class="el-icon-arrow-right ml-1"></i>
              </router-link>
            </div>
            <el-table
              :data="recentOrders"
              style="width: 100%"
              class="border rounded-lg overflow-hidden"
              :row-class-name="tableRowClassName"
            >
              <el-table-column prop="orderDate" label="预订日期" width="120">
                <template #default="scope">
                  <span class="text-gray-600">{{ scope.row.orderDate }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="projectName" label="项目名称">
                <template #default="scope">
                  <span class="text-emerald-700 font-medium">{{ scope.row.projectName }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="price" label="价格" width="100">
                <template #default="scope">
                  <span class="text-emerald-500 font-medium">¥{{ scope.row.price }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="status" label="状态" width="100">
                <template #default="scope">
                  <el-tag
                    :type="getStatusType(scope.row.status)"
                    size="small"
                    class="px-2 py-1"
                    effect="light"
                  >
                    {{ scope.row.status }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="120">
                <template #default="scope">
                  <el-button
                    type="success"
                    size="small"
                    plain
                    @click="viewOrderDetail(scope.row.id)"
                    class="hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                  >
                    查看详情
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <!-- 间距 div -->
          <div style="height: 2.5rem;"></div>

          <!-- 我的评价 -->
          <div class="my-reviews card p-6 rounded-xl shadow-sm bg-white animate__animated animate__fadeInUp hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div class="section-header flex justify-between items-center mb-4">
              <h2 class="text-xl font-bold text-emerald-800 flex items-center">
                <i class="el-icon-star-on mr-2 text-emerald-500"></i>
                我的评价
              </h2>
              <router-link to="/user/feedback" class="view-all-btn">
                查看全部 <i class="el-icon-arrow-right ml-1"></i>
              </router-link>
            </div>

            <div v-if="recentReviews.length === 0" class="empty-reviews py-8 text-center">
              <el-empty description="暂无评价记录"></el-empty>
            </div>

            <div v-else class="reviews-list">
              <div v-for="(review, index) in recentReviews"
                   :key="index"
                   class="review-item p-4 border-b last:border-b-0 hover:bg-emerald-50 transition-colors animate__animated animate__fadeIn"
                   :style="{ animationDelay: `${index * 0.2}s` }">
                <div class="review-header flex justify-between items-start mb-2">
                  <div class="project-name font-medium text-emerald-700">{{ review.projectName }}</div>
                  <div class="review-date text-sm text-gray-500">{{ review.reviewDate }}</div>
                </div>
                <div class="review-rating mb-2">
                  <el-rate
                    v-model="review.rating"
                    disabled
                    :colors="['#10B981', '#10B981', '#10B981']"
                    text-color="#10B981"
                  ></el-rate>
                </div>
                <div class="review-content text-gray-600 mb-2 line-clamp-2">{{ review.content }}</div>
                <div class="review-images flex gap-2 animate__animated animate__fadeIn" v-if="review.images && review.images.length > 0">
                  <el-image
                    v-for="(image, imgIndex) in review.images"
                    :key="imgIndex"
                    :src="image"
                    :preview-src-list="review.images"
                    fit="cover"
                    class="w-16 h-16 rounded-md cursor-pointer hover:opacity-90 transition-opacity"
                  ></el-image>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 编辑个人信息对话框 -->
    <el-dialog
      v-model="showEditProfileDialog"
      title="编辑个人信息"
      width="500px"
      center
      class="animate__animated animate__zoomIn"
    >
      <el-form
        ref="editProfileFormRef"
        :model="editProfileForm"
        :rules="editProfileRules"
        label-width="100px"
      >
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="editProfileForm.nickname" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="editProfileForm.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editProfileForm.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showEditProfileDialog = false">取消</el-button>
          <el-button type="success" @click="submitEditProfile" :loading="submitting">保存</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 修改密码对话框 -->
    <el-dialog
      v-model="showChangePasswordDialog"
      title="修改密码"
      width="500px"
      center
      class="animate__animated animate__zoomIn"
    >
      <el-form
        ref="changePasswordFormRef"
        :model="changePasswordForm"
        :rules="changePasswordRules"
        label-width="100px"
      >
        <el-form-item label="原密码" prop="oldPassword">
          <el-input
            v-model="changePasswordForm.oldPassword"
            type="password"
            placeholder="请输入原密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input
            v-model="changePasswordForm.newPassword"
            type="password"
            placeholder="请输入新密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
            v-model="changePasswordForm.confirmPassword"
            type="password"
            placeholder="请再次输入新密码"
            show-password
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showChangePasswordDialog = false">取消</el-button>
          <el-button type="success" @click="submitChangePassword" :loading="submitting">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { getImageUrl } from '@/utils/imageHelper'

const router = useRouter()

// 提交状态
const submitting = ref(false)

// 表单引用
const editProfileFormRef = ref(null)
const changePasswordFormRef = ref(null)

// 个人信息
const userInfo = ref({
  username: 'user123',
  nickname: '张三',
  phone: '138****1234',
  email: 'zhangsan@example.com',
  avatar: '@/assets/images/avatars/avatar3.jpg',
  level: '黄金会员',
  registerDate: '2023-01-15'
})

// 编辑表单
const editProfileForm = reactive({
  nickname: '',
  phone: '',
  email: ''
})

// 编辑表单验证规则
const editProfileRules = {
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 2, max: 20, message: '昵称长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ]
}

// 密码表单
const changePasswordForm = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// 密码校验规则
const changePasswordRules = {
  oldPassword: [
    { required: true, message: '请输入原密码', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== changePasswordForm.newPassword) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

// 对话框状态
const showEditProfileDialog = ref(false)
const showChangePasswordDialog = ref(false)

// 统计数据
const stats = ref({
  orderCount: 12,
  totalSpent: 9680,
  reviewCount: 8
})

// 最近预订
const recentOrders = ref([
  {
    id: 1,
    orderDate: '2023-09-15',
    projectName: '直升机空中游览',
    price: 1280,
    status: '已完成'
  },
  {
    id: 2,
    orderDate: '2023-08-20',
    projectName: '热气球观光之旅',
    price: 688,
    status: '已完成'
  },
  {
    id: 3,
    orderDate: '2023-10-05',
    projectName: '山地动力伞飞行',
    price: 1580,
    status: '待体验'
  }
])

// 最近评价
const recentReviews = ref([
  {
    id: 1,
    projectName: '直升机空中游览',
    rating: 4.8,
    reviewDate: '2023-09-20',
    content: '非常棒的体验！专业的飞行员和优质的服务，让整个旅程都很享受。',
    images: [
      '/images/reviews/review1.jpg',
      '/images/reviews/review2.jpg'
    ]
  },
  {
    id: 2,
    projectName: '热气球观光之旅',
    rating: 4.5,
    reviewDate: '2023-08-25',
    content: '日出时分的热气球之旅太美了，工作人员很专业，整体体验很好。',
    images: [
      '/images/reviews/review3.jpg'
    ]
  }
])

// 表格行样式
const tableRowClassName = ({ row, rowIndex }) => {
  return 'hover:bg-emerald-50 transition-colors'
}

// 获取状态对应的样式类型
const getStatusType = (status) => {
  switch (status) {
    case '待支付':
      return 'warning'
    case '待体验':
      return 'success'
    case '已完成':
      return ''
    case '已取消':
      return 'info'
    default:
      return ''
  }
}

// 处理评价图片路径
const processReviewImages = () => {
  recentReviews.value.forEach(review => {
    review.images = review.images.map(img => {
      if (img.startsWith('http') || img.startsWith('/')) {
        return img
      }
      return getImageUrl(img)
    })
  })
}

// 初始化编辑表单
const initEditForm = () => {
  editProfileForm.nickname = userInfo.value.nickname
  editProfileForm.phone = userInfo.value.phone
  editProfileForm.email = userInfo.value.email
}

// 保存个人信息
const submitEditProfile = async () => {
  if (!editProfileFormRef.value) return

  try {
    submitting.value = true
    await editProfileFormRef.value.validate()

    // TODO: 调用接口保存数据
    userInfo.value.nickname = editProfileForm.nickname
    userInfo.value.phone = editProfileForm.phone
    userInfo.value.email = editProfileForm.email

    ElMessage.success('个人信息保存成功')
    showEditProfileDialog.value = false
  } catch (error) {
    console.error('表单验证失败:', error)
  } finally {
    submitting.value = false
  }
}

// 修改密码
const submitChangePassword = async () => {
  if (!changePasswordFormRef.value) return

  try {
    submitting.value = true
    await changePasswordFormRef.value.validate()

    // TODO: 调用接口修改密码
    ElMessage.success('密码修改成功，请重新登录')
    showChangePasswordDialog.value = false
    // router.push('/login')
  } catch (error) {
    console.error('表单验证失败:', error)
  } finally {
    submitting.value = false
  }
}

// 查看订单详情
const viewOrderDetail = (orderId) => {
  router.push(`/user/orders/${orderId}`)
}

// 更换头像
const changeAvatar = () => {
  // TODO: 实现头像上传功能
  ElMessage.info('头像上传功能开发中')
}

// 添加头像加载错误处理
const handleAvatarError = () => {
  userInfo.value.avatar = getImageUrl('@/assets/images/avatars/avatar3.jpg')
}

// 页面加载时初始化
onMounted(() => {
  // 处理头像路径
  userInfo.value.avatar = getImageUrl(userInfo.value.avatar)
  // 处理评价图片
  processReviewImages()
  // 初始化编辑表单
  initEditForm()
})
</script>

<style scoped>
.profile-container {
  min-height: calc(100vh - 64px - 180px);
  /* 背景色已在布局文件中设置为 #d1faba */
}

.card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.15);
}

.user-info .label {
  color: #606266;
  margin-right: 8px;
}

.user-info .value {
  color: #10B981;
  font-weight: 500;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 添加渐变背景动画 */
@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.stats-card {
  background-size: 200% 200%;
  animation: gradientBG 5s ease infinite;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.stats-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.2);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .stats-cards .el-col {
    margin-bottom: 20px;
  }
}

.user-actions {
  display: flex;
  flex-direction: column;
  gap: 12px; /* 或者使用 gap-3 类 */
}

/* 确保按钮具有相同的高度 */
.user-actions .el-button {
  height: 40px;
  margin: 0; /* 移除默认的按钮边距 */
}

.view-all-btn {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  background-color: #e6f7f1;
  color: #10b981;
  border-radius: 6px;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  text-decoration: none;
}

.view-all-btn:hover {
  background-color: #d1f5e9;
  transform: translateY(-1px);
}

.view-all-btn i {
  transition: transform 0.3s ease;
}

.view-all-btn:hover i {
  transform: translateX(2px);
}

/* 添加卡片内容缩放效果 */
.profile-card:hover .user-avatar-container,
.recent-orders:hover .section-header,
.my-reviews:hover .section-header {
  transform: scale(1.02);
  transition: transform 0.3s ease;
}
</style>

<template>
  <div class="login-container fade-in card-gradient hover-lift">
    <!-- 暂时注释掉主题切换组件 -->
    <!-- <div class="absolute top-4 right-4">
      <theme-switcher />
    </div> -->
    <h2 class="title title-gradient">欢迎回来</h2>
    <p class="subtitle">请登录您的账号</p>

    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      @submit.prevent="handleLogin"
    >
      <!-- 添加用户类型选择 -->
      <el-form-item class="user-type-selector">
        <el-radio-group v-model="loginForm.userType" size="large">
          <el-radio-button label="user">用户登录</el-radio-button>
          <el-radio-button label="admin">管理员登录</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          placeholder="用户名/手机号/邮箱"
          class="custom-input"
        >
          <template #prefix>
            <el-icon class="input-icon"><User /></el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          placeholder="密码"
          show-password
          @keyup.enter="handleLogin"
          class="custom-input"
        >
          <template #prefix>
            <el-icon class="input-icon"><Lock /></el-icon>
          </template>
        </el-input>
      </el-form-item>

      <div class="login-options">
        <el-checkbox v-model="rememberMe">记住我</el-checkbox>
        <router-link to="/auth/forgot-password" class="forgot-link link-hover">忘记密码?</router-link>
      </div>

      <button
        type="button"
        :disabled="isLoading"
        class="login-button btn-gradient-primary btn-hover"
        @click="handleLogin"
      >
        <span v-if="isLoading" class="loading-spinner"></span>
        <span>登录</span>
      </button>
    </el-form>

    <div class="other-links">
      <p>
        还没有账号?
        <router-link to="/auth/register" class="register-link link-hover">立即注册</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import { useUserStore } from '@/store/user'
// 暂时注释掉主题切换组件
// import ThemeSwitcher from '@/components/ThemeSwitcher.vue'

const router = useRouter()
const userStore = useUserStore()

// 表单数据
const loginFormRef = ref(null)
const loginForm = reactive({
  username: '',
  password: '',
  userType: 'user' // 默认为普通用户
})

// 记住我选项
const rememberMe = ref(false)

// 加载状态
const isLoading = ref(false)

// 表单验证规则
const loginRules = {
  username: [
    { required: true, message: '请输入用户名/手机号/邮箱', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度至少为6位', trigger: 'blur' }
  ]
}

// 登录方法
const handleLogin = async () => {
  if (!loginFormRef.value) return

  await loginFormRef.value.validate(async (valid) => {
    if (!valid) {
      return false
    }

    try {
      isLoading.value = true

      // 调用store中的登录方法
      await userStore.login({
        username: loginForm.username,
        password: loginForm.password,
        remember: rememberMe.value
      })

      ElMessage.success('登录成功')

      // 根据用户类型跳转到不同的页面
      let redirectPath = '/user/home'
      
      // 如果选择的是管理员登录
      if (loginForm.userType === 'admin') {
        redirectPath = '/admin/home'
        
        // 检查是否是管理员账号
        if (loginForm.username !== 'admin') {
          ElMessage.warning('您使用的是普通用户账号，即将跳转到用户首页')
          redirectPath = '/user/home'
        }
      }

      // 登录成功后跳转到对应页面或之前尝试访问的页面
      const redirect = router.currentRoute.value.query?.redirect || redirectPath
      router.push(redirect)
    } catch (error) {
      ElMessage.error(error.message || '登录失败，请重试')
    } finally {
      isLoading.value = false
    }
  })
}
</script>

<style scoped>
.login-container {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(82, 196, 26, 0.1);
  background: linear-gradient(135deg, #d4e7ba, #d2ecc3);
  transition: all 0.3s ease;
  border: 1px solid rgba(82, 196, 26, 0.15);
  position: relative;
  z-index: 10;
}

.title {
  font-size: 2rem;
  margin-bottom: 0.75rem;
  text-align: center;
  line-height: 1.2;
}

.subtitle {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.login-form {
  margin-bottom: 1.5rem;
}

/* 输入框内容靠左对齐 */
:deep(.el-input__inner) {
  text-align: left;
  padding-left: 0.25rem;
}

/* 确保输入框中的占位文本靠左对齐 */
:deep(.el-input__placeholder) {
  text-align: left;
  padding-left: 0;
  margin-left: 0;
}

/* 调整图标和输入框之间的间距 */
:deep(.el-input__prefix) {
  margin-right: 0;
}

/* 调整输入框内容区域的左边距 */
:deep(.el-input__wrapper) {
  padding-left: 0.25rem;
  border: 1px solid rgba(82, 196, 26, 0.2);
  background-color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
}

:deep(.el-input__wrapper:hover) {
  border-color: rgba(82, 196, 26, 0.4);
  background-color: rgba(255, 255, 255, 0.9);
}

:deep(.el-input__wrapper.is-focus) {
  border-color: #52c41a;
  box-shadow: 0 0 0 2px rgba(82, 196, 26, 0.2);
  background-color: white;
}

/* 自定义输入框样式 */
.custom-input {
  width: 100%;
  height: 40px;
}

:deep(.el-input__wrapper) {
  height: 40px !important;
  box-sizing: border-box;
}

/* 调整图标样式 */
.input-icon {
  margin-right: 0.25rem;
  color: #666;
}

/* 调整输入框内容与图标之间的间距 */
:deep(.custom-input .el-input__wrapper) {
  padding: 0 0.75rem;
}

:deep(.custom-input .el-input__inner) {
  margin-left: 0;
  text-indent: 0;
  padding-left: 0;
}

:deep(.custom-input .el-input__prefix) {
  left: 0.25rem;
}

/* 调整占位文本的位置 */
:deep(.custom-input input::-webkit-input-placeholder) {
  text-indent: 0;
  padding-left: 0;
}

:deep(.custom-input input::-moz-placeholder) {
  text-indent: 0;
  padding-left: 0;
}

:deep(.custom-input input:-ms-input-placeholder) {
  text-indent: 0;
  padding-left: 0;
}

:deep(.custom-input .el-input__prefix-inner) {
  display: flex;
  align-items: center;
}

/* 调整输入框内容的对齐方式 */
:deep(.el-input) {
  --el-input-inner-padding-left: 30px;
}

:deep(.el-input__wrapper) {
  padding-left: 0;
}

:deep(.el-input__inner) {
  padding-left: 2rem !important;
}

.login-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
}

.forgot-link {
  color: var(--primary-500);
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s ease;
}

.forgot-link:hover {
  color: var(--primary-600);
}

.login-button {
  width: 100%;
  padding: 0.75rem 0;
  font-size: 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.login-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading-spinner {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.other-links {
  text-align: center;
  margin-top: 1.5rem;
  color: #666;
  font-size: 0.875rem;
}

.register-link {
  color: var(--primary-500);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.register-link:hover {
  color: var(--primary-600);
}

/* 添加动画效果 */
.btn-hover {
  transition: all 0.3s ease-in-out;
}

.btn-hover:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* 用户类型选择器样式 */
.user-type-selector {
  margin-bottom: 1.5rem;
  text-align: center;
}

:deep(.el-radio-group) {
  width: 100%;
  display: flex;
}

:deep(.el-radio-button) {
  flex: 1;
}

:deep(.el-radio-button__inner) {
  width: 100%;
  border-color: rgba(82, 196, 26, 0.3);
  background-color: rgba(255, 255, 255, 0.6);
  color: #666;
  transition: all 0.3s;
}

:deep(.el-radio-button__original-radio:checked + .el-radio-button__inner) {
  background-color: #52c41a;
  border-color: #52c41a;
  color: white;
  box-shadow: -1px 0 0 0 #52c41a;
}

:deep(.el-radio-button:first-child .el-radio-button__inner) {
  border-radius: 4px 0 0 4px;
}

:deep(.el-radio-button:last-child .el-radio-button__inner) {
  border-radius: 0 4px 4px 0;
}
</style>

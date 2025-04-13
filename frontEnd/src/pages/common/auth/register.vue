<template>
  <div class="register-container">
    <h2 class="title">用户注册</h2>
    <p class="subtitle">创建您的账号，开始低空飞行体验</p>
    
    <el-form 
      ref="registerFormRef" 
      :model="registerForm" 
      :rules="registerRules" 
      class="register-form" 
      @submit.prevent="handleRegister"
    >
      <!-- 用户名 -->
      <el-form-item prop="username">
        <el-input 
          v-model="registerForm.username" 
          placeholder="请输入用户名" 
        >
          <template #prefix>
            <el-icon><User /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      
      <!-- 注册方式选择 -->
      <el-form-item>
        <el-radio-group v-model="registerType" @change="handleRegisterTypeChange">
          <el-radio-button label="phone">手机注册</el-radio-button>
          <el-radio-button label="email">邮箱注册</el-radio-button>
        </el-radio-group>
      </el-form-item>
      
      <!-- 手机号 -->
      <el-form-item prop="phone" v-if="registerType === 'phone'">
        <el-input 
          v-model="registerForm.phone" 
          placeholder="请输入手机号" 
        >
          <template #prefix>
            <el-icon><Iphone /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      
      <!-- 邮箱 -->
      <el-form-item prop="email" v-if="registerType === 'email'">
        <el-input 
          v-model="registerForm.email" 
          placeholder="请输入有效邮箱" 
        >
          <template #prefix>
            <el-icon><Message /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      
      <!-- 验证码 -->
      <el-form-item prop="code" v-if="registerType !== ''">
        <div class="code-input-group">
          <el-input 
            v-model="registerForm.code" 
            placeholder="请输入验证码" 
          >
            <template #prefix>
              <el-icon><Key /></el-icon>
            </template>
          </el-input>
          <el-button 
            type="primary" 
            :disabled="isCodeSending || countdown > 0" 
            @click="sendVerificationCode"
          >
            {{ countdown > 0 ? `重新发送(${countdown}s)` : '发送验证码' }}
          </el-button>
        </div>
      </el-form-item>
      
      <!-- 密码 -->
      <el-form-item prop="password">
        <el-input 
          v-model="registerForm.password" 
          type="password" 
          placeholder="请设置密码" 
          show-password
        >
          <template #prefix>
            <el-icon><Lock /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      
      <!-- 确认密码 -->
      <el-form-item prop="confirmPassword">
        <el-input 
          v-model="registerForm.confirmPassword" 
          type="password" 
          placeholder="请确认密码" 
          show-password
          @keyup.enter="handleRegister"
        >
          <template #prefix>
            <el-icon><Lock /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      
      <!-- 用户协议 -->
      <el-form-item prop="agreement">
        <el-checkbox v-model="registerForm.agreement">
          我已阅读并同意
          <el-link type="primary" @click.stop="showAgreement">
            《用户协议》
          </el-link>
          和
          <el-link type="primary" @click.stop="showPrivacy">
            《隐私政策》
          </el-link>
        </el-checkbox>
      </el-form-item>
      
      <el-button 
        type="primary" 
        :loading="isLoading" 
        class="register-button" 
        @click="handleRegister"
      >
        注册
      </el-button>
    </el-form>
    
    <div class="other-links">
      <p>
        已有账号? 
        <router-link to="/auth/login" class="login-link">立即登录</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock, Iphone, Message, Key } from '@element-plus/icons-vue'
import { useUserStore } from '@/store/user'

const router = useRouter()
const userStore = useUserStore()

// 状态
const isLoading = ref(false)
const isCodeSending = ref(false)
const countdown = ref(0)
const registerType = ref('phone') // 默认使用手机注册
let countdownTimer = null

// 表单引用
const registerFormRef = ref(null)

// 表单数据
const registerForm = reactive({
  username: '',
  phone: '',
  email: '',
  code: '',
  password: '',
  confirmPassword: '',
  agreement: false
})

// 切换注册方式处理
const handleRegisterTypeChange = () => {
  // 切换注册方式时重置验证码相关状态
  clearInterval(countdownTimer)
  countdown.value = 0
  registerForm.code = ''
}

// 表单验证规则
const registerRules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度应在3-20个字符之间', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { min: 4, max: 6, message: '验证码长度应在4-6个字符之间', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请设置密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度应在6-20个字符之间', trigger: 'blur' },
    { 
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\S]{6,20}$/, 
      message: '密码必须包含大小写字母和数字', 
      trigger: 'blur' 
    }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { 
      validator: (rule, value, callback) => {
        if (value !== registerForm.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      }, 
      trigger: 'blur' 
    }
  ],
  agreement: [
    { 
      validator: (rule, value, callback) => {
        if (!value) {
          callback(new Error('请阅读并同意用户协议和隐私政策'))
        } else {
          callback()
        }
      }, 
      trigger: 'change' 
    }
  ]
})

// 根据注册方式动态调整表单验证规则
watch(registerType, (newType) => {
  if (newType === 'phone') {
    registerRules.phone = [
      { required: true, message: '请输入手机号', trigger: 'blur' },
      { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
    ]
    registerRules.email = []
  } else if (newType === 'email') {
    registerRules.email = [
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
    ]
    registerRules.phone = []
  }
})

// 发送验证码
const sendVerificationCode = async () => {
  // 验证手机号或邮箱
  if (registerType.value === 'phone') {
    const phoneRule = [
      { required: true, message: '请输入手机号', trigger: 'blur' },
      { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
    ]
    const isValid = await validateField('phone', phoneRule)
    if (!isValid) return
  } else if (registerType.value === 'email') {
    const emailRule = [
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
    ]
    const isValid = await validateField('email', emailRule)
    if (!isValid) return
  }

  isCodeSending.value = true
  try {
    // 这里应该调用实际的API发送验证码
    // const contact = registerType.value === 'phone' ? registerForm.phone : registerForm.email
    // await sendCode({ type: registerType.value, contact })
    
    // 模拟发送成功
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 开始倒计时
    startCountdown()
    ElMessage.success(`验证码已发送至${registerType.value === 'phone' ? '手机' : '邮箱'}`)
  } catch (error) {
    ElMessage.error(error.message || '验证码发送失败，请稍后重试')
  } finally {
    isCodeSending.value = false
  }
}

// 验证单个字段
const validateField = async (field, rules) => {
  try {
    await new Promise((resolve, reject) => {
      const rule = {}
      rule[field] = rules
      const validator = Promise.all(rules.map(r => {
        if (r.validator) {
          return r.validator(r, registerForm[field], (err) => {
            if (err) reject(err)
            else resolve()
          })
        } else if (r.pattern) {
          if (!r.pattern.test(registerForm[field])) {
            reject(new Error(r.message))
            return
          }
        } else if (r.required && !registerForm[field]) {
          reject(new Error(r.message))
          return
        }
        resolve()
      }))
    })
    return true
  } catch (error) {
    ElMessage.error(error.message)
    return false
  }
}

// 开始倒计时
const startCountdown = () => {
  countdown.value = 60
  clearInterval(countdownTimer)
  countdownTimer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--
    } else {
      clearInterval(countdownTimer)
    }
  }, 1000)
}

// 注册方法
const handleRegister = async () => {
  // 表单验证
  if (!registerFormRef.value) return
  
  await registerFormRef.value.validate(async (valid) => {
    if (!valid) {
      return false
    }
    
    isLoading.value = true
    try {
      // 准备注册数据
      const registerData = {
        username: registerForm.username,
        password: registerForm.password,
        code: registerForm.code
      }
      
      if (registerType.value === 'phone') {
        registerData.phone = registerForm.phone
      } else {
        registerData.email = registerForm.email
      }
      
      // 调用注册接口
      await userStore.register(registerData)
      
      ElMessage.success('注册成功，请登录')
      router.push('/auth/login')
    } catch (error) {
      ElMessage.error(error.message || '注册失败，请稍后重试')
    } finally {
      isLoading.value = false
    }
  })
}

// 显示用户协议
const showAgreement = () => {
  ElMessage.info('用户协议内容正在完善中')
}

// 显示隐私政策
const showPrivacy = () => {
  ElMessage.info('隐私政策内容正在完善中')
}

// 组件卸载时清除定时器
const onUnmounted = () => {
  clearInterval(countdownTimer)
}
</script>

<style scoped>
.register-container {
  width: 100%;
  max-width: 400px;
}

.title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
}

.subtitle {
  font-size: 14px;
  color: #666;
  margin-bottom: 30px;
}

.register-form {
  margin-bottom: 20px;
}

.code-input-group {
  display: flex;
  gap: 10px;
}

.code-input-group .el-input {
  flex: 1;
}

.code-input-group .el-button {
  white-space: nowrap;
}

.register-button {
  width: 100%;
  padding: 12px 0;
  font-size: 16px;
  margin-top: 10px;
}

.other-links {
  text-align: center;
  margin-top: 20px;
  color: #666;
  font-size: 14px;
}

.login-link {
  color: #409EFF;
  text-decoration: none;
  font-weight: 500;
}
</style>

<template>
  <div class="recover-container">
    <h2 class="title">找回密码</h2>
    <p class="subtitle">请输入您的账号信息</p>
    
    <el-form 
      ref="recoverFormRef" 
      :model="recoverForm" 
      :rules="recoverRules" 
      class="recover-form" 
      @submit.prevent="handleRecover"
    >
      <!-- 注册方式选择 -->
      <el-form-item>
        <el-radio-group v-model="recoverType" @change="handleRecoverTypeChange">
          <el-radio-button label="phone">手机找回</el-radio-button>
          <el-radio-button label="email">邮箱找回</el-radio-button>
        </el-radio-group>
      </el-form-item>
      
      <!-- 手机号 -->
      <el-form-item prop="phone" v-if="recoverType === 'phone'">
        <el-input 
          v-model="recoverForm.phone" 
          placeholder="请输入注册手机号" 
        >
          <template #prefix>
            <el-icon><Iphone /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      
      <!-- 邮箱 -->
      <el-form-item prop="email" v-if="recoverType === 'email'">
        <el-input 
          v-model="recoverForm.email" 
          placeholder="请输入注册邮箱" 
        >
          <template #prefix>
            <el-icon><Message /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      
      <!-- 验证码 -->
      <el-form-item prop="code" v-if="recoverType !== ''">
        <div class="code-input-group">
          <el-input 
            v-model="recoverForm.code" 
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
      
      <!-- 新密码 -->
      <el-form-item prop="password">
        <el-input 
          v-model="recoverForm.password" 
          type="password" 
          placeholder="请设置新密码" 
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
          v-model="recoverForm.confirmPassword" 
          type="password" 
          placeholder="请确认新密码" 
          show-password
          @keyup.enter="handleRecover"
        >
          <template #prefix>
            <el-icon><Lock /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      
      <el-button 
        type="primary" 
        :loading="isLoading" 
        class="recover-button" 
        @click="handleRecover"
      >
        重置密码
      </el-button>
    </el-form>
    
    <div class="other-links">
      <p>
        <router-link to="/auth/login" class="login-link">返回登录</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Lock, Iphone, Message, Key } from '@element-plus/icons-vue'

const router = useRouter()

// 状态
const isLoading = ref(false)
const isCodeSending = ref(false)
const countdown = ref(0)
const recoverType = ref('phone') // 默认使用手机找回
let countdownTimer = null

// 表单引用
const recoverFormRef = ref(null)

// 表单数据
const recoverForm = reactive({
  phone: '',
  email: '',
  code: '',
  password: '',
  confirmPassword: ''
})

// 切换找回方式处理
const handleRecoverTypeChange = () => {
  // 切换找回方式时重置验证码相关状态
  clearInterval(countdownTimer)
  countdown.value = 0
  recoverForm.code = ''
}

// 表单验证规则
const recoverRules = reactive({
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
    { required: true, message: '请设置新密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度应在6-20个字符之间', trigger: 'blur' },
    { 
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\S]{6,20}$/, 
      message: '密码必须包含大小写字母和数字', 
      trigger: 'blur' 
    }
  ],
  confirmPassword: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    { 
      validator: (rule, value, callback) => {
        if (value !== recoverForm.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      }, 
      trigger: 'blur' 
    }
  ]
})

// 根据找回方式动态调整表单验证规则
watch(recoverType, (newType) => {
  if (newType === 'phone') {
    recoverRules.phone = [
      { required: true, message: '请输入手机号', trigger: 'blur' },
      { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
    ]
    recoverRules.email = []
  } else if (newType === 'email') {
    recoverRules.email = [
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
    ]
    recoverRules.phone = []
  }
})

// 发送验证码
const sendVerificationCode = async () => {
  // 验证手机号或邮箱
  if (recoverType.value === 'phone') {
    const phoneRule = [
      { required: true, message: '请输入手机号', trigger: 'blur' },
      { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
    ]
    const isValid = await validateField('phone', phoneRule)
    if (!isValid) return
  } else if (recoverType.value === 'email') {
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
    // const contact = recoverType.value === 'phone' ? recoverForm.phone : recoverForm.email
    // await sendCode({ type: recoverType.value, contact })
    
    // 模拟发送成功
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 开始倒计时
    startCountdown()
    ElMessage.success(`验证码已发送至${recoverType.value === 'phone' ? '手机' : '邮箱'}`)
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
          return r.validator(r, recoverForm[field], (err) => {
            if (err) reject(err)
            else resolve()
          })
        } else if (r.pattern) {
          if (!r.pattern.test(recoverForm[field])) {
            reject(new Error(r.message))
            return
          }
        } else if (r.required && !recoverForm[field]) {
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

// 找回密码方法
const handleRecover = async () => {
  // 表单验证
  if (!recoverFormRef.value) return
  
  await recoverFormRef.value.validate(async (valid) => {
    if (!valid) {
      return false
    }
    
    isLoading.value = true
    try {
      // 准备找回密码数据
      const recoverData = {
        code: recoverForm.code,
        password: recoverForm.password
      }
      
      if (recoverType.value === 'phone') {
        recoverData.phone = recoverForm.phone
      } else {
        recoverData.email = recoverForm.email
      }
      
      // 调用找回密码接口
      // await resetPassword(recoverData)
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      ElMessage.success('密码重置成功，请使用新密码登录')
      router.push('/auth/login')
    } catch (error) {
      ElMessage.error(error.message || '密码重置失败，请稍后重试')
    } finally {
      isLoading.value = false
    }
  })
}

// 组件卸载时清除定时器
const onUnmounted = () => {
  clearInterval(countdownTimer)
}
</script>

<style scoped>
.recover-container {
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

.recover-form {
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

.recover-button {
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

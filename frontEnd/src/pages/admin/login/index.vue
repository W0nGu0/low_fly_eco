<template>
  <div class="admin-login-container">
    <div class="login-card">
      <h2 class="login-title">管理员登录</h2>
      <el-form :model="loginForm" :rules="loginRules" ref="loginFormRef" label-width="0" class="login-form">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="用户名" prefix-icon="el-icon-user" clearable></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="密码" prefix-icon="el-icon-lock" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" class="login-button" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()

// 登录表单
const loginForm = reactive({
  username: '',
  password: ''
})

// 表单校验规则
const loginRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6个字符', trigger: 'blur' }
  ]
}

const loginFormRef = ref(null)
const loading = ref(false)

// 登录处理
const handleLogin = () => {
  loginFormRef.value.validate(async (valid) => {
    if (!valid) {
      return false
    }
    
    loading.value = true
    
    try {
      // 模拟登录请求
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 验证管理员账号
      if (loginForm.username === 'admin' && loginForm.password === 'admin123') {
        // 存储token
        localStorage.setItem('admin_token', 'admin-token')
        
        // 跳转到管理首页或指定页面
        const redirect = route.query.redirect || '/admin/home'
        router.push(redirect)
        
        ElMessage.success('登录成功')
      } else {
        ElMessage.error('用户名或密码错误')
      }
    } catch (error) {
      ElMessage.error(error.message || '登录失败，请稍后重试')
    } finally {
      loading.value = false
    }
  })
}
</script>

<style scoped>
.admin-login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f7fa;
}

.login-card {
  width: 380px;
  padding: 30px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.login-title {
  text-align: center;
  margin-bottom: 25px;
  font-size: 24px;
  color: #409EFF;
}

.login-form {
  margin-top: 20px;
}

.login-button {
  width: 100%;
}
</style> 
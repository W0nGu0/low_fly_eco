<template>
  <header class="app-header">
    <div class="header-container">
      <div class="logo" @click="goHome">
        <img src="../../../../assets/images/logo.png" alt="低空飞行体验" />
        <span class="logo-text">低空飞行体验预约系统</span>
      </div>

      <div class="nav-menu" :class="{ 'mobile-menu-open': isMobileMenuOpen }">
        <ul class="nav-list">
          <li class="nav-item">
            <router-link to="/user/home" class="nav-link">首页</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/user/projects" class="nav-link">飞行项目</router-link>
          </li>
          <li class="nav-item" v-if="isAdmin">
            <router-link to="/admin/dashboard" class="nav-link">后台管理</router-link>
          </li>
        </ul>
      </div>

      <div class="header-right">
        <div class="user-section" v-if="isLoggedIn">
          <el-dropdown trigger="click">
            <div class="user-avatar">
              <el-avatar :size="40" :src="userInfo.avatar || '../../../../assets/images/users/user1.jpg'" />
              <span class="username">{{ userInfo.nickname || userInfo.username }}</span>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="navigateTo('/user/profile')">
                  <el-icon><User /></el-icon>个人中心
                </el-dropdown-item>
                <el-dropdown-item @click="navigateTo('/user/orders')">
                  <el-icon><Tickets /></el-icon>我的预约
                </el-dropdown-item>
                <el-dropdown-item divided @click="handleLogout">
                  <el-icon><SwitchButton /></el-icon>退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div class="auth-buttons" v-else>
          <el-button type="primary" size="small" @click="navigateTo('/auth/login')">登录</el-button>
          <el-button size="small" @click="navigateTo('/auth/register')">注册</el-button>
        </div>
      </div>

      <div class="mobile-menu-toggle" @click="toggleMobileMenu">
        <el-icon v-if="isMobileMenuOpen"><Close /></el-icon>
        <el-icon v-else><Menu /></el-icon>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { User, Tickets, SwitchButton, Menu, Close } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()

const isMobileMenuOpen = ref(false)

const isLoggedIn = computed(() => userStore.isLoggedIn)
const isAdmin = computed(() => userStore.isAdmin)
const userInfo = computed(() => userStore.userInfo)

function goHome() {
  router.push('/user/home')
}

function navigateTo(path) {
  router.push(path)
  isMobileMenuOpen.value = false
}

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function handleLogout() {
  ElMessageBox.confirm('确定要退出登录吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    userStore.logout()
    router.push('/auth/login')
  }).catch(() => {})
}
</script>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  z-index: 1000;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.logo img {
  height: 40px;
  margin-right: 10px;
}

.logo-text {
  font-size: 18px;
  font-weight: bold;
  color: #409EFF;
}

.nav-menu {
  flex: 1;
  margin-left: 40px;
}

.nav-list {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  margin-right: 30px;
}

.nav-link {
  color: #333;
  text-decoration: none;
  font-size: 16px;
  padding: 8px 0;
  transition: color 0.3s;
  display: block;
}

.nav-link:hover,
.router-link-active {
  color: #409EFF;
}

.user-section {
  display: flex;
  align-items: center;
}

.user-avatar {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.username {
  margin-left: 8px;
  font-size: 14px;
}

.mobile-menu-toggle {
  display: none;
  font-size: 24px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .nav-menu {
    position: fixed;
    top: 64px;
    left: 0;
    width: 100%;
    height: calc(100vh - 64px);
    background-color: #fff;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: 999;
    display: flex;
    flex-direction: column;
    padding: 20px;
  }

  .mobile-menu-open {
    transform: translateX(0);
  }

  .nav-list {
    flex-direction: column;
  }

  .nav-item {
    margin-right: 0;
    margin-bottom: 20px;
  }

  .nav-link {
    font-size: 18px;
    padding: 12px 0;
  }

  .mobile-menu-toggle {
    display: block;
  }

  .logo-text {
    display: none;
  }

  .auth-buttons {
    display: none;
  }

  .mobile-menu-open .auth-buttons {
    display: flex;
    margin-top: 20px;
  }

  .user-section .username {
    display: none;
  }
}
</style>

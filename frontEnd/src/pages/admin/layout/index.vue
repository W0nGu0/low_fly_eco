<template>
  <div class="admin-layout">
    <el-container class="container">
      <!-- 侧边栏 -->
      <el-aside width="220px" class="aside">
        <div class="logo">
          <img src="@/assets/images/logo.png" alt="低空飞行体验" class="logo-img">
          <span class="logo-text">管理系统</span>
        </div>
        <el-menu
          :default-active="activeMenu"
          background-color="#304156"
          text-color="#bfcbd9"
          active-text-color="#409EFF"
          router
          unique-opened
          class="menu"
        >
          <el-menu-item index="/admin/home">
            <i class="el-icon-s-home"></i>
            <span>首页</span>
          </el-menu-item>
          
          <el-sub-menu index="1">
            <template #title>
              <i class="el-icon-s-goods"></i>
              <span>项目管理</span>
            </template>
            <el-menu-item index="/admin/projects">项目列表</el-menu-item>
            <el-menu-item index="/admin/projects/create">新增项目</el-menu-item>
          </el-sub-menu>
          
          <el-sub-menu index="2">
            <template #title>
              <i class="el-icon-s-order"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="/admin/orders">订单列表</el-menu-item>
            <el-menu-item index="/admin/orders/statistics">订单统计</el-menu-item>
          </el-sub-menu>
          
          <el-sub-menu index="3">
            <template #title>
              <i class="el-icon-user"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/admin/users">用户列表</el-menu-item>
          </el-sub-menu>
          
          <el-menu-item index="/admin/reviews">
            <i class="el-icon-chat-dot-round"></i>
            <span>评价管理</span>
          </el-menu-item>
          
          <el-menu-item index="/admin/settings">
            <i class="el-icon-setting"></i>
            <span>系统设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      
      <!-- 主要内容区 -->
      <el-container class="main-container">
        <!-- 头部 -->
        <el-header class="header">
          <div class="header-left">
            <i class="el-icon-menu toggle-sidebar" @click="toggleSidebar"></i>
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/admin/home' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item v-if="currentRoute.meta && currentRoute.meta.title">
                {{ currentRoute.meta.title }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="header-right">
            <el-dropdown @command="handleCommand">
              <div class="user-info">
                <el-avatar :src="adminAvatar" size="small"></el-avatar>
                <span class="username">{{ adminName }}</span>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="profile">个人信息</el-dropdown-item>
                  <el-dropdown-item command="password">修改密码</el-dropdown-item>
                  <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>
        
        <!-- 内容 -->
        <el-main class="main">
          <router-view></router-view>
        </el-main>
        
        <!-- 底部 -->
        <el-footer class="footer">
          Copyright © 2023 低空飞行体验管理系统
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessageBox } from 'element-plus'

const router = useRouter()
const route = useRoute()

// 侧边栏是否折叠
const isCollapse = ref(false)

// 当前管理员信息
const adminName = ref('管理员')
const adminAvatar = ref('/src/assets/images/users/user1.jpg')

// 切换侧边栏折叠状态
const toggleSidebar = () => {
  isCollapse.value = !isCollapse.value
}

// 当前路由和激活菜单项
const currentRoute = computed(() => route)
const activeMenu = computed(() => route.path)

// 下拉菜单命令处理
const handleCommand = (command) => {
  switch (command) {
    case 'profile':
      router.push('/admin/profile')
      break
    case 'password':
      router.push('/admin/password')
      break
    case 'logout':
      ElMessageBox.confirm('确定要退出登录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 清除登录状态
        localStorage.removeItem('admin_token')
        // 跳转到登录页
        router.push('/admin/login')
      }).catch(() => {})
      break
  }
}
</script>

<style scoped>
.admin-layout {
  height: 100vh;
}

.container {
  height: 100%;
}

.aside {
  background-color: #304156;
  height: 100%;
  overflow-x: hidden;
}

.logo {
  height: 60px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  background-color: #2b3649;
}

.logo-img {
  height: 32px;
  margin-right: 12px;
}

.logo-text {
  color: #fff;
  font-size: 18px;
  font-weight: bold;
}

.menu {
  border-right: none;
  height: calc(100% - 60px);
}

.header {
  background-color: #fff;
  border-bottom: 1px solid #dcdfe6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 60px;
}

.header-left {
  display: flex;
  align-items: center;
}

.toggle-sidebar {
  margin-right: 20px;
  font-size: 20px;
  cursor: pointer;
}

.header-right {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.username {
  margin-left: 8px;
  color: #606266;
}

.main-container {
  flex-direction: column;
  height: 100%;
}

.main {
  background-color: #f0f2f5;
  padding: 20px;
  overflow-y: auto;
  flex: 1;
}

.footer {
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 12px;
  color: #909399;
  background-color: #fff;
  border-top: 1px solid #e6e6e6;
}
</style>

<template>
  <div class="app-container">
    <!-- 头部导航 -->
    <header class="header">
      <div class="container header-inner">
        <div class="logo">
          <router-link to="/user/home">
            <img :src="logoUrl" alt="低空飞行体验" class="logo-img">
            <span class="logo-text">低空飞行体验</span>
          </router-link>
        </div>
        <div class="nav-menu">
          <el-menu
            mode="horizontal"
            :router="true"
            :default-active="activeMenu"
            :ellipsis="false"
            class="menu">
            <el-menu-item index="/user/home">首页</el-menu-item>
            <el-menu-item index="/user/projects">项目</el-menu-item>
            <el-menu-item index="/user/orders">预订记录</el-menu-item>
            <el-menu-item index="/user/feedback">评价反馈</el-menu-item>
            <el-menu-item index="/user/profile">个人中心</el-menu-item>
          </el-menu>
        </div>
        <div class="user-actions">
          <template v-if="isLoggedIn">
            <el-dropdown @command="handleCommand">
              <div class="user-info">
                <el-avatar :src="userAvatar" size="small"></el-avatar>
                <span class="username">{{ username }}</span>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="profile">个人中心</el-dropdown-item>
                  <el-dropdown-item command="orders">我的订单</el-dropdown-item>
                  <el-dropdown-item command="feedback">我的评价</el-dropdown-item>
                  <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </div>
      </div>
    </header>

    <!-- 主要内容 -->
    <main class="main-content">
      <router-view></router-view>
    </main>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3>关于我们</h3>
            <p>低空飞行体验提供各类低空飞行项目预约服务，让您体验不一样的视角。</p>
          </div>
          <div class="footer-section">
            <h3>联系方式</h3>
            <p>电话：400-123-4567</p>
            <p>邮箱：info@lowfly.com</p>
          </div>
          <div class="footer-section">
            <h3>关注我们</h3>
            <div class="social-icons">
              <i class="el-icon-s-platform"></i>
              <i class="el-icon-s-promotion"></i>
              <i class="el-icon-s-cooperation"></i>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2023 低空飞行体验. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getImageUrl } from '@/utils/imageHelper'

const router = useRouter()
const route = useRoute()

// 模拟用户状态
const isLoggedIn = ref(true)
const username = ref('张三')
const userAvatar = ref('/src/assets/images/users/user2.jpg')

const logoUrl = getImageUrl('@/assets/images/logo.png')

// 获取当前激活的菜单
const activeMenu = computed(() => {
  return route.path
})

// 检查路由是否存在
onMounted(() => {
  // 确保所有的菜单项都有对应的路由
  console.log('当前路由:', route.path)
})
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.logo a {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.logo-img {
  height: 36px;
  margin-right: 12px;
}

.logo-text {
  font-size: 20px;
  font-weight: bold;
  color: #409EFF;
}

.nav-menu {
  margin-left: auto;
  margin-right: 20px;
}

.menu {
  border-bottom: none;
}

.user-actions {
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
  color: #303133;
}

.main-content {
  flex: 1;
  padding-top: 20px;
  padding-bottom: 40px;
  background-color: #d1faba; /* 浅绿色背景 */
}

.footer {
  background-color: #d1faba; /* 浅绿色背景 */
  padding: 2rem 0 1rem;
  margin-top: 0; /* 移除顶部边距，避免与主内容区域之间有空隙 */
  border-top: 1px solid rgba(255, 255, 255, 0.2); /* 添加半透明的上边框以区分区域 */
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding: 0 1rem;
}

.footer-section {
  h3 {
    color: #047857;
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }

  p {
    color: #374151;
    font-size: 0.9rem;
    line-height: 1.5;
    margin-bottom: 0.5rem;
  }
}

.social-icons {
  display: flex;
  gap: 1rem;

  i {
    color: #047857;
    font-size: 1.5rem;
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
      color: #10b981;
    }
  }
}

.footer-bottom {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.3); /* 半透明的边框颜色 */
  text-align: center;

  p {
    color: #4d7a30; /* 调整文字颜色，使其更清晰 */
    font-size: 0.875rem;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5); /* 添加文字阴影提高可读性 */
  }
}

@media (max-width: 768px) {
  .header-inner {
    flex-direction: column;
    height: auto;
    padding: 10px 0;
  }

  .logo {
    margin-bottom: 10px;
  }

  .nav-menu, .user-actions {
    margin-left: 0;
    margin-right: 0;
    width: 100%;
  }

  .menu {
    justify-content: center;
  }

  .user-actions {
    justify-content: center;
    margin-top: 10px;
  }
}
</style>

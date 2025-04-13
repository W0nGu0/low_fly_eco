<template>
  <div class="auth-container">
    <!-- 暂时注释掉主题切换组件 -->
    <!-- <div class="absolute top-4 right-4">
      <theme-switcher />
    </div> -->

    <div class="auth-wrapper border-gradient">
      <div class="auth-left">
        <div class="brand card-hover">
          <img src="../../../assets/images/logo.png" alt="Logo" class="logo" />
          <h1 class="brand-title">低空飞行体验</h1>
        </div>
        <div class="promo-image">
          <img src="../../../assets/images/auth/auth-bg.jpg" alt="低空飞行体验" class="promo-img hover-lift" />
        </div>
        <div class="auth-description">
          <p>体验飞行的自由与乐趣</p>
        </div>
      </div>
      <div class="auth-right">
        <div class="router-view-container">
          <router-view />
        </div>
      </div>
    </div>

    <div class="auth-footer">
      <p class="footer-text">© {{ currentYear }} 低空飞行体验预约系统 版权所有</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
// 暂时注释掉主题切换组件
// import ThemeSwitcher from '@/components/ThemeSwitcher.vue'

// 当前年份
const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #e6f7dc 0%, #d4eec5 50%, #c1e5ae 100%);
}

.auth-wrapper {
  flex: 1;
  display: flex;
  width: 100%;
  margin: 0;
  box-shadow: none;
  border-radius: 0;
  overflow: hidden;
  background: white;
  transition: all 0.3s ease;
  position: relative;
}

.auth-left {
  width: 50%;
  display: flex;
  flex-direction: column;
  color: white;
  padding: 40px;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #2e7b13, #52c41a, #73d13d);
  box-shadow: inset 0 0 25px rgba(0, 0, 0, 0.2);
}

.auth-left::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  z-index: 0;
  opacity: 0.7;
}

.brand {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  transition: all 0.3s ease-in-out;
  position: relative;
  z-index: 2;
}

.brand:hover {
  transform: scale(1.05);
}

.logo {
  height: 40px;
  margin-right: 10px;
}

.brand-title {
  font-size: 24px;
  font-weight: 500;
  margin: 0;
}

.promo-image {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  position: relative;
  z-index: 2;
}

.promo-img {
  max-width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.5s ease;
}

.promo-img:hover {
  transform: scale(1.05);
}

.auth-description {
  font-size: 16px;
  text-align: center;
  margin-bottom: 20px;
  position: relative;
  z-index: 2;
}

.auth-description p {
  opacity: 0.9;
}

.auth-right {
  width: 50%;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #aff18b; /* 浅绿色背景 */
  position: relative;
}

.auth-right::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(240, 249, 235, 0.8), rgba(226, 246, 211, 0.9));
  z-index: 1;
}

.router-view-container {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.auth-footer {
  text-align: center;
  padding: 20px;
  color: #4d7a30;
  font-size: 14px;
  background: linear-gradient(135deg, #e6f7dc 0%, #d4eec5 50%, #c1e5ae 100%);
  border-top: 1px solid rgba(82, 196, 26, 0.1);
  font-weight: 500;
}

.footer-text {
  text-shadow: 0 1px 1px rgba(255, 255, 255, 0.7);
  position: relative;
}

.footer-text::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 50%;
  width: 50px;
  height: 2px;
  background-color: rgba(82, 196, 26, 0.3);
  transform: translateX(-50%);
  border-radius: 2px;
}

/* 响应式样式 */
@media (max-width: 768px) {
  .auth-wrapper {
    flex-direction: column;
    margin: 0;
    box-shadow: none;
    border-radius: 0;
  }

  .auth-left,
  .auth-right {
    width: 100%;
  }

  .auth-left {
    padding: 20px;
  }

  .auth-right {
    padding: 20px;
  }
}

/* 添加动画效果 */
.fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>

<template>
  <div class="app-container min-h-screen w-full bg-neutral-50 text-neutral-800 transition-colors duration-300">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
// 暂时注释掉主题存储
// import { useThemeStore } from './store/theme'

// 暂时注释掉主题初始化
// const themeStore = useThemeStore()

// // 初始化主题
// onMounted(() => {
//   const savedTheme = themeStore.theme || 'default'

//   // 移除所有主题类
//   document.body.classList.remove('theme-green', 'theme-purple', 'theme-orange', 'theme-dark')

//   // 添加选中的主题类
//   if (savedTheme !== 'default') {
//     document.body.classList.add(`theme-${savedTheme}`)
//   }

//   // 如果是深色主题，添加深色模式类
//   if (savedTheme === 'dark') {
//     document.documentElement.classList.add('dark')
//   } else {
//     document.documentElement.classList.remove('dark')
//   }
// })
</script>

<style>
/* 全局样式 */
body {
  font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* 深色主题样式 */
.theme-dark {
  background-color: var(--bg-color, #141414);
  color: var(--text-color, #f0f0f0);
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
<template>
  <div class="theme-switcher">
    <el-dropdown trigger="click" @command="changeTheme">
      <div class="theme-button btn-hover">
        <el-icon><Brush /></el-icon>
        <span>主题</span>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="default">
            <div class="theme-item">
              <div class="color-circle bg-blue-500"></div>
              <span>蓝色主题</span>
            </div>
          </el-dropdown-item>
          <el-dropdown-item command="green">
            <div class="theme-item">
              <div class="color-circle bg-green-500"></div>
              <span>绿色主题</span>
            </div>
          </el-dropdown-item>
          <el-dropdown-item command="purple">
            <div class="theme-item">
              <div class="color-circle bg-purple-500"></div>
              <span>紫色主题</span>
            </div>
          </el-dropdown-item>
          <el-dropdown-item command="orange">
            <div class="theme-item">
              <div class="color-circle bg-orange-500"></div>
              <span>橙色主题</span>
            </div>
          </el-dropdown-item>
          <el-dropdown-item command="dark">
            <div class="theme-item">
              <div class="color-circle bg-gray-800"></div>
              <span>深色主题</span>
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Brush } from '@element-plus/icons-vue'
import { useThemeStore } from '../store/theme'

const themeStore = useThemeStore()
const currentTheme = ref('default')

// 切换主题
const changeTheme = (theme) => {
  currentTheme.value = theme
  themeStore.setTheme(theme)
  
  // 移除所有主题类
  document.body.classList.remove('theme-green', 'theme-purple', 'theme-orange', 'theme-dark')
  
  // 添加选中的主题类
  if (theme !== 'default') {
    document.body.classList.add(`theme-${theme}`)
  }
  
  // 如果是深色主题，添加深色模式类
  if (theme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

// 初始化主题
onMounted(() => {
  const savedTheme = themeStore.theme || 'default'
  currentTheme.value = savedTheme
  changeTheme(savedTheme)
})
</script>

<style scoped>
.theme-switcher {
  @apply relative;
}

.theme-button {
  @apply flex items-center gap-1 px-3 py-2 rounded-md cursor-pointer text-neutral-600 hover:text-primary-500 hover:bg-neutral-100;
}

.theme-item {
  @apply flex items-center gap-2;
}

.color-circle {
  @apply w-4 h-4 rounded-full;
}
</style>

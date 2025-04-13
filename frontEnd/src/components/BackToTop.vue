<template>
  <div>
    <transition name="fade">
      <div 
        v-show="visible" 
        class="back-to-top" 
        @click="backToTop"
      >
        <i class="el-icon-top"></i>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const visible = ref(false)
const scrollTop = ref(0)

// 监听滚动事件
function onScroll() {
  scrollTop.value = document.documentElement.scrollTop || document.body.scrollTop
  visible.value = scrollTop.value > 300
}

// 返回顶部
function backToTop() {
  const duration = 500 // 动画持续时间(ms)
  const start = scrollTop.value
  const startTime = performance.now()
  
  function animateScroll(currentTime) {
    const elapsedTime = currentTime - startTime
    const progress = Math.min(elapsedTime / duration, 1)
    const easeInOutCubic = progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2
    
    window.scrollTo(0, start * (1 - easeInOutCubic))
    
    if (progress < 1) {
      window.requestAnimationFrame(animateScroll)
    }
  }
  
  window.requestAnimationFrame(animateScroll)
}

// 生命周期钩子
onMounted(() => {
  window.addEventListener('scroll', onScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.back-to-top {
  position: fixed;
  right: 40px;
  bottom: 40px;
  width: 40px;
  height: 40px;
  background-color: #409EFF;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;
  z-index: 99;
  transition: all 0.3s;
}

.back-to-top:hover {
  background-color: #66b1ff;
  transform: scale(1.1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .back-to-top {
    right: 20px;
    bottom: 20px;
    width: 35px;
    height: 35px;
    font-size: 16px;
  }
}
</style> 
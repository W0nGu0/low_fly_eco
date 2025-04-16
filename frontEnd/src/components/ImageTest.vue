<template>
  <div class="image-test">
    <h2>图片路径测试</h2>
    <div class="image-grid">
      <!-- 方式1: 使用@别名 -->
      <div class="image-item">
        <h3>使用@别名路径</h3>
        <img :src="getImageUrl('@/assets/images/projects/hot-air-balloon.jpg')" alt="热气球" class="test-img">
      </div>
      
      <!-- 方式2: 使用@assets别名 -->
      <div class="image-item">
        <h3>使用@assets别名路径</h3>
        <img :src="getImageUrl('@assets/images/projects/helicopter.jpg')" alt="直升机" class="test-img">
      </div>
      
      <!-- 方式3: 使用@images别名 -->
      <div class="image-item">
        <h3>使用@images别名路径</h3>
        <img :src="getImageUrl('@images/projects/drone.jpg')" alt="无人机" class="test-img">
      </div>
      
      <!-- 方式4: 使用/src绝对路径 -->
      <div class="image-item">
        <h3>使用/src绝对路径</h3>
        <img src="/src/assets/images/projects/hot-air-balloon.jpg" alt="热气球" class="test-img">
      </div>
      
      <!-- 方式5: 使用直接导入 -->
      <div class="image-item">
        <h3>使用导入模块方式</h3>
        <img :src="hotAirBalloonImg" alt="热气球" class="test-img">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getImageUrl } from '@/utils/imageHelper';

// 直接导入图片（Vite会自动处理这种导入）
import hotAirBalloonImg from '@/assets/images/projects/hot-air-balloon.jpg';

</script>

<style scoped>
.image-test {
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  margin: 20px 0;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.image-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image-item h3 {
  font-size: 16px;
  margin-bottom: 10px;
}

.test-img {
  width: 200px;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
}
</style> 
<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <div class="error-code">404</div>
      <div class="error-title">页面未找到</div>
      <div class="error-desc">抱歉，您访问的页面不存在或已被删除</div>
      <div class="action-buttons">
        <el-button type="primary" @click="goBack">返回上一页</el-button>
        <el-button @click="goHome">返回首页</el-button>
      </div>
      <div class="error-image">
        <img src="../../../assets/images/error/404.svg" alt="404" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// 返回上一页
const goBack = () => {
  router.back()
}

// 返回首页
const goHome = () => {
  router.push('/user/home')
}
</script>

<style scoped>
.not-found-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f7fa;
}

.not-found-content {
  text-align: center;
  padding: 2rem;
  max-width: 600px;
}

.error-code {
  font-size: 8rem;
  font-weight: 700;
  color: #409EFF;
  line-height: 1;
  margin-bottom: 1rem;
  text-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.error-title {
  font-size: 2rem;
  font-weight: 500;
  color: #303133;
  margin-bottom: 1rem;
}

.error-desc {
  font-size: 1.1rem;
  color: #606266;
  margin-bottom: 2rem;
}

.action-buttons {
  margin-bottom: 3rem;
}

.action-buttons .el-button {
  margin: 0 10px;
  padding: 12px 25px;
}

.error-image {
  max-width: 100%;
  height: auto;
  opacity: 0.8;
}

.error-image img {
  max-width: 100%;
  height: auto;
}

@media (max-width: 768px) {
  .error-code {
    font-size: 6rem;
  }

  .error-title {
    font-size: 1.5rem;
  }

  .error-desc {
    font-size: 1rem;
  }

  .action-buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .action-buttons .el-button {
    margin: 5px 0;
    width: 100%;
    max-width: 200px;
  }
}
</style>

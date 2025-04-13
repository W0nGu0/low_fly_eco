<template>
  <footer class="app-footer">
    <div class="footer-container">
      <div class="footer-section">
        <h3 class="footer-title">关于我们</h3>
        <p>低空飞行体验预约系统为您提供高品质、安全可靠的低空飞行体验项目，包括热气球观光、直升机游览、无人机体验等多种选择。</p>
      </div>
      
      <div class="footer-section">
        <h3 class="footer-title">联系我们</h3>
        <ul class="contact-list">
          <li><i class="el-icon-location"></i> 地址：北京市朝阳区三里屯SOHO</li>
          <li><i class="el-icon-phone"></i> 电话：400-123-4567</li>
          <li><i class="el-icon-message"></i> 邮箱：info@lowfly.com</li>
        </ul>
      </div>
      
      <div class="footer-section">
        <h3 class="footer-title">快速链接</h3>
        <ul class="quick-links">
          <li><router-link to="/user/home">首页</router-link></li>
          <li><router-link to="/user/projects">飞行项目</router-link></li>
          <li><router-link to="/user/about">关于我们</router-link></li>
          <li><router-link to="/user/faq">常见问题</router-link></li>
        </ul>
      </div>
      
      <div class="footer-section">
        <h3 class="footer-title">关注我们</h3>
        <div class="social-links">
          <a href="javascript:;" class="social-link">
            <i class="el-icon-s-platform"></i>
          </a>
          <a href="javascript:;" class="social-link">
            <i class="el-icon-s-goods"></i>
          </a>
          <a href="javascript:;" class="social-link">
            <i class="el-icon-s-promotion"></i>
          </a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© {{ currentYear }} 低空飞行体验预约系统 版权所有</p>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.app-footer {
  background-color: #333;
  color: #fff;
  padding-top: 40px;
}

.footer-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-section {
  flex: 1;
  min-width: 250px;
  margin-bottom: 30px;
  padding-right: 20px;
}

.footer-title {
  font-size: 18px;
  margin-bottom: 20px;
  position: relative;
  padding-bottom: 10px;
}

.footer-title:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 2px;
  background-color: #409EFF;
}

.contact-list,
.quick-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.contact-list li,
.quick-links li {
  margin-bottom: 10px;
}

.quick-links a {
  color: #ccc;
  text-decoration: none;
  transition: color 0.3s;
}

.quick-links a:hover {
  color: #409EFF;
}

.social-links {
  display: flex;
  gap: 15px;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  text-decoration: none;
  transition: background-color 0.3s;
}

.social-link:hover {
  background-color: #409EFF;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  padding: 20px;
  margin-top: 30px;
}

@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
  }
  
  .footer-section {
    width: 100%;
    margin-bottom: 30px;
    padding-right: 0;
  }
}
</style>

<template>
  <div class="home-page">
    <!-- 轮播图 Banner -->
    <section class="banner-section">
      <el-carousel :interval="5000" type="card" height="500px">
        <el-carousel-item v-for="(item, index) in bannerList" :key="index">
          <div class="banner-item" :style="{ backgroundImage: `url(${item.image})` }">
            <div class="banner-content animate__animated animate__fadeInUp">
              <h2 class="banner-title">{{ item.title }}</h2>
              <p class="banner-desc">{{ item.description }}</p>
              <el-button type="primary" size="large" @click="navigateTo(item.link)">{{ item.buttonText }}</el-button>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </section>

    <!-- 项目分类 -->
    <section class="category-section section">
      <div class="container">
        <h2 class="section-title">飞行体验项目分类</h2>
        <p class="section-subtitle">多种低空飞行体验项目，总有一款适合你</p>

        <div class="category-list">
          <div
            v-for="(category, index) in categories"
            :key="index"
            class="category-item card animate__animated animate__fadeIn"
            @click="navigateToCategory(category.id)"
          >
            <div class="category-icon">
              <i :class="category.icon"></i>
            </div>
            <h3 class="category-name">{{ category.name }}</h3>
            <p class="category-desc">{{ category.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 热门项目推荐 -->
    <section class="popular-section section">
      <div class="container">
        <h2 class="section-title">热门项目推荐</h2>
        <p class="section-subtitle">大家都在体验的项目</p>

        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :md="8" v-for="(project, index) in popularProjects" :key="index">
            <div class="project-card card animate__animated animate__fadeInUp" :style="{ animationDelay: `${index * 0.1}s` }">
              <div class="project-image">
                <img :src="project.coverImage" :alt="project.name" />
                <div class="project-category">{{ getCategoryName(project.categoryId) }}</div>
              </div>
              <div class="project-info">
                <h3 class="project-name">{{ project.name }}</h3>
                <p class="project-brief">{{ project.brief }}</p>
                <div class="project-meta">
                  <div class="meta-item">
                    <i class="el-icon-location"></i>
                    <span>{{ project.location }}</span>
                  </div>
                  <div class="meta-item">
                    <i class="el-icon-time"></i>
                    <span>{{ project.duration }}分钟</span>
                  </div>
                </div>
                <div class="project-bottom">
                  <div class="project-price">
                    <span class="price-label">价格</span>
                    <span class="price-value">¥{{ project.price }}</span>
                  </div>
                  <el-button
                    type="primary"
                    size="small"
                    @click="goToDetail(project.id)"
                  >
                    查看详情
                  </el-button>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>

        <div class="view-more">
          <el-button type="primary" plain @click="navigateTo('/user/projects')">查看更多项目</el-button>
        </div>
      </div>
    </section>

    <!-- 用户评价 -->
    <section class="review-section section">
      <div class="container">
        <h2 class="section-title">用户评价</h2>
        <p class="section-subtitle">听听他们怎么说</p>

        <el-carousel :interval="4000" type="card" height="300px">
          <el-carousel-item v-for="(review, index) in reviews" :key="index">
            <div class="review-card card">
              <div class="review-header">
                <div class="reviewer-avatar">
                  <img :src="review.avatar" :alt="review.name" />
                </div>
                <div class="reviewer-info">
                  <h4 class="reviewer-name">{{ review.name }}</h4>
                  <div class="reviewer-rating">
                    <el-rate v-model="review.rating" disabled text-color="#ff9900" />
                  </div>
                </div>
              </div>
              <div class="review-content">
                <p>{{ review.content }}</p>
              </div>
              <div class="review-project">
                <span>体验项目：</span>
                <a @click="goToDetail(review.projectId)">{{ review.projectName }}</a>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </section>

    <!-- 安全保障 -->
    <section class="safety-section section">
      <div class="container">
        <h2 class="section-title">安全保障</h2>
        <p class="section-subtitle">您的安全是我们的首要任务</p>

        <el-row :gutter="30">
          <el-col :xs="24" :sm="12" :md="8" :lg="6" v-for="(item, index) in safetyList" :key="index">
            <div class="safety-item card animate__animated animate__fadeIn" :style="{ animationDelay: `${index * 0.1}s` }">
              <div class="safety-icon">
                <i :class="item.icon"></i>
              </div>
              <h3 class="safety-title">{{ item.title }}</h3>
              <p class="safety-desc">{{ item.description }}</p>
            </div>
          </el-col>
        </el-row>
      </div>
    </section>

    <!-- 预约流程 -->
    <section class="process-section section">
      <div class="container">
        <h2 class="section-title">预约流程</h2>
        <p class="section-subtitle">简单四步，轻松体验</p>

        <div class="process-steps">
          <div class="process-step animate__animated animate__fadeInRight" v-for="(step, index) in processSteps" :key="index">
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-content">
              <h3 class="step-title">{{ step.title }}</h3>
              <p class="step-desc">{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProjectStore } from '@/store/project'

const router = useRouter()
const projectStore = useProjectStore()

// 模拟数据 - 轮播图
const bannerList = ref([
  {
    title: '热气球观光',
    description: '乘坐热气球，俯瞰城市美景，体验自由飞翔的感觉',
    image: '../../../assets/images/banners/banner1.jpg',
    link: '/user/projects?category=1',
    buttonText: '立即预约'
  },
  {
    title: '直升机游览',
    description: '乘坐专业直升机，从空中欣赏城市风光',
    image: '../../../assets/images/banners/banner2.jpg',
    link: '/user/projects?category=2',
    buttonText: '了解更多'
  },
  {
    title: '无人机体验',
    description: '亲自操控无人机，体验科技带来的乐趣',
    image: '../../../assets/images/banners/banner1.jpg',
    link: '/user/projects?category=3',
    buttonText: '立即体验'
  }
])

// 项目分类
const categories = ref([
  {
    id: 1,
    name: '热气球观光',
    description: '乘坐热气球，静静地在空中欣赏美景',
    icon: 'el-icon-sunny'
  },
  {
    id: 2,
    name: '直升机游览',
    description: '乘坐直升机，快速穿梭于城市上空',
    icon: 'el-icon-heavy-rain'
  },
  {
    id: 3,
    name: '无人机体验',
    description: '操控无人机，体验科技飞行的乐趣',
    icon: 'el-icon-lightning'
  },
  {
    id: 4,
    name: '滑翔伞',
    description: '体验滑翔伞的刺激与自由',
    icon: 'el-icon-umbrella'
  },
  {
    id: 5,
    name: '动力伞',
    description: '感受动力伞带来的速度与激情',
    icon: 'el-icon-wind-power'
  }
])

// 热门项目
const popularProjects = ref([
  {
    id: 1,
    name: '城市热气球观光之旅',
    brief: '乘坐热气球，俯瞰整座城市的美景，体验自由飞翔的感觉',
    coverImage: '../../../assets/images/projects/hot-air-balloon.jpg',
    categoryId: 1,
    location: '北京市朝阳区',
    duration: 60,
    price: 688
  },
  {
    id: 2,
    name: '直升机空中游览',
    brief: '乘坐专业直升机，从空中欣赏城市风光，拍摄绝美照片',
    coverImage: '../../../assets/images/projects/helicopter.jpg',
    categoryId: 2,
    location: '上海市浦东新区',
    duration: 30,
    price: 1280
  },
  {
    id: 3,
    name: '专业无人机操控体验',
    brief: '专业人员指导，学习操控无人机，感受科技带来的乐趣',
    coverImage: '../../../assets/images/projects/drone.jpg',
    categoryId: 3,
    location: '广州市天河区',
    duration: 120,
    price: 399
  }
])

// 用户评价
const reviews = ref([
  {
    name: '张先生',
    avatar: '../../../assets/images/users/user1.jpg',
    rating: 5,
    content: '热气球观光太棒了！第一次体验，非常震撼，服务人员专业又细心，全程感觉非常安全，拍出来的照片也很美，值得推荐！',
    projectId: 1,
    projectName: '城市热气球观光之旅'
  },
  {
    name: '李女士',
    avatar: '../../../assets/images/users/user2.jpg',
    rating: 4,
    content: '直升机游览体验很不错，看到了平时看不到的景色，只是时间有点短，希望能延长一些。总体来说是很棒的体验！',
    projectId: 2,
    projectName: '直升机空中游览'
  },
  {
    name: '王先生',
    avatar: '../../../assets/images/users/user1.jpg',
    rating: 5,
    content: '无人机操控体验很有趣，教练非常专业，教得很细致，从零基础到能够自己操控，感觉很有成就感！',
    projectId: 3,
    projectName: '专业无人机操控体验'
  }
])

// 安全保障
const safetyList = ref([
  {
    title: '专业设备',
    description: '所有飞行设备均经过严格检测，确保品质与安全',
    icon: 'el-icon-s-check'
  },
  {
    title: '资深团队',
    description: '拥有多年飞行经验的专业团队，全程指导陪伴',
    icon: 'el-icon-user'
  },
  {
    title: '安全培训',
    description: '飞行前进行专业的安全培训，掌握应急措施',
    icon: 'el-icon-s-opportunity'
  },
  {
    title: '保险保障',
    description: '每位体验者均配备全方位保险，无后顾之忧',
    icon: 'el-icon-umbrella'
  }
])

// 预约流程
const processSteps = ref([
  {
    title: '选择项目',
    description: '浏览并选择心仪的低空飞行体验项目'
  },
  {
    title: '在线预约',
    description: '选择合适的时间，填写预约信息'
  },
  {
    title: '在线支付',
    description: '使用多种支付方式，完成预约支付'
  },
  {
    title: '体验飞行',
    description: '按预约时间到达指定地点，开启飞行体验'
  }
])

// 获取分类名称
function getCategoryName(categoryId) {
  const category = categories.value.find(item => item.id === categoryId)
  return category ? category.name : ''
}

// 页面跳转
function navigateTo(path) {
  router.push(path)
}

// 分类跳转
function navigateToCategory(categoryId) {
  router.push(`/user/projects?category=${categoryId}`)
}

// 查看项目详情
function goToDetail(projectId) {
  router.push(`/user/projects/${projectId}`)
}

// 生命周期钩子
onMounted(() => {
  // 这里可以调用API获取数据
  // projectStore.fetchProjects()
})
</script>

<style scoped>
/* Banner样式 */
.banner-section {
  margin-top: -20px;
  margin-bottom: 40px;
}

.banner-item {
  height: 100%;
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  display: flex;
  align-items: center;
  position: relative;
}

.banner-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
}

.banner-content {
  position: relative;
  padding: 0 40px;
  color: #fff;
  z-index: 1;
  max-width: 600px;
}

.banner-title {
  font-size: 36px;
  margin-bottom: 20px;
}

.banner-desc {
  font-size: 18px;
  margin-bottom: 30px;
  line-height: 1.5;
}

/* 分类样式 */
.category-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 40px;
}

.category-item {
  text-align: center;
  padding: 30px 20px;
  cursor: pointer;
}

.category-icon {
  font-size: 50px;
  color: #409EFF;
  margin-bottom: 20px;
}

.category-name {
  font-size: 18px;
  margin-bottom: 10px;
}

.category-desc {
  color: #666;
  font-size: 14px;
}

/* 项目卡片样式 */
.project-card {
  margin-bottom: 30px;
  overflow: hidden;
  padding: 0;
}

.project-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.project-card:hover .project-image img {
  transform: scale(1.05);
}

.project-category {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(64, 158, 255, 0.9);
  color: #fff;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
}

.project-info {
  padding: 20px;
}

.project-name {
  font-size: 18px;
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.project-brief {
  color: #666;
  font-size: 14px;
  margin-bottom: 15px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  height: 42px;
}

.project-meta {
  display: flex;
  margin-bottom: 15px;
}

.meta-item {
  display: flex;
  align-items: center;
  margin-right: 20px;
  font-size: 14px;
  color: #666;
}

.meta-item i {
  margin-right: 5px;
}

.project-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.project-price {
  display: flex;
  flex-direction: column;
}

.price-label {
  font-size: 12px;
  color: #999;
}

.price-value {
  font-size: 20px;
  font-weight: bold;
  color: #f56c6c;
}

.view-more {
  text-align: center;
  margin-top: 20px;
}

/* 评价样式 */
.review-card {
  padding: 30px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.review-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.reviewer-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 15px;
}

.reviewer-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.reviewer-name {
  font-size: 16px;
  margin-bottom: 5px;
}

.review-content {
  flex: 1;
  font-size: 16px;
  line-height: 1.6;
  color: #666;
  margin-bottom: 20px;
}

.review-project {
  font-size: 14px;
  color: #999;
}

.review-project a {
  color: #409EFF;
  cursor: pointer;
}

/* 安全保障样式 */
.safety-item {
  text-align: center;
  padding: 30px 20px;
  margin-bottom: 30px;
}

.safety-icon {
  font-size: 50px;
  color: #67c23a;
  margin-bottom: 20px;
}

.safety-title {
  font-size: 18px;
  margin-bottom: 10px;
}

.safety-desc {
  color: #666;
  font-size: 14px;
}

/* 预约流程样式 */
.process-steps {
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: 0 auto;
}

.process-step {
  display: flex;
  margin-bottom: 30px;
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.step-number {
  width: 50px;
  height: 50px;
  background-color: #409EFF;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  border-radius: 50%;
  margin-right: 20px;
}

.step-content {
  flex: 1;
}

.step-title {
  font-size: 18px;
  margin-bottom: 10px;
}

.step-desc {
  color: #666;
  font-size: 14px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .banner-title {
    font-size: 24px;
  }

  .banner-desc {
    font-size: 14px;
  }

  .category-list {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }

  .process-step {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .step-number {
    margin-right: 0;
    margin-bottom: 15px;
  }
}
</style>

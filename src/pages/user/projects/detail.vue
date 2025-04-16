<template>
  <div class="project-detail-container">
    <div class="project-header">
      <div class="project-title">
        <h1>{{ project.title }}</h1>
        <div class="project-tags">
          <el-tag type="success">{{ project.category }}</el-tag>
          <el-tag type="info">{{ project.duration }}天</el-tag>
          <el-tag type="warning">{{ project.altitude }}米</el-tag>
        </div>
      </div>
      <div class="project-price">
        <div class="price">¥{{ project.price }}</div>
        <div class="per-person">每人起</div>
      </div>
    </div>

    <div class="project-gallery">
      <el-carousel height="400px">
        <el-carousel-item v-for="(image, index) in project.images" :key="index">
          <img :src="image" :alt="`项目图片 ${index + 1}`" class="carousel-image">
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="project-content">
      <div class="project-main">
        <el-tabs>
          <el-tab-pane label="项目概述">
            <div class="overview">
              <h2>项目介绍</h2>
              <p>{{ project.description }}</p>
              
              <h2>项目亮点</h2>
              <ul class="highlights">
                <li v-for="(highlight, index) in project.highlights" :key="index">
                  {{ highlight }}
                </li>
              </ul>

              <h2>行程安排</h2>
              <div class="itinerary" v-for="(day, index) in project.itinerary" :key="index">
                <h3>第{{ index + 1 }}天</h3>
                <p>{{ day }}</p>
              </div>

              <h2>包含服务</h2>
              <ul class="includes">
                <li v-for="(item, index) in project.includes" :key="index">
                  <el-icon><Check /></el-icon> {{ item }}
                </li>
              </ul>

              <h2>不包含项目</h2>
              <ul class="excludes">
                <li v-for="(item, index) in project.excludes" :key="index">
                  <el-icon><Close /></el-icon> {{ item }}
                </li>
              </ul>
            </div>
          </el-tab-pane>
          <el-tab-pane label="注意事项">
            <div class="notes">
              <h2>注意事项</h2>
              <ul>
                <li v-for="(note, index) in project.notes" :key="index">
                  {{ note }}
                </li>
              </ul>
              
              <h2>装备要求</h2>
              <ul>
                <li v-for="(item, index) in project.equipment" :key="index">
                  {{ item }}
                </li>
              </ul>
            </div>
          </el-tab-pane>
          <el-tab-pane label="评价">
            <div class="reviews">
              <h2>用户评价 ({{ project.reviews.length }})</h2>
              <div class="review-stats">
                <div class="average-rating">{{ averageRating }} <el-rate v-model="averageRating" disabled /></div>
              </div>
              
              <div class="review-item" v-for="(review, index) in project.reviews" :key="index">
                <div class="review-header">
                  <div class="reviewer">
                    <el-avatar :size="40" :src="review.avatar"></el-avatar>
                    <div class="reviewer-name">{{ review.userName }}</div>
                  </div>
                  <div class="review-rating">
                    <el-rate v-model="review.rating" disabled />
                    <div class="review-date">{{ review.date }}</div>
                  </div>
                </div>
                <div class="review-content">{{ review.comment }}</div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      
      <div class="booking-sidebar">
        <div class="booking-card">
          <h2>预订项目</h2>
          <el-form :model="bookingForm">
            <el-form-item label="出发日期">
              <el-date-picker 
                v-model="bookingForm.startDate" 
                type="date" 
                placeholder="选择日期"
                :disabled-date="disabledDate"
                style="width: 100%"
              />
            </el-form-item>
            <el-form-item label="人数">
              <el-input-number 
                v-model="bookingForm.participants" 
                :min="1" 
                :max="20"
                style="width: 100%"
              />
            </el-form-item>
            <el-form-item>
              <div class="booking-total">
                <span>总价:</span>
                <span class="total-price">¥{{ totalPrice }}</span>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleBooking" style="width: 100%">立即预订</el-button>
            </el-form-item>
          </el-form>
        </div>
        
        <div class="contact-card">
          <h3>需要帮助?</h3>
          <p><el-icon><Phone /></el-icon> 联系电话: 400-123-4567</p>
          <p><el-icon><Message /></el-icon> 邮箱: support@lowfly.com</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Check, Close, Phone, Message } from '@element-plus/icons-vue';

const route = useRoute();
const router = useRouter();

// 预订表单
const bookingForm = ref({
  startDate: '',
  participants: 1
});

// 模拟项目数据
const project = ref({
  id: 1,
  title: '四姑娘山二峰攀登',
  category: '高山攀登',
  price: 3980,
  duration: 6,
  altitude: 5276,
  description: '四姑娘山二峰攀登是中国最受欢迎的5000米以上的雪山攀登路线之一，二峰攀登技术难度适中，是入门雪山攀登的优选路线。在向导的带领下，我们将向高耸入云的四姑娘山二峰发起冲击，体验冰雪世界的魅力。',
  images: [
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
    'https://example.com/image3.jpg',
    'https://example.com/image4.jpg'
  ],
  highlights: [
    '攀登四姑娘山二峰(5276米)，体验技术雪山攀登',
    '专业向导一对一指导，确保安全',
    '高海拔露营体验，欣赏星空和日出',
    '完整的雪山装备提供，包含冰爪、安全带等'
  ],
  itinerary: [
    '成都集合，驱车前往四姑娘山镇，海拔3200米，适应高海拔。',
    '徒步前往大本营，海拔4200米，装备检查与冰雪技术培训。',
    '凌晨2点出发，登顶冲刺，日出时分到达山顶，下午返回大本营。',
    '返回四姑娘山镇，休整。',
    '返回成都，结束行程。'
  ],
  includes: [
    '专业登山向导服务',
    '所有必要的登山装备（冰爪、安全带、头盔等）',
    '高山营地食宿',
    '往返交通',
    '高海拔保险'
  ],
  excludes: [
    '个人装备（登山鞋、冲锋衣裤等）',
    '额外的食品和饮料',
    '小费',
    '个人旅行保险'
  ],
  notes: [
    '参与者需要有良好的身体状况，无心脏病、高血压等疾病',
    '建议提前进行有氧训练，为高海拔活动做准备',
    '可能会因天气状况调整行程',
    '最低参与年龄为18岁'
  ],
  equipment: [
    '防水登山鞋',
    '保暖内衣裤',
    '冲锋衣裤',
    '抓绒衣裤',
    '羽绒服',
    '登山手套',
    '防晒霜（SPF 50+）',
    '头灯'
  ],
  availableDates: [
    '2023-07-15',
    '2023-07-22',
    '2023-08-05',
    '2023-08-19',
    '2023-09-02'
  ],
  reviews: [
    {
      userName: '张三',
      avatar: 'https://example.com/avatar1.jpg',
      rating: 5,
      date: '2023-06-10',
      comment: '难忘的雪山体验！向导非常专业，全程照顾周到，强烈推荐给想尝试雪山攀登的朋友。'
    },
    {
      userName: '李四',
      avatar: 'https://example.com/avatar2.jpg',
      rating: 4,
      date: '2023-05-25',
      comment: '整体很满意，登顶成功的感觉太棒了。唯一不足是大本营的食物可以再丰富些。'
    },
    {
      userName: '王五',
      avatar: 'https://example.com/avatar3.jpg',
      rating: 5,
      date: '2023-05-18',
      comment: '专业团队，安全有保障。虽然很累但是风景太美了，值得一试！'
    }
  ]
});

// 计算属性
const averageRating = computed(() => {
  if (project.value.reviews.length === 0) return 0;
  const sum = project.value.reviews.reduce((total, review) => total + review.rating, 0);
  return (sum / project.value.reviews.length).toFixed(1);
});

const totalPrice = computed(() => {
  return project.value.price * bookingForm.value.participants;
});

// 禁用不可选择的日期
const disabledDate = (time) => {
  const date = new Date(time).toISOString().split('T')[0];
  return !project.value.availableDates.includes(date);
};

// 预订处理
const handleBooking = () => {
  if (!bookingForm.value.startDate) {
    ElMessage.warning('请选择出发日期');
    return;
  }

  ElMessageBox.confirm(
    `您即将预订${project.value.title}，总价¥${totalPrice.value}，是否确认？`,
    '确认预订',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'info'
    }
  ).then(() => {
    // 模拟预订成功
    ElMessage.success('预订成功！我们将尽快与您联系确认详情。');
    // 这里可以跳转到订单页面
    // router.push('/user/orders');
  }).catch(() => {
    // 用户取消预订
  });
};

// 获取项目详情
const fetchProjectDetails = async () => {
  // 这里应该从API获取项目详情
  // const projectId = route.params.id;
  // 模拟API请求
  // const response = await fetch(`/api/projects/${projectId}`);
  // project.value = await response.json();
  
  // 暂时使用模拟数据
};

onMounted(() => {
  fetchProjectDetails();
});
</script>

<style scoped>
.project-detail-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.project-title h1 {
  margin: 0 0 10px 0;
  font-size: 28px;
}

.project-tags {
  display: flex;
  gap: 10px;
}

.project-price {
  text-align: right;
}

.price {
  font-size: 28px;
  font-weight: bold;
  color: #f56c6c;
}

.per-person {
  color: #909399;
  font-size: 14px;
}

.project-gallery {
  margin-bottom: 30px;
  border-radius: 8px;
  overflow: hidden;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-content {
  display: flex;
  gap: 30px;
}

.project-main {
  flex: 1;
}

.booking-sidebar {
  width: 350px;
}

.booking-card, .contact-card {
  background-color: #f5f7fa;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.booking-total {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  margin: 10px 0;
}

.total-price {
  font-size: 24px;
  font-weight: bold;
  color: #f56c6c;
}

.overview h2, .notes h2 {
  margin-top: 30px;
  margin-bottom: 15px;
  font-size: 20px;
}

.highlights, .includes, .excludes {
  padding-left: 20px;
}

.itinerary {
  margin-bottom: 15px;
}

.itinerary h3 {
  margin-bottom: 5px;
  font-size: 16px;
}

.reviews .review-item {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eaeaea;
}

.review-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.reviewer {
  display: flex;
  align-items: center;
  gap: 10px;
}

.reviewer-name {
  font-weight: bold;
}

.review-rating {
  text-align: right;
}

.review-date {
  font-size: 12px;
  color: #909399;
  margin-top: 5px;
}

.review-content {
  line-height: 1.6;
}

.contact-card p {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
}

@media (max-width: 992px) {
  .project-content {
    flex-direction: column;
  }
  
  .booking-sidebar {
    width: 100%;
  }
}
</style> 
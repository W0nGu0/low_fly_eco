<template>
  <div class="project-detail-container">
    <div class="project-header">
      <div class="project-title">
        <h1>城市热气球观光之旅</h1>
        <div class="project-tags">
          <el-tag type="success">热气球观光</el-tag>
          <el-tag type="info">60分钟</el-tag>
          <el-tag type="warning">300米高空</el-tag>
        </div>
      </div>
      <div class="project-price">
        <div class="price">¥688</div>
        <div class="per-person">每人起</div>
      </div>
    </div>

    <div class="project-gallery">
      <el-carousel height="400px">
        <el-carousel-item>
          <img :src="getImageUrl('@/assets/images/projects/hot-air-balloon.jpg')" alt="热气球观光" class="carousel-image">
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="project-content">
      <div class="project-main">
        <el-tabs>
          <el-tab-pane label="项目概述">
            <div class="overview">
              <h2>项目介绍</h2>
              <p>体验北京城市热气球观光之旅，从高空俯瞰整座城市壮丽的景色。我们使用最先进的热气球设备，配备经验丰富的飞行员，确保您的飞行安全而愉快。热气球缓缓上升到300米的高度，您可以360度无死角地欣赏北京城市风光，尤其是奥林匹克公园的鸟巢、水立方等标志性建筑。天气晴朗时，还能看到远处的长城轮廓。整个飞行过程约60分钟，是拍摄城市美景和留下难忘回忆的绝佳机会。</p>
              
              <h2>适合人群</h2>
              <p>适合大多数人群，包括摄影爱好者、情侣、家庭以及寻求独特体验的游客。6岁以上儿童在成人陪同下可参加，70岁以下身体健康的老人也可参与。不适合孕妇、有心脏病、高血压等严重疾病的人群。</p>
              <div class="suitable-tags mt-2">
                <el-tag v-for="(tag, index) in suitableTags" :key="index" 
                  class="mr-2 mb-2" size="small" effect="plain">
                  {{ tag }}
                </el-tag>
              </div>
              
              <h2>项目亮点</h2>
              <ul class="highlights">
                <li>300米高空俯瞰北京市区全景</li>
                <li>专业飞行团队，安全有保障</li>
                <li>绝佳摄影视角，拍摄城市美景</li>
                <li>奥林匹克公园上空飞行，景色壮观</li>
                <li>获赠精美电子证书和高清航拍照片</li>
              </ul>

              <h2>体验流程</h2>
              <div class="itinerary">
                <div v-for="(step, index) in process" :key="index" class="process-step mb-3">
                  <div class="step-title font-medium text-green-600">{{ index + 1 }}. {{ step.title }}</div>
                  <div class="step-description text-gray-600">{{ step.description }}</div>
                </div>
              </div>

              <h2>安全保障</h2>
              <div class="safety-guarantees grid grid-cols-1 md:grid-cols-2 gap-4">
                <div v-for="(item, index) in safetyGuarantees" :key="index" 
                  class="safety-item p-4 bg-gray-50 rounded-lg">
                  <div class="safety-title flex items-center text-lg font-medium mb-2">
                    <el-icon class="mr-2 text-green-600"><Check /></el-icon>
                    {{ item.title }}
                  </div>
                  <div class="safety-description text-sm text-gray-600">{{ item.description }}</div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          
          <el-tab-pane label="注意事项">
            <div class="notices">
              <div v-for="(notice, index) in notices" :key="index" class="notice-item mb-6">
                <h2 class="text-lg font-medium mb-2">{{ notice.title }}</h2>
                <p class="text-gray-600">{{ notice.content }}</p>
              </div>
            </div>
          </el-tab-pane>
          
          <el-tab-pane label="评价">
            <div class="reviews">
              <h2>用户评价 ({{ reviewCount }})</h2>
              <div class="review-stats flex items-center mb-4">
                <div class="average-rating flex items-center mr-6">
                  <span class="text-2xl font-bold mr-2">{{ rating }}</span>
                  <el-rate v-model="rating" disabled />
                </div>
              </div>
              
              <div v-for="(review, index) in reviews" :key="index" class="review-item border-b pb-4 mb-4">
                <div class="review-header flex justify-between mb-3">
                  <div class="reviewer flex items-center">
                    <el-avatar :size="40" :src="getImageUrl(review.avatar)"></el-avatar>
                    <div class="ml-3">
                      <div class="reviewer-name font-medium">{{ review.name }}</div>
                      <div class="review-date text-sm text-gray-500">{{ review.date }}</div>
                    </div>
                  </div>
                  <div class="review-rating">
                    <el-rate v-model="review.rating" disabled />
                  </div>
                </div>
                <div class="review-content mb-3">{{ review.content }}</div>
                <div v-if="review.images && review.images.length" class="review-images flex flex-wrap gap-2 mb-3">
                  <el-image
                    v-for="(img, imgIndex) in review.images"
                    :key="imgIndex"
                    style="width: 100px; height: 100px;"
                    :src="getImageUrl(img)"
                    :preview-src-list="review.images.map(i => getImageUrl(i))"
                  />
                </div>
                <div v-if="review.merchantReply" class="merchant-reply mt-3 p-3 bg-gray-50 rounded-lg">
                  <div class="font-medium mb-1">商家回复：</div>
                  <div class="text-sm">{{ review.merchantReply }}</div>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      
      <div class="booking-sidebar">
        <div class="booking-card">
          <h2>预订项目</h2>
          <el-form>
            <el-form-item label="出发日期">
              <el-date-picker 
                v-model="bookingDate" 
                type="date" 
                placeholder="选择日期"
                style="width: 100%"
                :disabled-date="disabledDate"
              />
            </el-form-item>
            <el-form-item label="人数">
              <el-input-number 
                v-model="participants" 
                :min="1" 
                :max="10"
                style="width: 100%"
              />
            </el-form-item>
            <el-form-item>
              <div class="booking-total">
                <span>总价:</span>
                <span class="total-price">¥{{ 688 * participants }}</span>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button type="success" style="width: 100%" @click="handleBooking">立即预订</el-button>
            </el-form-item>
          </el-form>
        </div>
        
        <div class="location-card mb-4">
          <h3>项目地点</h3>
          <div class="map-container mb-3 rounded-lg overflow-hidden" style="height: 200px;">
            <img :src="getImageUrl('@/assets/images/projects/map-placeholder.jpg')" alt="地图位置" class="w-full h-full object-cover" />
          </div>
          <div class="location-details">
            <p class="flex items-center mb-2">
              <el-icon class="mr-2 text-green-600"><Location /></el-icon>
              <span>北京市朝阳区奥林匹克公园南路1号</span>
            </p>
            <p class="flex items-center">
              <el-icon class="mr-2 text-green-600"><Phone /></el-icon>
              <span>010-8888-7777</span>
            </p>
          </div>
        </div>
        
        <div class="contact-card">
          <h3>需要帮助?</h3>
          <p class="flex items-center mb-2">
            <el-icon class="mr-2 text-green-600"><Phone /></el-icon>
            <span>联系电话: 400-888-7777</span>
          </p>
          <p class="flex items-center">
            <el-icon class="mr-2 text-green-600"><Message /></el-icon>
            <span>邮箱: support@lowfly.com</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Location, Check, Close, Phone, Message } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { getImageUrl } from '@/utils/imageHelper';

const router = useRouter();
const bookingDate = ref('');
const participants = ref(1);
const rating = ref(4.8);
const reviewCount = ref(128);

// 项目数据
const suitableTags = ref(['摄影爱好者', '情侣', '家庭', '朋友聚会']);

const process = ref([
  {
    title: '活动前准备',
    description: '提前30分钟到达集合地点，进行安全说明和注意事项讲解'
  },
  {
    title: '热气球充气',
    description: '专业人员进行热气球充气，您可近距离观看整个过程'
  },
  {
    title: '乘坐热气球',
    description: '在工作人员引导下乘坐热气球，系好安全带'
  },
  {
    title: '空中游览',
    description: '热气球缓缓升空，飞行员会介绍沿途景点和注意事项'
  },
  {
    title: '安全着陆',
    description: '体验结束后，热气球缓慢下降并安全着陆'
  },
  {
    title: '留影纪念',
    description: '可在热气球旁拍照留念，获取电子证书'
  }
]);

const safetyGuarantees = ref([
  {
    title: '专业飞行团队',
    description: '所有飞行员均持有国际热气球飞行执照，拥有5年以上飞行经验'
  },
  {
    title: '定期设备检查',
    description: '热气球设备每天进行安全检查，确保符合国际安全标准'
  },
  {
    title: '全程保险保障',
    description: '每位体验者均提供价值100万的高空飞行意外保险'
  },
  {
    title: '气象监测系统',
    description: '实时监测天气状况，确保在适宜的天气条件下飞行'
  }
]);

const notices = ref([
  {
    title: '预订须知',
    content: '请提前3天预订，并保持手机畅通，如遇天气原因取消，可免费改期或全额退款。'
  },
  {
    title: '着装建议',
    content: '建议穿着舒适休闲的衣服和平底鞋，早晚温差较大，请适当增减衣物。'
  },
  {
    title: '安全规定',
    content: '严禁携带打火机、火柴等易燃物品，飞行过程中禁止吸烟，请听从飞行员指示。'
  },
  {
    title: '儿童参与',
    content: '6岁以下儿童不建议参加，6-12岁儿童必须有成人陪同，且需购买儿童票。'
  }
]);

const reviews = ref([
  {
    name: '张先生',
    avatar: '@/assets/images/users/user1.jpg',
    rating: 5,
    date: '2023-08-15',
    content: '体验非常棒！第一次坐热气球，视野特别开阔，北京城市的景色尽收眼底。飞行员专业又热情，讲解很详细，全程感觉很安全。特别适合拍照，朋友圈的照片获得了很多赞！',
    images: [
      '@/assets/images/reviews/review1-1.jpg',
      '@/assets/images/reviews/review1-2.jpg'
    ],
    merchantReply: '感谢您的好评！很高兴您喜欢我们的热气球体验，期待您下次再来参与我们的其他空中项目！'
  },
  {
    name: '李女士',
    avatar: '@/assets/images/users/user2.jpg',
    rating: 4,
    date: '2023-08-10',
    content: '整体来说是很不错的体验，景色很美，工作人员也很专业。唯一的遗憾是飞行时间感觉有点短，如果能再长一些就更好了。不过安全措施做得很到位，值得推荐！',
    merchantReply: '感谢您的评价和建议！为了确保安全和最佳体验，我们的标准飞行时间为60分钟。我们会考虑根据天气条件适当延长飞行时间的可能性。'
  },
  {
    name: '王先生',
    avatar: '@/assets/images/users/user1.jpg',
    rating: 5,
    date: '2023-07-28',
    content: '带全家人一起体验的，老人孩子都很喜欢，尤其是孩子，一直兴奋地指着下面的建筑问这问那。飞行很平稳，一点也不恐高，工作人员态度也很好，是一次很棒的家庭活动！',
    images: [
      '@/assets/images/reviews/review1-3.jpg'
    ],
    merchantReply: '非常感谢您和家人的参与！我们的热气球体验确实很适合家庭活动，很高兴听到您全家都玩得开心。期待未来能为您提供更多难忘的体验！'
  }
]);

// 禁用过去的日期
const disabledDate = (date) => {
  return date < new Date();
};

// 处理预订
function handleBooking() {
  if (!bookingDate.value) {
    ElMessage.warning('请选择出发日期');
    return;
  }
  
  // 创建预订信息
  const bookingInfo = {
    projectId: 1,
    projectName: '城市热气球观光之旅',
    date: bookingDate.value.toISOString().split('T')[0],
    price: 688,
    participants: participants.value,
    totalPrice: 688 * participants.value,
  };

  // 存储预订信息到本地存储
  localStorage.setItem('currentBooking', JSON.stringify(bookingInfo));

  // 显示成功消息
  ElMessage.success('预订信息已保存，正在跳转到预订页面...');
  
  // 跳转到预订页面
  setTimeout(() => {
    router.push(`/user/booking/1?date=${bookingInfo.date}&participants=${participants.value}`);
  }, 1500);
}
</script>

<style scoped>
.project-detail-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: calc(100vh - 64px);
  background-color: #f0fdf4;
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  animation: fadeInDown 0.5s ease-out;
}

.project-title h1 {
  margin: 0 0 1rem 0;
  font-size: 2rem;
  color: #166534;
  font-weight: 600;
}

.project-tags {
  display: flex;
  gap: 0.75rem;
}

.project-price {
  text-align: right;
  padding: 1rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.project-price:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.price {
  font-size: 2rem;
  font-weight: bold;
  color: #16a34a;
}

.per-person {
  color: #374151;
  font-size: 0.9rem;
}

.project-gallery {
  margin-bottom: 2rem;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.5s ease-out;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-content {
  display: flex;
  gap: 2rem;
  animation: fadeInUp 0.5s ease-out;
}

.project-main {
  flex: 1;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  transition: all 0.3s ease;
}

.project-main:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.booking-sidebar {
  width: 350px;
}

.booking-card, .location-card, .contact-card {
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
}

.booking-card:hover, .location-card:hover, .contact-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.booking-card h2, .location-card h3, .contact-card h3 {
  margin: 0 0 1.5rem 0;
  color: #166534;
  font-weight: 600;
}

.booking-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  margin: 1rem 0;
  padding: 1rem;
  background: #f0fdf4;
  border-radius: 0.5rem;
}

.total-price {
  color: #16a34a;
  font-size: 1.5rem;
}

.overview h2, .notices h2 {
  color: #166534;
  font-size: 1.5rem;
  margin: 2rem 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #dcfce7;
}

.overview p {
  line-height: 1.6;
  color: #374151;
  margin-bottom: 1.5rem;
}

.suitable-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.highlights {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
}

.highlights li {
  padding: 0.75rem 0;
  border-bottom: 1px solid #dcfce7;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  color: #374151;
}

.highlights li:hover {
  background: #f0fdf4;
  padding-left: 1rem;
  border-radius: 0.5rem;
}

.highlights li:before {
  content: "✓";
  color: #16a34a;
  margin-right: 1rem;
  font-weight: bold;
}

.process-step {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #f0fdf4;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

.process-step:hover {
  transform: translateX(0.5rem);
  background: #dcfce7;
}

.step-title {
  color: #166534;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.step-description {
  color: #374151;
  font-size: 0.9rem;
}

.safety-guarantees {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.safety-item {
  background: #f0fdf4;
  border-radius: 0.5rem;
  padding: 1rem;
  transition: all 0.3s ease;
}

.safety-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.safety-title {
  display: flex;
  align-items: center;
  color: #166534;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.safety-description {
  color: #374151;
  font-size: 0.9rem;
  line-height: 1.5;
}

.notice-item {
  margin-bottom: 2rem;
  padding: 1rem;
  background: #f0fdf4;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

.notice-item:hover {
  transform: translateX(0.5rem);
  background: #dcfce7;
}

.review-stats {
  display: flex;
  margin-bottom: 2rem;
}

.average-rating {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: #166534;
}

.review-item {
  border-bottom: 1px solid #dcfce7;
  padding: 1.5rem 0;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
}

.review-item:hover {
  background: #f0fdf4;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin: 0 -1.5rem 1.5rem;
}

.review-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.reviewer {
  display: flex;
  align-items: center;
}

.reviewer-name {
  margin-left: 1rem;
  font-weight: 600;
  color: #166534;
}

.review-rating {
  text-align: right;
}

.review-date {
  font-size: 0.9rem;
  color: #6b7280;
  margin-top: 0.5rem;
}

.review-content {
  line-height: 1.6;
  color: #374151;
  margin-bottom: 1rem;
}

.review-images {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.merchant-reply {
  background: #f0fdf4;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-top: 1rem;
  border-left: 4px solid #16a34a;
}

.reply-header {
  color: #166534;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.reply-content {
  color: #374151;
  font-size: 0.9rem;
}

.map-container {
  border-radius: 0.5rem;
  overflow: hidden;
  margin-bottom: 1rem;
}

.location-details p {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  color: #374151;
}

.location-details .el-icon {
  margin-right: 0.5rem;
  color: #16a34a;
}

.el-button--success {
  background-color: #16a34a;
  border-color: #16a34a;
  font-weight: 600;
  height: 3rem;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.el-button--success:hover {
  background-color: #15803d;
  border-color: #15803d;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(22, 163, 74, 0.2);
}

@media (max-width: 768px) {
  .project-content {
    flex-direction: column;
  }
  
  .booking-sidebar {
    width: 100%;
  }
  
  .project-header {
    flex-direction: column;
  }
  
  .project-price {
    text-align: left;
    margin-top: 1rem;
    width: 100%;
  }
  
  .safety-guarantees {
    grid-template-columns: 1fr;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 
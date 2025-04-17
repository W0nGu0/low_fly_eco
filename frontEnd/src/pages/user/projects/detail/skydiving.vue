<template>
  <div class="project-detail-container">
    <div class="project-header">
      <div class="project-title">
        <h1>高空跳伞极限体验</h1>
        <div class="project-tags">
          <el-tag type="success">高空跳伞</el-tag>
          <el-tag type="info">180分钟</el-tag>
          <el-tag type="warning">3000米高空</el-tag>
        </div>
      </div>
      <div class="project-price">
        <div class="price">¥2980</div>
        <div class="per-person">每人起</div>
      </div>
    </div>

    <div class="project-gallery">
      <el-carousel height="400px">
        <el-carousel-item>
          <img :src="getImageUrl('@/assets/images/projects/skydiving.jpg')" alt="高空跳伞" class="carousel-image">
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="project-content">
      <div class="project-main">
        <el-tabs>
          <el-tab-pane label="项目概述">
            <div class="overview">
              <h2>项目介绍</h2>
              <p>体验刺激的高空跳伞，从3000米高空跳下，感受自由落体的极限挑战。全程由国际专业教练一对一陪伴，采用双人跳伞模式，确保安全。您将体验约40秒的自由落体和约5分钟的滑翔降落过程，欣赏三亚壮观的海岸线和城市风光。这是一次突破自我、挑战极限的难忘体验，也是拍摄极限运动视频的绝佳机会。</p>
              
              <h2>适合人群</h2>
              <p>适合18-55岁身体健康、追求刺激的年轻人和冒险爱好者。不适合孕妇、心脏病患者、高血压患者、癫痫患者和有严重脊椎问题的人群。体重限制在45-95公斤之间。</p>
              <div class="suitable-tags mt-2">
                <el-tag v-for="(tag, index) in suitableTags" :key="index" 
                  class="mr-2 mb-2" size="small" effect="plain">
                  {{ tag }}
                </el-tag>
              </div>
              
              <h2>项目亮点</h2>
              <ul class="highlights">
                <li>专业双人跳伞，无需经验即可体验</li>
                <li>40秒自由落体，5分钟滑翔降落</li>
                <li>三亚海岸线绝美空中视角</li>
                <li>国际认证教练一对一保障</li>
                <li>全程高清航拍视频和照片记录</li>
                <li>获赠首次跳伞证书</li>
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
                :max="5"
                style="width: 100%"
              />
            </el-form-item>
            <el-form-item>
              <div class="booking-total">
                <span>总价:</span>
                <span class="total-price">¥{{ 2980 * participants }}</span>
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
              <span>海南省三亚市海棠区龙江路888号空中运动基地</span>
            </p>
            <p class="flex items-center">
              <el-icon class="mr-2 text-green-600"><Phone /></el-icon>
              <span>0898-8888-7777</span>
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
const rating = ref(4.9);
const reviewCount = ref(29);

// 项目数据
const suitableTags = ref(['冒险爱好者', '极限运动爱好者', '年轻人', '寻求刺激的人群']);

const process = ref([
  {
    title: '报到登记',
    description: '提前1小时到达跳伞基地，填写安全免责声明并进行身体状况评估'
  },
  {
    title: '理论培训',
    description: '接受约30分钟的地面安全培训，学习基本姿势和注意事项'
  },
  {
    title: '装备准备',
    description: '穿戴专业跳伞装备，与教练确认所有安全检查项目'
  },
  {
    title: '乘机上升',
    description: '乘坐专业跳伞飞机上升至约3000米的高度'
  },
  {
    title: '跳伞过程',
    description: '与教练一起跳出飞机，体验约40秒自由落体和5分钟滑翔降落'
  },
  {
    title: '安全着陆',
    description: '在指定的安全区域平稳着陆，完成体验'
  },
  {
    title: '颁发证书',
    description: '获得首次跳伞证书和专业摄影/摄像服务（可选）'
  }
]);

const safetyGuarantees = ref([
  {
    title: '国际认证教练',
    description: '所有跳伞教练均持有国际跳伞联合会认证资格，跳伞次数超过1000次'
  },
  {
    title: '顶级跳伞装备',
    description: '使用国际认证的专业跳伞装备，配备主降落伞和备用降落伞'
  },
  {
    title: '严格气象标准',
    description: '严格按照国际标准监测风速、能见度等天气条件，确保安全'
  },
  {
    title: '全程医疗保障',
    description: '基地配备专业医疗团队和急救设备，提供紧急医疗支持'
  },
  {
    title: '高额保险保障',
    description: '含300万元高空极限运动意外保险'
  }
]);

const notices = ref([
  {
    title: '健康要求',
    content: '参与者必须身体健康，无心脏病、高血压、癫痫、严重脊椎问题等疾病，如有疑问请提前咨询。'
  },
  {
    title: '年龄限制',
    content: '18岁以上，55岁以下。未满18岁需父母或监护人签署同意书，55岁以上需提供近期体检报告。'
  },
  {
    title: '体重限制',
    content: '为确保安全，参与者体重必须在45-95公斤之间，超出范围请提前咨询。'
  },
  {
    title: '着装建议',
    content: '建议穿着舒适的运动装和运动鞋，长发需要扎起，避免佩戴首饰。'
  },
  {
    title: '天气因素',
    content: '跳伞活动高度依赖天气条件，如遇不适合跳伞的天气，将免费改期或全额退款。'
  }
]);

const reviews = ref([
  {
    name: '林先生',
    avatar: '@/assets/images/users/user1.jpg',
    rating: 5,
    date: '2023-08-20',
    content: '人生中最刺激的体验！自由落体的感觉难以形容，最初的恐惧在跳出飞机的一瞬间变成了纯粹的兴奋。教练非常专业，全程指导很到位，让我完全放心。从高空看三亚的景色太震撼了！强烈推荐给喜欢挑战自我的朋友们！',
    images: [
      '@/assets/images/reviews/review6-1.jpg',
      '@/assets/images/reviews/review6-2.jpg'
    ],
    merchantReply: '感谢您的精彩评价！高空跳伞确实是一种突破自我的绝佳方式，很高兴您享受了这个过程。期待您再次挑战我们的其他极限项目！'
  },
  {
    name: '张女士',
    avatar: '@/assets/images/users/user2.jpg',
    rating: 5,
    date: '2023-08-15',
    content: '作为一个之前有点恐高的人，这次跳伞完全改变了我的看法！整个过程太美妙了，特别是降落伞打开后那段滑翔时间，平静而美丽。教练很幽默，一直帮我缓解紧张情绪。视频拍得很专业，值得购买留念。非常难忘的体验！',
    merchantReply: '谢谢您的分享！克服恐惧后的成就感确实无与伦比，很高兴我们的教练能帮助您享受整个过程。您的勇气令人敬佩，希望这次经历能给您带来更多面对挑战的信心！'
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
    projectId: 6,
    projectName: '高空跳伞极限体验',
    date: bookingDate.value.toISOString().split('T')[0],
    price: 2980,
    participants: participants.value,
    totalPrice: 2980 * participants.value,
  };

  // 存储预订信息到本地存储
  localStorage.setItem('currentBooking', JSON.stringify(bookingInfo));

  // 显示成功消息
  ElMessage.success('预订信息已保存，正在跳转到预订页面...');
  
  // 跳转到预订页面
  setTimeout(() => {
    router.push(`/user/booking/6?date=${bookingInfo.date}&participants=${participants.value}`);
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

.booking-card, .contact-card {
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
}

.booking-card:hover, .contact-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.booking-card h2, .contact-card h3 {
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

.overview h2, .notes h2 {
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

.highlights, .includes, .excludes {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
}

.highlights li, .includes li, .excludes li {
  padding: 0.75rem 0;
  border-bottom: 1px solid #dcfce7;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  color: #374151;
}

.highlights li:hover, .includes li:hover, .excludes li:hover {
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

.includes .el-icon, .excludes .el-icon {
  margin-right: 1rem;
}

.includes .el-icon {
  color: #16a34a;
}

.excludes .el-icon {
  color: #dc2626;
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

.contact-card p {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  color: #374151;
}

.contact-card .el-icon {
  margin-right: 1rem;
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
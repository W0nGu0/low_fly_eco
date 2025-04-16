<template>
  <div class="project-detail-container">
    <div class="project-header">
      <div class="project-title">
        <h1>直升机空中游览</h1>
        <div class="project-tags">
          <el-tag type="success">直升机游览</el-tag>
          <el-tag type="info">30分钟</el-tag>
          <el-tag type="warning">专业飞行员</el-tag>
        </div>
      </div>
      <div class="project-price">
        <div class="price">¥1280</div>
        <div class="per-person">每人起</div>
      </div>
    </div>

    <div class="project-gallery">
      <el-carousel height="400px">
        <el-carousel-item>
          <img :src="getImageUrl('@/assets/images/projects/helicopter.jpg')" alt="直升机游览" class="carousel-image">
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="project-content">
      <div class="project-main">
        <el-tabs>
          <el-tab-pane label="项目概述">
            <div class="overview">
              <h2>项目介绍</h2>
              <p>乘坐专业豪华直升机，从空中鸟瞰上海的壮丽景色。我们的航线覆盖浦东金融区、外滩、东方明珠等上海标志性景点，为您提供独特的视角欣赏这座国际大都市。直升机配备全景玻璃舱，视野极佳，是摄影爱好者的绝佳选择。全程约30分钟，由经验丰富的专业飞行员驾驶，确保安全舒适的飞行体验。</p>
              
              <h2>项目亮点</h2>
              <ul class="highlights">
                <li>全方位俯瞰上海城市天际线</li>
                <li>专业飞行员讲解沿途景点</li>
                <li>全景玻璃舱，视野极佳</li>
                <li>空中拍摄绝美城市照片</li>
                <li>获赠高清航拍照片和飞行证书</li>
              </ul>

              <h2>行程安排</h2>
              <div class="itinerary">
                <h3>体验流程</h3>
                <p>1. 值机登记（15分钟）</p>
                <p>2. 安全培训（15分钟）</p>
                <p>3. 乘坐指引（10分钟）</p>
                <p>4. 空中游览（30分钟）</p>
                <p>5. 安全降落（5分钟）</p>
                <p>6. 留影纪念（15分钟）</p>
              </div>

              <h2>包含服务</h2>
              <ul class="includes">
                <li><el-icon><Check /></el-icon> 直升机乘坐费用</li>
                <li><el-icon><Check /></el-icon> 专业飞行员讲解</li>
                <li><el-icon><Check /></el-icon> 安全头盔与设备</li>
                <li><el-icon><Check /></el-icon> 高清航拍照片（5张电子版）</li>
                <li><el-icon><Check /></el-icon> 飞行纪念证书</li>
                <li><el-icon><Check /></el-icon> 意外保险</li>
              </ul>

              <h2>不包含项目</h2>
              <ul class="excludes">
                <li><el-icon><Close /></el-icon> 往返交通费用</li>
                <li><el-icon><Close /></el-icon> 个人消费</li>
                <li><el-icon><Close /></el-icon> 额外航线延长费用</li>
                <li><el-icon><Close /></el-icon> 个人旅游保险</li>
              </ul>
            </div>
          </el-tab-pane>
          <el-tab-pane label="注意事项">
            <div class="notes">
              <h2>注意事项</h2>
              <ul>
                <li>参与者需年满8周岁，65岁以下，身体健康</li>
                <li>体重限制：每人不超过120kg</li>
                <li>孕妇、心脏病、高血压患者不宜参加</li>
                <li>请提前45分钟到达，迟到超过15分钟将视为自动放弃</li>
                <li>如因天气原因（大风、暴雨、大雾）无法起飞，将安排改期或全额退款</li>
                <li>请至少提前3天预约</li>
              </ul>
              
              <h2>装备建议</h2>
              <ul>
                <li>建议穿着舒适的衣物，避免穿着裙装</li>
                <li>平底鞋（请勿穿高跟鞋）</li>
                <li>可自带相机、手机拍摄（需系绳固定）</li>
                <li>建议携带墨镜（阳光强烈时可用）</li>
                <li>严禁携带打火机、烟花等危险物品</li>
              </ul>
            </div>
          </el-tab-pane>
          <el-tab-pane label="评价">
            <div class="reviews">
              <h2>用户评价 (92)</h2>
              <div class="review-stats">
                <div class="average-rating">4.6 <el-rate v-model="averageRating" disabled /></div>
              </div>
              
              <div class="review-item">
                <div class="review-header">
                  <div class="reviewer">
                    <el-avatar :size="40" :src="getImageUrl('@/assets/images/users/user1.jpg')"></el-avatar>
                    <div class="reviewer-name">李先生</div>
                  </div>
                  <div class="review-rating">
                    <el-rate v-model="highRating" disabled />
                    <div class="review-date">2023-08-20</div>
                  </div>
                </div>
                <div class="review-content">这是我第一次乘坐直升机，感觉太震撼了！从空中看上海完全是另一番景象，尤其是看到陆家嘴和外滩的全景，简直美不胜收。飞行员很专业，全程讲解很详细，还会根据我们的要求调整角度，让我们拍到最好的照片。全程30分钟，感觉有点短，但是体验非常值得。强烈推荐给想要看不一样上海的朋友们！</div>
                <div class="review-images">
                  <el-image
                    style="width: 100px; height: 100px; margin-right: 10px;"
                    :src="getImageUrl('@/assets/images/reviews/review2-1.jpg')"
                    :preview-src-list="[getImageUrl('@/assets/images/reviews/review2-1.jpg')]"
                  />
                </div>
              </div>

              <div class="review-item">
                <div class="review-header">
                  <div class="reviewer">
                    <el-avatar :size="40" :src="getImageUrl('@/assets/images/users/user2.jpg')"></el-avatar>
                    <div class="reviewer-name">王女士</div>
                  </div>
                  <div class="review-rating">
                    <el-rate :value="4" disabled />
                    <div class="review-date">2023-08-05</div>
                  </div>
                </div>
                <div class="review-content">带父母来体验的，他们玩得很开心！起飞前有点紧张，但飞起来后就被美景吸引了。价格确实偏高，但考虑到直升机的运营成本，也算合理。服务人员态度很好，飞行员经验丰富，让人很放心。唯一的小遗憾是天气不够晴朗，有点雾气，影响了远处的视野。总体来说值得体验一次！</div>
                <div class="merchant-reply mt-3 p-3 bg-gray-50 rounded-lg">
                  <div class="reply-header text-sm font-medium mb-1">商家回复：</div>
                  <div class="reply-content text-sm">感谢您和父母的参与！我们很高兴听到您的家人享受了这次飞行。关于天气问题，我们确实会尽量选择晴朗的天气起飞，但上海的天气有时难以预测。我们会在预约时提供更详细的天气信息，帮助客人选择最佳飞行日期。</div>
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
                :max="6"
                style="width: 100%"
              />
            </el-form-item>
            <el-form-item>
              <div class="booking-total">
                <span>总价:</span>
                <span class="total-price">¥{{ 1280 * participants }}</span>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button type="success" style="width: 100%" @click="handleBooking">立即预订</el-button>
            </el-form-item>
          </el-form>
        </div>
        
        <div class="contact-card">
          <h3>需要帮助?</h3>
          <p><el-icon><Phone /></el-icon> 联系电话: 400-888-7777</p>
          <p><el-icon><Message /></el-icon> 邮箱: support@lowfly.com</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Check, Close, Phone, Message } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { getImageUrl } from '@/utils/imageHelper';

const router = useRouter();
const bookingDate = ref('');
const participants = ref(1);
const averageRating = ref(4.6);
const highRating = ref(5);

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
    projectId: 2,
    projectName: '直升机空中游览',
    date: bookingDate.value.toISOString().split('T')[0],
    price: 1280,
    participants: participants.value,
    totalPrice: 1280 * participants.value,
  };

  // 存储预订信息到本地存储
  localStorage.setItem('currentBooking', JSON.stringify(bookingInfo));

  // 显示成功消息
  ElMessage.success('预订信息已保存，正在跳转到预订页面...');
  
  // 跳转到预订页面
  setTimeout(() => {
    router.push(`/user/booking/2?date=${bookingInfo.date}&participants=${participants.value}`);
  }, 1500);
}
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
  color: #67c23a;
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
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.booking-sidebar {
  width: 350px;
}

.booking-card, .contact-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
}

.booking-card h2, .contact-card h3 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #2c3e50;
}

.booking-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  margin-bottom: 10px;
}

.total-price {
  color: #67c23a;
  font-size: 22px;
}

.overview h2, .notes h2 {
  margin-top: 30px;
  margin-bottom: 15px;
  color: #2c3e50;
  font-size: 20px;
}

.overview h2:first-child {
  margin-top: 0;
}

.overview p {
  line-height: 1.6;
  margin-bottom: 15px;
}

.highlights, .includes, .excludes {
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
}

.highlights li, .includes li, .excludes li {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
}

.highlights li:before {
  content: "✓";
  color: #67c23a;
  margin-right: 10px;
}

.includes .el-icon, .excludes .el-icon {
  margin-right: 10px;
}

.includes .el-icon {
  color: #67c23a;
}

.excludes .el-icon {
  color: #f56c6c;
}

.review-stats {
  display: flex;
  margin-bottom: 20px;
}

.average-rating {
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
}

.review-item {
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.review-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.reviewer {
  display: flex;
  align-items: center;
}

.reviewer-name {
  margin-left: 10px;
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
  margin-bottom: 10px;
}

.review-images {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
}

.contact-card p {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.contact-card .el-icon {
  margin-right: 10px;
  color: #67c23a;
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
    margin-top: 10px;
  }
}
</style> 
<template>
  <div class="project-detail-container">
    <div class="project-header">
      <div class="project-title">
        <h1>悬崖滑翔伞体验</h1>
        <div class="project-tags">
          <el-tag type="success">滑翔伞</el-tag>
          <el-tag type="info">120分钟</el-tag>
          <el-tag type="warning">800米高度</el-tag>
        </div>
      </div>
      <div class="project-price">
        <div class="price">¥1580</div>
        <div class="per-person">每人起</div>
      </div>
    </div>

    <div class="project-gallery">
      <el-carousel height="400px">
        <el-carousel-item>
          <img :src="getImageUrl('@/assets/images/projects/paragliding.jpg')" alt="悬崖滑翔伞" class="carousel-image">
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="project-content">
      <div class="project-main">
        <el-tabs>
          <el-tab-pane label="项目概述">
            <div class="overview">
              <h2>项目介绍</h2>
              <p>从800米高的悬崖起飞，体验自由翱翔的感觉。在专业教练的陪伴下，您将乘坐双人滑翔伞飞越海岸线，俯瞰壮美的自然风光。这是一次零门槛的高空体验，无需专业知识即可轻松上手。您可以选择刺激的特技飞行，也可以选择舒适的巡航飞行，体验约15-20分钟的空中之旅。</p>
              
              <h2>项目亮点</h2>
              <ul class="highlights">
                <li>壮观的悬崖起飞点</li>
                <li>无需经验，零门槛体验</li>
                <li>专业教练全程陪伴</li>
                <li>俯瞰绝美海岸线风光</li>
                <li>提供航拍和特技飞行选项</li>
                <li>获得专业飞行证书</li>
              </ul>

              <h2>行程安排</h2>
              <div class="itinerary">
                <h3>体验流程</h3>
                <p>1. 签到与安全培训（30分钟）</p>
                <p>2. 装备穿戴与检查（15分钟）</p>
                <p>3. 交通接送至起飞点（30分钟）</p>
                <p>4. 滑翔伞准备与起飞（15分钟）</p>
                <p>5. 空中飞行体验（15-20分钟）</p>
                <p>6. 安全着陆与装备卸除（10分钟）</p>
                <p>7. 证书颁发与照片分享（10分钟）</p>
              </div>

              <h2>包含服务</h2>
              <ul class="includes">
                <li><el-icon><Check /></el-icon> 专业滑翔伞装备使用</li>
                <li><el-icon><Check /></el-icon> 国际认证教练一对一指导</li>
                <li><el-icon><Check /></el-icon> 往返起飞点交通接送</li>
                <li><el-icon><Check /></el-icon> 飞行证书</li>
                <li><el-icon><Check /></el-icon> 基本照片（5张电子版）</li>
                <li><el-icon><Check /></el-icon> 安全保险</li>
              </ul>

              <h2>不包含项目</h2>
              <ul class="excludes">
                <li><el-icon><Close /></el-icon> 酒店至集合点交通费用</li>
                <li><el-icon><Close /></el-icon> 个人消费</li>
                <li><el-icon><Close /></el-icon> 高清视频拍摄（可选购498元）</li>
                <li><el-icon><Close /></el-icon> 特技飞行体验（可选购300元）</li>
              </ul>
            </div>
          </el-tab-pane>
          <el-tab-pane label="注意事项">
            <div class="notes">
              <h2>参与条件</h2>
              <ul>
                <li>参与者年龄限制：6-65岁；未满18周岁需监护人现场签字</li>
                <li>体重限制：30-110kg</li>
                <li>孕妇、心脏病、高血压、癫痫患者禁止参加</li>
                <li>酒后及身体不适者不宜参加</li>
              </ul>
              
              <h2>注意事项</h2>
              <ul>
                <li>活动受天气影响较大，若因天气原因取消，可免费改期或全额退款</li>
                <li>起飞前请不要吃太饱，以免影响体验</li>
                <li>请提前3天预约，并保持手机畅通</li>
                <li>活动地点海拔较高，请做好防晒与保暖措施</li>
                <li>起飞过程中请配合教练指令，确保安全</li>
              </ul>
              
              <h2>装备建议</h2>
              <ul>
                <li>穿着舒适运动服装和运动鞋</li>
                <li>长发需扎起</li>
                <li>带上太阳镜、帽子和防晒用品</li>
                <li>自备相机或手机（有专用固定绳）</li>
              </ul>
              
              <h2>取消政策</h2>
              <ul>
                <li>活动前7天取消：全额退款</li>
                <li>活动前3-7天取消：退款80%</li>
                <li>活动前1-3天取消：退款50%</li>
                <li>活动当天取消：不予退款</li>
                <li>因天气原因取消：全额退款或免费改期</li>
              </ul>
            </div>
          </el-tab-pane>
          <el-tab-pane label="评价">
            <div class="reviews">
              <h2>用户评价 (56)</h2>
              <div class="review-stats">
                <div class="average-rating">4.8 <el-rate v-model="averageRating" disabled /></div>
              </div>
              
              <div class="review-item">
                <div class="review-header">
                  <div class="reviewer">
                    <el-avatar :size="40" :src="getImageUrl('@/assets/images/users/user3.jpg')"></el-avatar>
                    <div class="reviewer-name">王先生</div>
                  </div>
                  <div class="review-rating">
                    <el-rate v-model="highRating" disabled />
                    <div class="review-date">2023-09-05</div>
                  </div>
                </div>
                <div class="review-content">作为一个有轻微恐高的人，这次体验真的让我惊喜！教练李教练非常专业和耐心，起飞前详细讲解了注意事项，飞行中一直鼓励我放松享受。起飞那一刻有点紧张，但一旦飞起来，那种自由感和视野真的无与伦比！从悬崖上俯瞰海岸线的景色太震撼了，我选择了特技飞行，虽然刺激但很安全。着陆也很平稳，整个过程大约15分钟，但这绝对是我假期中最难忘的15分钟！强烈推荐给想尝试轻度冒险的朋友们！</div>
                <div class="review-images">
                  <el-image
                    style="width: 100px; height: 100px; margin-right: 10px;"
                    :src="getImageUrl('@/assets/images/reviews/review1-1.jpg')"
                    :preview-src-list="[getImageUrl('@/assets/images/reviews/review1-1.jpg')]"
                  />
                  <el-image
                    style="width: 100px; height: 100px;"
                    :src="getImageUrl('@/assets/images/reviews/review1-2.jpg')"
                    :preview-src-list="[getImageUrl('@/assets/images/reviews/review1-2.jpg')]"
                  />
                </div>
              </div>

              <div class="review-item">
                <div class="review-header">
                  <div class="reviewer">
                    <el-avatar :size="40" :src="getImageUrl('@/assets/images/users/user4.jpg')"></el-avatar>
                    <div class="reviewer-name">陈女士</div>
                  </div>
                  <div class="review-rating">
                    <el-rate :value="4" disabled />
                    <div class="review-date">2023-08-22</div>
                  </div>
                </div>
                <div class="review-content">带着12岁的儿子一起体验的，他超级兴奋！整个活动组织得很好，从安全培训到装备穿戴都很专业。教练很有耐心，特别照顾小朋友的感受。唯一的小遗憾是等待时间有点长，可能是因为周末人多。飞行体验本身非常棒，景色美丽，感觉非常安全。孩子说这是他度过的最棒的一天！建议提前预约避开人多的时段。</div>
                <div class="merchant-reply mt-3 p-3 bg-gray-50 rounded-lg">
                  <div class="reply-header text-sm font-medium mb-1">商家回复：</div>
                  <div class="reply-content text-sm">感谢陈女士的评价！我们很高兴您和孩子喜欢这次体验。关于等待时间的问题，我们正在优化预约系统，未来会提供更精确的时间段选择。您的建议对我们很有价值，欢迎您和家人再次光临！</div>
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
                <span class="total-price">¥{{ 1580 * participants }}</span>
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
const averageRating = ref(4.8);
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
    projectId: 1,
    projectName: '悬崖滑翔伞体验',
    date: bookingDate.value.toISOString().split('T')[0],
    price: 1580,
    participants: participants.value,
    totalPrice: 1580 * participants.value,
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
  color: #909399;
  font-size: 14px;
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

.overview h2:first-child {
  margin-top: 0;
}

.overview p {
  line-height: 1.6;
  color: #374151;
}

.highlights, .includes, .excludes {
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
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
  margin-right: 10px;
}

.includes .el-icon, .excludes .el-icon {
  margin-right: 10px;
}

.includes .el-icon {
  color: #16a34a;
}

.excludes .el-icon {
  color: #ef4444;
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
  color: #374151;
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

.merchant-reply {
  background: #f0fdf4;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-top: 1rem;
  border-left: 4px solid #16a34a;
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
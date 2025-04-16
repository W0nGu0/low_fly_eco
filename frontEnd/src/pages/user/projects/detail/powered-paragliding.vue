<template>
  <div class="project-detail-container">
    <div class="project-header">
      <div class="project-title">
        <h1>山地动力伞飞行</h1>
        <div class="project-tags">
          <el-tag type="success">动力伞</el-tag>
          <el-tag type="info">60分钟</el-tag>
          <el-tag type="warning">500米高空</el-tag>
        </div>
      </div>
      <div class="project-price">
        <div class="price">¥1580</div>
        <div class="price-tag">人均</div>
      </div>
    </div>

    <div class="project-gallery">
      <el-carousel height="400px">
        <el-carousel-item>
          <img :src="getImageUrl('@/assets/images/projects/powered-paragliding.jpg')" alt="动力伞飞行" class="carousel-image">
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="project-content">
      <div class="project-main">
        <el-tabs>
          <el-tab-pane label="项目概述">
            <div class="overview">
              <h2>项目介绍</h2>
              <p>动力伞飞行是一项结合了滑翔伞和动力引擎的空中运动，让您在山区上空自由翱翔。与普通滑翔伞不同，动力伞配备专业发动机，可以自主起飞和控制飞行高度，不依赖气流和地形条件。本次体验在杭州临安山区进行，您将在专业教练的带领下，从平地起飞，升空至约500米高度，俯瞰壮丽的山峦和湖泊景色，体验真正的"空中漫步"。</p>
              
              <h2>项目亮点</h2>
              <ul class="highlights">
                <li>配备专业动力伞设备，自主控制飞行</li>
                <li>平地起飞，操作简单安全</li>
                <li>资深教练一对一指导</li>
                <li>飞越杭州临安山区自然风光</li>
                <li>提供航拍和特技飞行选项</li>
                <li>专业飞行摄影记录整个过程</li>
              </ul>

              <h2>行程安排</h2>
              <div class="itinerary">
                <h3>体验流程</h3>
                <p>1. 签到与安全培训（30分钟）</p>
                <p>2. 动力伞原理讲解（15分钟）</p>
                <p>3. 装备穿戴与检查（15分钟）</p>
                <p>4. 起飞准备与指导（10分钟）</p>
                <p>5. 动力伞飞行体验（约30分钟）</p>
                <p>6. 安全着陆与装备卸除（10分钟）</p>
                <p>7. 飞行回顾与证书颁发（10分钟）</p>
              </div>

              <h2>包含服务</h2>
              <ul class="includes">
                <li><el-icon><Check /></el-icon> 专业动力伞设备使用</li>
                <li><el-icon><Check /></el-icon> 安全头盔与飞行服</li>
                <li><el-icon><Check /></el-icon> 专业教练一对一指导</li>
                <li><el-icon><Check /></el-icon> 基础航拍照片（3张电子版）</li>
                <li><el-icon><Check /></el-icon> 飞行纪念证书</li>
                <li><el-icon><Check /></el-icon> 个人意外保险</li>
              </ul>

              <h2>不包含项目</h2>
              <ul class="excludes">
                <li><el-icon><Close /></el-icon> 往返交通费用</li>
                <li><el-icon><Close /></el-icon> 餐饮及个人消费</li>
                <li><el-icon><Close /></el-icon> 专业视频拍摄（可选购598元）</li>
                <li><el-icon><Close /></el-icon> 特技飞行体验（可选购300元）</li>
              </ul>
            </div>
          </el-tab-pane>
          <el-tab-pane label="注意事项">
            <div class="notes">
              <h2>参与条件</h2>
              <ul>
                <li>参与者年龄限制：16-60岁；未满18周岁需监护人现场签字</li>
                <li>体重限制：50-100kg</li>
                <li>身高限制：150-190cm</li>
                <li>孕妇、心脏病、高血压、癫痫患者禁止参加</li>
                <li>近期有骨折、扭伤等身体不适者不宜参与</li>
              </ul>
              
              <h2>注意事项</h2>
              <ul>
                <li>活动受天气影响较大，如遇雨天、大风（风速超过4级）等不适合飞行的天气，将安排改期或全额退款</li>
                <li>飞行前2小时内不建议大量进食</li>
                <li>请提前72小时预约，并保持手机畅通</li>
                <li>请按照教练指示操作，确保飞行安全</li>
                <li>山区早晚温差大，请注意保暖</li>
              </ul>
              
              <h2>装备建议</h2>
              <ul>
                <li>穿着长袖长裤（防止擦伤）</li>
                <li>运动鞋或登山鞋（禁止穿凉鞋、高跟鞋）</li>
                <li>带上墨镜、防晒霜（高空紫外线强）</li>
                <li>随身物品需妥善固定，建议不携带贵重物品</li>
                <li>可自备相机或手机（需系绳固定）</li>
              </ul>
              
              <h2>取消政策</h2>
              <ul>
                <li>活动前7天取消：全额退款</li>
                <li>活动前3-7天取消：退款80%</li>
                <li>活动前24-72小时取消：退款50%</li>
                <li>活动前24小时内取消：不予退款</li>
                <li>因天气等不可抗力因素取消：可免费改期或全额退款</li>
              </ul>
            </div>
          </el-tab-pane>
          <el-tab-pane label="评价">
            <div class="reviews">
              <h2>用户评价 (36)</h2>
              <div class="review-stats">
                <div class="average-rating">4.7 <el-rate v-model="averageRating" disabled /></div>
              </div>
              
              <div class="review-item">
                <div class="review-header">
                  <div class="reviewer">
                    <el-avatar :size="40" :src="getImageUrl('@/assets/images/users/user3.jpg')"></el-avatar>
                    <div class="reviewer-name">黄先生</div>
                  </div>
                  <div class="review-rating">
                    <el-rate v-model="highRating" disabled />
                    <div class="review-date">2023-08-15</div>
                  </div>
                </div>
                <div class="review-content">动力伞比我想象的要刺激很多！起飞时发动机的声音很震撼，一旦升空，视野瞬间开阔，杭州的山水尽收眼底。教练王教练非常专业，让我对整个飞行过程充满信心。风景真的太美了，特别是飞过千岛湖附近时，那种感觉无法用语言形容。虽然价格不便宜，但绝对值回票价，打算下次带家人一起来体验。唯一遗憾是飞行时间有点短，希望下次能多飞一会儿！</div>
                <div class="review-images">
                  <el-image
                    style="width: 100px; height: 100px; margin-right: 10px;"
                    :src="getImageUrl('@/assets/images/reviews/review5-1.jpg')"
                    :preview-src-list="[getImageUrl('@/assets/images/reviews/review5-1.jpg')]"
                  />
                </div>
              </div>

              <div class="review-item">
                <div class="review-header">
                  <div class="reviewer">
                    <el-avatar :size="40" :src="getImageUrl('@/assets/images/users/user2.jpg')"></el-avatar>
                    <div class="reviewer-name">张女士</div>
                  </div>
                  <div class="review-rating">
                    <el-rate :value="4" disabled />
                    <div class="review-date">2023-07-22</div>
                  </div>
                </div>
                <div class="review-content">作为一个有些怕高的人，起初很忐忑，但教练很有耐心，一步步指导我完成起飞。飞起来后完全忘记了恐惧，只剩下对美景的惊叹。动力伞比滑翔伞更容易上手，不需要从高处起飞，整个过程都很平稳。服务很周到，提前一天还收到了天气提醒。拍摄的照片也很棒，就是价格偏高了些。总体来说，是一次难忘的体验，推荐给想尝试飞行但又怕高的朋友。</div>
                <div class="merchant-reply mt-3 p-3 bg-gray-50 rounded-lg">
                  <div class="reply-header text-sm font-medium mb-1">商家回复：</div>
                  <div class="reply-content text-sm">感谢张女士的评价！克服恐高是一件很不容易的事，我们为您感到骄傲！关于价格问题，由于设备维护和燃油成本不断上升，我们的价格确实比一般项目高一些，但我们会不断提升服务质量，让每位客人都感到值得。期待您再次光临！</div>
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
                :max="4"
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
const averageRating = ref(4.7);
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
    projectId: 5,
    projectName: '山地动力伞飞行',
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
    router.push(`/user/booking/5?date=${bookingInfo.date}&participants=${participants.value}`);
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

.price-tag {
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
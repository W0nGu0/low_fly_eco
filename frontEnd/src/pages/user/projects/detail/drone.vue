<template>
  <div class="project-detail-container">
    <div class="project-header">
      <div class="project-title">
        <h1>专业无人机飞行体验</h1>
        <div class="project-tags">
          <el-tag type="success">无人机体验</el-tag>
          <el-tag type="info">120分钟</el-tag>
          <el-tag type="warning">专业教练指导</el-tag>
        </div>
      </div>
      <div class="project-price">
        <div class="price">¥399</div>
        <div class="per-person">每人起</div>
      </div>
    </div>

    <div class="project-gallery">
      <el-carousel height="400px">
        <el-carousel-item>
          <img :src="getImageUrl('@/assets/images/projects/drone.jpg')" alt="无人机体验" class="carousel-image">
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="project-content">
      <div class="project-main">
        <el-tabs>
          <el-tab-pane label="项目概述">
            <div class="overview">
              <h2>项目介绍</h2>
              <p>在专业教练指导下，学习操控高端无人机，体验科技带来的乐趣。本课程专为无人机爱好者、摄影爱好者以及希望接触航拍技术的人士设计。我们提供最新型号的专业航拍无人机，配备4K高清摄像头，让您在掌握基本飞行技巧的同时，也能拍摄出令人惊艳的航拍作品。全程由持证专业教练一对一指导，确保安全飞行。</p>
              
              <h2>项目亮点</h2>
              <ul class="highlights">
                <li>使用价值上万的专业航拍无人机</li>
                <li>专业教练一对一指导，从零基础开始学习</li>
                <li>掌握基本飞行技巧和航拍构图技巧</li>
                <li>广州城市绝佳航拍点体验</li>
                <li>获取专属航拍作品电子版</li>
                <li>颁发无人机初级飞行证书</li>
              </ul>

              <h2>行程安排</h2>
              <div class="itinerary">
                <h3>体验流程</h3>
                <p>1. 签到与无人机安全知识讲解（20分钟）</p>
                <p>2. 无人机基本结构介绍与操作示范（15分钟）</p>
                <p>3. 模拟器训练（15分钟）</p>
                <p>4. 实际操作练习 - 基础动作（30分钟）</p>
                <p>5. 实际操作练习 - 航拍技巧（30分钟）</p>
                <p>6. 成果展示与分享、颁发证书（10分钟）</p>
              </div>

              <h2>包含服务</h2>
              <ul class="includes">
                <li><el-icon><Check /></el-icon> 专业无人机使用</li>
                <li><el-icon><Check /></el-icon> 专业教练一对一指导</li>
                <li><el-icon><Check /></el-icon> 无人机保险</li>
                <li><el-icon><Check /></el-icon> 航拍作品电子版（10张）</li>
                <li><el-icon><Check /></el-icon> 无人机初级飞行证书</li>
                <li><el-icon><Check /></el-icon> 矿泉水一瓶</li>
              </ul>

              <h2>不包含项目</h2>
              <ul class="excludes">
                <li><el-icon><Close /></el-icon> 往返交通费用</li>
                <li><el-icon><Close /></el-icon> 个人消费</li>
                <li><el-icon><Close /></el-icon> 无人机高级课程</li>
                <li><el-icon><Close /></el-icon> 个人旅游保险</li>
              </ul>
            </div>
          </el-tab-pane>
          <el-tab-pane label="注意事项">
            <div class="notes">
              <h2>注意事项</h2>
              <ul>
                <li>参与者需年满12周岁，未成年人需由监护人陪同</li>
                <li>无需任何飞行经验，零基础也可参加</li>
                <li>请提前30分钟到达，迟到超过15分钟将视为自动放弃</li>
                <li>如因天气原因（大风、暴雨等）无法进行活动，将安排改期或全额退款</li>
                <li>体验区域严格遵守当地无人机飞行管理规定</li>
                <li>请至少提前24小时预约</li>
              </ul>
              
              <h2>装备建议</h2>
              <ul>
                <li>建议穿着舒适的休闲服装和平底鞋</li>
                <li>如有需要可自带墨镜（强光下操作屏幕会更清晰）</li>
                <li>可自带SD卡（如需原始素材）</li>
                <li>建议带防晒用品（户外活动可能有长时间日晒）</li>
              </ul>
            </div>
          </el-tab-pane>
          <el-tab-pane label="评价">
            <div class="reviews">
              <h2>用户评价 (65)</h2>
              <div class="review-stats">
                <div class="average-rating">4.5 <el-rate v-model="averageRating" disabled /></div>
              </div>
              
              <div class="review-item">
                <div class="review-header">
                  <div class="reviewer">
                    <el-avatar :size="40" :src="getImageUrl('@/assets/images/users/user1.jpg')"></el-avatar>
                    <div class="reviewer-name">王先生</div>
                  </div>
                  <div class="review-rating">
                    <el-rate v-model="highRating" disabled />
                    <div class="review-date">2023-08-22</div>
                  </div>
                </div>
                <div class="review-content">非常棒的体验！作为一个无人机小白，在教练的指导下竟然很快就能操控自如了。拍出来的画面也很震撼，角度独特，朋友圈发出去获赞无数。教练专业又有耐心，讲解很细致，还教了很多拍摄的小技巧。强烈推荐给喜欢摄影的朋友！</div>
                <div class="review-images">
                  <el-image
                    style="width: 100px; height: 100px; margin-right: 10px;"
                    :src="getImageUrl('@/assets/images/reviews/review3-1.jpg')"
                    :preview-src-list="[getImageUrl('@/assets/images/reviews/review3-1.jpg')]"
                  />
                </div>
              </div>

              <div class="review-item">
                <div class="review-header">
                  <div class="reviewer">
                    <el-avatar :size="40" :src="getImageUrl('@/assets/images/users/user2.jpg')"></el-avatar>
                    <div class="reviewer-name">赵女士</div>
                  </div>
                  <div class="review-rating">
                    <el-rate :value="4" disabled />
                    <div class="review-date">2023-08-15</div>
                  </div>
                </div>
                <div class="review-content">给儿子预订的生日礼物，他超级喜欢！教练很有耐心，特别适合孩子学习。不过两个小时时间有点短，刚刚上手就结束了，希望能有进阶课程。总体来说性价比很高，值得体验！</div>
                <div class="merchant-reply mt-3 p-3 bg-gray-50 rounded-lg">
                  <div class="reply-header text-sm font-medium mb-1">商家回复：</div>
                  <div class="reply-content text-sm">感谢您的评价！我们确实有无人机进阶课程，下次可以直接咨询前台，会有专门的课程顾问为您介绍详细信息。</div>
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
                <span class="total-price">¥{{ 399 * participants }}</span>
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
const averageRating = ref(4.5);
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
    projectId: 3,
    projectName: '专业无人机飞行体验',
    date: bookingDate.value.toISOString().split('T')[0],
    price: 399,
    participants: participants.value,
    totalPrice: 399 * participants.value,
  };

  // 存储预订信息到本地存储
  localStorage.setItem('currentBooking', JSON.stringify(bookingInfo));

  // 显示成功消息
  ElMessage.success('预订信息已保存，正在跳转到预订页面...');
  
  // 跳转到预订页面
  setTimeout(() => {
    router.push(`/user/booking/3?date=${bookingInfo.date}&participants=${participants.value}`);
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
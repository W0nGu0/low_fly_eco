<template>
  <div class="project-detail-container">
    <div class="project-header">
      <div class="project-title">
        <h1>专业无人机飞行体验</h1>
        <div class="project-tags">
          <el-tag type="success">无人机体验</el-tag>
          <el-tag type="info">120分钟</el-tag>
          <el-tag type="warning">100米</el-tag>
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
          <img src="@/assets/images/projects/drone.jpg" alt="无人机体验" class="carousel-image">
        </el-carousel-item>
        <el-carousel-item>
          <img src="@/assets/images/projects/helicopter.jpg" alt="无人机航拍视角" class="carousel-image">
        </el-carousel-item>
        <el-carousel-item>
          <img src="@/assets/images/projects/hot-air-balloon.jpg" alt="无人机培训" class="carousel-image">
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="project-content">
      <div class="project-main">
        <el-tabs>
          <el-tab-pane label="项目概述">
            <div class="overview">
              <h2>项目介绍</h2>
              <p>在专业教练指导下，学习操控高端无人机，体验科技带来的乐趣。本课程专为无人机初学者设计，从基础知识到实际操作，全方位教授无人机飞行技巧。使用DJI专业级无人机，配备4K高清摄像头，课程中不仅能够学习基础飞行技巧，还能拍摄震撼的空中照片和视频。每位学员将获得一对一指导，确保安全高效地掌握无人机操控技术。</p>
              
              <h2>项目亮点</h2>
              <ul class="highlights">
                <li>使用DJI Mavic Air 2等专业级无人机设备</li>
                <li>专业教练一对一指导，从零基础到能独立操作</li>
                <li>学习无人机基本原理和飞行技巧</li>
                <li>掌握空中摄影和视频拍摄技巧</li>
                <li>课程结束后获得电子版结业证书</li>
              </ul>

              <h2>课程安排</h2>
              <div class="itinerary">
                <h3>体验流程</h3>
                <p>1. 理论知识学习（30分钟）</p>
                <p>- 无人机基础知识</p>
                <p>- 飞行安全和法规介绍</p>
                <p>- 设备组装与维护</p>
                <p>2. 基础操作训练（30分钟）</p>
                <p>- 起飞与降落</p>
                <p>- 悬停与基础移动</p>
                <p>- 避障技巧</p>
                <p>3. 实战飞行（45分钟）</p>
                <p>- 场地自由飞行</p>
                <p>- 完成指定飞行任务</p>
                <p>- 航拍技术指导</p>
                <p>4. 成果展示与分享（15分钟）</p>
                <p>- 航拍作品展示</p>
                <p>- 经验分享与问答</p>
                <p>- 发放电子证书</p>
              </div>

              <h2>包含服务</h2>
              <ul class="includes">
                <li><el-icon><Check /></el-icon> 专业无人机设备使用</li>
                <li><el-icon><Check /></el-icon> 专业教练指导</li>
                <li><el-icon><Check /></el-icon> 课程教材</li>
                <li><el-icon><Check /></el-icon> 航拍照片和视频电子版</li>
                <li><el-icon><Check /></el-icon> 无人机操作电子证书</li>
                <li><el-icon><Check /></el-icon> 场地使用费</li>
                <li><el-icon><Check /></el-icon> 保险费用</li>
              </ul>

              <h2>不包含项目</h2>
              <ul class="excludes">
                <li><el-icon><Close /></el-icon> 往返交通费用</li>
                <li><el-icon><Close /></el-icon> 个人消费</li>
                <li><el-icon><Close /></el-icon> 无人机设备购买</li>
              </ul>
            </div>
          </el-tab-pane>
          <el-tab-pane label="注意事项">
            <div class="notes">
              <h2>注意事项</h2>
              <ul>
                <li>参与者需年满16周岁，未成年人需监护人陪同</li>
                <li>无需任何飞行经验，零基础也可参加</li>
                <li>课程受天气影响，如遇大风、雨雪等极端天气，将安排改期或全额退款</li>
                <li>请提前24小时预约，并保持手机畅通</li>
                <li>每班限制6人，确保教学质量</li>
                <li>如需携带自己的无人机设备，请提前告知</li>
              </ul>
              
              <h2>携带物品</h2>
              <ul>
                <li>身份证明（身份证或学生证）</li>
                <li>舒适的衣物和鞋子</li>
                <li>太阳镜和防晒用品（户外飞行时）</li>
                <li>可选携带：个人相机记录学习过程</li>
              </ul>
              
              <h2>安全保障</h2>
              <ul>
                <li>所有飞行活动在符合法规的指定区域内进行</li>
                <li>配备专业飞行员全程监督指导</li>
                <li>设备配置自动返航功能，确保安全</li>
                <li>提供全程意外保险</li>
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
                    <el-avatar :size="40" src="@/assets/images/users/user1.jpg"></el-avatar>
                    <div class="reviewer-name">黄先生</div>
                  </div>
                  <div class="review-rating">
                    <el-rate v-model="highRating" disabled />
                    <div class="review-date">2023-08-21</div>
                  </div>
                </div>
                <div class="review-content">作为一个无人机小白，这个课程非常适合我！教练很有耐心，讲解非常细致，让我很快就能上手操作。拍出来的航拍视频效果超出我的预期，朋友们都很惊讶。特别喜欢实战飞行环节，教练会根据每个人的掌握程度给予个性化指导。如果你对无人机感兴趣但又不知道从何入手，强烈推荐这个课程！</div>
              </div>

              <div class="review-item">
                <div class="review-header">
                  <div class="reviewer">
                    <el-avatar :size="40" src="@/assets/images/users/user2.jpg"></el-avatar>
                    <div class="reviewer-name">王女士</div>
                  </div>
                  <div class="review-rating">
                    <el-rate v-model="goodRating" disabled />
                    <div class="review-date">2023-08-15</div>
                  </div>
                </div>
                <div class="review-content">带孩子一起来体验的，他非常喜欢。课程安排合理，理论知识讲解不会太枯燥，实际操作时间充足。教练很专业，特别是在讲解航拍技巧时，给了很多实用的建议。唯一的建议是希望能有更多样化的无人机型号供体验，不过总体来说性价比很高。推荐给有兴趣入门无人机的朋友！</div>
                <div class="merchant-reply mt-3 p-3 bg-gray-50 rounded-lg">
                  <div class="reply-header text-sm font-medium mb-1">商家回复：</div>
                  <div class="reply-content text-sm">感谢您和孩子的参与！关于无人机型号多样化的建议非常好，我们正在计划引进更多型号的专业无人机，下次再来一定会有不一样的体验！</div>
                </div>
              </div>

              <div class="review-item">
                <div class="review-header">
                  <div class="reviewer">
                    <el-avatar :size="40" src="@/assets/images/users/user1.jpg"></el-avatar>
                    <div class="reviewer-name">李先生</div>
                  </div>
                  <div class="review-rating">
                    <el-rate v-model="highRating" disabled />
                    <div class="review-date">2023-08-10</div>
                  </div>
                </div>
                <div class="review-content">本来对无人机只是好奇，参加课程后却彻底爱上了这项活动！教练经验丰富，不仅教授了基础操作，还分享了很多航拍的专业技巧和构图方法。课程结束后我立刻决定入手一台自己的无人机。课程安排紧凑但不赶，每个环节都照顾到了初学者的需求。特别感谢教练的耐心指导，让我收获满满！</div>
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
                <span class="total-price">¥{{ 399 * participants }}</span>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="width: 100%">立即预订</el-button>
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

const router = useRouter();
const bookingDate = ref('');
const participants = ref(1);
const averageRating = ref(4.5);
const highRating = ref(5);
const goodRating = ref(4);

function goBack() {
  router.go(-1);
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
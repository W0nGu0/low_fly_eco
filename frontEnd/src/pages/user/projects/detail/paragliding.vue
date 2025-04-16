<template>
  <div class="project-detail-container">
    <div class="project-header">
      <div class="project-title">
        <h1>海岸线滑翔伞体验</h1>
        <div class="project-tags">
          <el-tag type="success">滑翔伞</el-tag>
          <el-tag type="info">90分钟</el-tag>
          <el-tag type="warning">800米</el-tag>
        </div>
      </div>
      <div class="project-price">
        <div class="price">¥880</div>
        <div class="per-person">每人起</div>
      </div>
    </div>

    <div class="project-gallery">
      <el-carousel height="400px">
        <el-carousel-item>
          <img src="@/assets/images/projects/hot-air-balloon.jpg" alt="滑翔伞体验" class="carousel-image">
        </el-carousel-item>
        <el-carousel-item>
          <img src="@/assets/images/projects/helicopter.jpg" alt="滑翔伞体验视角" class="carousel-image">
        </el-carousel-item>
        <el-carousel-item>
          <img src="@/assets/images/projects/drone.jpg" alt="滑翔伞海岸线视角" class="carousel-image">
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="project-content">
      <div class="project-main">
        <el-tabs>
          <el-tab-pane label="项目概述">
            <div class="overview">
              <h2>项目介绍</h2>
              <p>从厦门海岸线高处起飞，在专业教练陪同下体验滑翔伞飞行，欣赏壮丽的海岸线风光。飞行高度约800米，可俯瞰整个海湾美景，拍摄绝美照片。滑翔伞是一项轻型航空运动，利用气流升力滑翔于空中，安全性高且操作简单。我们提供专业的双人滑翔伞体验，教练会带您完成整个飞行过程，您无需任何飞行经验即可参与。</p>
              
              <h2>项目亮点</h2>
              <ul class="highlights">
                <li>专业教练一对一指导，确保安全</li>
                <li>体验从800米高处滑翔的刺激与自由</li>
                <li>欣赏厦门海岸线绝美风景</li>
                <li>获取独特视角的航拍照片</li>
                <li>全套专业装备提供，无需自备</li>
              </ul>

              <h2>行程安排</h2>
              <div class="itinerary">
                <h3>体验流程</h3>
                <p>1. 签到与安全讲解（15分钟）</p>
                <p>2. 装备穿戴与准备（15分钟）</p>
                <p>3. 前往起飞点（20分钟）</p>
                <p>4. 起飞与滑翔体验（20-30分钟）</p>
                <p>5. 安全着陆与装备卸除（10分钟）</p>
                <p>6. 拍照留念与体验分享（10分钟）</p>
              </div>

              <h2>包含服务</h2>
              <ul class="includes">
                <li><el-icon><Check /></el-icon> 专业滑翔伞教练指导</li>
                <li><el-icon><Check /></el-icon> 全套滑翔伞装备</li>
                <li><el-icon><Check /></el-icon> 安全头盔与保护装备</li>
                <li><el-icon><Check /></el-icon> 高清航拍照片（5张电子版）</li>
                <li><el-icon><Check /></el-icon> 意外保险</li>
                <li><el-icon><Check /></el-icon> 起飞点往返接送</li>
              </ul>

              <h2>不包含项目</h2>
              <ul class="excludes">
                <li><el-icon><Close /></el-icon> 往返交通费用</li>
                <li><el-icon><Close /></el-icon> 个人消费</li>
                <li><el-icon><Close /></el-icon> 高清视频拍摄（可选额外购买）</li>
                <li><el-icon><Close /></el-icon> 个人旅游保险</li>
              </ul>
            </div>
          </el-tab-pane>
          <el-tab-pane label="注意事项">
            <div class="notes">
              <h2>注意事项</h2>
              <ul>
                <li>参与者需要身体健康，无心脏病、高血压、癫痫等疾病</li>
                <li>体重限制：40-100kg</li>
                <li>7岁以上儿童可在监护人陪同下参加，65岁以下健康老人可参加</li>
                <li>孕妇、醉酒者不得参与</li>
                <li>活动受天气影响较大，如遇不适合飞行的天气，将安排改期或全额退款</li>
                <li>请提前24小时预约，并保持手机畅通</li>
              </ul>
              
              <h2>装备要求</h2>
              <ul>
                <li>穿着舒适的运动鞋和休闲服装</li>
                <li>长发的参与者请提前扎好头发</li>
                <li>可携带小型相机（需系绳固定）</li>
                <li>建议带墨镜和防晒霜</li>
                <li>不建议携带贵重物品，如必须携带请自行保管</li>
              </ul>
            </div>
          </el-tab-pane>
          <el-tab-pane label="评价">
            <div class="reviews">
              <h2>用户评价 (47)</h2>
              <div class="review-stats">
                <div class="average-rating">4.9 <el-rate v-model="averageRating" disabled /></div>
              </div>
              
              <div class="review-item">
                <div class="review-header">
                  <div class="reviewer">
                    <el-avatar :size="40" src="@/assets/images/users/user1.jpg"></el-avatar>
                    <div class="reviewer-name">陈先生</div>
                  </div>
                  <div class="review-rating">
                    <el-rate v-model="highRating" disabled />
                    <div class="review-date">2023-08-25</div>
                  </div>
                </div>
                <div class="review-content">太棒了！这是我第一次尝试滑翔伞，起初有点紧张，但教练非常专业，让我很快就放松下来。从高空俯瞰厦门的海岸线，景色美得无法形容！飞行过程很平稳，一点都不恐怖，反而非常享受那种自由翱翔的感觉。强烈推荐给想要尝试新鲜刺激体验的朋友们！</div>
              </div>

              <div class="review-item">
                <div class="review-header">
                  <div class="reviewer">
                    <el-avatar :size="40" src="@/assets/images/users/user2.jpg"></el-avatar>
                    <div class="reviewer-name">林女士</div>
                  </div>
                  <div class="review-rating">
                    <el-rate v-model="highRating" disabled />
                    <div class="review-date">2023-08-18</div>
                  </div>
                </div>
                <div class="review-content">带家人一起来体验的，连最胆小的妈妈都玩得很开心！教练技术一流，全程很稳，起飞和降落都很平稳。拍出来的照片绝美，朋友圈都炸了！唯一的建议是可以再飞久一点，感觉时间过得太快了，还没过瘾就结束了。总之，值得一试！</div>
                <div class="merchant-reply mt-3 p-3 bg-gray-50 rounded-lg">
                  <div class="reply-header text-sm font-medium mb-1">商家回复：</div>
                  <div class="reply-content text-sm">感谢您和家人的参与！我们很高兴听到大家都玩得开心。关于飞行时间的建议，我们已经在考虑推出时间更长的高级套餐，敬请期待！</div>
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
                <span class="total-price">¥{{ 880 * participants }}</span>
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
const averageRating = ref(4.9);
const highRating = ref(5);

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
<template>
  <div class="project-detail-page">
    <div class="container mx-auto px-4 py-8">
      <!-- 返回按钮 -->
      <div class="mb-6">
        <el-button @click="goBack" icon="el-icon-back">返回项目列表</el-button>
      </div>
      
      <el-row :gutter="30">
        <!-- 项目主要信息 -->
        <el-col :xs="24" :md="16">
          <!-- 项目轮播图 -->
          <div class="project-gallery card mb-6">
            <el-carousel height="400px" indicator-position="outside" arrow="always">
              <el-carousel-item v-for="(img, index) in projectImages" :key="index">
                <div class="carousel-img-container">
                  <img :src="getImageUrl(img.url)" :alt="project.name" class="carousel-img">
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
          
          <!-- 项目标题和基础信息 -->
          <div class="project-header card mb-6 p-6">
            <div class="flex justify-between items-start">
              <div>
                <h1 class="text-2xl font-bold mb-2">{{ project.name }}</h1>
                <div class="project-meta flex items-center flex-wrap gap-4 mb-4">
                  <div class="meta-item flex items-center">
                    <el-icon><Location /></el-icon>
                    <span class="ml-1">{{ project.location }}</span>
                  </div>
                  <div class="meta-item flex items-center">
                    <el-icon><Timer /></el-icon>
                    <span class="ml-1">{{ project.duration }}分钟</span>
                  </div>
                  <div class="meta-item flex items-center">
                    <el-icon><Star /></el-icon>
                    <span class="ml-1">{{ project.rating }}分 ({{ project.reviewCount }}条评价)</span>
                  </div>
                </div>
                <div class="project-category mb-2">
                  <el-tag size="small">{{ getCategoryName(project.categoryId) }}</el-tag>
                </div>
              </div>
              <div class="project-price text-right">
                <div class="text-lg text-gray-500">价格</div>
                <div class="price-value text-3xl font-bold text-primary mb-2">¥{{ project.price }}</div>
                <div class="text-sm text-gray-500">周末价: ¥{{ project.weekendPrice }}</div>
                <div class="text-sm text-gray-500">节假日价: ¥{{ project.holidayPrice }}</div>
              </div>
            </div>
            <div class="action-buttons mt-6">
              <el-button type="primary" size="large" @click="bookNow" :disabled="!isProjectAvailable">
                立即预约
              </el-button>
              <el-button size="large" icon="el-icon-star-off" @click="addToFavorites">
                收藏
              </el-button>
            </div>
          </div>
          
          <!-- 项目详情 -->
          <div class="project-details card mb-6 p-6">
            <el-tabs>
              <el-tab-pane label="项目介绍">
                <h3 class="text-xl font-semibold mb-4">项目介绍</h3>
                <div class="project-description mb-6">
                  <p>{{ project.description }}</p>
                </div>
                
                <h3 class="text-xl font-semibold mb-4">适合人群</h3>
                <div class="suitable-people mb-6">
                  <p>{{ project.suitablePeople }}</p>
                  <div class="suitable-tags mt-2">
                    <el-tag v-for="(tag, index) in project.suitableTags" :key="index" 
                      class="mr-2 mb-2" size="small" effect="plain">
                      {{ tag }}
                    </el-tag>
                  </div>
                </div>
                
                <h3 class="text-xl font-semibold mb-4">体验流程</h3>
                <div class="experience-process mb-6">
                  <el-steps :active="project.process.length" direction="vertical">
                    <el-step 
                      v-for="(step, index) in project.process" 
                      :key="index" 
                      :title="step.title" 
                      :description="step.description">
                    </el-step>
                  </el-steps>
                </div>
                
                <h3 class="text-xl font-semibold mb-4">安全保障</h3>
                <div class="safety-guarantees">
                  <el-row :gutter="20">
                    <el-col :xs="24" :sm="12" v-for="(item, index) in project.safetyGuarantees" :key="index">
                      <div class="safety-item flex items-start p-4 mb-4 bg-gray-50 rounded-lg">
                        <div class="safety-icon mr-3 text-primary">
                          <el-icon><Check /></el-icon>
                        </div>
                        <div class="safety-content">
                          <h4 class="text-lg font-medium mb-1">{{ item.title }}</h4>
                          <p class="text-sm text-gray-600">{{ item.description }}</p>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-tab-pane>
              
              <el-tab-pane label="注意事项">
                <h3 class="text-xl font-semibold mb-4">注意事项</h3>
                <div class="project-notices">
                  <el-collapse accordion>
                    <el-collapse-item v-for="(item, index) in project.notices" :key="index" :title="item.title">
                      <div class="notice-content p-4">
                        <p>{{ item.content }}</p>
                      </div>
                    </el-collapse-item>
                  </el-collapse>
                </div>
              </el-tab-pane>
              
              <el-tab-pane label="用户评价">
                <div class="project-reviews">
                  <div class="review-summary mb-6 flex items-center">
                    <div class="rating-summary text-center mr-8">
                      <div class="overall-rating text-5xl font-bold text-primary">{{ project.rating }}</div>
                      <div class="rating-stars">
                        <el-rate
                          v-model="project.rating"
                          disabled
                          text-color="#ff9900">
                        </el-rate>
                      </div>
                      <div class="review-count text-sm text-gray-500">共{{ project.reviewCount }}条评价</div>
                    </div>
                    <div class="rating-distribution flex-1">
                      <div v-for="i in 5" :key="i" class="rating-level flex items-center mb-2">
                        <span class="star-label text-sm mr-2">{{ 6-i }}星</span>
                        <el-progress 
                          :percentage="getRatingPercentage(6-i)" 
                          :stroke-width="12" 
                          :show-text="false"
                          :color="i === 1 ? '#ff9900' : '#909399'">
                        </el-progress>
                        <span class="percentage-text text-sm ml-2">{{ getRatingPercentage(6-i) }}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div class="review-list">
                    <div v-for="(review, index) in project.reviews" :key="index" class="review-item p-4 mb-4 border-b">
                      <div class="review-header flex justify-between mb-3">
                        <div class="reviewer-info flex items-center">
                          <el-avatar :size="40" :src="getImageUrl(review.avatar)"></el-avatar>
                          <div class="ml-3">
                            <div class="reviewer-name font-medium">{{ review.name }}</div>
                            <div class="review-date text-sm text-gray-500">{{ review.date }}</div>
                          </div>
                        </div>
                        <div class="review-rating">
                          <el-rate v-model="review.rating" disabled></el-rate>
                        </div>
                      </div>
                      <div class="review-content mb-3">
                        <p>{{ review.content }}</p>
                      </div>
                      <div class="review-images flex flex-wrap" v-if="review.images && review.images.length">
                        <div v-for="(img, imgIndex) in review.images" :key="imgIndex" class="review-image-item mr-2 mb-2">
                          <el-image
                            style="width: 80px; height: 80px"
                            :src="getImageUrl(img)"
                            :preview-src-list="review.images">
                          </el-image>
                        </div>
                      </div>
                      <div class="merchant-reply mt-3 p-3 bg-gray-50 rounded-lg" v-if="review.merchantReply">
                        <div class="reply-header text-sm font-medium mb-1">商家回复：</div>
                        <div class="reply-content text-sm">{{ review.merchantReply }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
        
        <!-- 侧边栏 -->
        <el-col :xs="24" :md="8">
          <!-- 预约日历 -->
          <div class="booking-calendar card mb-6 p-6">
            <h3 class="text-xl font-semibold mb-4">选择日期</h3>
            <el-calendar v-model="selectedDate">
              <template #dateCell="{ data }">
                <div class="calendar-cell">
                  <div class="calendar-day">{{ data.day.split('-')[2] }}</div>
                  <div class="calendar-availability" v-if="getAvailabilityForDate(data.day)">
                    <span class="available">可预约</span>
                  </div>
                  <div class="calendar-availability" v-else>
                    <span class="unavailable">已约满</span>
                  </div>
                </div>
              </template>
            </el-calendar>
            <div class="booking-action mt-4">
              <el-button type="primary" block @click="bookNow">选择此日期预约</el-button>
            </div>
          </div>
          
          <!-- 地图位置 -->
          <div class="location-map card mb-6 p-6">
            <h3 class="text-xl font-semibold mb-4">项目地点</h3>
            <div class="map-container" style="height: 300px; background-color: #f5f5f5;">
              <!-- 这里使用背景图模拟地图，实际项目中应该集成地图API -->
              <div class="flex justify-center items-center h-full">
                <img :src="mapImage" alt="地图位置" class="w-full h-full object-cover" />
              </div>
            </div>
            <div class="location-address mt-4">
              <div class="location-detail flex items-start mb-2">
                <el-icon class="mt-1 mr-2"><Location /></el-icon>
                <span>{{ project.detailedLocation }}</span>
              </div>
              <div class="location-contact flex items-start">
                <el-icon class="mt-1 mr-2"><Phone /></el-icon>
                <span>{{ project.contactPhone }}</span>
              </div>
            </div>
          </div>
          
          <!-- 相关推荐 -->
          <div class="related-projects card p-6">
            <h3 class="text-xl font-semibold mb-4">相关推荐</h3>
            <div class="related-list">
              <div v-for="(item, index) in relatedProjects" :key="index" 
                class="related-item flex mb-4 pb-4 border-b cursor-pointer"
                @click="goToProject(item.id)">
                <div class="related-image mr-3" style="width: 80px; height: 60px;">
                  <img :src="getImageUrl(item.coverImage)" :alt="item.name" class="w-full h-full object-cover rounded">
                </div>
                <div class="related-info flex-1">
                  <div class="related-name font-medium mb-1 line-clamp-1">{{ item.name }}</div>
                  <div class="related-price text-primary">¥{{ item.price }}</div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Location, Timer, Star, Check, Phone } from '@element-plus/icons-vue'
import { getImageUrl } from '@/utils/imageHelper'

const route = useRoute()
const router = useRouter()

// 预订表单
const bookingForm = ref({
  startDate: '',
  participants: 1
})

// 当前项目ID
const projectId = computed(() => Number(route.params.id))

// 项目图片
const projectImages = ref([
  { url: '@/assets/images/projects/hot-air-balloon.jpg' },
  { url: '@/assets/images/projects/helicopter.jpg' },
  { url: '@/assets/images/projects/drone.jpg' },
  { url: '@/assets/images/projects/paragliding.jpg' },
  { url: '@/assets/images/projects/powered-paragliding.jpg' },
  { url: '@/assets/images/projects/skydiving.jpg' }
])

// 选择日期
const selectedDate = ref(new Date())

// 分类数据
const categories = ref([
  { id: 1, name: '热气球观光' },
  { id: 2, name: '直升机游览' },
  { id: 3, name: '无人机体验' },
  { id: 4, name: '滑翔伞' },
  { id: 5, name: '动力伞' }
])

// 相关推荐项目
const relatedProjects = ref([
  {
    id: 2,
    name: '直升机空中游览',
    price: 1280,
    coverImage: '@/assets/images/projects/helicopter.jpg'
  },
  {
    id: 4,
    name: '海岸线滑翔伞体验',
    price: 880,
    coverImage: '@/assets/images/projects/paragliding.jpg'
  },
  {
    id: 5,
    name: '山地动力伞飞行',
    price: 1100,
    coverImage: '@/assets/images/projects/powered-paragliding.jpg'
  }
])

// 模拟项目数据集合
const projectsData = ref([
  {
    id: 1,
    name: '城市热气球观光之旅',
    categoryId: 1,
    price: 688,
    weekendPrice: 888,
    holidayPrice: 1088,
    location: '北京市朝阳区奥林匹克公园',
    detailedLocation: '北京市朝阳区奥林匹克公园南路1号',
    contactPhone: '010-8888-7777',
    duration: 60,
    rating: 4.8,
    reviewCount: 128,
    images: [
      '@/assets/images/projects/hot-air-balloon.jpg'
    ],
    description: '体验北京城市热气球观光之旅，从高空俯瞰整座城市壮丽的景色。我们使用最先进的热气球设备，配备经验丰富的飞行员，确保您的飞行安全而愉快。热气球缓缓上升到300米的高度，您可以360度无死角地欣赏北京城市风光，尤其是奥林匹克公园的鸟巢、水立方等标志性建筑。天气晴朗时，还能看到远处的长城轮廓。整个飞行过程约60分钟，是拍摄城市美景和留下难忘回忆的绝佳机会。',
    suitablePeople: '适合大多数人群，包括摄影爱好者、情侣、家庭以及寻求独特体验的游客。6岁以上儿童在成人陪同下可参加，70岁以下身体健康的老人也可参与。不适合孕妇、有心脏病、高血压等严重疾病的人群。',
    suitableTags: ['摄影爱好者', '情侣', '家庭', '朋友聚会'],
    process: [
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
    ],
    safetyGuarantees: [
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
    ],
    notices: [
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
    ],
    reviews: [
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
    ],
    availableDates: [
      '2023-09-05',
      '2023-09-06',
      '2023-09-07',
      '2023-09-10',
      '2023-09-11',
      '2023-09-12',
      '2023-09-15',
      '2023-09-16',
      '2023-09-17',
      '2023-09-20',
      '2023-09-21'
    ]
  },
  {
    id: 2,
    name: '直升机空中游览',
    categoryId: 2,
    price: 1280,
    weekendPrice: 1580,
    holidayPrice: 1880,
    location: '上海市浦东新区',
    detailedLocation: '上海市浦东新区机场路1500号通用航空中心',
    contactPhone: '021-5555-6666',
    duration: 30,
    rating: 4.6,
    reviewCount: 92,
    images: [
      '@/assets/images/projects/helicopter.jpg'
    ],
    description: '乘坐专业豪华直升机，从空中鸟瞰上海的壮丽景色。我们的航线覆盖浦东金融区、外滩、东方明珠等上海标志性景点，为您提供独特的视角欣赏这座国际大都市。直升机配备全景玻璃舱，视野极佳，是摄影爱好者的绝佳选择。全程约30分钟，由经验丰富的专业飞行员驾驶，确保安全舒适的飞行体验。',
    suitablePeople: '适合希望体验刺激感的年轻人、商务人士、摄影爱好者和旅游团体。3岁以上儿童可以参加，65岁以下身体健康的老人也可参与。不适合孕妇、有心脏病、高血压等严重疾病的人群。',
    suitableTags: ['商务人士', '摄影爱好者', '旅游团体', '情侣'],
    process: [
      {
        title: '值机登记',
        description: '提前30分钟到达直升机场，办理登记手续并出示有效证件'
      },
      {
        title: '安全培训',
        description: '飞行前进行安全说明，了解应急程序和注意事项'
      },
      {
        title: '乘坐指引',
        description: '工作人员指导正确的上机方式和安全带使用方法'
      },
      {
        title: '空中游览',
        description: '专业飞行员驾驶直升机，沿预定航线飞行并讲解沿途景点'
      },
      {
        title: '安全降落',
        description: '体验结束后返回起飞点安全降落'
      },
      {
        title: '留影纪念',
        description: '可选择付费专业摄影服务，留下飞行纪念照'
      }
    ],
    safetyGuarantees: [
      {
        title: '专业飞行团队',
        description: '所有飞行员均持有商用直升机驾驶执照，飞行经验超过3000小时'
      },
      {
        title: '定期维护保养',
        description: '直升机严格按照国际标准进行维护保养，每天进行安全检查'
      },
      {
        title: '实时气象监测',
        description: '飞行前监测天气状况，确保在适宜的天气条件下飞行'
      },
      {
        title: '高额保险保障',
        description: '每位乘客均享有200万元的航空意外保险'
      }
    ],
    notices: [
      {
        title: '预订须知',
        content: '请提前7天预订，需提供乘客姓名、身份证号等信息用于航空安全检查。'
      },
      {
        title: '携带物品',
        content: '禁止携带易燃易爆物品，大型相机需事先申请，飞行中禁止使用闪光灯。'
      },
      {
        title: '天气因素',
        content: '飞行安全高度依赖天气条件，如遇大风、暴雨等恶劣天气，航班可能取消或推迟。'
      },
      {
        title: '重量限制',
        content: '单人体重不超过100公斤，如超过请提前告知，可能需要单独安排。'
      }
    ],
    reviews: [
      {
        name: '陈先生',
        avatar: '@/assets/images/users/user1.jpg',
        rating: 5,
        date: '2023-08-18',
        content: '非常震撼的体验！从空中看上海的景色太美了，尤其是浦东和外滩的区域，完全不同的视角。飞行员技术很好，全程很稳，一点都不恐怖。30分钟虽然短但很充实，非常推荐！',
        images: [
          '@/assets/images/reviews/review2-1.jpg'
        ],
        merchantReply: '感谢您的好评！很高兴您喜欢我们的直升机游览体验，上海的确是从空中欣赏最美的城市之一。期待您再次光临！'
      },
      {
        name: '赵女士',
        avatar: '@/assets/images/users/user2.jpg',
        rating: 4,
        date: '2023-08-05',
        content: '作为一个摄影爱好者，这次体验太值了！从空中拍摄的照片角度很独特，特别是日落时分的上海天际线，绝美！唯一遗憾是时间有点短，建议可以增加一个时间更长的航线选择。',
        images: [
          '@/assets/images/reviews/review2-2.jpg',
          '@/assets/images/reviews/review2-3.jpg'
        ],
        merchantReply: '非常感谢您的评价和建议！您拍摄的照片确实很美。关于增加更长时间航线的建议，我们正在规划中，敬请期待！'
      }
    ],
    availableDates: [
      '2023-09-05',
      '2023-09-08',
      '2023-09-10',
      '2023-09-15',
      '2023-09-18',
      '2023-09-20',
      '2023-09-25',
      '2023-09-28',
      '2023-09-30'
    ]
  },
  {
    id: 6,
    name: '高空跳伞极限体验',
    categoryId: 4,
    price: 2980,
    weekendPrice: 3280,
    holidayPrice: 3580,
    location: '海南省三亚市',
    detailedLocation: '海南省三亚市海棠区龙江路888号空中运动基地',
    contactPhone: '0898-8888-7777',
    duration: 180,
    rating: 4.9,
    reviewCount: 29,
    images: [
      '@/assets/images/projects/skydiving.jpg'
    ],
    description: '体验刺激的高空跳伞，从3000米高空跳下，感受自由落体的极限挑战。全程由国际专业教练一对一陪伴，采用双人跳伞模式，确保安全。您将体验约40秒的自由落体和约5分钟的滑翔降落过程，欣赏三亚壮观的海岸线和城市风光。这是一次突破自我、挑战极限的难忘体验，也是拍摄极限运动视频的绝佳机会。',
    suitablePeople: '适合18-55岁身体健康、追求刺激的年轻人和冒险爱好者。不适合孕妇、心脏病患者、高血压患者、癫痫患者和有严重脊椎问题的人群。体重限制在45-95公斤之间。',
    suitableTags: ['冒险爱好者', '极限运动爱好者', '年轻人', '寻求刺激的人群'],
    process: [
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
    ],
    safetyGuarantees: [
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
    ],
    notices: [
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
    ],
    reviews: [
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
    ],
    availableDates: [
      '2023-09-05',
      '2023-09-06',
      '2023-09-10',
      '2023-09-15',
      '2023-09-20',
      '2023-09-25',
      '2023-09-30'
    ]
  }
])

// 获取当前项目数据
const project = computed(() => {
  return projectsData.value.find(p => p.id === projectId.value) || projectsData.value[0]
})

// 计算价格
const totalPrice = computed(() => {
  return project.value.price * bookingForm.value.participants
})

// 是否可预约
const isProjectAvailable = computed(() => {
  return project.value.availableDates && project.value.availableDates.length > 0
})

// 获取分类名称
function getCategoryName(categoryId) {
  const category = categories.value.find(item => item.id === categoryId)
  return category ? category.name : ''
}

// 获取评分百分比
function getRatingPercentage(rating) {
  const ratings = project.value.reviews.filter(r => Math.floor(r.rating) === rating).length
  if (project.value.reviews.length === 0) return 0
  return Math.round((ratings / project.value.reviews.length) * 100)
}

// 获取日期可用状态
function getAvailabilityForDate(dateString) {
  return project.value.availableDates.includes(dateString)
}

// 返回上一页
function goBack() {
  router.go(-1)
}

// 处理预订
function bookNow() {
  if (!bookingForm.value.startDate) {
    ElMessage.warning('请选择出发日期')
    return
  }

  ElMessageBox.confirm(
    `您即将预订${project.value.name}，总价¥${totalPrice.value}，是否确认？`,
    '确认预订',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'info'
    }
  ).then(() => {
    // 模拟预订成功
    ElMessage.success('预订成功！我们将尽快与您联系确认详情')
    // 这里可以跳转到订单页面
    // router.push('/user/orders')
  }).catch(() => {
    // 用户取消预订
  })
}

// 添加到收藏
function addToFavorites() {
  ElMessage.success('已添加到收藏！')
}

// 跳转到其他项目
function goToProject(id) {
  router.push(`/user/projects/${id}`)
}

// 获取项目详情
const fetchProjectDetails = async () => {
  // 实际项目中应从API获取项目详情
  // const response = await fetch(`/api/projects/${projectId.value}`)
  // project.value = await response.json()
}

const mapImage = ref(getImageUrl('@/assets/images/projects/map-placeholder.jpg'))

onMounted(() => {
  fetchProjectDetails()
})
</script>

<style scoped>
.project-detail-page {
  background-color: #f8f9fa;
}

.card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.carousel-img-container {
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.carousel-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.text-primary {
  color: #409EFF;
}

.calendar-cell {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 4px 0;
}

.calendar-day {
  text-align: center;
  line-height: 1.5;
}

.calendar-availability {
  text-align: center;
  font-size: 12px;
}

.calendar-availability .available {
  color: #67c23a;
}

.calendar-availability .unavailable {
  color: #f56c6c;
}

/* 评价星级进度条颜色 */
.rating-level:nth-child(1) .el-progress .el-progress-bar__inner {
  background-color: #ff9900 !important;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .project-header {
    flex-direction: column;
  }
  
  .project-price {
    margin-top: 16px;
    text-align: left;
  }
}
</style>

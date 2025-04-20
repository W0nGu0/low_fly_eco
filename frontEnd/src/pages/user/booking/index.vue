<template>
  <div class="booking-page">
    <div class="container mx-auto px-4 py-8">
      <el-steps :active="activeStep" finish-status="success" class="mb-8">
        <el-step title="选择时间" icon="Timer"></el-step>
        <el-step title="填写信息" icon="User"></el-step>
        <el-step title="提交预约" icon="Check"></el-step>
      </el-steps>

      <div class="booking-content card p-6">
        <!-- 步骤一：选择时间 -->
        <div v-if="activeStep === 0">
          <div class="step-header mb-6">
            <h2 class="text-xl font-bold">选择预约时间</h2>
            <p class="text-gray-500 mt-2">请选择您想要体验的日期和时间段</p>
          </div>

          <div class="project-info-card bg-gray-50 p-4 rounded-lg mb-6">
            <div class="flex items-center">
              <div class="project-image mr-4">
                <img :src="project.coverImage" alt="Project" class="w-20 h-20 object-cover rounded-lg">
              </div>
              <div class="project-info">
                <h3 class="text-lg font-semibold">{{ project.name }}</h3>
                <div class="project-meta flex flex-wrap gap-2 mt-1">
                  <div class="meta-item text-sm text-gray-500">
                    <i class="el-icon-location"></i>
                    <span>{{ project.location }}</span>
                  </div>
                  <div class="meta-item text-sm text-gray-500">
                    <i class="el-icon-time"></i>
                    <span>{{ project.duration }}分钟</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <el-row :gutter="20">
            <el-col :xs="24" :md="12">
              <div class="date-selection mb-6">
                <h3 class="text-md font-semibold mb-3">选择日期</h3>
                <el-date-picker
                  v-model="bookingDate"
                  type="date"
                  placeholder="选择日期"
                  format="YYYY-MM-DD"
                  :disabled-date="disabledDate"
                  style="width: 100%;"
                  @change="loadTimeSlots">
                </el-date-picker>
              </div>
            </el-col>

            <el-col :xs="24" :md="12">
              <div class="people-selection mb-6">
                <h3 class="text-md font-semibold mb-3">参与人数</h3>
                <el-input-number
                  v-model="peopleCount"
                  :min="1"
                  :max="10"
                  style="width: 100%;"
                  @change="calculatePrice">
                </el-input-number>
              </div>
            </el-col>
          </el-row>

          <div class="time-slots mb-6">
            <h3 class="text-md font-semibold mb-3">选择时间段</h3>
            <el-alert
              v-if="!bookingDate"
              title="请先选择日期"
              type="info"
              show-icon>
            </el-alert>
            <div v-else-if="timeSlots.length === 0" class="no-time-slots text-center py-6">
              <el-empty description="当前日期没有可用时间段"></el-empty>
            </div>
            <div v-else class="time-slot-grid">
              <el-radio-group v-model="selectedTimeSlot" size="large">
                <el-row :gutter="10">
                  <el-col :span="8" v-for="(slot, index) in timeSlots" :key="index" class="mb-3">
                    <el-radio-button :label="slot.id" :disabled="!slot.available">
                      <div class="time-slot-button px-2">
                        <div class="time-range">{{ slot.startTime }}-{{ slot.endTime }}</div>
                        <div class="availability-tag" v-if="slot.available">
                          <el-tag size="small" type="success">可预约</el-tag>
                        </div>
                        <div class="availability-tag" v-else>
                          <el-tag size="small" type="danger">已约满</el-tag>
                        </div>
                      </div>
                    </el-radio-button>
                  </el-col>
                </el-row>
              </el-radio-group>
            </div>
          </div>

          <div class="price-summary bg-gray-50 p-4 rounded-lg mb-6">
            <div class="flex justify-between items-center">
              <div>
                <div class="text-lg font-semibold">价格明细</div>
                <div class="text-sm text-gray-500 mt-1">{{ peopleCount }}人 x ¥{{ getUnitPrice() }}</div>
              </div>
              <div class="total-price">
                <div class="text-sm text-gray-500">总价</div>
                <div class="text-xl font-bold text-primary">¥{{ totalPrice }}</div>
              </div>
            </div>
          </div>

          <div class="step-actions flex justify-between mt-6">
            <el-button @click="goBack">取消</el-button>
            <el-button type="primary" @click="nextStep" :disabled="!canProceed">下一步</el-button>
          </div>
        </div>

        <!-- 步骤二：填写信息 -->
        <div v-if="activeStep === 1">
          <div class="step-header mb-6">
            <h2 class="text-xl font-bold">填写参与者信息</h2>
            <p class="text-gray-500 mt-2">请填写参与者的详细信息，以便我们为您提供更好的服务</p>
          </div>

          <el-form ref="participantForm" :model="participantInfo" :rules="participantRules" label-position="top">
            <el-form-item label="联系人姓名" prop="contactName">
              <el-input v-model="participantInfo.contactName" placeholder="请输入联系人姓名"></el-input>
            </el-form-item>

            <el-form-item label="联系电话" prop="contactPhone">
              <el-input v-model="participantInfo.contactPhone" placeholder="请输入联系电话"></el-input>
            </el-form-item>

            <el-form-item label="紧急联系人" prop="emergencyContact">
              <el-input v-model="participantInfo.emergencyContact" placeholder="请输入紧急联系人姓名"></el-input>
            </el-form-item>

            <el-form-item label="紧急联系人电话" prop="emergencyPhone">
              <el-input v-model="participantInfo.emergencyPhone" placeholder="请输入紧急联系人电话"></el-input>
            </el-form-item>

            <el-divider content-position="center">参与者信息</el-divider>

            <div v-for="(participant, index) in participants" :key="index" class="participant-item mb-4 p-4 border rounded-lg">
              <div class="participant-header flex justify-between items-center mb-3">
                <h3 class="text-md font-semibold">参与者 {{ index + 1 }}</h3>
                <el-button
                  v-if="participants.length > 1"
                  type="danger"
                  size="small"
                  icon="Delete"
                  @click="removeParticipant(index)">
                  移除
                </el-button>
              </div>

              <el-form-item
                :label="'姓名'"
                :prop="'participants.' + index + '.name'"
                :rules="{ required: true, message: '请输入参与者姓名', trigger: 'blur' }">
                <el-input v-model="participant.name" placeholder="请输入参与者姓名"></el-input>
              </el-form-item>

              <el-form-item
                :label="'身份证号'"
                :prop="'participants.' + index + '.idCard'"
                :rules="{ required: true, pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入正确的身份证号', trigger: 'blur' }">
                <el-input v-model="participant.idCard" placeholder="请输入身份证号（用于保险）"></el-input>
              </el-form-item>

              <el-form-item label="年龄" :prop="'participants.' + index + '.age'">
                <el-input-number v-model="participant.age" :min="1" :max="100" style="width: 100%;"></el-input-number>
              </el-form-item>

              <el-form-item label="特殊需求" :prop="'participants.' + index + '.specialNeeds'">
                <el-input
                  type="textarea"
                  v-model="participant.specialNeeds"
                  placeholder="如有特殊需求，请在此说明（如行动不便、过敏史等）"
                  :rows="2">
                </el-input>
              </el-form-item>
            </div>

            <div class="add-participant mb-4">
              <el-button
                v-if="participants.length < peopleCount"
                type="primary"
                plain
                icon="Plus"
                @click="addParticipant">
                添加参与者
              </el-button>
            </div>

            <el-form-item label="备注信息" prop="remark">
              <el-input
                type="textarea"
                v-model="participantInfo.remark"
                placeholder="如有其他要求，请在此说明"
                :rows="3">
              </el-input>
            </el-form-item>

            <el-form-item>
              <el-checkbox v-model="participantInfo.agreement">
                我已阅读并同意
                <el-link type="primary" @click.stop="showTerms">《服务条款》</el-link>
                和
                <el-link type="primary" @click.stop="showPrivacy">《隐私政策》</el-link>
              </el-checkbox>
            </el-form-item>
          </el-form>

          <div class="step-actions flex justify-between mt-6">
            <el-button @click="prevStep">上一步</el-button>
            <el-button type="primary" @click="validateForm">下一步</el-button>
          </div>
        </div>

        <!-- 步骤三：提交预约 -->
        <div v-if="activeStep === 2">
          <div class="step-header mb-6 text-center">
            <h2 class="text-xl font-bold">确认预约信息</h2>
            <p class="text-gray-500 mt-2">请仔细核对您的预约信息，确认无误后提交</p>
          </div>

          <div class="confirmation-info card p-6 mb-6">
            <el-descriptions title="预约信息" :column="1" border>
              <el-descriptions-item label="项目名称">{{ project.name }}</el-descriptions-item>
              <el-descriptions-item label="预约日期">{{ formatDate(bookingDate) }}</el-descriptions-item>
              <el-descriptions-item label="预约时间">{{ getTimeSlotText() }}</el-descriptions-item>
              <el-descriptions-item label="参与人数">{{ peopleCount }} 人</el-descriptions-item>
              <el-descriptions-item label="联系人">{{ participantInfo.contactName }}</el-descriptions-item>
              <el-descriptions-item label="联系电话">{{ participantInfo.contactPhone }}</el-descriptions-item>
              <el-descriptions-item label="紧急联系人">{{ participantInfo.emergencyContact }}</el-descriptions-item>
              <el-descriptions-item label="总价">¥{{ totalPrice }}</el-descriptions-item>
              <el-descriptions-item label="备注信息">{{ participantInfo.remark || '无' }}</el-descriptions-item>
            </el-descriptions>
          </div>

          <div class="participants-summary mb-6">
            <h3 class="text-lg font-semibold mb-3">参与者信息</h3>
            <el-table :data="participants" border style="width: 100%">
              <el-table-column prop="name" label="姓名" width="120"></el-table-column>
              <el-table-column prop="idCard" label="身份证号" width="180"></el-table-column>
              <el-table-column prop="age" label="年龄" width="80"></el-table-column>
              <el-table-column prop="specialNeeds" label="特殊需求"></el-table-column>
            </el-table>
          </div>

          <div class="notice-box bg-gray-50 p-4 rounded-lg mb-6">
            <h3 class="text-md font-semibold mb-2">注意事项</h3>
            <ul class="text-sm text-gray-600 list-disc pl-4">
              <li>请至少提前24小时预约，以便我们安排相关服务。</li>
              <li>如需取消预约，请至少提前24小时通知我们，否则可能产生相应费用。</li>
              <li>体验当天请携带有效身份证件，未成年人须有监护人陪同参加。</li>
              <li>请您按预约时间准时到达，迟到超过15分钟将视为自动放弃预约，且不予退款。</li>
              <li>如遇恶劣天气等不可抗因素，我们有权取消活动，将为您安排改期或全额退款。</li>
            </ul>
          </div>

          <div class="step-actions flex justify-between mt-6">
            <el-button @click="prevStep">上一步</el-button>
            <el-button type="primary" @click="submitBooking" :loading="submitting">确认提交</el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 提交成功对话框 -->
    <el-dialog
      v-model="showSuccessDialog"
      title="预约成功"
      width="30%"
      center>
      <div class="success-content text-center">
        <el-icon class="success-icon text-green-500 text-5xl mb-4"><Check /></el-icon>
        <h3 class="text-xl font-bold mb-2">预约成功！</h3>
        <p class="text-gray-500 mb-4">您的预约已提交成功，我们会尽快处理</p>
        <div class="order-number mb-4">
          <span class="text-gray-500">订单号：</span>
          <span class="font-mono text-primary">{{ orderNumber }}</span>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer flex justify-center gap-4">
          <el-button @click="goToOrders">查看我的订单</el-button>
          <el-button type="primary" @click="goToPayment">立即支付</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Check, Timer, User, Delete, Plus } from '@element-plus/icons-vue'
import { useOrderStore } from '@/store/order'

const route = useRoute()
const router = useRouter()
const orderStore = useOrderStore()

// 解析路由参数
const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  }
})

// 步骤控制
const activeStep = ref(0)
const submitting = ref(false)
const showSuccessDialog = ref(false)
const orderNumber = ref('')

// 项目信息（实际开发中应该从API获取）
const project = reactive({
  id: props.id,
  name: '',
  description: '',
  coverImage: '',
  location: '',
  duration: 0,
  price: 0,
  weekendPrice: 0,
  holidayPrice: 0
})

// 预约信息
const bookingDate = ref('')
const peopleCount = ref(1)
const totalPrice = computed(() => {
  const unitPrice = getUnitPrice()
  return unitPrice * peopleCount.value
})
const selectedTimeSlot = ref('')

// 时间段数据
const timeSlots = ref([])

// 表单引用
const participantForm = ref(null)

// 参与者表单数据
const participantInfo = reactive({
  contactName: '',
  contactPhone: '',
  emergencyContact: '',
  emergencyPhone: '',
  remark: '',
  agreement: false
})

// 参与者列表
const participants = reactive([
  {
    name: '',
    idCard: '',
    age: 30,
    specialNeeds: ''
  }
])

// 表单验证规则
const participantRules = reactive({
  contactName: [
    { required: true, message: '请输入联系人姓名', trigger: 'blur' }
  ],
  contactPhone: [
    { required: true, message: '请输入联系电话', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ],
  emergencyContact: [
    { required: true, message: '请输入紧急联系人姓名', trigger: 'blur' }
  ],
  emergencyPhone: [
    { required: true, message: '请输入紧急联系人电话', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ],
  agreement: [
    { validator: (rule, value, callback) => {
      if (!value) {
        callback(new Error('请阅读并同意服务条款和隐私政策'))
      } else {
        callback()
      }
    }, trigger: 'change' }
  ]
})

// 是否可以进行下一步
const canProceed = computed(() => {
  if (activeStep.value === 0) {
    return bookingDate.value && selectedTimeSlot.value
  }
  return true
})

// 禁用的日期（今天之前的日期和未来30天之后的日期）
function disabledDate(time) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const thirtyDaysLater = new Date(today)
  thirtyDaysLater.setDate(today.getDate() + 30)

  return time.getTime() < today.getTime() || time.getTime() > thirtyDaysLater.getTime()
}

// 加载时间段
function loadTimeSlots() {
  if (!bookingDate.value) return

  // 这里模拟从API获取数据
  // 实际开发中应该调用API获取指定日期的可用时间段

  const isWeekend = isWeekendDay(bookingDate.value)
  const slots = []

  // 模拟时间段数据
  const startTimes = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00']

  startTimes.forEach((time, index) => {
    // 计算结束时间（假设每个时间段为1小时）
    const parts = time.split(':')
    const hour = parseInt(parts[0])
    let endHour = hour + 1
    let endTime = endHour.toString().padStart(2, '0') + ':00'

    // 随机生成可用状态（周末的可用率较低）
    const available = isWeekend ? Math.random() > 0.7 : Math.random() > 0.3

    slots.push({
      id: index + 1,
      startTime: time,
      endTime: endTime,
      available: available,
      maxPeople: 20,
      bookedCount: Math.floor(Math.random() * 15)
    })
  })

  timeSlots.value = slots
  selectedTimeSlot.value = '' // 重置选择
}

// 判断是否是周末
function isWeekendDay(date) {
  const day = date.getDay()
  return day === 0 || day === 6
}

// 获取单价（根据日期判断是否是周末或节假日）
function getUnitPrice() {
  if (!bookingDate.value) return project.price

  if (isWeekendDay(bookingDate.value)) {
    return project.weekendPrice
  }

  // 这里可以添加节假日判断逻辑

  return project.price
}

// 计算总价
function calculatePrice() {
  const unitPrice = getUnitPrice()
  totalPrice.value = unitPrice * peopleCount.value
}

// 获取选中的时间段文本
function getTimeSlotText() {
  if (!selectedTimeSlot.value) return '未选择'

  const slot = timeSlots.value.find(s => s.id === selectedTimeSlot.value)
  if (slot) {
    return `${slot.startTime}-${slot.endTime}`
  }

  return '未选择'
}

// 格式化日期
function formatDate(date) {
  if (!date) return ''

  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')

  return `${year}-${month}-${day}`
}

// 添加参与者
function addParticipant() {
  if (participants.length < peopleCount.value) {
    participants.push({
      name: '',
      idCard: '',
      age: 30,
      specialNeeds: ''
    })
  }
}

// 移除参与者
function removeParticipant(index) {
  if (participants.length > 1) {
    participants.splice(index, 1)
  }
}

// 验证表单
function validateForm() {
  participantForm.value.validate((valid) => {
    if (valid) {
      // 检查参与者数量是否正确
      if (participants.length < peopleCount.value) {
        ElMessage.warning(`请添加所有参与者信息，还需添加${peopleCount.value - participants.length}人`)
        return
      }

      // 验证参与者信息
      let isValid = true
      participants.forEach((participant, index) => {
        if (!participant.name || !participant.idCard) {
          isValid = false
          ElMessage.error(`参与者${index + 1}的姓名和身份证号不能为空`)
        }
      })

      if (isValid) {
        nextStep()
      }
    } else {
      ElMessage.error('请完整填写所有必填信息')
    }
  })
}

// 下一步
function nextStep() {
  if (!canProceed.value) {
    ElMessage.warning('请先完成当前步骤的必填项')
    return
  }

  if (activeStep.value === 0) {
    calculatePrice() // 重新计算价格
  }

  activeStep.value++
}

// 上一步
function prevStep() {
  if (activeStep.value > 0) {
    activeStep.value--
  }
}

// 返回
function goBack() {
  router.push(`/user/projects/${props.id}`)
}

// 提交预约
async function submitBooking() {
  submitting.value = true;

  try {
    // 准备预约数据
    const bookingData = {
      projectId: project.id,
      date: formatDate(bookingDate.value),
      timeSlotId: selectedTimeSlot.value,
      peopleCount: peopleCount.value,
      contactName: participantInfo.contactName,
      contactPhone: participantInfo.contactPhone,
      emergencyContact: participantInfo.emergencyContact,
      emergencyPhone: participantInfo.emergencyPhone,
      remark: participantInfo.remark,
      totalPrice: totalPrice.value,
      participants: participants.map(p => ({
        name: p.name,
        idCard: p.idCard,
        age: p.age,
        specialNeeds: p.specialNeeds || ''
      }))
    };

    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 生成模拟订单号
    orderNumber.value = 'ORD' + Date.now().toString().slice(-8) + Math.floor(Math.random() * 1000);

    // 存储订单信息到本地存储，供支付页面使用
    const orderInfo = {
      orderNumber: orderNumber.value,
      projectName: project.name,
      bookingTime: `${formatDate(bookingDate.value)} ${getTimeSlotText()}`,
      peopleCount: peopleCount.value,
      amount: totalPrice.value
    };
    localStorage.setItem('currentOrder', JSON.stringify(orderInfo));

    // 显示成功对话框
    showSuccessDialog.value = true;

  } catch (error) {
    ElMessage.error(error.message || '提交预约失败，请稍后重试');
  } finally {
    submitting.value = false;
  }
}

// 查看我的订单
function goToOrders() {
  showSuccessDialog.value = false
  router.push('/user/orders')
}

// 前往支付
function goToPayment() {
  showSuccessDialog.value = false
  router.push(`/user/payment/${orderNumber.value}`)
}

// 显示服务条款
function showTerms() {
  ElMessageBox.alert(
    '服务条款内容...',
    '服务条款',
    { confirmButtonText: '我已阅读' }
  )
}

// 显示隐私政策
function showPrivacy() {
  ElMessageBox.alert(
    '隐私政策内容...',
    '隐私政策',
    { confirmButtonText: '我已阅读' }
  )
}

// 加载项目详情
async function loadProjectDetails(projectId) {
  try {
    // 这里模拟从API获取数据
    // 实际开发中应该调用后端API
    const projectsData = {
      '1': {
        name: '城市热气球观光之旅',
        description: '乘坐热气球，俯瞰整座城市的美景，体验自由飞翔的感觉',
        coverImage: '/src/assets/images/projects/hot-air-balloon.jpg',
        location: '北京市朝阳区奥林匹克公园',
        duration: 60,
        price: 688,
        weekendPrice: 888,
        holidayPrice: 1088
      },
      '2': {
        name: '直升机空中游览',
        description: '乘坐直升机，360度全方位欣赏城市景观',
        coverImage: '/src/assets/images/projects/helicopter.jpg',
        location: '北京市顺义区首都机场',
        duration: 30,
        price: 1280,
        weekendPrice: 1480,
        holidayPrice: 1680
      },
      '3': {
        name: '专业无人机体验',
        description: '体验专业无人机操控，拍摄航拍视频',
        coverImage: '/src/assets/images/projects/drone.jpg',
        location: '北京市海淀区奥林匹克森林公园',
        duration: 120,
        price: 399,
        weekendPrice: 499,
        holidayPrice: 599
      },
      '4': {
        name: '悬崖滑翔伞体验',
        description: '体验滑翔伞飞行的自由与刺激',
        coverImage: '/src/assets/images/projects/paragliding.jpg',
        location: '北京市怀柔区喇叭沟门满族乡',
        duration: 45,
        price: 1580,
        weekendPrice: 1780,
        holidayPrice: 1980
      },
      '5': {
        name: '山地动力伞飞行',
        description: '体验动力伞飞行的刺激与快感',
        coverImage: '/src/assets/images/projects/powered-paragliding.jpg',
        location: '北京市怀柔区喇叭沟门满族乡',
        duration: 45,
        price: 1580,
        weekendPrice: 1780,
        holidayPrice: 1980
      },
      '6': {
        name: '高空跳伞体验',
        description: '专业教练陪同，体验高空跳伞的极限运动',
        coverImage: '/src/assets/images/projects/skydiving.jpg',
        location: '北京市顺义区空军跳伞基地',
        duration: 120,
        price: 2980,
        weekendPrice: 3280,
        holidayPrice: 3580
      }
    }

    const projectData = projectsData[projectId]
    if (projectData) {
      Object.assign(project, projectData)
    } else {
      ElMessage.error('项目不存在')
      router.push('/user/projects')
    }
  } catch (error) {
    console.error('加载项目详情失败:', error)
    ElMessage.error('加载项目详情失败')
  }
}

// 生命周期钩子
onMounted(async () => {
  // 先加载项目详情
  await loadProjectDetails(props.id);

  // 从URL参数中获取预选的日期和人数
  const dateParam = route.query.date;
  const participantsParam = route.query.participants;

  if (dateParam) {
    // 将日期字符串转换为Date对象
    const [year, month, day] = dateParam.split('-');
    bookingDate.value = new Date(year, month - 1, day);
    loadTimeSlots();
  }

  if (participantsParam) {
    peopleCount.value = parseInt(participantsParam);
    // 初始化参与者列表
    while (participants.length < peopleCount.value) {
      addParticipant();
    }
  }
});
</script>

<style scoped>
.booking-page {
  /* 背景色已在布局文件中设置为 #d1faba */
  min-height: calc(100vh - 64px);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.booking-content {
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid #86efac;
  transition: all 0.3s ease;
}

.booking-content:hover {
  box-shadow: 0 4px 20px rgba(22, 163, 74, 0.2);
  transform: translateY(-4px);
}

.step-header {
  text-align: center;
  margin-bottom: 2rem;
  animation: fadeInDown 0.5s ease-out;
}

.step-header h2 {
  color: #15803d;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.step-header p {
  color: #4b5563;
}

.project-info-card {
  background-color: #f0fdf4;
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid #86efac;
  transition: all 0.3s ease;
  animation: fadeIn 0.5s ease-out;
}

.project-info-card:hover {
  box-shadow: 0 4px 20px rgba(22, 163, 74, 0.2);
  transform: translateY(-4px);
  border-color: #4ade80;
}

.project-info-card .project-image {
  width: 80px;
  height: 80px;
  flex-shrink: 0;
}

.project-info-card .project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.75rem;
  border: 2px solid #86efac;
  transition: all 0.3s ease;
}

.project-info-card .project-image img:hover {
  transform: scale(1.05);
  border-color: #4ade80;
}

.project-info-card .project-info h3 {
  color: #15803d;
  font-size: 1.25rem;
  font-weight: 600;
}

.project-meta {
  margin-top: 0.5rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4b5563;
}

.meta-item i {
  color: #15803d;
}

.date-selection,
.people-selection,
.time-slots {
  background-color: white;
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #86efac;
  transition: all 0.3s ease;
}

.date-selection:hover,
.people-selection:hover,
.time-slots:hover {
  box-shadow: 0 4px 20px rgba(22, 163, 74, 0.2);
  transform: translateY(-4px);
  border-color: #4ade80;
}

.time-slot-grid {
  display: grid;
  gap: 1rem;
  margin-top: 1rem;
}

.time-slot-grid .el-radio-button__inner {
  width: 100%;
  height: 100%;
  padding: 12px 8px;
  white-space: normal;
  text-align: center;
  border: 1px solid #86efac;
  transition: all 0.3s ease;
}

.time-slot-grid .el-radio-button__inner:hover {
  background-color: #f0fdf4;
}

.time-slot-grid .el-radio-button__original-radio:checked + .el-radio-button__inner {
  background-color: #15803d;
  border-color: #15803d;
  box-shadow: none;
}

.time-slot-grid .el-radio-button:first-child .el-radio-button__inner,
.time-slot-grid .el-radio-button:last-child .el-radio-button__inner {
  border-radius: 0.5rem;
}

.time-slot-grid .el-radio-button__inner:hover {
  color: #15803d;
}

.time-slot-grid .el-radio-button__original-radio:checked + .el-radio-button__inner:hover {
  color: white;
}

.time-slot-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.time-range {
  font-weight: 500;
}

.availability-tag {
  margin-top: 4px;
}

.price-summary {
  background-color: #f0fdf4;
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid #86efac;
  transition: all 0.3s ease;
}

.price-summary:hover {
  box-shadow: 0 4px 20px rgba(22, 163, 74, 0.2);
  transform: translateY(-4px);
  border-color: #4ade80;
}

.total-price {
  text-align: right;
}

.total-price .text-primary {
  color: #15803d;
  font-size: 1.5rem;
  font-weight: 600;
}

.participant-item {
  background-color: #f0fdf4;
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #86efac;
  transition: all 0.3s ease;
}

.participant-item:hover {
  box-shadow: 0 4px 20px rgba(22, 163, 74, 0.2);
  transform: translateY(-4px);
  border-color: #4ade80;
}

.step-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}

.step-actions .el-button {
  min-width: 120px;
  height: 40px;
  font-size: 1rem;
}

.el-button--primary {
  background-color: #15803d;
  border-color: #15803d;
}

.el-button--primary:hover {
  background-color: #166534;
  border-color: #166534;
}

.success-content {
  text-align: center;
  padding: 2rem;
}

.success-icon {
  color: #15803d;
  font-size: 4rem;
  margin-bottom: 1rem;
}

.dialog-footer {
  display: flex;
  justify-content: center;
  gap: 1rem;
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

@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }

  .booking-content {
    padding: 1rem;
  }

  .project-info-card {
    padding: 1rem;
  }

  .project-info-card .project-image {
    width: 60px;
    height: 60px;
  }

  .step-actions {
    flex-direction: column;
    gap: 1rem;
  }

  .step-actions .el-button {
    width: 100%;
  }
}
</style>

<template>
  <div class="payment-page">
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-3xl mx-auto">
        <!-- 页面标题 -->
        <div class="page-header mb-6 flex items-center justify-between">
          <h1 class="text-2xl font-bold">订单支付</h1>
          <div class="payment-timer flex items-center text-gray-500" v-if="timeLeft > 0">
            <el-icon class="mr-1"><Timer /></el-icon>
            <span>支付剩余时间: {{ formatTime(timeLeft) }}</span>
          </div>
        </div>
        
        <!-- 订单信息 -->
        <div class="order-info card p-6 mb-6">
          <h2 class="text-lg font-semibold mb-4">订单信息</h2>
          <el-descriptions :column="1" border>
            <el-descriptions-item label="订单号">{{ orderInfo.orderNumber }}</el-descriptions-item>
            <el-descriptions-item label="项目名称">{{ orderInfo.projectName }}</el-descriptions-item>
            <el-descriptions-item label="预约时间">{{ orderInfo.bookingTime }}</el-descriptions-item>
            <el-descriptions-item label="参与人数">{{ orderInfo.peopleCount }}人</el-descriptions-item>
            <el-descriptions-item label="订单金额">
              <span class="text-lg font-bold text-primary">¥{{ orderInfo.amount }}</span>
            </el-descriptions-item>
          </el-descriptions>
        </div>
        
        <!-- 支付方式选择 -->
        <div class="payment-methods card p-6 mb-6">
          <h2 class="text-lg font-semibold mb-4">选择支付方式</h2>
          
          <el-radio-group v-model="paymentMethod" class="payment-radio-group">
            <div class="payment-item mb-4 p-4 border rounded-lg cursor-pointer hover:border-blue-400 transition-colors"
                :class="{ 'border-blue-500 bg-blue-50': paymentMethod === 'wechat' }"
                @click="paymentMethod = 'wechat'">
              <el-radio label="wechat">
                <div class="flex items-center">
                  <img src="/src/assets/images/payment/wechat-pay.png" alt="微信支付" class="payment-icon w-8 h-8 mr-2">
                  <span class="payment-name">微信支付</span>
                </div>
              </el-radio>
            </div>
            
            <div class="payment-item mb-4 p-4 border rounded-lg cursor-pointer hover:border-blue-400 transition-colors"
                :class="{ 'border-blue-500 bg-blue-50': paymentMethod === 'alipay' }"
                @click="paymentMethod = 'alipay'">
              <el-radio label="alipay">
                <div class="flex items-center">
                  <img src="/src/assets/images/payment/alipay.png" alt="支付宝" class="payment-icon w-8 h-8 mr-2">
                  <span class="payment-name">支付宝</span>
                </div>
              </el-radio>
            </div>
            
            <div class="payment-item p-4 border rounded-lg cursor-pointer hover:border-blue-400 transition-colors"
                :class="{ 'border-blue-500 bg-blue-50': paymentMethod === 'credit' }"
                @click="paymentMethod = 'credit'">
              <el-radio label="credit">
                <div class="flex items-center">
                  <img src="/src/assets/images/payment/credit-card.png" alt="银行卡" class="payment-icon w-8 h-8 mr-2">
                  <span class="payment-name">银行卡支付</span>
                </div>
              </el-radio>
            </div>
          </el-radio-group>
        </div>
        
        <!-- 支付按钮 -->
        <div class="payment-action mb-6">
          <el-button type="primary" size="large" class="w-full" @click="processPay" :loading="paying" :disabled="!paymentMethod">
            立即支付 ¥{{ orderInfo.amount }}
          </el-button>
          <div class="text-center mt-3">
            <el-link type="info" @click="cancelOrder">取消订单</el-link>
          </div>
        </div>
        
        <!-- 支付说明 -->
        <div class="payment-tips text-sm text-gray-500">
          <h3 class="font-medium mb-2">温馨提示：</h3>
          <ul class="list-disc pl-5">
            <li>请在15分钟内完成支付，超时订单将自动取消</li>
            <li>支付成功后，系统将为您生成电子凭证，可在"我的订单"中查看</li>
            <li>如需帮助，请联系客服电话：400-123-4567</li>
          </ul>
        </div>
      </div>
    </div>
    
    <!-- 微信支付二维码对话框 -->
    <el-dialog
      v-model="showWechatDialog"
      title="微信支付"
      width="350px"
      center>
      <div class="qrcode-content text-center">
        <div class="qrcode-image bg-gray-100 w-64 h-64 mx-auto mb-4 flex justify-center items-center">
          <img src="/src/assets/images/payment/qrcode-wechat.png" alt="微信支付二维码" class="w-56 h-56">
        </div>
        <p class="text-gray-500 mb-2">请使用微信扫一扫</p>
        <p class="text-gray-500">扫码支付 <span class="text-primary font-bold">¥{{ orderInfo.amount }}</span></p>
        <div class="countdown-timer mt-4">
          <el-progress :percentage="qrCodeTimerPercentage" :show-text="false"></el-progress>
          <div class="text-gray-500 text-sm mt-1">二维码有效时间：{{ formatTime(qrCodeTimeLeft) }}</div>
        </div>
      </div>
    </el-dialog>
    
    <!-- 支付宝二维码对话框 -->
    <el-dialog
      v-model="showAlipayDialog"
      title="支付宝支付"
      width="350px"
      center>
      <div class="qrcode-content text-center">
        <div class="qrcode-image bg-gray-100 w-64 h-64 mx-auto mb-4 flex justify-center items-center">
          <img src="/src/assets/images/payment/qrcode-alipay.png" alt="支付宝二维码" class="w-56 h-56">
        </div>
        <p class="text-gray-500 mb-2">请使用支付宝扫一扫</p>
        <p class="text-gray-500">扫码支付 <span class="text-primary font-bold">¥{{ orderInfo.amount }}</span></p>
        <div class="countdown-timer mt-4">
          <el-progress :percentage="qrCodeTimerPercentage" :show-text="false"></el-progress>
          <div class="text-gray-500 text-sm mt-1">二维码有效时间：{{ formatTime(qrCodeTimeLeft) }}</div>
        </div>
      </div>
    </el-dialog>
    
    <!-- 银行卡支付对话框 -->
    <el-dialog
      v-model="showCardDialog"
      title="银行卡支付"
      width="500px">
      <el-form ref="cardFormRef" :model="cardForm" :rules="cardRules" label-width="100px">
        <el-form-item label="持卡人姓名" prop="cardHolder">
          <el-input v-model="cardForm.cardHolder" placeholder="请输入持卡人姓名"></el-input>
        </el-form-item>
        
        <el-form-item label="卡号" prop="cardNumber">
          <el-input v-model="cardForm.cardNumber" placeholder="请输入银行卡号" maxlength="19"></el-input>
        </el-form-item>
        
        <el-form-item label="有效期" prop="expiryDate">
          <el-input v-model="cardForm.expiryDate" placeholder="MM/YY" maxlength="5"></el-input>
        </el-form-item>
        
        <el-form-item label="安全码" prop="cvv">
          <el-input v-model="cardForm.cvv" placeholder="CVV" maxlength="3" show-password></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showCardDialog = false">取消</el-button>
          <el-button type="primary" @click="handleCardPay" :loading="paying">确认支付</el-button>
        </span>
      </template>
    </el-dialog>
    
    <!-- 支付成功对话框 -->
    <el-dialog
      v-model="showSuccessDialog"
      title="支付成功"
      width="400px"
      center>
      <div class="success-content text-center">
        <div class="success-icon text-green-500 text-6xl mb-4">
          <el-icon class="success-icon"><CircleCheck /></el-icon>
        </div>
        <h3 class="text-xl font-bold mb-3">支付成功</h3>
        <p class="text-gray-500 mb-4">您的订单已支付成功，感谢您的预约！</p>
        <div class="order-info mb-4">
          <p class="text-gray-500">订单号：{{ orderInfo.orderNumber }}</p>
          <p class="text-gray-500">支付金额：<span class="text-primary font-bold">¥{{ orderInfo.amount }}</span></p>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer flex justify-center gap-4">
          <el-button @click="goToOrders">查看我的订单</el-button>
          <el-button type="primary" @click="goToHome">返回首页</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Timer, CircleCheck } from '@element-plus/icons-vue'
import { useOrderStore } from '@/store/order'

const route = useRoute()
const router = useRouter()
const orderStore = useOrderStore()

// 从路由中获取订单ID
const props = defineProps({
  orderId: {
    type: [String, Number],
    required: true
  }
})

// 支付相关状态
const paymentMethod = ref('')
const paying = ref(false)

// 倒计时相关
const timeLeft = ref(15 * 60) // 15分钟支付时间
const qrCodeTimeLeft = ref(120) // 二维码有效时间2分钟
let timer = null
let qrCodeTimer = null

// 二维码计时器百分比
const qrCodeTimerPercentage = computed(() => {
  return (qrCodeTimeLeft.value / 120) * 100
})

// 对话框控制
const showWechatDialog = ref(false)
const showAlipayDialog = ref(false)
const showCardDialog = ref(false)
const showSuccessDialog = ref(false)

// 银行卡信息
const cardFormRef = ref(null)
const cardForm = reactive({
  cardHolder: '',
  cardNumber: '',
  expiryDate: '',
  cvv: ''
})

// 银行卡表单验证规则
const cardRules = {
  cardHolder: [
    { required: true, message: '请输入持卡人姓名', trigger: 'blur' }
  ],
  cardNumber: [
    { required: true, message: '请输入银行卡号', trigger: 'blur' },
    { pattern: /^\d{13,19}$/, message: '请输入有效的银行卡号', trigger: 'blur' }
  ],
  expiryDate: [
    { required: true, message: '请输入有效期', trigger: 'blur' },
    { pattern: /^(0[1-9]|1[0-2])\/\d{2}$/, message: '请按格式输入：MM/YY', trigger: 'blur' }
  ],
  cvv: [
    { required: true, message: '请输入安全码', trigger: 'blur' },
    { pattern: /^\d{3}$/, message: '请输入3位数安全码', trigger: 'blur' }
  ]
}

// 订单信息(实际应从API获取)
const orderInfo = reactive({
  orderNumber: props.orderId,
  projectName: '城市热气球观光之旅',
  bookingTime: '2023-08-15 10:00-11:00',
  peopleCount: 2,
  amount: 1376
})

// 格式化剩余时间
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

// 启动倒计时
function startTimer() {
  timer = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      clearInterval(timer)
      // 支付超时处理
      handlePaymentTimeout()
    }
  }, 1000)
}

// 启动二维码倒计时
function startQRCodeTimer() {
  qrCodeTimeLeft.value = 120 // 重置为2分钟
  
  clearInterval(qrCodeTimer) // 清除可能存在的旧定时器
  
  qrCodeTimer = setInterval(() => {
    if (qrCodeTimeLeft.value > 0) {
      qrCodeTimeLeft.value--
    } else {
      clearInterval(qrCodeTimer)
      // 二维码超时处理
      if (showWechatDialog.value) {
        showWechatDialog.value = false
        ElMessage.warning('二维码已过期，请重新获取')
      }
      if (showAlipayDialog.value) {
        showAlipayDialog.value = false
        ElMessage.warning('二维码已过期，请重新获取')
      }
    }
  }, 1000)
}

// 支付超时处理
function handlePaymentTimeout() {
  ElMessageBox.alert(
    '支付已超时，订单已自动取消。您可以重新预约或选择其他项目。',
    '支付超时',
    {
      confirmButtonText: '确定',
      callback: () => {
        // 返回到项目列表页
        router.push('/user/projects')
      }
    }
  )
}

// 处理支付
function processPay() {
  if (!paymentMethod.value) {
    ElMessage.warning('请选择支付方式')
    return
  }
  
  paying.value = true
  
  // 根据不同支付方式显示不同的支付界面
  if (paymentMethod.value === 'wechat') {
    setTimeout(() => {
      paying.value = false
      showWechatDialog.value = true
      startQRCodeTimer()
      
      // 模拟支付成功
      setTimeout(() => {
        showWechatDialog.value = false
        handlePaymentSuccess()
      }, Math.random() * 5000 + 2000) // 2-7秒后模拟支付成功
    }, 500)
  } else if (paymentMethod.value === 'alipay') {
    setTimeout(() => {
      paying.value = false
      showAlipayDialog.value = true
      startQRCodeTimer()
      
      // 模拟支付成功
      setTimeout(() => {
        showAlipayDialog.value = false
        handlePaymentSuccess()
      }, Math.random() * 5000 + 2000) // 2-7秒后模拟支付成功
    }, 500)
  } else if (paymentMethod.value === 'credit') {
    setTimeout(() => {
      paying.value = false
      showCardDialog.value = true
    }, 500)
  }
}

// 处理银行卡支付
function handleCardPay() {
  cardFormRef.value.validate((valid) => {
    if (valid) {
      paying.value = true
      
      // 模拟支付请求
      setTimeout(() => {
        paying.value = false
        showCardDialog.value = false
        handlePaymentSuccess()
      }, 1500)
    }
  })
}

// 支付成功处理
function handlePaymentSuccess() {
  // 实际项目中应调用支付状态更新API
  // await orderStore.payOrder({id: orderInfo.orderNumber})
  
  // 清除计时器
  clearInterval(timer)
  clearInterval(qrCodeTimer)
  
  // 显示支付成功对话框
  showSuccessDialog.value = true
}

// 取消订单
function cancelOrder() {
  ElMessageBox.confirm(
    '确定要取消此订单吗？',
    '取消订单',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    // 实际项目中应调用取消订单API
    // await orderStore.cancelOrder(orderInfo.orderNumber)
    
    ElMessage.success('订单已取消')
    router.push('/user/projects')
  }).catch(() => {})
}

// 查看我的订单
function goToOrders() {
  showSuccessDialog.value = false
  router.push('/user/orders')
}

// 返回首页
function goToHome() {
  showSuccessDialog.value = false
  router.push('/user/home')
}

// 生命周期钩子
onMounted(() => {
  // 加载订单详情
  // 实际开发中应该调用API获取订单详情
  // loadOrderDetails(props.orderId)
  
  // 启动支付倒计时
  startTimer()
})

// 组件销毁前清除计时器
onBeforeUnmount(() => {
  clearInterval(timer)
  clearInterval(qrCodeTimer)
})
</script>

<style scoped>
.payment-page {
  background-color: #f8f9fa;
  min-height: 100vh;
}

.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
}

.text-primary {
  color: #409EFF;
}

.payment-radio-group {
  display: block;
}

.payment-item {
  display: flex;
  align-items: center;
}

.success-icon {
  font-size: 64px;
}

/* 银行卡输入格式化 */
.card-input {
  letter-spacing: 1px;
  font-family: monospace;
}
</style>

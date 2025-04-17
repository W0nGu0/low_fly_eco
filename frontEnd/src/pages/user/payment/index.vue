<template>
  <div class="payment-page bg-gray-50 min-h-screen">
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-3xl mx-auto">
        <!-- 页面标题 -->
        <div class="page-header mb-8 flex items-center justify-between animate__animated animate__fadeInDown">
          <h1 class="text-3xl font-bold text-gray-800">订单支付</h1>
          <div class="payment-timer flex items-center text-gray-500 bg-white px-4 py-2 rounded-full shadow-sm" v-if="timeLeft > 0">
            <el-icon class="mr-1 text-red-500"><Timer /></el-icon>
            <span>支付剩余时间: <span class="text-red-500 font-medium">{{ formatTime(timeLeft) }}</span></span>
          </div>
        </div>
        
        <!-- 订单信息 -->
        <div class="order-info card p-6 mb-8 rounded-xl shadow-sm bg-white animate__animated animate__fadeInUp">
          <h2 class="text-xl font-semibold mb-4 text-gray-800 flex items-center">
            <i class="el-icon-document mr-2 text-blue-500"></i>
            订单信息
          </h2>
          <el-descriptions :column="1" border class="border rounded-lg overflow-hidden">
            <el-descriptions-item label="订单号" label-class-name="bg-gray-50">{{ orderInfo.orderNumber }}</el-descriptions-item>
            <el-descriptions-item label="项目名称" label-class-name="bg-gray-50">{{ orderInfo.projectName }}</el-descriptions-item>
            <el-descriptions-item label="预约时间" label-class-name="bg-gray-50">{{ orderInfo.bookingTime }}</el-descriptions-item>
            <el-descriptions-item label="参与人数" label-class-name="bg-gray-50">{{ orderInfo.peopleCount }}人</el-descriptions-item>
            <el-descriptions-item label="订单金额" label-class-name="bg-gray-50">
              <span class="text-xl font-bold text-blue-600">¥{{ orderInfo.amount }}</span>
            </el-descriptions-item>
          </el-descriptions>
        </div>
        
        <!-- 支付方式选择 -->
        <div class="payment-methods card p-6 mb-8 rounded-xl shadow-sm bg-white animate__animated animate__fadeInUp" style="animation-delay: 0.2s">
          <h2 class="text-xl font-semibold mb-4 text-gray-800 flex items-center">
            <i class="el-icon-wallet mr-2 text-blue-500"></i>
            选择支付方式
          </h2>
          
          <el-radio-group v-model="paymentMethod" class="payment-radio-group w-full">
            <div class="payment-item mb-4 p-4 border rounded-lg cursor-pointer hover:border-blue-400 transition-all duration-300 hover:shadow-md"
                :class="{ 'border-blue-500 bg-blue-50 shadow-md': paymentMethod === 'wechat' }"
                @click="paymentMethod = 'wechat'">
              <el-radio label="wechat" class="w-full">
                <div class="flex items-center">
                  <img src="/src/assets/images/payment/wechat-pay.png" alt="微信支付" class="payment-icon w-8 h-8 mr-2">
                  <span class="payment-name font-medium">微信支付</span>
                </div>
              </el-radio>
            </div>
            
            <div class="payment-item mb-4 p-4 border rounded-lg cursor-pointer hover:border-blue-400 transition-all duration-300 hover:shadow-md"
                :class="{ 'border-blue-500 bg-blue-50 shadow-md': paymentMethod === 'alipay' }"
                @click="paymentMethod = 'alipay'">
              <el-radio label="alipay" class="w-full">
                <div class="flex items-center">
                  <img src="/src/assets/images/payment/alipay.png" alt="支付宝" class="payment-icon w-8 h-8 mr-2">
                  <span class="payment-name font-medium">支付宝</span>
                </div>
              </el-radio>
            </div>
            
            <div class="payment-item p-4 border rounded-lg cursor-pointer hover:border-blue-400 transition-all duration-300 hover:shadow-md"
                :class="{ 'border-blue-500 bg-blue-50 shadow-md': paymentMethod === 'credit' }"
                @click="paymentMethod = 'credit'">
              <el-radio label="credit" class="w-full">
                <div class="flex items-center">
                  <img src="/src/assets/images/payment/credit-card.png" alt="银行卡" class="payment-icon w-8 h-8 mr-2">
                  <span class="payment-name font-medium">银行卡支付</span>
                </div>
              </el-radio>
            </div>
          </el-radio-group>
        </div>
        
        <!-- 支付按钮 -->
        <div class="payment-action mb-8 animate__animated animate__fadeInUp" style="animation-delay: 0.4s">
          <el-button type="primary" size="large" class="w-full py-4 text-lg font-medium bg-blue-500 hover:bg-blue-600 transition-colors" @click="processPay" :loading="paying" :disabled="!paymentMethod">
            立即支付 ¥{{ orderInfo.amount }}
          </el-button>
          <div class="text-center mt-4">
            <el-link type="info" @click="cancelOrder" class="text-gray-500 hover:text-gray-700 transition-colors">取消订单</el-link>
          </div>
        </div>
        
        <!-- 支付说明 -->
        <div class="payment-tips text-sm text-gray-500 bg-white p-6 rounded-xl shadow-sm animate__animated animate__fadeInUp" style="animation-delay: 0.6s">
          <h3 class="font-medium mb-3 text-gray-700 flex items-center">
            <i class="el-icon-info mr-2 text-blue-500"></i>
            温馨提示：
          </h3>
          <ul class="list-disc pl-5 space-y-2">
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
      center
      class="animate__animated animate__zoomIn">
      <div class="qrcode-content text-center">
        <div class="qrcode-image bg-gray-100 w-64 h-64 mx-auto mb-4 flex justify-center items-center rounded-lg shadow-sm">
          <img src="/src/assets/images/payment/qrcode-wechat.png" alt="微信支付二维码" class="w-56 h-56">
        </div>
        <p class="text-gray-500 mb-2">请使用微信扫一扫</p>
        <p class="text-gray-400 text-sm">扫描二维码完成支付</p>
      </div>
    </el-dialog>
    
    <!-- 支付宝支付对话框 -->
    <el-dialog
      v-model="showAlipayDialog"
      title="支付宝支付"
      width="350px"
      center
      class="animate__animated animate__zoomIn">
      <div class="qrcode-content text-center">
        <div class="qrcode-image bg-gray-100 w-64 h-64 mx-auto mb-4 flex justify-center items-center rounded-lg shadow-sm">
          <img src="/src/assets/images/payment/qrcode-alipay.png" alt="支付宝二维码" class="w-56 h-56">
        </div>
        <p class="text-gray-500 mb-2">请使用支付宝扫一扫</p>
        <p class="text-gray-400 text-sm">扫描二维码完成支付</p>
      </div>
    </el-dialog>
    
    <!-- 银行卡支付对话框 -->
    <el-dialog
      v-model="showCreditDialog"
      title="银行卡支付"
      width="500px"
      center
      class="animate__animated animate__zoomIn">
      <div class="credit-card-form">
        <el-form :model="creditCardForm" label-width="100px">
          <el-form-item label="持卡人姓名">
            <el-input v-model="creditCardForm.name" placeholder="请输入持卡人姓名"></el-input>
          </el-form-item>
          <el-form-item label="卡号">
            <el-input v-model="creditCardForm.number" placeholder="请输入银行卡号"></el-input>
          </el-form-item>
          <el-form-item label="有效期">
            <el-input v-model="creditCardForm.expiry" placeholder="MM/YY"></el-input>
          </el-form-item>
          <el-form-item label="CVV码">
            <el-input v-model="creditCardForm.cvv" placeholder="请输入CVV码" maxlength="4"></el-input>
          </el-form-item>
        </el-form>
        <div class="text-center mt-4">
          <el-button type="primary" @click="processCreditCardPay" :loading="paying">确认支付</el-button>
        </div>
      </div>
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

<template>
  <div class="admin-orders-page w-full h-full flex flex-col">
    <!-- 权限检查 -->
    <permission-check required-permission="order_manage">
      <div class="page-header">
        <div class="title-section">
          <h2 class="page-title">订单管理</h2>
          <span class="page-subtitle">管理所有用户的预约订单</span>
        </div>
        <div class="action-section">
          <el-button type="primary" @click="exportOrders" icon="Download">导出订单</el-button>
        </div>
      </div>

      <!-- 订单列表组件 -->
      <order-list ref="orderListRef" class="flex-1"></order-list>
    </permission-check>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Download } from '@element-plus/icons-vue'
import { useAdminOrderStore } from '@/store/adminOrder'
import PermissionCheck from '@/components/admin/common/PermissionCheck.vue'
import OrderList from '@/components/admin/orders/OrderList.vue'

// 引用组件
const orderListRef = ref(null)

// 导出订单
const exportOrders = () => {
  ElMessage.info('导出功能暂未实现')
}
</script>

<style scoped>
.admin-orders-page {
  padding: 20px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  max-width: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.title-section {
  display: flex;
  align-items: baseline;
}

.page-title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}

.page-subtitle {
  margin-left: 12px;
  color: #909399;
  font-size: 14px;
}
</style>

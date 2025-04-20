<template>
  <div class="admin-reviews-page w-full h-full flex flex-col">
    <!-- 权限检查 -->
    <permission-check required-permission="review_manage">
      <div class="page-header">
        <div class="title-section">
          <h2 class="page-title">评价管理</h2>
          <span class="page-subtitle">管理用户评价和回复</span>
        </div>
        <div class="action-section">
          <el-button type="primary" @click="generateReport" icon="Document">
            生成报表
          </el-button>
        </div>
      </div>

      <!-- 评价管理选项卡 -->
      <el-tabs v-model="activeTab" class="review-tabs">
        <el-tab-pane label="评价列表" name="list">
          <review-list ref="reviewListRef"></review-list>
        </el-tab-pane>
        <el-tab-pane label="数据分析" name="analysis">
          <review-analysis></review-analysis>
        </el-tab-pane>
      </el-tabs>

      <!-- 生成报表对话框 -->
      <el-dialog
        v-model="reportDialogVisible"
        title="生成评价报表"
        width="500px"
      >
        <el-form :model="reportForm" label-width="100px">
          <el-form-item label="时间范围">
            <el-date-picker
              v-model="reportForm.dateRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="项目筛选">
            <el-select v-model="reportForm.projectId" placeholder="全部项目" clearable style="width: 100%">
              <el-option
                v-for="item in projectOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="评分筛选">
            <el-select v-model="reportForm.minRating" placeholder="最低评分" style="width: 45%">
              <el-option v-for="i in 5" :key="i" :label="i + '星及以上'" :value="i"></el-option>
            </el-select>
            <span class="mx-2">至</span>
            <el-select v-model="reportForm.maxRating" placeholder="最高评分" style="width: 45%">
              <el-option v-for="i in 5" :key="i" :label="i + '星及以下'" :value="i"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="报表类型">
            <el-radio-group v-model="reportForm.type">
              <el-radio label="summary">汇总报表</el-radio>
              <el-radio label="detail">详细报表</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="报表格式">
            <el-radio-group v-model="reportForm.format">
              <el-radio label="excel">Excel</el-radio>
              <el-radio label="pdf">PDF</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="reportDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="downloadReport" :loading="generating">
              生成并下载
            </el-button>
          </span>
        </template>
      </el-dialog>
    </permission-check>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Document } from '@element-plus/icons-vue'
import PermissionCheck from '@/components/admin/common/PermissionCheck.vue'
import ReviewList from '@/components/admin/reviews/ReviewList.vue'
import ReviewAnalysis from '@/components/admin/reviews/ReviewAnalysis.vue'

// 当前选中的选项卡
const activeTab = ref('list')

// 评价列表组件引用
const reviewListRef = ref(null)

// 报表对话框
const reportDialogVisible = ref(false)
const generating = ref(false)

// 报表表单
const reportForm = ref({
  dateRange: [],
  projectId: null,
  minRating: 1,
  maxRating: 5,
  type: 'summary',
  format: 'excel'
})

// 项目选项
const projectOptions = ref([
  { value: 1, label: '热气球观光之旅' },
  { value: 2, label: '直升机空中游览' },
  { value: 3, label: '专业无人机操控体验' },
  { value: 4, label: '滑翔伞飞行体验' },
  { value: 5, label: '动力滑翔伞体验' },
  { value: 6, label: '高空跳伞体验' }
])

// 打开生成报表对话框
const generateReport = () => {
  reportDialogVisible.value = true
}

// 下载报表
const downloadReport = async () => {
  generating.value = true

  try {
    // 模拟报表生成
    await new Promise(resolve => setTimeout(resolve, 1500))

    // 显示成功消息
    ElMessage.success('报表生成成功，已开始下载')

    // 关闭对话框
    reportDialogVisible.value = false
  } catch (error) {
    ElMessage.error('报表生成失败：' + (error.message || '未知错误'))
  } finally {
    generating.value = false
  }
}
</script>

<style scoped>
.admin-reviews-page {
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
  flex-direction: column;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  line-height: 1.2;
}

.page-subtitle {
  font-size: 14px;
  color: #909399;
  margin-top: 4px;
}

.review-tabs {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.review-tabs :deep(.el-tabs__content) {
  flex: 1;
  overflow: auto;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}
</style>

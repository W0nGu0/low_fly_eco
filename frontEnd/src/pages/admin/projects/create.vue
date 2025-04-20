<template>
  <div class="project-create-container animate__animated animate__fadeIn">
    <div class="page-header">
      <h2 class="page-title">新增项目</h2>
      <el-button type="primary" @click="goBack">返回项目列表</el-button>
    </div>

    <el-form
      ref="formRef"
      :model="projectForm"
      :rules="rules"
      label-width="120px"
      class="project-form"
      :hide-required-asterisk="false"
    >
      <el-card class="form-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <h3>基本信息</h3>
          </div>
        </template>

        <el-row :gutter="20">
          <el-col :xs="24" :sm="12">
            <el-form-item label="项目名称" prop="name">
              <el-input v-model="projectForm.name" placeholder="请输入项目名称"></el-input>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12">
            <el-form-item label="项目分类" prop="categoryId">
              <el-select v-model="projectForm.categoryId" placeholder="请选择项目分类" style="width: 100%">
                <el-option v-for="item in categoryOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :xs="24" :sm="24">
            <el-form-item label="项目简介" prop="brief">
              <el-input v-model="projectForm.brief" type="textarea" :rows="2" placeholder="请输入项目简介(100字以内)"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :xs="24" :sm="24">
            <el-form-item label="详细描述" prop="description">
              <el-input v-model="projectForm.description" type="textarea" :rows="4" placeholder="请输入详细描述"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>

      <el-card class="form-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <h3>价格与时间</h3>
          </div>
        </template>

        <el-row :gutter="20">
          <el-col :xs="24" :sm="8">
            <el-form-item label="标准价格" prop="price">
              <el-input-number v-model="projectForm.price" :min="0" :precision="2" :step="10" style="width: 100%" placeholder="¥"></el-input-number>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="8">
            <el-form-item label="周末价格" prop="weekendPrice">
              <el-input-number v-model="projectForm.weekendPrice" :min="0" :precision="2" :step="10" style="width: 100%" placeholder="¥"></el-input-number>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="8">
            <el-form-item label="节假日价格" prop="holidayPrice">
              <el-input-number v-model="projectForm.holidayPrice" :min="0" :precision="2" :step="10" style="width: 100%" placeholder="¥"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :xs="24" :sm="12">
            <el-form-item label="体验时长(分钟)" prop="duration">
              <el-input-number v-model="projectForm.duration" :min="1" :precision="0" :step="5" style="width: 100%"></el-input-number>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12">
            <el-form-item label="飞行高度(米)" prop="altitude">
              <el-input-number v-model="projectForm.altitude" :min="0" :precision="0" :step="10" style="width: 100%"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>

      <el-card class="form-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <h3>地点信息</h3>
          </div>
        </template>

        <el-row :gutter="20">
          <el-col :xs="24" :sm="12">
            <el-form-item label="所在地区" prop="location">
              <el-input v-model="projectForm.location" placeholder="如: 北京市朝阳区"></el-input>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12">
            <el-form-item label="详细地址" prop="detailedLocation">
              <el-input v-model="projectForm.detailedLocation" placeholder="详细地址信息"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :xs="24" :sm="12">
            <el-form-item label="联系电话" prop="contactPhone">
              <el-input v-model="projectForm.contactPhone" placeholder="联系电话"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>

      <el-card class="form-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <h3>项目图片</h3>
          </div>
        </template>

        <el-form-item label="封面图片" prop="coverImage">
          <el-upload
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            :limit="1"
            :file-list="coverFileList"
            :on-change="handleCoverChange"
          >
            <template #default>
              <el-icon><Plus /></el-icon>
            </template>
            <template #file="{file}">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="previewImage(file.url)">
                  <el-icon><ZoomIn /></el-icon>
                </span>
                <span class="el-upload-list__item-delete" @click="removeCover(file)">
                  <el-icon><Delete /></el-icon>
                </span>
              </span>
            </template>
          </el-upload>
          <div class="el-upload__tip">建议尺寸800x600px，JPG/PNG格式</div>
        </el-form-item>

        <el-form-item label="项目图片集" prop="images">
          <el-upload
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            :limit="6"
            :file-list="imageFileList"
            :on-change="handleImageChange"
          >
            <template #default>
              <el-icon><Plus /></el-icon>
            </template>
          </el-upload>
          <div class="el-upload__tip">最多上传6张图片，建议尺寸1000x750px，JPG/PNG格式</div>
        </el-form-item>
      </el-card>

      <el-card class="form-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <h3>其他信息</h3>
          </div>
        </template>

        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="projectForm.status">
            <el-radio label="active">开放预约</el-radio>
            <el-radio label="maintenance">维护中</el-radio>
            <el-radio label="inactive">已下架</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="适合人群" prop="suitablePeople">
          <el-input type="textarea" v-model="projectForm.suitablePeople" :rows="3" placeholder="描述适合哪些人群体验此项目"></el-input>
        </el-form-item>

        <el-form-item label="标签">
          <el-tag
            v-for="tag in dynamicTags"
            :key="tag"
            closable
            :disable-transitions="false"
            @close="handleTagClose(tag)"
            class="tag-item"
          >
            {{ tag }}
          </el-tag>
          <el-input
            v-if="inputVisible"
            ref="tagInputRef"
            v-model="inputValue"
            class="tag-input"
            size="small"
            @keyup.enter="handleTagConfirm"
            @blur="handleTagConfirm"
          />
          <el-button v-else class="button-new-tag" size="small" @click="showTagInput">
            + 新标签
          </el-button>
        </el-form-item>
      </el-card>

      <div class="form-actions">
        <el-button @click="resetForm">重置</el-button>
        <el-button type="primary" @click="submitForm" :loading="submitting">提交</el-button>
      </div>
    </el-form>

    <el-dialog v-model="previewVisible" title="预览">
      <img w-full style="width: 100%" :src="previewUrl" alt="Preview Image" />
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, ZoomIn, Delete } from '@element-plus/icons-vue'
import { getImageUrl } from '@/utils/imageHelper'

const router = useRouter()
const formRef = ref(null)
const submitting = ref(false)

// 分类选项
const categoryOptions = [
  { id: 1, name: '热气球观光' },
  { id: 2, name: '直升机游览' },
  { id: 3, name: '无人机体验' },
  { id: 4, name: '滑翔伞' },
  { id: 5, name: '动力伞' }
]

// 表单数据
const projectForm = reactive({
  name: '',
  categoryId: '',
  brief: '',
  description: '',
  price: 0,
  weekendPrice: 0,
  holidayPrice: 0,
  duration: 30,
  altitude: 100,
  location: '',
  detailedLocation: '',
  contactPhone: '',
  coverImage: '',
  images: [],
  status: 'active',
  suitablePeople: ''
})

// 表单验证规则
const rules = {
  name: [
    { required: true, message: '请输入项目名称', trigger: 'blur' },
    { min: 2, max: 30, message: '长度在2到30个字符之间', trigger: 'blur' }
  ],
  categoryId: [
    { required: true, message: '请选择项目分类', trigger: 'change' }
  ],
  brief: [
    { required: true, message: '请输入项目简介', trigger: 'blur' },
    { max: 100, message: '简介不能超过100个字符', trigger: 'blur' }
  ],
  description: [
    { required: true, message: '请输入详细描述', trigger: 'blur' }
  ],
  price: [
    { required: true, message: '请设置标准价格', trigger: 'blur' }
  ],
  duration: [
    { required: true, message: '请设置体验时长', trigger: 'blur' }
  ],
  location: [
    { required: true, message: '请输入所在地区', trigger: 'blur' }
  ],
  coverImage: [
    { required: true, message: '请上传封面图片', trigger: 'change' }
  ]
}

// 封面图片
const coverFileList = ref([])
// 图片集
const imageFileList = ref([])

// 标签相关
const dynamicTags = ref(['情侣', '家庭', '摄影爱好者', '户外活动'])
const inputVisible = ref(false)
const inputValue = ref('')
const tagInputRef = ref(null)

// 图片预览
const previewVisible = ref(false)
const previewUrl = ref('')

// 预览图片
const previewImage = (url) => {
  previewUrl.value = url
  previewVisible.value = true
}

// 处理封面图片上传
const handleCoverChange = (file, fileList) => {
  coverFileList.value = fileList.slice(-1)
  projectForm.coverImage = fileList.length > 0 ? URL.createObjectURL(fileList[0].raw) : ''
}

// 移除封面图片
const removeCover = (file) => {
  coverFileList.value = []
  projectForm.coverImage = ''
}

// 处理图片集上传
const handleImageChange = (file, fileList) => {
  imageFileList.value = fileList
  projectForm.images = fileList.map(item => URL.createObjectURL(item.raw))
}

// 显示标签输入框
const showTagInput = () => {
  inputVisible.value = true
  nextTick(() => {
    tagInputRef.value.focus()
  })
}

// 确认添加标签
const handleTagConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}

// 删除标签
const handleTagClose = (tag) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}

// 提交表单
const submitForm = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async (valid, fields) => {
    if (valid) {
      submitting.value = true
      try {
        // 模拟提交请求
        await new Promise(resolve => setTimeout(resolve, 1000))

        // 构建要提交的数据
        const formData = {
          ...projectForm,
          suitableTags: dynamicTags.value
        }

        console.log('提交的数据:', formData)

        ElMessage.success('项目创建成功')
        router.push('/admin/projects')
      } catch (error) {
        ElMessage.error('创建失败: ' + (error.message || '未知错误'))
      } finally {
        submitting.value = false
      }
    } else {
      ElMessage.error('请检查表单填写是否正确')
    }
  })
}

// 重置表单
const resetForm = () => {
  ElMessageBox.confirm('确定要重置表单吗？已填写的内容将丢失。', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    formRef.value.resetFields()
    coverFileList.value = []
    imageFileList.value = []
    dynamicTags.value = ['情侣', '家庭', '摄影爱好者', '户外活动']
    projectForm.coverImage = ''
    projectForm.images = []
    ElMessage.success('表单已重置')
  }).catch(() => {})
}

// 返回项目列表
const goBack = () => {
  router.push('/admin/projects')
}
</script>

<style scoped>
.project-create-container {
  padding: 20px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  max-width: 100%;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.page-title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}

.form-card {
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.form-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}

.tag-item {
  margin-right: 10px;
  margin-bottom: 10px;
}

.tag-input {
  width: 100px;
  margin-right: 10px;
  vertical-align: bottom;
}

.button-new-tag {
  margin-bottom: 10px;
}

.project-form :deep(.el-input-number .el-input__inner) {
  text-align: left;
}

.el-upload__tip {
  color: #909399;
  font-size: 12px;
  margin-top: 5px;
}
</style>
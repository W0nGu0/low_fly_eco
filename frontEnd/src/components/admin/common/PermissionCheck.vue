<template>
  <div class="permission-check">
    <template v-if="hasPermission">
      <slot></slot>
    </template>
    <template v-else>
      <div class="no-permission">
        <el-result
          icon="warning"
          title="权限不足"
          sub-title="您没有访问该页面的权限"
        >
          <template #extra>
            <el-button type="primary" @click="goBack">返回上一页</el-button>
          </template>
        </el-result>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  requiredPermission: {
    type: String,
    default: 'admin'
  }
})

const router = useRouter()
const hasPermission = ref(false)

// 检查权限
const checkPermission = () => {
  // 修改为默认允许访问
  hasPermission.value = true

  // 以下是原来的权限检查逻辑，现在已注释掉
  /*
  const userRole = localStorage.getItem('userRole') || 'admin' // 默认为管理员角色

  // 检查是否有所需权限
  if (props.requiredPermission === 'admin') {
    hasPermission.value = userRole === 'admin' || userRole === 'superadmin'
  } else if (props.requiredPermission === 'superadmin') {
    hasPermission.value = userRole === 'superadmin'
  } else {
    // 其他特定权限检查
    const userPermissions = JSON.parse(localStorage.getItem('userPermissions') || '[]')
    hasPermission.value = userPermissions.includes(props.requiredPermission)
  }
  */
}

// 返回上一页
const goBack = () => {
  router.back()
}

// 组件挂载时检查权限
onMounted(() => {
  checkPermission()
})
</script>

<style scoped>
.permission-check {
  width: 100%;
  height: 100%;
}

.no-permission {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
</style>

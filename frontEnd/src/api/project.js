import request from '@/utils/request'

// 获取所有项目
export function getProjects() {
  return request({
    url: '/projects',
    method: 'get'
  })
}

// 根据ID获取项目详情
export function getProjectById(id) {
  return request({
    url: `/projects/${id}`,
    method: 'get'
  })
}

// 根据分类获取项目
export function getProjectsByCategory(categoryId) {
  return request({
    url: '/projects/category',
    method: 'get',
    params: { categoryId }
  })
}

// 获取热门项目
export function getPopularProjects() {
  return request({
    url: '/projects/popular',
    method: 'get'
  })
}

// 获取项目评价列表
export function getProjectReviews(projectId) {
  return request({
    url: `/projects/${projectId}/reviews`,
    method: 'get'
  })
}

// 创建项目评价
export function createReview(data) {
  return request({
    url: `/projects/${data.projectId}/reviews`,
    method: 'post',
    data
  })
}

// 上传项目图片（管理员功能）
export function uploadProjectImage(projectId, data) {
  return request({
    url: `/admin/projects/${projectId}/upload-image`,
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 创建项目（管理员功能）
export function createProject(data) {
  return request({
    url: '/admin/projects',
    method: 'post',
    data
  })
}

// 更新项目（管理员功能）
export function updateProject(id, data) {
  return request({
    url: `/admin/projects/${id}`,
    method: 'put',
    data
  })
}

// 删除项目（管理员功能）
export function deleteProject(id) {
  return request({
    url: `/admin/projects/${id}`,
    method: 'delete'
  })
}

// 获取项目可用的时间段
export function getAvailableTimeslots(projectId, date) {
  return request({
    url: `/projects/${projectId}/timeslots`,
    method: 'get',
    params: { date }
  })
} 
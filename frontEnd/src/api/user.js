import request from '@/utils/request'

// 用户登录
export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

// 用户注册
export function register(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}

// 获取用户信息
export function getUserInfo() {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

// 更新用户信息
export function updateUserInfo(data) {
  return request({
    url: '/user/update',
    method: 'put',
    data
  })
}

// 找回密码
export function recoverPassword(data) {
  return request({
    url: '/user/recover',
    method: 'post',
    data
  })
}

// 修改密码
export function changePassword(data) {
  return request({
    url: '/user/change-password',
    method: 'put',
    data
  })
}

// 发送验证码
export function sendVerificationCode(data) {
  return request({
    url: '/user/send-code',
    method: 'post',
    data
  })
}

// 验证邮箱
export function verifyEmail(token) {
  return request({
    url: `/user/verify-email/${token}`,
    method: 'get'
  })
}

// 上传用户头像
export function uploadAvatar(data) {
  return request({
    url: '/user/upload-avatar',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
} 
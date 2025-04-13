import { createRouter, createWebHashHistory } from 'vue-router'

// 布局组件
const UserLayout = () => import('../pages/common/layout/index.vue')
const AdminLayout = () => import('../pages/admin/layout/index.vue')
const AuthLayout = () => import('../pages/common/auth/Layout.vue')

// 路由配置
const routes = [
  {
    path: '/',
    component: AuthLayout,
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('../pages/common/auth/login.vue'),
        meta: { title: '登录' }
      }
    ]
  },
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('../pages/user/home/index.vue'),
        meta: { title: '首页', icon: 'home' }
      },
      {
        path: 'projects',
        name: 'Projects',
        component: () => import('../pages/user/projects/index.vue'),
        meta: { title: '飞行项目', icon: 'projects' }
      },
      {
        path: 'projects/:id',
        name: 'ProjectDetail',
        component: () => import('../pages/user/projects/detail.vue'),
        meta: { title: '项目详情', icon: 'detail' },
        props: true
      },
      {
        path: 'booking/:id',
        name: 'Booking',
        component: () => import('../pages/user/booking/index.vue'),
        meta: { title: '预约', requiresAuth: true },
        props: true
      },
      {
        path: 'payment/:orderId',
        name: 'Payment',
        component: () => import('../pages/user/payment/index.vue'),
        meta: { title: '支付', requiresAuth: true },
        props: true
      },
      {
        path: 'profile',
        name: 'UserProfile',
        component: () => import('../pages/user/profile/index.vue'),
        meta: { title: '个人信息', requiresAuth: true }
      },
      {
        path: 'orders',
        name: 'UserOrders',
        component: () => import('../pages/user/orders/index.vue'),
        meta: { title: '我的订单', requiresAuth: true }
      },
      {
        path: 'feedback',
        name: 'UserFeedback',
        component: () => import('../pages/user/feedback/index.vue'),
        meta: { title: '评价反馈', requiresAuth: true }
      }
    ]
  },
  {
    path: '/admin',
    component: AdminLayout,
    redirect: '/admin/dashboard',
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: () => import('../pages/admin/dashboard/index.vue'),
        meta: { title: '管理面板' }
      },
      {
        path: 'projects',
        name: 'AdminProjects',
        component: () => import('../pages/admin/projects/index.vue'),
        meta: { title: '项目管理' }
      },
      {
        path: 'orders',
        name: 'AdminOrders',
        component: () => import('../pages/admin/orders/index.vue'),
        meta: { title: '订单管理' }
      },
      {
        path: 'reviews',
        name: 'AdminReviews',
        component: () => import('../pages/admin/reviews/index.vue'),
        meta: { title: '评价管理' }
      },
      {
        path: 'users',
        name: 'AdminUsers',
        component: () => import('../pages/admin/users/index.vue'),
        meta: { title: '用户管理' }
      }
    ]
  },
  {
    path: '/auth',
    component: AuthLayout,
    redirect: '/',
    children: [
      {
        path: 'login',
        redirect: '/',
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('../pages/common/auth/register.vue'),
        meta: { title: '注册' }
      },
      {
        path: 'recover',
        name: 'Recover',
        component: () => import('../pages/common/auth/recover.vue'),
        meta: { title: '找回密码' }
      }
    ]
  },
  // 错误页面
  {
    path: '/404',
    name: '404',
    component: () => import('../pages/common/error/404.vue'),
    meta: { title: '页面未找到' }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 全局前置守卫
router.beforeEach((to, _, next) => {
  // 设置页面标题
  document.title = to.meta.title ? `${to.meta.title} - 低空飞行体验预约系统` : '低空飞行体验预约系统'

  // 判断该路由是否需要登录权限
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = localStorage.getItem('token')
    if (!token) {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    } else {
      // 判断是否需要管理员权限
      if (to.matched.some(record => record.meta.requiresAdmin)) {
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
        if (userInfo.role !== 'admin') {
          next({ path: '/404' })
        } else {
          next()
        }
      } else {
        next()
      }
    }
  } else {
    next()
  }
})

export default router
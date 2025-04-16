import { createRouter, createWebHashHistory } from 'vue-router'

// 用户端页面
import UserLayout from '@/pages/user/layout/index.vue'
import UserHome from '@/pages/user/home/index.vue'
import UserProjects from '@/pages/user/projects/index.vue'
import UserProjectDetail from '@/pages/user/projects/detail.vue'
import ParaglidingDetail from '@/pages/user/projects/detail/paragliding.vue'
import DroneDetail from '@/pages/user/projects/detail/drone.vue'

// 管理端页面
import AdminLayout from '@/pages/admin/layout/index.vue'
import AdminHome from '@/pages/admin/home/index.vue'
import AdminLogin from '@/pages/admin/login/index.vue'

// 布局组件
const AuthLayout = () => import('../pages/common/auth/Layout.vue')
// 登录页面
const Login = () => import('../pages/common/auth/login.vue')

// 路由配置
const routes = [
  {
    // 根路径重定向到登录页面
    path: '/',
    component: AuthLayout,
    children: [
      {
        path: '',
        name: 'Login',
        component: Login,
        meta: { title: '登录' }
      }
    ]
  },
  {
    // 用户相关路由
    path: '/user',
    component: UserLayout,
    children: [
      {
        path: '',
        redirect: '/user/home'
      },
      {
        path: 'home',
        component: UserHome,
        name: 'UserHome',
        meta: { title: '首页' }
      },
      {
        path: 'projects',
        component: UserProjects,
        name: 'UserProjects',
        meta: { title: '项目列表' }
      },
      {
        path: 'projects/detail/paragliding',
        component: ParaglidingDetail,
        name: 'ParaglidingDetail',
        meta: { title: '滑翔伞体验' }
      },
      {
        path: 'projects/detail/drone',
        component: DroneDetail,
        name: 'DroneDetail',
        meta: { title: '无人机体验' }
      },
      {
        path: 'projects/detail/:id',
        component: UserProjectDetail,
        name: 'UserProjectDetail',
        meta: { title: '项目详情' },
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
    // 管理员相关路由
    path: '/admin',
    component: AdminLayout,
    children: [
      {
        path: '',
        redirect: '/admin/home'
      },
      {
        path: 'home',
        component: AdminHome,
        name: 'AdminHome',
        meta: { title: '管理首页', requiresAuth: true }
      }
    ]
  },
  {
    path: '/admin/login',
    component: AdminLogin,
    name: 'AdminLogin',
    meta: { title: '管理员登录' }
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        component: Login,
        name: 'AuthLogin',
        meta: { title: '用户登录' }
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
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 路由拦截器
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = to.meta.title ? `${to.meta.title} - 低空飞行体验` : '低空飞行体验'
  
  // 管理端权限验证
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      next({ name: 'AdminLogin', query: { redirect: to.fullPath } })
      return
    }
  }
  
  next()
})

export default router
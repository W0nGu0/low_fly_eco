import { createRouter, createWebHashHistory } from 'vue-router'

// 用户端页面
import UserLayout from '@/pages/user/layout/index.vue'
import UserHome from '@/pages/user/home/index.vue'
import UserProjects from '@/pages/user/projects/index.vue'
import UserProjectDetail from '@/pages/user/projects/detail.vue'
import ParaglidingDetail from '@/pages/user/projects/detail/paragliding.vue'
import DroneDetail from '@/pages/user/projects/detail/drone.vue'
import HotAirBalloonDetail from '@/pages/user/projects/detail/hot-air-balloon.vue'
import HelicopterDetail from '@/pages/user/projects/detail/helicopter.vue'
import PoweredParaglidingDetail from '@/pages/user/projects/detail/powered-paragliding.vue'
import SkydivingDetail from '@/pages/user/projects/detail/skydiving.vue'

// 管理端页面
import AdminLayout from '@/pages/admin/layout/index.vue'
import AdminLogin from '@/pages/admin/login/index.vue'

// 布局组件
const AuthLayout = () => import('../pages/common/auth/Layout.vue')
// 登录页面
const Login = () => import('../pages/common/auth/login.vue')

// 路由配置
const routes = [
  {
    // 根路径重定向到用户首页
    path: '/',
    redirect: '/auth/login'
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
        path: 'projects/detail/hot-air-balloon',
        component: HotAirBalloonDetail,
        name: 'HotAirBalloonDetail',
        meta: { title: '热气球观光' }
      },
      {
        path: 'projects/detail/helicopter',
        component: HelicopterDetail,
        name: 'HelicopterDetail',
        meta: { title: '直升机空中游览' }
      },
      {
        path: 'projects/detail/powered-paragliding',
        component: PoweredParaglidingDetail,
        name: 'PoweredParaglidingDetail',
        meta: { title: '动力伞飞行' }
      },
      {
        path: 'projects/detail/skydiving',
        component: SkydivingDetail,
        name: 'SkydivingDetail',
        meta: { title: '高空跳伞' }
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
        meta: { title: '预约', requiresAuth: false },
        props: true
      },
      {
        path: 'payment/:orderId',
        name: 'Payment',
        component: () => import('../pages/user/payment/index.vue'),
        meta: { title: '支付', requiresAuth: false },
        props: true
      },
      {
        path: 'profile',
        name: 'UserProfile',
        component: () => import('../pages/user/profile/index.vue'),
        meta: { title: '个人信息', requiresAuth: false }
      },
      {
        path: 'orders',
        name: 'UserOrders',
        component: () => import('../pages/user/orders/index.vue'),
        meta: { title: '我的订单', requiresAuth: false }
      },
      {
        path: 'feedback',
        name: 'UserFeedback',
        component: () => import('../pages/user/feedback/index.vue'),
        meta: { title: '评价反馈', requiresAuth: false }
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
        redirect: '/admin/dashboard'
      },
      {
        path: 'dashboard',
        component: () => import('@/pages/admin/dashboard/index.vue'),
        name: 'AdminDashboard',
        meta: { title: '控制台', requiresAuth: false }
      },
      // 项目管理
      {
        path: 'projects',
        component: () => import('@/pages/admin/projects/index.vue'),
        name: 'AdminProjects',
        meta: { title: '项目列表', requiresAuth: false }
      },
      {
        path: 'projects/create',
        component: () => import('@/pages/admin/projects/create.vue'),
        name: 'AdminProjectCreate',
        meta: { title: '新增项目', requiresAuth: false }
      },
      // 订单管理
      {
        path: 'orders',
        component: () => import('@/pages/admin/orders/index.vue'),
        name: 'AdminOrders',
        meta: { title: '订单列表', requiresAuth: false }
      },
      {
        path: 'orders/statistics',
        component: () => import('@/pages/admin/orders/statistics.vue'),
        name: 'AdminOrderStatistics',
        meta: { title: '订单统计', requiresAuth: false }
      },
      // 用户管理
      {
        path: 'users',
        component: () => import('@/pages/admin/users/index.vue'),
        name: 'AdminUsers',
        meta: { title: '用户列表', requiresAuth: false }
      },
      // 评价管理
      {
        path: 'reviews',
        component: () => import('@/pages/admin/reviews/index.vue'),
        name: 'AdminReviews',
        meta: { title: '评价管理', requiresAuth: false }
      },
      // 系统设置
      {
        path: 'settings',
        component: () => import('@/pages/admin/settings/index.vue'),
        name: 'AdminSettings',
        meta: { title: '系统设置', requiresAuth: false }
      },
      // 个人资料
      {
        path: 'profile',
        component: () => import('@/pages/admin/profile/index.vue'),
        name: 'AdminProfile',
        meta: { title: '个人资料', requiresAuth: false }
      },
      // 修改密码
      {
        path: 'password',
        component: () => import('@/pages/admin/password/index.vue'),
        name: 'AdminPassword',
        meta: { title: '修改密码', requiresAuth: false }
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
  
  // 特殊处理 - 如果是访问管理端控制台，直接放行
  if (to.name === 'AdminDashboard') {
    next();
    return;
  }
  
  // 管理端权限验证
  if (to.meta.requiresAuth) {
    // 预约页面和项目详情页不需要登录，便于测试
    if (to.name === 'UserProjectDetail' || to.name === 'ParaglidingDetail' || 
        to.name === 'DroneDetail' || to.name === 'HotAirBalloonDetail' || 
        to.name === 'HelicopterDetail' || to.name === 'PoweredParaglidingDetail' || 
        to.name === 'SkydivingDetail' || to.name.startsWith('Booking')) {
      next();
      return;
    }
    
    const token = localStorage.getItem('admin_token') || localStorage.getItem('user_token');
    if (!token) {
      // 区分用户和管理员
      if (to.path.startsWith('/admin')) {
        next({ name: 'AdminLogin', query: { redirect: to.fullPath } });
      } else {
        next({ name: 'AuthLogin', query: { redirect: to.fullPath } });
      }
      return;
    }
  }
  
  next();
})

export default router
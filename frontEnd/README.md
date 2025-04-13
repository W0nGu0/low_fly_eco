# 低空飞行体验预约系统前端

这是一个基于Vue 3 + Vite开发的低空飞行体验预约系统前端项目。用户可以浏览各类低空飞行体验项目，进行在线预约、支付，并评价反馈等操作。

## 功能特点

- 用户注册与登录（手机号、邮箱）
- 低空飞行项目展示（热气球、直升机、无人机等）
- 在线预约功能
- 在线支付集成
- 订单管理
- 评价与反馈
- 后台管理系统

## 技术栈

- Vue 3 + Composition API
- Vue Router 4
- Pinia（状态管理）
- Element Plus（UI组件库）
- Axios（HTTP请求）
- Animate.css（动画效果）
- Sass（CSS预处理器）
- Vite（构建工具）

## 安装与运行

### 环境要求

- Node.js 14.0+
- NPM 6.0+

### 安装依赖

```bash
npm install
```

### 开发环境运行

```bash
npm run dev
```

### 生产环境构建

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 项目结构

```
src/
├── api/           # API接口定义
├── assets/        # 静态资源
├── components/    # 公共组件
├── router/        # 路由配置
├── store/         # 状态管理
├── utils/         # 工具函数
├── views/         # 页面组件
├── App.vue        # 根组件
└── main.js        # 入口文件
```

## 后端接口

本项目后端使用Flask框架开发，数据库采用MySQL。前端通过API与后端进行数据交互。

## 浏览器兼容性

- Chrome
- Firefox
- Safari
- Edge

## 联系方式

如有问题或建议，请联系项目维护者。 
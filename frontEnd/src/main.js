import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'animate.css'
import './assets/css/main.css'
import './assets/css/tailwind.css'
import './assets/css/theme.css'

// 创建应用实例
const app = createApp(App)

// 使用插件
app.use(router)
app.use(createPinia())
app.use(ElementPlus, { size: 'default', zIndex: 3000 })

// 挂载应用
app.mount('#app')
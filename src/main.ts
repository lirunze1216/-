import { createApp } from 'vue'
import App from './App.vue'

import { initRouter } from './router/index'
import { initStore } from './store/index'

const app = createApp(App)

// app.use(router)  初始化路由
initRouter(app)
// 初始化vuex
initStore(app)

app.mount('#app')

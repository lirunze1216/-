import { App } from 'vue'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import store from '../store/index'
import Cookies from 'js-cookie'
// 直接调用creteRouter方法来注册
const routes: RouteRecordRaw[] = [
  // { path: '/', redirect: '/login' },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login.vue'),
  },
  {
    path: '/homepage',
    name: 'homepage',
    component: () => import('../views/homepage/homepage.vue'),
  },
]

const router = createRouter({
  // 路由工作方式
  history: createWebHashHistory(),
  // 路由配置
  routes,
})

// 根据getters里面的菜单对象生成路由规则
const genRoutes = () => {
  // 动态生成路由结构
  const menus = store.getters.getNewMenus
  // const newRouters: RouteRecordRaw[] = []
  // 循环菜单对象
  for (let key in menus) {
    const newRouter: RouteRecordRaw = {
      path: '/' + menus[key].name,
      name: menus[key].name,
      component: () => import('../views/homepage/homepage.vue'),
      redirect: '/' + menus[key].name + '/' + menus[key].children[0].name,
      children: [],
    }
    for (let i = 0; i < menus[key].children.length; i++) {
      newRouter.children?.push({
        path: menus[key].children[i].name,
        name: menus[key].children[i].name,
        component: () => import(`../views/${menus[key].name}/${menus[key].children[i].name}.vue`),
      })
    }

    // 动态添加路由规则
    router.addRoute(newRouter)
  }
  // 动态添加首页
  router.addRoute({
    path: '/',
    name: 'homepage',
    component: () => import('../views/homepage/homepage.vue'),
    redirect: '/index',
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('../views/index/index.vue'),
      },
    ],
  })
}

// 前置导航守卫
router.beforeEach((to, from, next) => {
  // 1.token && vuex里面的menus（权限列表）为空
  const token = Cookies.get('token')
  if (token && store.state.menus.length === 0) {
    // 这里是异步的
    store.dispatch('getAdminInfo').then(() => {
      genRoutes()
      next(to)
    })
  } else if (token && to.path === '/homepage' && from.path === '/login' && store.state.menus.length !== 0) {
    // 动态添加路由规则
    genRoutes()
    next('index')
  } else if (!token && to.path !== '/login') {
    next('login')
  } else if (token && to.path === '/login') {
    next(from)
   }
  else {
    next()
  }
})

// 这样导出方法的写法倒是可以导出多个,要用的地方直接调用这个方法
export const initRouter = (app: App<Element>) => {
  app.use(router)
}

// export default router 默认导出只能导出一个

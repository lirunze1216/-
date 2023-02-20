import { createStore } from 'vuex'
import { App } from 'vue'
import { getAdminInfoApi } from '../request/api'

interface MenuObj {
  parentId: number
  id: number
  children?: MenuObj[]
}

interface State {
  menus: MenuObj[]
}

interface NewMenus {
  [key: number]: MenuObj
}

const store = createStore<State>({
  state() {
    return {
      menus: [],
    }
  },
  // 页面不能直接处理的数据在这里处理数据类似computed
  getters: {
    getNewMenus(state) {
      const newMenus: NewMenus = {}
      // 获取旧的菜单数据
      const menus = state.menus
      for (let i = 0; i < menus.length; i++) {
        if (menus[i].parentId === 0) {
          // 一级菜单
          // 这里用了浅拷贝，如果state.menus里面有复杂数据类型就要用深拷贝
          newMenus[menus[i].id] = { ...menus[i], children: newMenus[menus[i].id]?.children || [] }
        } else {
          // 二级菜单
          let parentId = menus[i].parentId //这里拿到的是对应的一级菜单的id
          // 会报错的原因是因为第一条数据是二级菜单的数据，这里的newMenus此时还是空数组，没有children这个属性，需要给它一个默认的空对象
          newMenus[parentId] = newMenus[parentId] || {}
          newMenus[parentId].children = newMenus[parentId].children || []
          // 这个问号在这的意思是，如果前面的是个空 则后面的不执行
          newMenus[parentId].children?.push(menus[i])
        }
      }

      return newMenus
    },
  },
  // 这里存放数据的方法
  mutations: {
    updateMenus(state, menus) {
      state.menus = menus
    },
  },

  actions: {
    getAdminInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getAdminInfoApi().then(res => {
          if (res.code === 200) {
            commit('updateMenus', res.data.menus)
            resolve(res.data)
          } else {
            reject(res)
          }
        })
      })
    },
  },
  modules: {},
})

// 这样导出方法的写法倒是可以导出多个,要用的地方直接调用这个方法
export const initStore = (app: App<Element>) => {
  app.use(store)
}

export default store

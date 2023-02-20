<template>
  <div class="homepage_container">
    <div class="homepage_header">头部</div>
    <div class="homepage_menu">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
        :unique-opened="true"
        :router="true"
      >
        <el-sub-menu :index="menu.id + ''" v-for="menu in newMenus" :key="menu.id">
          <template #title>
            <span>{{ menu.title }}</span>
          </template>
          <template v-for="submenu in menu.children" :key="submenu.id">
            <el-menu-item :index="'/' + menu.name + '/' + submenu.name" v-if="submenu.hidden">{{
              submenu.title
            }}</el-menu-item>
          </template>
        </el-sub-menu>
      </el-menu>
    </div>
    <div class="homepage_countent">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
interface MenuObj {
  parentId: number
  id: number
  title: string
  hidden: 0 | 1
  name: string
  children?: MenuObj[]
}
interface NewMenus {
  [key: number]: MenuObj
}

const store = useStore()
// 因为刷新以后要重新计算这个值，所以加一个计算属性保持数据的变化
const newMenus = computed<NewMenus>(() => store.getters.getNewMenus)
</script>

<style lang="less" scoped>
.homepage_container {
  position: relative;
  height: 100%;
  .homepage_header {
    height: 70px;
    background-color: pink;
  }
  .homepage_menu {
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    width: 250px;
    background-color: red;
  }
  .homepage_countent {
    position: absolute;
    top: 70px;
    right: 0;
    left: 250px;
    bottom: 0;
    background-color: blue;
  }
}
</style>

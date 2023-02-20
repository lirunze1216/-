<template>
  <router-view></router-view>
</template>

<script lang="ts" setup>
import {} from 'vue'
</script>

<style lang="less">
// 导入全局样式
@import url('./assets/styles/rebase.less');
html,
body {
  height: 100%;
}
#app {
  height: 100%;
}
</style>

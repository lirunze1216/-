<template>
  <div>
    <MyPie :data="salePie"></MyPie>
  </div>
</template>

<script lang="ts" setup>
import { getAdminStat } from '../../request/api'
import { reactive, toRefs, ref } from 'vue'
import MyPie from './compontents/MyPie.vue'

const state = reactive<{
  salePie: {}[]
}>({
  salePie: [],
})
const { salePie } = toRefs(state)
getAdminStat().then(res => {
  if (res.errno === 0) {
    salePie.value = res.data.salePie
  }
})
</script>

<style lang="less" scoped></style>

<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="id" label="编号" />
    <el-table-column prop="username" label="账号" />
    <el-table-column prop="nickName" label="姓名" />
    <el-table-column prop="email" label="邮箱" />
    <el-table-column label="添加时间">
      <template #default="scope">{{ formateData(scope.row.createTime) }}</template> </el-table-column
    >>
    <el-table-column label="最后登录">
      <template #default="scope">{{ formateData(scope.row.loginTime) }}</template></el-table-column
    >>
    <el-table-column label="是否启用">
      <template #default="scope">
        <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0" />
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="{ row }">
        <el-button link type="primary" @click="allocRole(row.id)">分配角色</el-button>
        <el-button link type="primary" @click="editAdmin(row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <EditAdmin :visible="visible" @close="closeDiglog" :form="rowData"></EditAdmin>
  <EditRole :visible="roleVisible" :form="roleData" @close="closeRoleDialog"></EditRole>
</template>

<script lang="ts" setup>
import { getAdminLists, getRoleListAll, getAdminRoleById } from '../../request/api'
import { reactive, toRefs } from 'vue'
import EditAdmin from './components/EditAdmin.vue'
import EditRole from './components/EditRole.vue'

const state = reactive<{
  tableData: {}[]
  visible: boolean
  rowData: AdminObjItf
  roleVisible: boolean
  roleData: AdminRoleFormData
}>({
  tableData: [],
  visible: false,
  rowData: {},
  roleVisible: false,
  roleData: {
    roleLists: [],
    userRoles: [],
    adminId: 0,
  },
})
const { tableData, visible, rowData, roleVisible, roleData } = toRefs(state)
const fetchData = () => {
  getAdminLists({ keyword: '', pageSize: 10, pageNum: 1 }).then(res => {
    if (res.code === 200) {
      tableData.value = res.data.list
    }
  })
}
fetchData()

// 获取所有角色
getRoleListAll().then(res => {
  if (res.code === 200) {
    roleData.value.roleLists = res.data
  }
})

// 显示点击分配角色按钮
const allocRole = (id: number) => {
  getAdminRoleById(id).then(res => {
    if (res.code === 200) {
      roleVisible.value = true
      roleData.value.adminId = id
      roleData.value.userRoles = res.data
    }
  })
}

// 隐藏分配角色dialog
const closeRoleDialog = () => {
  roleVisible.value = false
}

// 点击编辑按钮
const editAdmin = (row: AdminObjItf) => {
  visible.value = true
  rowData.value = row
}

// 隐藏diglog
const closeDiglog = (r?: 'reload') => {
  visible.value = false
  rowData.value = {} //清空用户编辑弹框的内容
  if (r === 'reload') {
    //更新表格数据
    fetchData()
  }
}

// 格式化时间
const formateData = (time: string | undefined) => {
  if (!time) return ''
  const date = new Date(time)
  const year = date.getFullYear()
  const month = addZero(date.getMonth() + 1)
  const day = addZero(date.getDay())
  const hour = addZero(date.getHours())
  const min = addZero(date.getMinutes())
  const sec = addZero(date.getSeconds())
  return `${year}-${month}-${day} ${hour}:${min}:${sec}`
}
const addZero = (num: number) => (num > 9 ? num : '0' + num)
</script>

<style lang="less" scoped></style>

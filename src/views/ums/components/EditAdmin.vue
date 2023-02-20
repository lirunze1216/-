<template>
  <el-dialog :model-value="props.visible" title="编辑角色" :before-close="close">
    <el-form :model="form" :label-width="formLabelWidth">
      <el-form-item label="账号">
        <el-input v-model="newForm.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="newForm.nickName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="newForm.email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="newForm.password" autocomplete="off" type="password" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="newForm.note" autocomplete="off" type="textarea" />
      </el-form-item>
      <el-form-item label="是否启用">
        <el-radio v-model="newForm.status" :label="1">是</el-radio>
        <el-radio v-model="newForm.status" :label="0">否</el-radio>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="modifyAdmin"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, toRefs, watch } from 'vue'
import { updateAdmin } from '../../../request/api'

const props = defineProps<{
  visible: boolean
  form: AdminObjItf
}>()

const state = reactive<{
  formLabelWidth: string
  newForm: AdminObjItf
}>({
  formLabelWidth: '120px',
  newForm: {},
})
const { formLabelWidth, newForm } = toRefs(state)

// 父传子是基础数据类型，并且子组件需要修改数据则需要拷贝
watch(
  // 简单数据类型的话，watch不可以直接监听，可以将它作为一个函数的返回值传入
  () => props.form,
  () => {
    newForm.value = { ...props.form }
  }
)

const emit = defineEmits<{
  (event: 'close', r?: 'reload'): void
}>()

// 关闭按钮
const close = (r?: 'reload') => {
  //传到父组件
  emit('close', r)
}
// 确定按钮
const modifyAdmin = () => {
  if (newForm.value.id) {
    updateAdmin(newForm.value.id, newForm.value).then(res => {
      if (res.code === 200) {
        close('reload')
      }
    })
  } else {
    // 新增的是没有id值的
  }
}
</script>

<style lang="less" scoped></style>

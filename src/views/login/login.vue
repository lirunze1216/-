<template>
  <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" class="demo-ruleForm">
    <el-form-item prop="username">
      <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
    </el-form-item>
    <el-form-item prop="pwd">
      <el-input v-model="ruleForm.pwd" type="password" autocomplete="off" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="loginFn">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref } from 'vue'
import { adminLoginApi, getAdminInfoApi } from '../../request/api'
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const state = reactive({
  ruleForm: {
    username: 'admin',
    pwd: '123456',
  },
})
const { ruleForm } = toRefs(state)

// 获取el-form组件对象,因为没有this.$refs
let ruleFormRef = ref()
// 获取项目路由对象,因为没有this.$router
let router = useRouter()
// 获取项目vuex对象,因为没有this.$store
let store = useStore()

// 校验规则

const validatePwd = (rule: unknown, value: string | undefined, cb: (msg?: string) => void) => {
  if (!value) {
    cb('密码不能为空')
  } else {
    cb()
  }
}
const rules = reactive({
  username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  pwd: [{ validator: validatePwd, trigger: 'blur' }],
})

// 点击登录按钮触发的
const loginFn = () => {
  ruleFormRef.value
    .validate()
    .then(() => {
      adminLoginApi({
        password: ruleForm.value.pwd,
        username: ruleForm.value.username,
      }).then(res => {
        if (res.code === 200) {
          //   先存储token
          Cookies.set('token', res.data.tokenHead + res.data.token, { expires: 7 })
          //   获取用户信息
          store.dispatch('getAdminInfo').then(res => {
            router.push('/homepage')
          })
          // getAdminInfoApi().then(res => {
          //   if (res.code === 200) {
          //     // 在跳转页面之前要把用户数据存到vuex里面
          //     store.commit('updateMenus', res.data.menus)
          //     // res.data.menus
          //     // 跳转页面
          //     router.push('/homepage')
          //   }
          // })
        }
      })
    })
    .catch(() => {
      console.log('catch')
    })
}
</script>

<style lang="less" scoped></style>

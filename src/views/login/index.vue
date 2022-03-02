<template>
  <!-- 登录界面 -->
  <div class="login-main">
    <el-form
      :model="userLoginForm"
      status-icon
      ref="userLoginForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="userName">
        <el-input
          type="password"
          v-model="userLoginForm.userName"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="userLoginForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('userLoginForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('userLoginForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { setSysId, setTenant, setToken } from '@/utils/auth/userAuth'
export default {
  data () {
    return {
      userLoginForm: {
        userName: 'admin',
        password: '123456'
      }
    }
  },
  mounted () {
    this.$store.dispatch('logout')
  },
  methods: {
    submitForm () {
      this.$message.success('登陆成功')
      setToken('demo')
      setTenant('111')
      setSysId('22')
      this.$router.push('/')
    }
  }
}
</script>

<style>
.login-main {
  height: 100vh;
  background-color: #f1f1f1;
  overflow-y: hidden;
}
.demo-ruleForm {
  width: 400px;
  background-color: #d4d4d4;
  padding: 16px;
  margin: 300px auto;
  border-radius: 4px;
}
</style>

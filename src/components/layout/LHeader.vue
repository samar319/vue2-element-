<script>
import { computed, defineComponent } from '@vue/composition-api'
import store from '@/store'

export default defineComponent({
  name: 'LHeader',
  props: {
    name: String
  },
  setup (props, { root }) {
    const handleCommand = command => {
      if (command === 'logout') {
        store.dispatch('logout')
      } else if (command === 'resetPwd') {
        root.$showResetPassword()
      } else if (command === 'checkout') {
        root.$showCheckSystem()
      }
    }

    return {
      handleLogout: () => store.dispatch('logout'),
      handleCommand,
      userName: computed(() => store.state.sys.userInfo.nickName),
      logoUrl: require('@/assets/image/layout/logo.png'),
      userUrl: require('@/assets/image/layout/user.png')
    }
  }
})
</script>
<template>
  <div class="l-header">
    <div class="logo-wrapper">
      <img class="logo" :src="logoUrl" alt="成都思致科技有限公司" />
    </div>
    <div class="head-actions">
      <span class="user-name">{{ userName }}</span>
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          <img :src="userUrl" alt="用户" />
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="checkout">切换子系统</el-dropdown-item>
          <el-dropdown-item command="resetPwd">修改密码</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

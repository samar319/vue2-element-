import showResetPassword from '@/components/common/resetPwd/index'
import showCheckSystem from '@/components/common/checkSys/index'

export default {
  install (Vue) {
    // 修改密码
    Vue.prototype.$showResetPassword = showResetPassword
    // 切换子系统
    Vue.prototype.$showCheckSystem = showCheckSystem
  }
}

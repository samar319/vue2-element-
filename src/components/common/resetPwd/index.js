import ResetPwd from './index.vue'
import Vue from 'vue'

const ResetConstructor = Vue.extend(ResetPwd)
let instance = null

const initResetPasswordInstance = () => {
  instance = new ResetConstructor({
    el: document.createElement('div')
  })
}

const showResetPassword = () => {
  if (instance !== null) {
    document.body.removeChild(instance.$el)
  }

  initResetPasswordInstance()

  document.body.appendChild(instance.$el)

  Vue.nextTick(() => {
    // 打开弹框
    instance.visible = true
    // 关闭弹框时销毁
    instance.$watch('visible', flag => {
      if (!flag) {
        document.body.removeChild(instance.$el)
        instance = null
      }
    })
  })
}

export default showResetPassword

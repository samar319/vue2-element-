import ResetPwd from './index.vue'
import Vue from 'vue'
// 切换子系统
const ResetConstructor = Vue.extend(ResetPwd)
let instance = null

const initCheckSystemInstance = () => {
  instance = new ResetConstructor({
    el: document.createElement('div')
  })
}

const showCheckSystem = () => {
  if (instance !== null) {
    document.body.removeChild(instance.$el)
  }

  initCheckSystemInstance()

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

export default showCheckSystem

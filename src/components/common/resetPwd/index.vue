<script>
import { computed, defineComponent, reactive, ref } from '@vue/composition-api'
import { Message, MessageBox } from 'element-ui'
import { resetPassword } from '@/api/sys/user'
import store from '@/store'

export default defineComponent({
  setup (props, { refs }) {
    const visible = ref(false)

    const formData = reactive({
      oldPassword: '',
      newPassword: ''
    })

    // 密码输入校验
    const validatorPwd = (r, v, c) => {
      const numberReg = /\d/
      const capitalReg = /[A-Z]/
      const lowercaseReg = /[a-z]/
      const specialReg = new RegExp(
        "[`~!@%#$^&*()=|{}':;',　\\[\\]<>/? \\.；：%……+￥（）【】‘”“'。，、？]"
      )
      // 先判断输入长度
      // 判断输入匹配规则的正确度 是否满足 4选3
      // 输入是否还有其他字符
      let count = 0
      if (numberReg.test(v)) {
        count++
      }
      if (capitalReg.test(v)) {
        count++
      }
      if (lowercaseReg.test(v)) {
        count++
      }
      if (specialReg.test(v)) {
        count++
      }
      // 密码强度校验
      if (count < 3) {
        c(new Error('密码应包含数字，大、小写字母和特殊字符中的三种'))
        return
      }
      if (v.length < 8 || c.length > 20) {
        c(new Error('密码长度8-20位'))
        return
      }

      const copy = v
        .replace(/[0-9A-Za-z]/g, '')
        .replace(
          new RegExp(
            "[`~!@%#$^&*()=|{}':;',　\\[\\]<>/? \\.；：%……+￥（）【】‘”“'。，、？]",
            'g'
          ),
          ''
        )
      if (copy.length > 0) {
        c(new Error('密码只能包含数字，大、小写字母和特殊字符'))
        return
      }
      if (v === formData.oldPassword) {
         c(new Error('新密码不能与旧密码一致'))
         return
      }
      c()
    }
    /**
     * 重新输入密码校验
     */
    const validatorRePwd = (r, v, c) => {
      const numberReg = /\d/
      const capitalReg = /[A-Z]/
      const lowercaseReg = /[a-z]/
      const specialReg = new RegExp(
        "[`~!@%#$^&*()=|{}':;',　\\[\\]<>/? \\.；：%……+￥（）【】‘”“'。，、？]"
      )
      // 先判断输入长度
      // 判断输入匹配规则的正确度 是否满足 4选3
      // 输入是否还有其他字符
      let count = 0
      if (numberReg.test(v)) {
        count++
      }
      if (capitalReg.test(v)) {
        count++
      }
      if (lowercaseReg.test(v)) {
        count++
      }
      if (specialReg.test(v)) {
        count++
      }
      // 密码强度校验
      if (count < 3) {
        c(new Error('密码应包含数字，大、小写字母和特殊字符中的三种'))
        return
      }
      if (v.length < 8 || c.length > 20) {
        c(new Error('密码长度8-20位'))
        return
      }

      const copy = v
        .replace(/[0-9A-Za-z]/g, '')
        .replace(
          new RegExp(
            "[`~!@%#$^&*()=|{}':;',　\\[\\]<>/? \\.；：%……+￥（）【】‘”“'。，、？]",
            'g'
          ),
          ''
        )
      if (copy.length > 0) {
        c(new Error('密码只能包含数字，大、小写字母和特殊字符'))
        return
      }
      // 两次输入不一致
      if (v !== formData.newPassword) {
        c(new Error('两次密码输入不一致'))
      }
      c()
    }
    /**
     * 表单配置项
     */
    const formLists = computed(() => {
      return [
        {
          prop: 'oldPassword',
          label: '初始密码',
          tag: 'el-input',
          attrs: {
            type: 'password',
            placeholder: '请输入原密码'
          },
          rules: [
            {
              required: true,
              message: '请输入',
              trigger: ['change', 'blur']
            }
          ]
        },
        {
          prop: 'newPassword',
          label: '新密码',
          tag: 'el-input',
          attrs: {
            type: 'password',
            placeholder: '请输入新密码'
          },
          rules: [
            { validator: validatorPwd, trigger: ['change', 'blur'] },
            {
              required: true,
              message: '请输入新密码',
              trigger: ['change', 'blur']
            }
          ]
        },
        {
          prop: 'rePassword',
          label: '确认密码',
          tag: 'el-input',
          attrs: {
            type: 'password',
            placeholder: '请输入确认新密码'
          },
          rules: [
            { validator: validatorRePwd, trigger: ['change', 'blur'] },
            {
              required: true,
              message: '请输入确认密码',
              trigger: ['change', 'blur']
            }
          ]
        }
      ]
    })
    /**
     * 重置密码接口调用
     */
    const resetPwd = async () => {
      await resetPassword(formData)
    }

    const handleSubmit = async () => {
      try {
        // 表单校验
        await refs.form.validate()
        // 接口修改密码
        await resetPwd()
        // 消息处理退出当前登录
        MessageBox.confirm('密码修改成功，重新登陆', '提示', {
          confirmButtonText: '确定',
          showClose: false,
          showCancelButton: false,
          closeOnClickModal: false,
          closeOnPressEscape: false,
          type: 'success'
        }).then(() => {
          store.dispatch('logout')
        })
      } catch (error) {
        if (error === false) {
          Message.warning('请完善表单')
        } else {
          Message.error(error)
        }
      }
    }
    return {
      visible,
      formData,
      formLists,
      handleSubmit
    }
  }
})
</script>

<template>
  <base-dialog :visible.sync="visible" title="修改密码" width="400px">
    <BaseForm
      status-icon
      ref="form"
      :hideBtn="true"
      labelPosition="right"
      labelWidth="100px"
      :model="formData"
      :formLists="formLists"
    ></BaseForm>
    <!-- 操作栏 -->
    <template #footer>
      <el-button type="primary" @click="handleSubmit()">确认</el-button>
      <el-button @click="visible = false">关闭</el-button>
    </template>
  </base-dialog>
</template>

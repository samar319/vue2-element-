// 基础form组件
<script>
import { computed, defineComponent } from '@vue/composition-api'
export const DEFAULT_COLS = { xs: 24, sm: 12, md: 8, lg: 6, xl: 6 }

export default defineComponent({
  props: {
    model: {}, // 数据源
    formLists: [], // 表格配置项
    gutter: {
      // 每个栅格化配置项之间的距离
      type: Number,
      default: 20
    },
    hideBtn: {
      // 隐藏提交按钮
      type: Boolean,
      default: false
    },
    submitText: {
      type: String,
      default: '查询'
    },
    resetText: {
      type: String,
      default: '重置'
    }
  },
  setup (props, { refs, attrs, emit }) {
    // 过滤formItem属性
    const filerFormItem = it => {
      const { attrs, on, tag, span, cols, ...rest } = it
      return rest
    }

    /**
     * 初始化formList
     */
    const normalizedConfigs = computed(() => {
      const formLists = props.formLists

      if (!Array.isArray(formLists)) {
        console.warn('[formLists]:配置项类型有误')
        return []
      } else {
        const res = []
        formLists.forEach(it => {
          // 支持控制变量显示/隐藏 当前元素
          if (it.hidden) {
            return
          }
          if (!it.prop) {
            return console.warn('未传入prop')
          }
          if (!it.tag) {
            return console.log('请传入当前配置项tag')
          }
          res.push(it)
        })
        return res
      }
    })

    /**
     * 表单按钮操作区
     */
    const btnAttrs = computed(() => {
      if (!props.formLists.length) {
        return DEFAULT_COLS
      } else {
        console.log(props.formLists)
        const config = props.formLists[0].col
        return config
      }
    })
    /**
     * 表格栅格化处理
     */
    const colsAttr = it => {
      if (props.hideBtn && !it.cols) {
        return {
          span: it.span || 24
        }
      }
      if (typeof it.span === 'undefined') {
        return it.cols || DEFAULT_COLS
      } else {
        return { span: it.span }
      }
    }

    // 表格校验一些方法
    const validate = (...arg) => refs.form.validate(...arg)
    const validateField = (...arg) => refs.form.validateField(...arg)
    const resetFields = (...arg) => refs.form.resetFields(...arg)
    const clearValidate = (...arg) => refs.form.clearValidate(...arg)

    // 表单默认配置项
    const filterForm = computed(() => {
      const { formLists, gutter, ...rest } = attrs

      if (!('labelPosition' in rest) && !('label-position' in rest)) {
        rest.labelPosition = 'top'
      }

      if (!('labelWidth' in rest) && !('label-width' in rest)) {
        rest.labelWidth = '150px'
      }

      return rest
    })

    /**
     * 提交前做校验
     */
    const handelSubmit = () => {
      validate()
        .then(res => {
          emit('submit')
        })
        .catch(err => {
          console.log(err)
        })
    }

    const handleReset = () => {
      clearValidate()
      emit('reset')
    }

    // label 是否在上方
    const attrsTop = computed(() => {
      return attrs.labelPosition === 'top' || attrs['label-position'] === 'top' || !attrs.labelPosition
    })

    // 表格之间的间隔距离
    const gutterWidth = computed(() => {
      if (typeof props.gutter === 'number') {
        return props.gutter / 2
      } else {
        return 0
      }
    })

    return {
      normalizedConfigs,
      filterForm,
      btnAttrs,
      attrsTop,
      gutterWidth,
      colsAttr,
      handelSubmit,
      handleReset,
      filerFormItem,
      validate,
      validateField,
      resetFields,
      clearValidate
    }
  }
})
</script>

<template>
  <el-row :gutter="gutter" class="sz-form">
    <el-form :model="model" ref="form" v-bind="filterForm">
      <template v-for="it in normalizedConfigs">
        <el-col :key="it.prop" v-bind="colsAttr(it)">
          <el-form-item v-bind="filerFormItem(it)">
            <component
              :is="it.tag"
              v-bind="it.attrs"
              v-on="it.on"
              v-model="model[it.prop]"
            ></component>
          </el-form-item>
        </el-col>
      </template>
    </el-form>
    <div
      v-if="!hideBtn"
      class="form-btn el-col"
      :class="{ topStyle: attrsTop }"
      :style="{
        paddingLeft: `${gutterWidth}px`,
        paddingRight: `${gutterWidth}px`
      }"
    >
      <el-button @click="handelSubmit" type="primary">{{
        submitText
      }}</el-button>
      <el-button @click="handleReset">{{ resetText }}</el-button>
    </div>
  </el-row>
</template>

<style lang="scss" scoped src="./baseForm.scss"></style>

<script>
// 基础弹框组件
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    title: String
  },
  setup (props, { emit, root }) {
    // 关闭弹框
    const handleClose = () => {
      emit('update:visible', false)
    }

    return {
      handleClose
    }
  }
})
</script>

<template>
  <el-dialog
    v-bind="$attrs"
    v-on="$listeners"
    :title="title"
    :append-to-body="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <slot></slot>
    <template slot="footer">
      <template v-if="$slots.footer">
        <slot name="footer"></slot>
      </template>
      <el-row v-else>
        <el-button @click="handleClose">关闭</el-button>
      </el-row>
    </template>
  </el-dialog>
</template>

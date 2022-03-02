<script>
import { computed, defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'BaseSelect',
  props: {
    options: [],
    selectedField: {
      type: Array,
      default: () => ['id', 'name']
    },
    optionDisabled: {
      type: Function,
      default: () => {
        return false
      }
    },
    optionsFilter: {
      type: Function,
      default: null
    }
  },
  setup (props, { listeners, attrs, emit }) {
    // 配置项ID
    const optionKey = computed(() => props.selectedField[0] || 'id')
    // 配置项name
    const optionValue = computed(() => props.selectedField[1] || 'name')
    /**
     * change 事件回调
     * 抛出当前选中的值 当前选择整行的数据
     */
    const selectChangeEmit = (value) => {
      // 如果组件传值为 multiple 不写属性值 会出现判断出错的问题
      const multiple = ('multiple' in attrs) && attrs.multiple !== false

      const keys = multiple ? value : [value]

      const selected = props.options.filter(it => keys.includes(it[optionKey.value]))
      const row = multiple ? selected : selected.length > 0 ? selected[0] : {}

      emit('change', value, row)
    }

    // 处理事件
    const currentListeners = Object.assign(listeners, {
      change: selectChangeEmit
    })

    return {
      optionKey,
      optionValue,
      currentListeners
    }
  }
})
</script>

<template>
  <el-select v-bind="$attrs" v-on="currentListeners" clearable>
    <el-option
      v-for="v in options"
      :key="v[optionKey]"
      :label="v[optionValue]"
      :value="v[optionKey]"
      :disabled="optionDisabled(v)"
    ></el-option>
  </el-select>
</template>
<style></style>

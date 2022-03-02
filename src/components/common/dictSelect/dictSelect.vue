<script>
import store from '@/store'
import { computed, defineComponent } from '@vue/composition-api'

const selectedField = ['dictId', 'dictName']

export default defineComponent({
  name: 'dictSelect',
  props: {
    dictTypeCode: {
      type: String,
      required: true
    }
  },
  setup (props) {
    /**
     * 字典配置项
     */
    const dictOptions = computed(() => {
      if (!props.dictTypeCode) {
        return []
      } else {
        return store.state.sys.dictMap[props.dictTypeCode] || []
      }
    })

    return {
      options: dictOptions,
      selectedField
    }
  }
})
</script>
<template>
  <base-select
    v-bind="$attrs"
    v-on="$listeners"
    :options="options"
    :selectedField="selectedField"
  >
  </base-select>
</template>

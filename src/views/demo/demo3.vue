<script>
import dictSelectVue from '@/components/common/dictSelect/dictSelect.vue'
import { computed, defineComponent, reactive, ref } from '@vue/composition-api'
import { testApi } from '@/api/demo'

export default defineComponent({
  setup () {
    const formLists = computed(() => {
      return [
        {
          prop: 'name',
          label: '姓名',
          attrs: {
            placeholder: '请输入'
          },
          tag: 'el-input'
        },
        {
          prop: 'name1',
          label: '姓名1',
          attrs: {
            dictTypeCode: 'ZT_BH_BIZ_TYPE',
            placeholder: '请选择'
          },
          tag: dictSelectVue
        }
      ]
    })

    const queryParas = reactive({
      pageSize: 20,
      pageIndex: 1
    })

    const columns = computed(() => {
      return []
    })

    const loadCount = ref(0)

    const handelSubmit = () => {
      console.log(queryParas)
      loadCount.value++
    }
    // 重置
    const handleReset = () => {
      // console.log(loadCount.value)
      console.log(queryParas)
    }

    return {
      formLists,
      queryParas,
      columns,
      loadCount,
      handelSubmit,
      handleReset,
      testApi
    }
  }
})
</script>

<template>
  <div>
    <base-form
      :formLists="formLists"
      :model="queryParas"
      @submit="handelSubmit"
      @reset="handleReset"
    ></base-form>
    <base-table
      :columns="columns"
      :loadApi="testApi"
      :loadCount="loadCount"
      :queryParas="queryParas"
    ></base-table>
  </div>
</template>

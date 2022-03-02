<script>
import { computed, defineComponent, ref } from '@vue/composition-api'
import store from '@/store'
import { getSysId } from '@/utils/auth/userAuth'

const selectedField = ['appId', 'appName']
export default defineComponent({
  setup () {
    const visible = ref(false)
    // 子系统配置项
    const sysConfigs = computed(() => store.state.sys.sysLists)

    const sysId = ref('')

    const handleSelectChange = (val, sys) => {
      const curSystemId = getSysId()
      if (val !== curSystemId) {
        window.open(sys.website, '_self')
      }
      visible.value = false
    }
    return {
      visible,
      sysId,
      sysConfigs,
      selectedField,
      handleSelectChange
    }
  }
})
</script>
<template>
  <base-dialog :visible.sync="visible" title="切换子系统" width="400px">
  <span>请选择应用：</span>
    <base-select
      v-model="sysId"
      :options="sysConfigs"
      @change="handleSelectChange"
      :selectedField="selectedField"
    ></base-select>
  </base-dialog>
</template>

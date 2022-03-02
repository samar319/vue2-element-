<script>
import dictSelect from '@/components/common/dictSelect/dictSelect.vue'
import { computed, defineComponent, reactive, ref } from '@vue/composition-api'

export default defineComponent({
  components: { dictSelect },
  name: 'Demo',
  setup () {
    const dictValue = ref('')
    /**
     * 选中的回调
     */
    const handleSelectChange = (...arg) => {
      console.log('选中的值', arg[0])
      console.log('选中的项', arg[1])
    }
    /**
     * form配置项
     */
    const formConfig = computed(() => {
      return [
        {
          prop: 'name',
          label: '输入框',
          tag: 'el-input',
          attrs: {
            placeholder: '姓名',
            clearable: true
          }
        },
        {
          prop: 'name10',
          label: '输入框',
          tag: 'el-input',
          attrs: {
            placeholder: '姓名',
            clearable: true
          }
        },
        {
          prop: 'name1',
          label: '输入框',
          tag: 'el-input',
          attrs: {
            placeholder: '姓名',
            clearable: true
          }
        },
        {
          prop: 'name2',
          label: '输入框',
          tag: 'el-input',
          attrs: {
            placeholder: '姓名',
            clearable: true
          }
        },
        {
          prop: 'name3',
          label: '输入框',
          tag: 'el-input',
          attrs: {
            placeholder: '姓名',
            clearable: true
          }
        },
        {
          prop: 'name4',
          label: '输入框',
          tag: 'el-date-picker',
          attrs: {
            placeholder: '姓名',
            clearable: true
          }
        },
        {
          prop: 'dictName',
          label: '下拉框',
          tag: dictSelect,
          attrs: {
            placeholder: '字典下拉',
            dictTypeCode: 'ZT_BH_BIZ_TYPE',
            clearable: true
          }
        }
      ]
    })
    // 表单数据
    const formData = reactive({
      name: '',
      dictName: ''
    })
    // 提交
    const handelSubmit = () => {
      console.log(formData)
    }
    // 重置
    const handleReset = () => {
      formData.name = ''
      formData.dictName = ''
    }

    return {
      dictValue,
      formConfig,
      formData,
      dictTypeCode: 'ZT_BH_BIZ_TYPE',
      handleSelectChange,
      handelSubmit,
      handleReset
    }
  }
})
</script>

<template>
  <div>
    <p>字典组件测试获取到的值: {{ dictValue }}</p>
    <hr />
    <dict-select
      v-model="dictValue"
      :dictTypeCode="dictTypeCode"
      @change="handleSelectChange"
      multiple
      collapse-tags
    ></dict-select>
    <hr />
    <p>form组件基本使用:{{ formData }}</p>
    <hr />
    <p>label水平方向：</p>
    <base-form
      labelPosition="left"
      labelWidth="100px"
      :model="formData"
      :formLists="formConfig"
      :hideBtn="false"
      @submit="handelSubmit"
      @reset="handleReset"
    ></base-form>
    <p>label垂直方向：</p>
    <base-form
      labelPosition="top"
      labelWidth="100px"
      :model="formData"
      :formLists="formConfig"
      :hideBtn="false"
      @submit="handelSubmit"
      @reset="handleReset"
    ></base-form>
  </div>
</template>

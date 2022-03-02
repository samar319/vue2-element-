import Dialog from './dialog/BaseDialog.vue'
import form from './form/BaseForm.vue'
import Select from './select/BaseSelect.vue'
import Table from './table/table.vue'

export default {
  install (Vue) {
    Vue.component('BaseDialog', Dialog)
    Vue.component('BaseForm', form)
    Vue.component('BaseSelect', Select)
    Vue.component('BaseTable', Table)
  }
}

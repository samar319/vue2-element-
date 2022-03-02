/*
  插件注入模块
*/
import vueCompositionApi from '@vue/composition-api' // 兼容一些V3语法
import elementUi from './element-ui' // elementUI组件引入
import 'normalize.css' // 官网地址 necolas.github.io/normalize.css
import 'nprogress/nprogress.css' /* 进度条样式 */
// 虚拟滚动表格
import { UTable, UTableColumn } from 'umy-ui'
import component from './component'
import proComponents from '@/components/packages' /* 项目中封装的组件 */

export default {
  install (Vue) {
    Vue.component(UTable.name, UTable)
    Vue.component(UTableColumn.name, UTableColumn)

    Vue.use(elementUi)
    Vue.use(component)
    Vue.use(proComponents)
    Vue.use(vueCompositionApi)
  }
}

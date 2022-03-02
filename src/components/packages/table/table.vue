<script>
import { computed, defineComponent } from '@vue/composition-api'
import { CalculateHeight, PaginationHooks } from './hooks'
export default defineComponent({
  props: {
    // 表格配置项
    columns: {
      type: Array,
      required: true
    },
    // 显示分页
    showPage: {
      type: Boolean,
      default: true
    },
    // 分页配置项
    paginationConfig: {
      type: Object,
      default: () => ({})
    },
    // 计算表格底部自适应高度
    selfHeight: {
      type: Number,
      default: 60
    },
    // 自定义表格高度
    height: {
      type: Number,
      default: 0
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    // 分页配置项
    pageSizes: {
      type: Array,
      default: () => [10, 20, 30, 40, 50, 100]
    },
    // 用来处理刷新数据请求
    loadCount: {
      type: Number,
      default: 1
    },
    // 数据接口请求API
    loadApi: {
      type: Function
    },
    // 查询参数
    queryParas: {
      type: Object,
      default: () => ({})
    },
    // 数据源
    sourceData: {
      type: Array,
      default: () => []
    }
  },
  setup (props, ...arg) {
    const { paginationQuery, total, paginationEvents, tableData } =
      PaginationHooks(props, ...arg)

    const { tableHeight, tableId } = CalculateHeight(props)
    /**
     * 表格配置项过滤处理
     */
    const filterEdColumns = computed(() => {
      const res = []

      const formatHelp = (res, columns) => {
        columns.forEach(it => {
          if (it.hidden) return
          // 宽度处理  只能设置最小宽度 不支持直接设置宽度
          if (typeof it.width !== 'undefined') {
            it.minWidth = it.minWidth || it.width
          }

          it.align = it.align || 'center'

          // 递归处理子元素配置项
          if (it.children && Array.isArray(it.children)) {
            it.child = []
            formatHelp(it.child, it.children)
          }
          res.push(it)
        })
      }

      formatHelp(res, props.columns)
      return res
    })

    return {
      filterEdColumns,
      paginationQuery,
      total,
      tableHeight,
      tableId,
      paginationEvents,
      tableData
    }
  },

  render (h) {
    const {
      filterEdColumns,
      $scopedSlots,
      paginationQuery,
      showPage,
      paginationEvents,
      tableHeight,
      tableId,
      tableData
    } = this
    /**
     * 表格项渲染
     */
    const renderColumns = columns =>
      columns.map(item => {
        const propName = item.prop
        if (item.type === 'index' || item.type === 'selection') {
          return renderSelection(item)
        }
        if (item.child) {
          return renderChildren(item)
        }

        const propHeaderName = `${propName}Header`

        const defaultScopedSlots = {
          default: scope => {
            return $scopedSlots[propName]
              ? $scopedSlots[propName](scope)
              : item.formatter
              ? item.formatter(scope.row)
              : scope.row[propName]
          }
        }
        // 自定义表头
        if ($scopedSlots[propHeaderName]) {
          defaultScopedSlots.header = scope =>
            $scopedSlots[propHeaderName](scope)
        }

        return h('u-table-column', {
          attrs: {
            ...item
          },
          scopedSlots: defaultScopedSlots
        })
      })

    // 下拉框和索引渲染
    const renderSelection = item =>
      h('u-table-column', { attrs: { ...item, fixed: 'left' } })

    // 嵌套表头渲染
    const renderChildren = item =>
      h('u-table-column', { attrs: { ...item } }, renderColumns(item.children))

    // 表格渲染
    const renderTable = () => {
      return h(
        'u-table',
        {
          attrs: {
            ...this.$attrs,
            data: tableData,
            height: tableHeight,
            id: tableId,
            maxHeight: tableHeight
          },
          style: {
            width: '100%'
          }
        },
        renderColumns(filterEdColumns)
      )
    }

    // 渲染表格下 分页 和统计处理等
    const renderTableBottom = () => {
      const isSlot = !!$scopedSlots['footer-text']
      const renderCell = []
      if (isSlot) {
        renderCell.push($scopedSlots['footer-text']())
      }
      if (showPage) {
        renderCell.push(renderPagination())
      }

      return h(
        'div',
        {
          class: {
            'table-footer': true,
            flex: true,
            'flex-between': isSlot && showPage,
            'flex-end': showPage && !isSlot
          }
        },
        renderCell
      )
    }

    // 分页处理
    const renderPagination = () =>
      h('el-pagination', {
        class: '',
        attrs: {
          layout: this.layout,
          pageSizes: this.pageSizes,
          'current-page': paginationQuery.pageIndex,
          'page-size': paginationQuery.pageSize,
          total: this.total
        },
        on: paginationEvents
      })

    return h('div', [renderTable(), renderTableBottom()])
  }
})
</script>

<style lang="scss" scoped src="./style.scss"></style>

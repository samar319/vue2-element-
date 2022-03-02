import { throttle } from '@/utils'
import {
  computed,
  onBeforeMount,
  onMounted,
  ref,
  watch
} from '@vue/composition-api'

let tableInitId = 200

// 获取元素到顶部距离-通用方法
const getPositionTop = node => {
  if (!node) {
    return
  }
  var top = node.offsetTop
  var parent = node.offsetParent
  while (parent != null) {
    top += parent.offsetTop
    parent = parent.offsetParent
  }
  return top // 所有的父元素top和
}

/**
 * 分页数据处理
 * @param {*} props 组件props 的值
 * @param {*} arg
 * @returns
 */
export const PaginationHooks = (props, { emit }) => {
  const tableData = ref([])
  // 需要处理分页数据

  const total = ref(0)

  // 是否是接口请求数据
  const isLoad = ref(false)

  // 查询条件
  const paginationQuery = computed(() => ({
    pageSize: 10,
    pageIndex: 1,
    ...props.queryParas
  }))

  onMounted(() => {
    if (typeof props.loadApi !== 'function') {
      calculatePaginationConfig()
    } else {
      isLoad.value = true
      watch(
        () => props.loadCount,
        () => {
          loadData()
        }
      )
    }
  })

  /**
   * API 请求数据处理
   */
  const loadData = async () => {
    // 接口参数处理
    if (!props.loadApi || typeof props.loadApi !== 'function') {
      return console.error('组件未传入查询接口或者参数不正确：[loadApi]')
    }
    try {
    const { data } = await props.loadApi(paginationQuery.value)

    // 处理数据分页显示信息 字段根据不同项目自己跟新
      if (props.showPage) {
        total.value = data.totalRow
        tableData.value = data.datas
      } else {
        tableData.value = data.datas
      }
    } catch (error) {
      console.error('获取数据失败', error)
    }
  }

  // 计算分页数据
  const calculatePaginationConfig = () => {
    if (isLoad.value) {
      loadData()
      return
    }
    total.value = props.sourceData.length

    const { pageSize, pageIndex } = paginationQuery.value

    const startIndex = (pageIndex - 1) * pageSize

    const endIndex =
      startIndex + pageSize - 1 > total.value ? total.value : startIndex + pageSize - 1
    tableData.value = props.sourceData.slice(startIndex, endIndex + 1)
  }

  // size change
  const pageSizeChange = size => {
    props.queryParas.pageSize = size
    // 待验证 处理分页在比较少的情况下 Index 在最后 分页size突然变大的情况下  会引起查询两次
    if (total.value + size < size * paginationQuery.value.pageIndex) {
      return
    }

    calculatePaginationConfig()
  }

  // index change
  const pageIndexChange = index => {
    props.queryParas.pageIndex = index

    calculatePaginationConfig()
  }

  const paginationEvents = {
    'size-change': pageSizeChange,
    'current-change': pageIndexChange
  }

  return {
    total,
    tableData,
    paginationEvents,
    paginationQuery
  }
}

/**
 * 表格高度计算处理
 * @param {*} props
 */
export const CalculateHeight = props => {
  // 表格高度
  const height = ref(0)
  // 表格id
  const tableId = ref('')
  tableId.value = `sz_table${++tableInitId}`

  onMounted(() => {
    handleRegisterCalculate()
  })

  // 计算高度
  const handleRegisterCalculate = () => {
    if (props.height) {
      height.value = props.height
    } else {
      calculate()
      window.addEventListener('resize', initStyle)

      onBeforeMount(() => {
        window.removeEventListener('resize', initStyle)
      })
    }
  }
  // 高度计算事件处理
  const calculate = () => {
    const dom = document.getElementById(tableId.value)
    const tableTop = getPositionTop(dom)
    const winHeight = document.documentElement.clientHeight
    const tableH = Math.max(winHeight - tableTop, 100)

    height.value = Math.max(tableH - props.selfHeight, 300)
  }

  const initStyle = throttle(calculate)

  return {
    tableHeight: height,
    tableId
  }
}

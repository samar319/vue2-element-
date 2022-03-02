<script>
import { computed, defineComponent, ref } from '@vue/composition-api'
import { userHooks } from './hooks'
export default defineComponent({
  setup () {
    const { name, changeName } = userHooks('测试人员')

    const columns = computed(() => {
      return [
        {
          type: 'selection',
          label: '序号'
        },
        {
          type: 'index',
          label: '序号'
        },
        {
          prop: 'info',
          width: '300px',
          label: '基本信息'
        },
        {
          prop: 'date',
          label: '日期',
          width: '100px'
        },
        {
          prop: 'name',
          label: '姓名'
        },
        {
          prop: 'address',
          label: '地址'
        }
      ]
    })

    // 表格数据
    const tableData = ref([
      {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333,
        tag: '家'
      },
      {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333,
        tag: '公司'
      },
      {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333,
        tag: '家'
      },
      {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333,
        tag: '公司'
      },
      {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333,
        tag: '家'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333,
        tag: '公司'
      },
      {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333,
        tag: '家'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333,
        tag: '公司'
      },
      {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333,
        tag: '家'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333,
        tag: '公司'
      },
      {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333,
        tag: '家'
      },
      {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333,
        tag: '公司'
      }
    ])

    const tableData1 = Array.from({ length: 500 }, (_, idx) => ({
      id: idx + 1,
      date: '2016-05-03',
      name: 1,
      ab: '欢迎使用u-table',
      address:
        '北京市天安门天安门天安门北京市天安门天安门天安门北京市天安门天安门天安门'
    }))

    // 高度可以动态设置
    const height = ref(400)

    const changeHeight = () => {
      height.value = 400
    }

    return {
      columns,
      tableData,
      tableData1,
      height,
      name,
      changeHeight,
      changeName
    }
  }
})
</script>

<template>
  <div>
    <p>表格组件使用：</p>
    <base-table :columns="columns" :sourceData="tableData" key="1" :height="300">
      <!-- 表格 -->
      <template slot="name" slot-scope="{ row, $index }">
        <span>我是自定义序号{{ row.name }} 下标：{{ $index }}</span>
      </template>
      <!-- name表头 -->
      <template slot="nameHeader" slot-scope="{ column, $index }">
        <span>我是自定义表头{{ column.property }}下标：{{ $index }}</span>
      </template>
      <!-- 底部插槽 -->
      <template slot="footer-text">
        底部自定义
      </template>
    </base-table>

    <!-- <p>虚拟列表处理：{{name}}<el-button @click="changeName('11')">切换数据</el-button></p> -->
    <!-- 使用虚拟列表  use-virtual row-height  height 必填 -->
    <base-table
      :columns="columns"
      :sourceData="tableData1"
      key="2"
      use-virtual
      :row-height="55"
      :height="height"
    >
    </base-table>
  </div>
</template>

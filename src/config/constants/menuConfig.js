import { isDev } from '..'

/**
 * 本地开发环境静态页面路由配置
 *
 */
const devMenus = [
  {
    path: '/dashboard',
    title: '首页',
    id: '09010'
  },
  {
    path: '/demo',
    title: 'form界面',
    id: '090111'
  },
  {
    path: '/demo2',
    title: '表格界面',
    id: '090112'
  },
  {
    path: '/demo3',
    title: '组合界面',
    id: '090114'
  }
]

export default isDev ? devMenus : []

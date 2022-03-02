import { isProd } from '@/config'
/**
 * 加载组件模块
 */
const projectViewLoad = isProd
  ? path => () => import(`_v/${path}.vue`)
  : path => require(`_v/${path}.vue`).default

export default projectViewLoad

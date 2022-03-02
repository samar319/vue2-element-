// 开发时请求接口处理

import { isDev } from './config'
/**
 * 请求拦截
 * @param {import('axios').Axios} request
 */
const httpHelp = request => {
  if (!isDev) return

  request.interceptors.request.use(config => {
    // 配置请求的后端接口地址

    return config
  })
}

export default httpHelp

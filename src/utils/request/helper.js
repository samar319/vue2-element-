import { Message } from 'element-ui'
import { getRequestHeaders } from '../auth'

/**
 *设置请求头信息
 * @param {import('axios').AxiosRequestConfig} config
 */
export const setRequestToken = config => {
  const headers = getRequestHeaders()
  config.headers = headers
}
/**
 * 获取当前请求的唯一KEY
 * 此处处理方式还需根据项目优化 同一个接口多个不同参数会引起问题 建议加上请求参数
 */
export const getRequestKey = config => {
  return `${config.method} ${config.url}`
}

/**
 * 是否是文件下载返回
 */
export const isFileResponse = response =>
  response.headers !== undefined &&
  response.headers !== null &&
  response.request.responseType === 'blob'

/**
 * 请求是否成功
 */
export const isResponseSuccess = responseData =>
  responseData.code === '0' || responseData.code === 0

export const errorMsg = message =>
  Message({
    message,
    type: 'error',
    duration: 3 * 1000
  })

import { globalLogout } from '../auth'
import {
  errorMsg,
  isFileResponse,
  isResponseSuccess,
  setRequestToken
} from './helper'

// 用户过期
const TOKEN_OVERDUE_CODE = '160300004'

/**
 * 返回结果处理
 * @param {import('axios').AxiosResponse} response
 */
const requestResponseInterceptor = response => {
  // 文件请求返回处理
  if (isFileResponse(response)) return response

  const responseData = response.data

  if (isResponseSuccess(responseData)) {
    responseData.success = responseData.success || true
    return responseData
  } else {
    handelRequestError(responseData)
    return Promise.reject(responseData)
  }
}

/**
 * 请求处理
 */
const requestRequestInterceptor = config => {
  // 设置请求头
  setRequestToken(config)
  return config
}
/**
 * 请求拦截处理
 * @param {import('axios').AxiosInstance} instance
 */
const requestInterceptor = instance => {
  instance.interceptors.request.use(
    config => requestRequestInterceptor(config),
    error => Promise.reject(error)
  )

  instance.interceptors.response.use(
    response => requestResponseInterceptor(response),
    error => {
      handelRequestError(error)
      return Promise.reject(error)
    }
  )
}

const handelRequestError = response => {
  if (response.code === TOKEN_OVERDUE_CODE) {
    globalLogout()
  } else {
    errorMsg(response.message)
  }
}

export { requestInterceptor }

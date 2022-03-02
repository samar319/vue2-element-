import axios from 'axios'
import qs from 'qs'
import devRequestHelp from '@/requestHelp'
import { requestInterceptor } from './interceptors'
/**
 * @type {import('axios').AxiosRequestConfig}
 */
const config = {
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 10 * 1000,
  paramsSerializer: params => qs.stringify(params, { indices: false })
}

const request = axios.create(config)

requestInterceptor(request)
// 请求处理`
devRequestHelp(request)

export default request

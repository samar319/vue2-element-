import request from '@/utils/request'
/**
 * 测试接口
 * @param {} params
 * @returns
 */
export const testApi = params =>
  request({
    method: 'get',
    url: '/api/zhongtian/payment/paymentplan/list',
    params
  })

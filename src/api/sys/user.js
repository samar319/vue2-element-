import request from '@/utils/request'

/**
 * 用户基础信息
 */
export const getUserInfo = () =>
  request({
    hideLoading: true,
    method: 'get',
    url: '/api/authcenter/base/user'
  })

/**
 * 重置用户密码
 */
export const resetPassword = data =>
  request({
    method: 'put',
    url: 'api/authcenter/base/user/pwd',
    data
  })

/**
 * 设置用户密码
 */
export const resetNewPassword = data =>
  request({
    method: 'put',
    url: `api/authcenter/base/user/pwd/${data.userId}`,
    data
  })

/**
 * 获取用户所有的子系统数据
 */
export const getUserSysList = () =>
  request({
    method: 'get',
    url: 'api/authcenter/base/tenant/user/curuser/tenants'
  })

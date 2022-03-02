import request from '@/utils/request'

/**
 * 字典接口
 */
export const getDict = () => {
  return request({
    method: 'get',
    url: '/api/dict/dict/list'
  })
}

/**
 * 系统菜单列表
 * @returns
 */
export const getSysMenus = () =>
  request({
    method: 'get',
    url: 'api/authcenter/authority/menu/list',
    params: { loadOp: 1 }
  })

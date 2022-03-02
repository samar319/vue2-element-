import { createStorage } from '../storage'

const userToken = 'USER_TOKEN'
const tenantKey = 'TENANT_KEY'
const sysKey = 'SYS_ID'

export const TokenStorage = createStorage(userToken)

export const TenantStorage = createStorage(tenantKey)

export const SysStorage = createStorage(sysKey)

/**
 * 移除用户相关数据缓存
 */
export const clearUserStorage = () => {
  TokenStorage.remove()
  TenantStorage.remove()
  SysStorage.remove()
}
/**
 * 存储用户信息数据啊
 * @param {*} param
 */
export const setUserStorage = ({ sysId, token, tenantId }) => {
  TokenStorage.set(token)
  SysStorage.set(sysId)
  TenantStorage.set(tenantId)
}

export const setToken = v => TokenStorage.set(v)
export const getToken = () => TokenStorage.get()

export const setTenant = v => TenantStorage.set(v)
export const getTenant = () => TenantStorage.get()

export const setSysId = v => SysStorage.set(v)
export const getSysId = () => SysStorage.get()

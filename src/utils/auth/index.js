import { isSingleSignOn } from '@/config'
import router from '@/router'
import store from '@/store'

/**
 * 获取请求头部信息
 */
export const getRequestHeaders = () => {
  const {
    user: { token, tenantId, sysId }
  } = store.state
  let res = {}
  if (token) {
    res = {
      Authorization: 'Bearer ' + token,
      token: token,
      tenantId: tenantId,
      client: sysId
    }
  }
  return res
}

/**
 * 退出登录
 */
export const globalLogout = () => {
  // TODO 项目内跳转 还是单点登录
  let locationUri = window.location.origin
  if (locationUri === undefined || locationUri === null) {
    // 协议 + 主机（域名）
    locationUri = window.location.protocol + '//' + window.location.host
  }
  if (isSingleSignOn) {
    window.open(
      process.env.VUE_APP_LOGIN_URL + '?redirct=' + locationUri,
      '_self'
    )
  } else {
    router.replace('/login')
  }
}

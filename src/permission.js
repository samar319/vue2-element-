import NProgress from 'nprogress'
import router from './router'
import { getToken } from '@/utils/auth/userAuth'
import { getUrlParams } from '@/utils/auth/url'
import store from '@/store'
import { getDict, getSysMenus } from './api/sys/dict'
import { getUserInfo, getUserSysList } from './api/sys/user'
import { globalLogout } from './utils/auth'
import { getSysMenuOptions } from './utils/sys/menus'
import { localhostDev } from './config'

// 系统路由配置项
const sysMenus = getSysMenuOptions()
// 不需要登录的白名单

const whiteList = []

let isFirstLogin = true

// 需要登录
const needLogin = path => !getToken() && path !== '/login'

// 是否是登录界面跳转过来的判定
const isUserInfoInParams = urlParams =>
  urlParams && urlParams.token && urlParams.tenantId && urlParams.sysId

// 用户信息设置
const setUserInfo = async (urlParams, next) => {
  store.commit('initUserInfo', urlParams)
  next({ path: '/', replace: true })
}

// 401 没权限
const notAuth = path => {
  // 前端配置有  但是后端返回的配置没有 -> 401
  if (
    path === '/' ||
    path === '/dashboard' ||
    path === '/401' ||
    path === '/404' ||
    path === '/demo2' ||
    path === '/demo3' ||
    path === '/demo'
  ) {
    return false
  }
  const menuPaths = store.state.sys.originMenus.map(it => it.path)

  return !menuPaths.includes(path)
}

// 404 路由没在前端配置的路由
const notFound = path => !sysMenus.includes(path)

// 初始化基础配置数据
const initSysInfo = async () => {
  const [dict, user, menus, systems] = await Promise.all([
    getDict(),
    getUserInfo(),
    getSysMenus(),
    getUserSysList()
  ])

  isFirstLogin = false
  store.dispatch('initSysInfo', { dict, user, menus, systems })
}

// 白名单
const pathInWhiteLists = path => whiteList.includes(path)

router.beforeEach(async (to, from, next) => {
  // 静态界面开发直接跳过
  if (localhostDev) {
    store.dispatch('initDevMenus')
    next()
    return
  }

  NProgress.start()
  const urlParams = getUrlParams(to.fullPath)
  // 参数中带有用户信息
  if (isUserInfoInParams(urlParams)) {
    await setUserInfo(urlParams, next)
  } else if (needLogin(to.path)) {
    // 考虑白名单的情况
    if (pathInWhiteLists(to.path)) {
      next()
    } else {
      globalLogout()
    }
  } else {
    if (isFirstLogin) {
      await initSysInfo()
    }

    if (notFound(to.path)) {
      next({ path: '/404' })
      next()
    } else if (notAuth(to.path)) {
      next({ path: '/401' })
    } else {
      next()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

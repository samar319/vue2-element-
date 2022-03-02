import { buildAuthMap, buildDictMaps, buildMenusData } from '@/utils/sys'

export default {
  state: {
    isCollapse: false,
    dicts: [],
    dictMap: {},
    originMenus: [],
    menus: [],
    authPerms: {},
    userInfo: {},
    sysLists: []
  },
  actions: {
    // 初始化系统基础信息
    initSysInfo: ({ commit }, { dict, user, menus, systems }) => {
      commit('setDict', dict.data || [])
      commit('setUserInfo', user.data)
      commit('setMenus', menus.data)
      commit('setSysLists', systems.data)
    },
    /**
     * 用来处理静态界面开发时的路由配置项
     */
    initDevMenus: ({ commit }) => {
      commit('setMenus', [])
    }
  },
  mutations: {
    setDict: (state, list) => {
      state.dicts = list
      state.dictMap = buildDictMaps(list)
    },
    setMenus: (state, menus) => {
      state.originMenus = menus
      state.menus = buildMenusData(menus)
      state.authPerms = buildAuthMap(menus)
    },
    setUserInfo: (state, info) => {
      state.userInfo = info
    },
    // 设置系统可选子系统 多租户未处理 默认处理
    setSysLists: (state, lists) => {
      state.sysLists = lists[0] && (lists[0].appLists || [])
    },
    changeFlag: state => {
      state.isCollapse = !state.isCollapse
    }
  }
}

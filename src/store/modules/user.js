import { globalLogout } from '@/utils/auth'
import { clearUserStorage, getSysId, getTenant, getToken, setUserStorage } from '@/utils/auth/userAuth'

export default {
  state: {
    isAuthEd: false,
    token: getToken(),
    tenantId: getTenant(),
    sysId: getSysId()
  },
  actions: {
    logout ({ commit }) {
      commit('clearUserInfo')
    }
  },
  mutations: {
    clearUserInfo: state => {
      state.isAuthEd = false
      state.token = ''
      state.tenantId = ''
      state.sysId = ''
      clearUserStorage()
      globalLogout()
    },

    initUserInfo: (state, { sysId, token, tenantId }) => {
      state.isAuthEd = true
      state.token = token
      state.tenantId = tenantId
      state.sysId = sysId
      setUserStorage({ sysId, token, tenantId })
    }
  }
}

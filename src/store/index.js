import vuex from 'vuex'
import Vue from 'vue'
import user from './modules/user'
import sys from './modules/sys'

Vue.use(vuex)

const store = new vuex.Store({
  modules: {
    user,
    sys
  },
  getters: {
    isCollapse: state => state.sys.isCollapse
  }
})

export default store

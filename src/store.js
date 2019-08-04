import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '@/utils/auth.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 保存token信息
    user: auth.getUser()
  },
  mutations: {
    setUser (state, data) {
      // 修改state中的token
      state.user = data
      // 设置lc中的token
      auth.setUser(state.user)
    }
  },
  actions: {

  }
})

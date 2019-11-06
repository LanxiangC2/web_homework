import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: 'nihao',
    xiha: '无语',
    login: true




    
  },
  getters: {
    login (state) {
      return state.login
    }
  },
  mutations: {
    // 改变登录状态
    logout (state) {
      state.login = false
    },
    login (state) {
      state.login = true
    }
  },
  actions: {
    logout (context) {
      context.commit('logout')
    }
  }
})

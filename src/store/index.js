import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: 'nihao',
    xiha: '无语',
    login: true,
    user: '罗小黑',
    articles_data: [
      {id: 0, subtitle: '罗小黑，无限，2019/3/27', title: '车联网C-V2X技术原理及测试解决方案', data: '...'},
      {id: 1, subtitle: '罗小黑，无限，2019/3/27', title: '创新引领未来，华为联合伙伴打造C-V2X智慧出行新场景', data: '...'},
      {id: 2, subtitle: '罗小黑，无限，2019/3/27', title: '中兴、北邮共建许昌芙蓉湖项目入围IMT-2020首批MEC与C-V2X融合测试床', data: '...'},
      {id: 3, subtitle: '罗小黑，无限，2019/3/27', title: 'C-V2X技术在智能网联汽车上的应用场景研究', data: '...'},
      {id: 4, subtitle: '罗小黑，无限，2019/3/27', title: '一种用于自动驾驶汽车的5G C-V2X车路云协同感知方法及系统', data: '...'}
    ],
    userRequirements: []
  },
  getters: {
    login (state) {
      return state.login
    },
    user (state) {
      return state.user
    },
    articles_data (state) {
      return state.articles_data
    },
    userRequirements (state) {
      return state.userRequirements
    }
  },
  mutations: {
    // 改变登录状态
    logout (state) {
      state.login = false
    },
    login (state) {
      state.login = true
    },
    noteUserInfos (state, ob) {
      state.userRequirements = ob
    }
  },
  actions: {
    logout (context) {
      context.commit('logout')
    }
  }
})

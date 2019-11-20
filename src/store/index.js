import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

axios.defaults.baseURL = 'http://paperapi.cquzxy.top/'
axios.defaults.headers.common['Authorization'] = 'JWT ' + sessionStorage.getItem('access')

export default new Vuex.Store({
  state: {
    name: 'nihao',
    xiha: '无语',
    login: true,
    user: '罗小黑',
    // token
    // 用户验证token
    token: null,
    articles_data: [],
    paper: [],
    authorData: [],
    userRequirements: []
  },
  getters: {
    login (state) {
      return state.login
    },
    user (state) {
      return state.user
    },
    articles_quote (state) {
      return state.articles_data.sort((a, b) => a['quote'] > b['quote'] ? -1 : 1)
    },
    articles_time (state) {
      return state.articles_data.slice().sort((a, b) => a['publish_time'] > b['publish_time'] ? -1 : 1)
    },
    articles_good (state) {
      return state.articles_data.slice().sort((a, b) => a['paper_temperature'] > b['paper_temperature'] ? -1 : 1)
    },
    paper (state) {
      return state.paper
    },
    authorData (state) {
      return state.authorData
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
    },
    // 用户验证token
    retrieveToken (state, token) {
      state.token = token
    },
    retrieveData (state, data) {
      state.articles_data = data
    },
    retrievePaper (state, paper) {
      state.paper = paper
    },
    retrieveAuthor (state, authorData) {
      state.authorData = authorData
    }
  },
  actions: {
    logout (context) {
      context.commit('logout')
    },
    // 开始做任务的验证,token获取
    retrieveToken (context, ob) {
      axios.post('/login/', ob)
        .then(response => {
          sessionStorage.setItem('access', response.data.token)
          // console.log(response.data.token)
          // 设置axios发送http请求的头信息
          context.commit('retrieveToken', response.data.token)
          axios.defaults.headers.common['Authorization'] = 'JWT ' + sessionStorage.getItem('access')
          context.commit('login')
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 获取数据
    retrieveData (context, data) {
      context.commit('retrieveData', data)
    },
    retrievePaper (context, data) {
      context.commit('retrievePaper', data)
    },
    retrieveAuthor (context, data) {
      context.commit('retrieveAuthor', data)
    }
  }
})

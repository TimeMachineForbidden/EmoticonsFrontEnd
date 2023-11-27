import { createStore } from 'vuex'

export default createStore({
  state: {
    // 存储token
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
    // 存储用户的id号码
    ID: localStorage.getItem('ID') ? localStorage.getItem('ID') : '',
  },
  getters: {
  },
  mutations: {
    // 修改token，并将token存入localStorage
    changeLogin(state, user) {
      state.Authorization = user.Authorization;
      state.ID = user.ID;
      localStorage.setItem('Authorization', user.Authorization);
      localStorage.setItem('ID', user.ID)
    }
  },
  actions: {
  },
  modules: {
  }
})


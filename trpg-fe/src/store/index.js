import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'


Vue.use(Vuex)

const getDefaultState = () => {
    return {
        LoggedIn: false,
        user:{},
        session:""
    }
}

export default new Vuex.Store({
    state: getDefaultState,
    plugins:[createPersistedState()],
    mutations: {
        login(state, user) {
            state.LoggedIn = true
            state.user = user
        },
        session(state,session){
          state.session = session
        },
        reset(state) {
            Object.assign(state, getDefaultState())
        }
    },
    actions: {
        loginActions({commit}, user) {
            commit('login', user)
        },
        setSession({commit},session){
          commit('session',session)
        },
        logoutActions({commit}) {
            commit('reset')
        }
    },
    getters: {
        getLogin: function (state) {
            return state.LoggedIn
        },
        getSession: function (state){
            return state.session
        }
    }
})

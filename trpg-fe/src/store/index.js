import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'


Vue.use(Vuex)

const getDefaultState = () => {
    return {
        LoggedIn: false,
        user: {},
        session: "",
        sheet: ""
    }
}

export default new Vuex.Store({
    state: getDefaultState,
    plugins: [createPersistedState()],
    mutations: {
        login(state, user) {
            state.LoggedIn = true
            state.user = user
        },
        session(state, session) {
            state.session = session
        },
        sheet(state, sheet) {
            state.sheet = sheet
        },
        reset(state) {
            Object.assign(state, getDefaultState())
        }
    },
    actions: {
        loginActions({commit}, user) {
            commit('login', user)
        },
        setSession({commit}, session) {
            commit('session', session)
        },
        setSheet({commit},sheet) {
            commit('sheet',sheet)
        },
        logoutActions({commit}) {
            commit('reset')
        }
    },
    getters: {
        getLogin(state) {
            return state.LoggedIn
        },
        getSession(state) {
            return state.session
        },
        getSheet(state){
            return state.sheet
        },
        getUser(state){
            return state.user
        }
    }
})

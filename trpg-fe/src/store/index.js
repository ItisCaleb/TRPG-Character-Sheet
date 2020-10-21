import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import api from "@/api";


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
        setSession({commit}) {
            return new Promise((resolve, reject) => {
                api.getSessions()
                    .then(session => {
                        commit('session', session)
                        resolve()
                    })
                    .catch(()=>reject())
            })

        },
        setSheet({commit}) {
            return new Promise((resolve, reject) => {
                api.getSheets()
                    .then(sheet => {
                        commit('sheet', sheet)
                        resolve()
                    })
                    .catch(()=>{reject()})
            })

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

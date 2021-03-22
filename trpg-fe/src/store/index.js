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
        sheet: "",
        darkMode: false
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
            const dark = state.darkMode
            Object.assign(state, getDefaultState())
            state.darkMode = dark
        },
        dark(state){
            state.darkMode = !state.darkMode
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
        },
        changeDark({commit,dispatch}){
            commit('dark')
            dispatch('setDark')
        },
        setDark({state}){
            if(state.darkMode){
                document.getElementsByTagName('html')[0].className="dark"
            }else {
                document.getElementsByTagName('html')[0].classList.remove('dark')
            }
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
